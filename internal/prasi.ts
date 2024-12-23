import type { PrasiServer } from "typings/server";
import { type SiteConfig } from "./utils/config";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}

export const prasi = (globalThis as any).prasi as unknown as {
  dir: { root: string };
  static_cache: any;
  server?: PrasiServer;
  site?: {
    db?: SiteConfig["db"];
    layouts: {
      id: string;
      name: string;
      url: string;
      content_tree: any;
      is_default_layout: boolean;
    }[];
    pages: {
      id: string;
      name: string;
      url: string;
      content_tree: any;
    }[];
    comps: {
      id: string;
      content_tree: any;
    }[];
    info: {
      id: string;
      name: string;
      config?: {
        api_url: string;
      };
      responsive: string;
      domain: string;
    };
  };
};
