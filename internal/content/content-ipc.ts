import { g } from "utils/global";
import type { PrasiContent } from "./types";
import { ipcSend } from "./ipc/send";
import { staticFile } from "utils/static";

export const prasi_content_ipc: PrasiContent = {
  prepare(site_id) {},
  init() {
    return new Promise<void>((done) => {
      if (g.mode === "site" && g.ipc) {
        ipcSend({ type: "init" });
        if (g.server) {
          console.log("restarting...");
          process.exit();
        } else {
          process.on(
            "message",
            async (msg: { type: "start"; path: { asset: string } }) => {
              if (g.mode === "site" && g.ipc) {
                if (msg.type === "start") {
                  g.ipc.asset = await staticFile(msg.path.asset);
                  done();
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
  async staticFile(ctx) {
    const asset = g.mode === "site" && g.ipc?.asset!;
    if (asset) {
      const response = asset.serve(ctx);
      if (response) {
        return response;
      }
    }
  },
  async route(ctx) {},
};
