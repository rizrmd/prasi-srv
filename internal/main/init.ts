import type { Server } from "bun";
import { Script } from "node:vm";
import { dirname, join } from "path";
import type { PrasiServer } from "typings/server";
import { c } from "utils/color";
import { initConfig } from "utils/config";
import { fs } from "utils/fs";
import { staticFile } from "utils/static";
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
}: {
  site_id: string;
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
        build: string;
        upload: string;
        public: string;
      };
    };
  };
  server: (server: PrasiServer) => Server;
  mode: "vm" | "server";
  action?: "reload" | "start";
  dev?: boolean;
  content: PrasiContent;
}) => {
  prasi.mode = mode;
  prasi.content = content;

  const build_dir = init_prasi.paths.dir.build;

  if (!build_dir) {
    console.error(`dir.build is empty, please check prasi.json!`);
    return;
  }

  const backend_path = join(
    build_dir,
    init_prasi.paths.server.replace(".ts", ".js")
  );
  const frontend_dir = dirname(join(build_dir, init_prasi.paths.index));

  fs.init({
    site: init_prasi.paths.dir.site,
    upload: init_prasi.paths.dir.upload,
    public: init_prasi.paths.dir.public,
  });

  if (mode === "server") {
    await initConfig();
  }

  const { route_api: api_route } = await import("./handler/route-api");
  await api_route.init();

  prasi.static = {
    frontend: await staticFile(frontend_dir),
    public: await staticFile(init_prasi.paths.dir.public),
    nova: init_prasi.paths.dir.nova,
  };
  prasi.site_id = site_id;
  prasi.dev = dev;

  if (mode === "vm") {
    const src = await Bun.file(backend_path).text();
    const script = new Script(src, { filename: backend_path });
    const ctx = {
      module: { exports: { server: null as any } },
      prasi_global: prasi,
    };

    const cjs = script.runInThisContext();
    cjs(ctx.module.exports, require, ctx.module);
    prasi.server = ctx.module.exports.server;
  } else {
    delete require.cache[backend_path];
    const module = require(backend_path);
    prasi.server = module.server;
  }

  process.chdir(
    join(init_prasi.paths.dir.build, dirname(init_prasi.paths.server))
  );

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
    http: await createHttpHandler(prasi, mode === "vm" ? "dev" : "prod"),
    ws: createWsHandler(),
  };
};
