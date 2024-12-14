import { fs } from "utils/fs";
import { g } from "utils/global";
import { spawn } from "utils/spawn";

export const startServer = (is_dev: boolean) => {
  g.server = spawn({
    cmd: is_dev ? "bun run --watch server.js" : "bun run server.js",
    cwd: fs.path("site:app"),
    mode: "passthrough",
  });
};
