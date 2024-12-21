import { fs } from "utils/fs";
import { g } from "utils/global";
import { siteLog } from "utils/log";
import { spawn } from "utils/spawn";

export const startServer = (arg: { mode: "dev" | "prod" }) => {
  if (g.mode === "supervisor") {
    if (fs.exists("site:app/server.js")) {
      g.supervisor = {
        process: spawn({
          cmd:
            arg.mode === "dev"
              ? "bun run --watch --no-clear-screen server.js"
              : "bun run server.js",
          cwd: fs.path("site:app"),
          mode: "passthrough",
        }),
      }; 
    } else {
      siteLog("No server.js found in site/app directory");
    }
  } else {
    import("./server");
  }
};
