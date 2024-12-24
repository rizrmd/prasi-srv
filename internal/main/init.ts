import type { Server } from "bun";
import { dirname, join } from "path";
import type { PrasiServer } from "typings/server";
import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi } from "./prasi-var";
import { staticFile } from "utils/static";
export const init = async ({
  root_dir,
  server,
  mode,
  prasi: init_prasi,
}: {
  root_dir: string;
  prasi: {
    frontend: { index: string; internal: string; typings: string };
    backend: { index: string };
    log_path: {
      frontend: string;
      backend: string;
      typings: string;
      tailwind: string;
    };
  };
  server: (server: PrasiServer) => Server;
  mode: "vm" | "server";
}) => {
  prasi.dir = { root: root_dir };

  const script_path = `${root_dir}/${init_prasi.backend.index.replace(
    ".ts",
    ".js"
  )}`;

  const base_dir = dirname(join(root_dir, init_prasi.frontend.index));
  prasi.static = await staticFile(base_dir);

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

  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }

  prasi.handler = {
    http: createHttpHandler(server_instance, mode === "vm" ? "dev" : "prod"),
    ws: createWsHandler(),
  };
};
