import type { WebSocketHandler } from "bun";
import type { BunSqliteKeyValue } from "bun-sqlite-key-value";
import type { Database } from "bun:sqlite";
import type { initializeApp } from "firebase-admin";
import type { RouterContext } from "rou3";
import type { IPage } from "typings/content";
import type { PrasiServer } from "typings/server";
import { type SiteConfig } from "utils/deploy-config";
import type { StaticFile } from "utils/static";
import type { standalone_api } from "./handler/api-standalone";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}
export type PrasiContent = {
  pages: (ids: string[]) => Promise<Record<string, any>>;
  comps: (ids: string[]) => Promise<Record<string, any>>;
  route: (
    pathname: string
  ) => undefined | { params: Record<string, any>; data: { page_id: string } };
  all_routes: () => Promise<{
    site: { id: string; api_url: string };
    urls: { id: string; url: string }[];
    layout: { id: string; root: IPage };
  }>;
};

export type PrasiGlobal = typeof prasi;

export const prasi = (globalThis as any).prasi as unknown as {
  static_cache: any;
  site_id: string;
  static: {
    frontend: StaticFile;
    public: StaticFile;
    nova: string;
  };
  build_id: number;
  mode: "ipc" | "server";
  dev?: boolean;
  index_html?: {
    exclude_default_css?: boolean;
    head?: string[];
    cached?: boolean;
    root_wrap: "prasi" | "clean";
  };
  ext: {
    kv?: BunSqliteKeyValue;
    firebase?: {
      init: boolean;
      app: ReturnType<typeof initializeApp> | null;
    };
    notif?: {
      db: Database;
    };
  };
  server?: PrasiServer;
  handler: {
    api?: typeof standalone_api;
    http: (req: Request) => Promise<Response>;
    ws: WebSocketHandler<{ url: URL }>;
  };
  content?: Partial<PrasiContent>;
  deployed?: {
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
