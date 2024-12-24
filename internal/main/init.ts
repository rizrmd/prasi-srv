import type { Server } from "bun";
import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi } from "./prasi-var";
import type { PrasiServer } from "typings/server";

export const init = async ({
  root_dir,
  script_path,
  server,
  mode,
}: {
  root_dir: string;
  script_path: string;
  server: (server: PrasiServer) => Server;
  mode: "vm" | "server";
}) => {
  prasi.dir.root = root_dir;

  delete require.cache[script_path];
  prasi.server = require(script_path).server;

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

  prasi.handler.http = createHttpHandler(
    server_instance,
    mode === "vm" ? "dev" : "prod"
  );
  prasi.handler.ws = createWsHandler();
};

prasi;
