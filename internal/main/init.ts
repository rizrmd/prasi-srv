import { prasi } from "./prasi-var";

export const init = async ({
  root_dir,
  script_path,
  port,
}: {
  root_dir: string;
  script_path: string;
  port: number;
}) => {
  prasi.dir.root = root_dir;

  delete require.cache[script_path];
  prasi.server = require(script_path).server;

  if (prasi.server?.init && port) {
    await prasi.server.init({ port });
  }
};
