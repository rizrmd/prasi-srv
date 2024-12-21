import { g } from "utils/global";
import { ensureDeployExists } from "./deploy/ensure";
import type { PrasiContent } from "./types";
import { config } from "utils/config";
import { loadCurrentDeploy } from "./deploy/load";

export const prasi_content_deploy: PrasiContent = {
  async prepare(site_id) {
    await ensureDeployExists(site_id);
  },
  async init() {
    const ts = config.current?.deploy.current;
    if (ts) {
      await loadCurrentDeploy(ts);
    }
  },
  async started() {},
  async staticFile(ctx) {},
  async route(ctx) {},
};
