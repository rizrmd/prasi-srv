import type { PrasiContent } from "./types";

export const prasi_content_ipc: PrasiContent = {
  prepare(site_id) {
    console.log("mantap jiwa");
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
