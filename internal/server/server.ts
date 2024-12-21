import { config } from "utils/config";
import { g, startup } from "utils/global";
import type { ServerCtx } from "utils/server-ctx";
import { prasiContent } from "../content/content";
import { prasi_content_deploy } from "../content/content-deploy";
import { prasi_content_ipc } from "../content/content-ipc";

startup("site", async () => {
  await config.init("site:site.json");
  if (g.mode === "site") {
    g.content = g.ipc ? prasi_content_ipc : prasi_content_deploy;

    const content = g.content;
    await content.init();
    startGlobalServer();
  }
});

const startGlobalServer = async () => {
  if (g.mode === "site") {
    g.server = Bun.serve({
      async fetch(req, server) {
        const content = prasiContent();
        if (content) {
          const url = new URL(req.url);
          const pathname = req.url.split(url.host).pop() || "";
          const ctx: ServerCtx = {
            server,
            req: req,
            url: { pathname, raw: url },
          };

          const response = await content.staticFile(ctx);
          if (response) {
            return response;
          }

          const routed = await content.route(ctx);
          if (routed) {
            return routed;
          }

          return new Response("Not Found", { status: 404 });
        }
      },
      websocket: { message(ws, message) {} },
      port: 0,
    });
  }
};
