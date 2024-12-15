import { fs } from "utils/fs";
import { g } from "utils/global";
import { spawn } from "utils/spawn";
import { prasi_content_ipc } from "../content/content-ipc";
import { startServerWithIPC } from "./server-mode-ipc";

export const startServer = (is_dev: boolean, site_id: string) => {
  if (g.server.mode === "deploy") {
    g.server.process = spawn({
      cmd: is_dev ? "bun run --watch server.js" : "bun run server.js",
      cwd: fs.path("site:app"),
      mode: "passthrough",
    });
  } else {
    g.server.bun_server = startServerWithIPC();
    prasi_content_ipc.prepare(site_id);
  }
};
