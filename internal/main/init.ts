import { createHttpHandler } from "./handler/http-handler";
import { createWsHandler } from "./handler/ws-handler";
import { prasi } from "./prasi-var";

export const init = async ({
  root_dir,
  script_path,
  port,
}: {
  root_dir: string;
  script_path: string;
  port: number;
  mode: "vm" | "server";
}) => {
  prasi.dir.root = root_dir;

  delete require.cache[script_path];
  prasi.server = require(script_path).server;

  if (prasi.server?.init && port) {
    await prasi.server.init({ port });
  }

  prasi.handler.http = createHttpHandler();
  prasi.handler.ws = createWsHandler();
};

prasi;
