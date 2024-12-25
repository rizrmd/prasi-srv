import type { Server } from "bun";
import { join } from "path";
import type { PrasiServer } from "typings/server";
import { c } from "utils/color";
import { initConfig } from "utils/config";
import { fs } from "utils/fs";
import { staticFile } from "utils/static";
import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi } from "./prasi-var";
export const init = async ({
  site_id,
  server,
  mode,
  prasi: init_prasi,
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
        site: string;
        script: string;
        upload: string;
        public: string;
      };
    };
  };
  server: (server: PrasiServer) => Server;
  mode: "vm" | "server";
}) => {
  const script_dir = init_prasi.paths.dir.script;
  const script_path = join(script_dir, "index.js");

  fs.init({
    site: init_prasi.paths.dir.site,
    upload: init_prasi.paths.dir.upload,
    public: init_prasi.paths.dir.public,
  });
  await initConfig();

  prasi.static = await staticFile(script_dir);

  delete require.cache[script_path];
  const module = require(script_path);

  prasi.server = module.server;

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
  console.log(JSON.stringify(init_prasi, null, 2), script_dir);

  console.log(`${c.magenta}[SITE]${c.esc} ${site_id} Backend Started.`);

  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }

  prasi.handler = {
    http: createHttpHandler(server_instance, mode === "vm" ? "dev" : "prod"),
    ws: createWsHandler(),
  };
};
