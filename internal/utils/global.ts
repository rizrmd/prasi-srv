import type { Server } from "bun";
import { join, resolve } from "path";
import type { SiteConfig } from "./config";
import { fs } from "./fs";
import type { PrasiSpawn, spawn } from "./spawn";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}

export const g = (globalThis as any).prasi as unknown as {
  dir: { root: string };
} & (
  | {
      mode: "site";
      server: Server;
      ipc: boolean;
      site: {
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
    }
  | {
      mode: "supervisor";
      supervisor: { process: PrasiSpawn };
    }
);

export const startup = (mode: "supervisor" | "site", fn: () => void) => {
  g.dir = { root: "" };
  g.mode = mode;

  if (mode === "supervisor") {
    const argv = process.argv.filter((e) => !e.startsWith("--"));
    if (argv.length > 2) {
      g.dir.root = resolve(argv[2]);
    } else {
      g.dir.root = process.cwd();
    }
  } else {
    g.dir.root = join(process.cwd(), "..", "..");
  }
  fs.init();

  fn();
};
