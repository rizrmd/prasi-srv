import { g } from "utils/global";
import { ensureDeployExists } from "./deploy/ensure";
import type { PrasiContent } from "./types";

export const prasi_content_deploy: PrasiContent = {
  async prepare(site_id) {
    await ensureDeployExists(site_id);
  },
  async staticFile(ctx) {},
  async route(ctx) {},
};
