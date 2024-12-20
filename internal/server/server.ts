import { config } from "utils/config";
import { g, startup } from "utils/global";
import { prasi_content_ipc } from "../content/content-ipc";
import { prasi_content_deploy } from "../content/content-deploy";
import { loadCurrentDeploy } from "../content/deploy/load";
import { ipcSend } from "../content/ipc/send";

startup("site", async () => {
  await config.init("site:site.json");
  if (g.mode === "site") {
    g.content = g.ipc ? prasi_content_ipc : prasi_content_deploy;

    if (g.ipc) {
      ipcSend({ type: "init" });
      process.on("message", (msg: { type: "start" }) => {
        if (g.mode === "site") {
          if (msg.type === "start") {
            g.server = Bun.serve({
              fetch(request, server) {},
              websocket: { message(ws, message) {} },
              port: 0,
            });
            ipcSend({ type: "ready", port: g.server.port });
          }
        }
      });
    } else {
      const ts = config.current?.deploy.current;
      if (ts) {
        await loadCurrentDeploy(ts);
      }

      g.server = Bun.serve({
        fetch(request, server) {},
        websocket: { message(ws, message) {} },
      });
    }
  }
});
