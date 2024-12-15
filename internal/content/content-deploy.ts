import { g } from "utils/global";
import { ensureDeployExists } from "./deploy/ensure";
import type { PrasiContent } from "./types";

export const prasi_content_deploy: PrasiContent = {
  async prepare(site_id) {
    await ensureDeployExists(site_id);
  },
  async comps(comp_ids) {
    return [];
  },
  async file(url, options) {
    return { body: "", compression: "none" };
  },
  async layouts() {
    return [];
  },
  async page_urls() {
    return {};
  },
  async pages(page_ids) {
    return [];
  },
};
