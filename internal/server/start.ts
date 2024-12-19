import { fs } from "utils/fs";
import { g } from "utils/global";
import { spawn } from "utils/spawn";

export const startServer = (arg: { site_id: string; mode: "dev" | "prod" }) => {
  if (g.mode === "supervisor") {
    g.supervisor = {
      process: spawn({
        cmd:
          arg.mode === "dev"
            ? "bun run --watch server.js"
            : "bun run server.js",
        cwd: fs.path("site:app"),
        mode: "passthrough",
      }),
    };
  } else {
    import("./server");
  }
};
