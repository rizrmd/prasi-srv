import type { WebSocketHandler } from "bun";
import type { BunSqliteKeyValue } from "bun-sqlite-key-value";
import type { App } from "firebase-admin/app";
import type { PrasiServer } from "typings/server";
import { type SiteConfig } from "utils/config";
import type { StaticFile } from "utils/static";
import type { Database } from "bun:sqlite";
import type { initializeApp } from "firebase-admin";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}

export const prasi = (globalThis as any).prasi as unknown as {
  static_cache: any;
  static: StaticFile;
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
