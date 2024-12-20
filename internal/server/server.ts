import { config } from "utils/config";
import { g, startup } from "utils/global";
import { prasi_content_ipc } from "../content/content-ipc";
import { prasi_content_deploy } from "../content/content-deploy";
import { loadCurrentDeploy } from "../content/deploy/load";

startup("site", async () => {
  await config.init("site:site.json");
  if (g.mode === "site") {
    g.content = g.ipc ? prasi_content_ipc : prasi_content_deploy;

    if (g.ipc) {
    } else {
      const ts = config.current?.deploy.current;
      if (ts) {
        await loadCurrentDeploy(ts);
      }
    }

    g.server = Bun.serve({
      fetch(request, server) {},
      websocket: { message(ws, message) {} },
    });

    if (g.ipc) {
    }
  }
});
