import { join } from "path";
import { g } from "utils/global";
import { staticFile } from "utils/static";
import { ipcSend } from "./ipc/send";
import type { PrasiContent } from "./types";
import { rewriteResponse } from "utils/rewrite-response";
export const prasi_content_ipc: PrasiContent = {
  prepare(site_id) {},
  init() {
    return new Promise<void>((done) => {
      if (g.mode === "site" && g.ipc) {
        if (g.server) {
          console.log("restarting...");
          process.exit();
        } else {
          ipcSend({ type: "init" });
          process.on(
            "message",
            async (
              msg:
                | { type: "start"; path: { backend: string; frontend: string } }
                | { type: "reload-backend" }
                | { type: "reload-frontend" }
            ) => {
              if (g.mode === "site" && g.ipc) {
                if (msg.type === "start") {
                  g.ipc.frontend = await staticFile(msg.path.frontend);
                  g.ipc.backend_path = join(msg.path.backend, "server.js");
                  delete require.cache[g.ipc.backend_path];
                  g.ipc.backend = require(g.ipc.backend_path);
                  done();
                } else if (msg.type === "reload-frontend") {
                  if (g.ipc.frontend) {
                    g.ipc.frontend.rescan({ immediately: true });
                  }
                } else if (msg.type === "reload-backend") {
                  if (g.ipc.backend_path) {
                    delete require.cache[g.ipc.backend_path];
                    g.ipc.backend = require(g.ipc.backend_path);
                  }
                }
              }
            }
          );
        }
      }
    });
  },
  async started() {
    if (g.mode === "site" && g.server) {
      ipcSend({ type: "ready", port: g.server.port });
    }
  },
  async route(ctx) {
    if (g.mode === "site" && g.ipc) {
      const server = g.ipc.backend?.server;
      if (server) {
        return server.http({
          url: ctx.url,
          req: ctx.req,
          server: ctx.server,
          mode: "prod",
          async handle(req, opt) {
            const asset = g.mode === "site" && g.ipc?.frontend!;

            if (asset) {
              const route = asset.exists(ctx.url.pathname);
              if (route) {
                return rewriteResponse(Bun.file(route.data.fullpath), {
                  headers: {
                    "content-type": route.data.mime,
                  },
                  opt,
                });
              }
            }

            return new Response("handle", {
              status: 404,
            });
          },
          index: { body: [], head: [], render: () => "" },
          prasi: {},
        });
      }
    }
  },
};
