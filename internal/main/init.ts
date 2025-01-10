import type { Server } from "bun";
import type { PrasiServer } from "typings/server";
import { c } from "utils/color";
import { type SiteConfig } from "utils/deploy-config";
import { fs } from "utils/fs";
import { staticFile } from "utils/static";
import { initDB } from "../db/init-db";
import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi, type PrasiContent } from "./prasi-var";

export const init = async ({
  site_id,
  server,
  mode,
  prasi: init_prasi,
  action,
  content,
  dev,
  db,
}: {
  site_id: string;
  db: SiteConfig["db"];
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
  content: PrasiContent;
}) => {
  prasi.mode = mode;
  prasi.content = content;

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

  const { route_api: api_route } = await import("./handler/route-api");
  await api_route.init();

  prasi.static = {
    frontend: await staticFile(frontend_dir),
    public: await staticFile(init_prasi.paths.dir.public),
    nova: init_prasi.paths.dir.nova,
  };
  prasi.site_id = site_id;
  prasi.dev = dev; 

  if (mode === "ipc") {
    if (action === "init") return;

    // const vm_path = join(
    //   backend_path,
    //   basename(init_prasi.paths.server).replace(".ts", ".js")
    // );
    // const src = await Bun.file(vm_path).text();
    // const glb = global as any;

    // const script = new Script(src, { filename: vm_path });
    // const module = { exports: { server: null as any } };

    // const cjs = script.runInContext(glb);
    // cjs(exports, require, module);
    // prasi.server = module.exports.server;
  } else {
    delete require.cache[backend_path];
    const module = require(backend_path);
    prasi.server = module.server;
  }

  process.chdir(backend_path);

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

  const server_instance = server(prasi.server);
  console.log(
    `${c.magenta}[SITE]${c.esc} ${site_id} ${
      action === "reload" ? "Reloaded" : "Started"
    }.`
  );

  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }

  prasi.handler = {
    http: await createHttpHandler(prasi, mode === "ipc" ? "dev" : "prod"),
    ws: createWsHandler(),
  };
};
