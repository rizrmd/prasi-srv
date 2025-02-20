import type { Server } from "bun";
import type { PrasiServer } from "typings/server";
import { c } from "utils/color";
import { type SiteConfig } from "utils/deploy-config";
import { fs } from "utils/fs";
import { staticFile } from "utils/static";
import { initDB } from "../db/init-db";
import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi, type PrasiContent, type PrasiGlobal } from "./prasi-var";
import { join } from "path";
import { createRouter } from "rou3";
export const init = async ({
  site_id,
  server,
  mode,
  prasi: init_prasi,
  action,
  content,
  dev,
  index_html,
  db,
}: {
  site_id?: string;
  db: SiteConfig["db"];
  index_html?: PrasiGlobal["index_html"];
  prasi: {
    version: number;
    paths: {
      index: string;
      internal: string;
      server: string;
      typings: string;
      dir: {
        nova: string;
        site: string;
        frontend: string;
        backend: string;
        upload: string;
        public: string;
      };
    };
  };
  server: (server: PrasiServer) => Server;
  mode: "ipc" | "server";
  action?: "reload" | "start" | "init";
  dev?: boolean;
  content?: Partial<PrasiContent>;
}) => {
  prasi.mode = mode;
  if (index_html) prasi.index_html = index_html;

  if (content) prasi.content = content;

  const backend_path = init_prasi.paths.dir.backend;
  const frontend_dir = init_prasi.paths.dir.frontend;

  if (!frontend_dir) {
    console.error(`dir.build is empty, please check prasi.json!`);
    return;
  }

  if (mode === "server") {
  } else {
    fs.init({
      site: init_prasi.paths.dir.backend,
      upload: init_prasi.paths.dir.upload,
      public: init_prasi.paths.dir.public,
    });
  }

  await initDB(db);

  const { internal_prasi_api } = await import("./handler/api-internal");
  await internal_prasi_api.rescan();

  prasi.static = {
    frontend: await staticFile(frontend_dir),
    public: await staticFile(init_prasi.paths.dir.public),
    nova: init_prasi.paths.dir.nova,
  };
  if (site_id) prasi.site_id = site_id;
  prasi.dev = dev;

  if (mode === "ipc") {
    if (action === "init") return;
    process.chdir(backend_path);
  }

  const backend_file = join(
    backend_path,
    init_prasi.paths.server.replace(".ts", ".js")
  );
  delete require.cache[backend_file];
  const module = require(backend_file);
  prasi.server = module.server;

  prasi.ext = {};

  if (!prasi.server) {
    prasi.server = {
      async http(arg) {
        return new Response("server.ts do not have http handler", {
          status: 503,
        });
      },
    };
  }

  prasi.handler = {
    ...prasi.handler,
    http: await createHttpHandler(prasi, mode === "ipc" ? "dev" : "prod"),
    ws: createWsHandler(),
  };

  const server_instance = server(prasi.server);
  console.log(
    `${c.magenta}[SITE]${c.esc} ${c.green}${c.underline}${
      site_id || `http://localhost:${server_instance.port}`
    }${c.esc} ${action === "reload" ? "Reloaded" : "Started"}.`
  );
  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }
  return prasi;
};
