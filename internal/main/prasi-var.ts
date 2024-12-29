import type { WebSocketHandler } from "bun";
import type { BunSqliteKeyValue } from "bun-sqlite-key-value";
import type { Database } from "bun:sqlite";
import type { initializeApp } from "firebase-admin";
import type { PrasiServer } from "typings/server";
import { type SiteConfig } from "utils/config";
import type { StaticFile } from "utils/static";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}
export type PrasiContent = {
    pages: (ids: string[]) => Promise<Record<string, any>>;
    page_url: (pathname: string) => string;
  }

export const prasi = (globalThis as any).prasi as unknown as {
  static_cache: any;
  site_id: string;
  static: {
    frontend: StaticFile;
    public: StaticFile;
    nova: string;
  };
  mode: "vm" | "server";
  dev?: boolean;
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
    http: (req: Request) => Promise<Response>;
    ws: WebSocketHandler<{ url: URL }>;
  };
  content: PrasiContent;
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
