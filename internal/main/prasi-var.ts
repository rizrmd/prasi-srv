import type { WebSocketHandler } from "bun";
import type { PrasiServer } from "typings/server";
import { type SiteConfig } from "utils/config";
import type { StaticFile } from "utils/static";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}

export const prasi = (globalThis as any).prasi as unknown as {
  dir: { root: string };
  static_cache: any;
  static: StaticFile,
  server?: PrasiServer;
  handler: {
    http: (req: Request) => Promise<Response>;
    ws: WebSocketHandler<{ url: URL }>;
  };
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
