import { join, resolve } from "path";
import { fs } from "./fs";
import type { SiteConfig } from "./config";
import type { spawn } from "./spawn";
import type { Server } from "bun";

if (!(globalThis as any).prasi) {
  (globalThis as any).prasi = {};
}

export const g = (globalThis as any).prasi as unknown as {
  dir: { root: string };
  mode: "supervisor" | "site";
  server:
    | { mode: "deploy"; process: ReturnType<typeof spawn> }
    | { mode: "ipc"; bun_server: Server };
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

export const startup = (mode: "supervisor" | "site", fn: () => void) => {
  g.dir = { root: "" };
  g.mode = mode;
  g.server.mode = process.argv.includes("--ipc") ? "ipc" : "deploy";

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
