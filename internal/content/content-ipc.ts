import { g } from "utils/global";
import type { PrasiContent } from "./types";

export const prasi_content_ipc: PrasiContent = {
  prepare(site_id) {
    console.log("mantap jiwa");
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
