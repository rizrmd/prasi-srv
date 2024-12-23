import { config } from "utils/config";
import { g, startup } from "utils/global";
import type { ServerCtx } from "utils/server-ctx";
import { prasiContent } from "../content/content";
import { prasi_content_deploy } from "../content/content-deploy";
import { prasi_content_ipc } from "../content/content-ipc";
import { fs } from "utils/fs";

startup("site", async () => {
  await config.init("site:site.json");
  fs.init(config.current!);

  if (g.mode === "site") {
    g.prasi = g.ipc ? prasi_content_ipc : prasi_content_deploy;

    const prasi = g.prasi;
    await prasi.init();
    await startSiteServer();
    await prasi.started();
  }
});

const startSiteServer = async () => {
  if (g.mode === "site") {
    let port = 0;
    if (g.ipc) {
      try {
        const runtime = (await fs.read("site:runtime.json", "json")) as {
          port: number;
        };
        port = runtime.port;
      } catch (e) {}
    } else {
      port = config.current?.port || 3000;
    }

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

          const routed = await content.route(ctx);
          if (routed) {
            return routed;
          }

          return new Response("Not Found", { status: 404 });
        }
      },
      websocket: { message(ws, message) {} },
      port,
      reusePort: true,
    });

    if (g.ipc && g.server.port) {
      await g.ipc.backend?.server?.init?.({ port: g.server.port });
      await fs.write("site:runtime.json", { port: g.server.port });
    }
  }
};
