import { init } from "main/init";
import { prasi } from "main/prasi-var";
import { join } from "path";
import { initBuild } from "./build/init";
import { existsSync, readdirSync } from "fs";

let db = null as any;
const env_file = join(process.cwd(), "backend", ".env");
if (existsSync(env_file)) {
  const env_content = require("fs").readFileSync(env_file, "utf-8");
  if (env_content.includes("DATABASE_URL=")) {
    const prisma_path = join(
      process.cwd(),
      "node_modules/.prisma/client/index.js"
    );

    const { PrismaClient } = require(prisma_path);
    db = new PrismaClient();
  }
}

initBuild();

const cwd = process.cwd();

let head: string[] = [];
const dist_frontend = join(cwd, "dist/frontend");
if (existsSync(dist_frontend)) {
  const files = readdirSync(dist_frontend);
  const css_file = files.find(
    (e) => e.startsWith("index") && e.endsWith(".css")
  );
  if (css_file) {
    head = [`<link href="/${css_file}" rel="stylesheet" />`];
  }
}

await init({
  mode: "server",
  db,
  index_html: {
    exclude_default_css: true,
    head,
    root_wrap: "clean",
  },
  prasi: {
    version: 5,
    paths: {
      index: "index.tsx",
      server: "server.ts",
      internal: "internal.tsx",
      typings: "",
      dir: {
        backend: join(cwd, "backend"),
        frontend: join(cwd, "dist/frontend"),
        nova: join(cwd, "system/nova"),
        public: join(cwd, "frontend/public"),
        site: "",
        upload: join(cwd, "upload"),
      },
    },
  },
  server: () => {
    return Bun.serve({
      websocket: prasi.handler.ws,
      fetch: async (req) => {
        return await prasi.handler.http(req);
      },
      port: 3000,
    });
  },
  content: {
    async all_routes() {
      return {
        layout: {
          id: "default",
          root: {
            id: "root",
            name: "root",
            url: "/",
            content_tree: {},
          },
        },
        site: { id: "default", api_url: "" },
        urls: [],
        not_found_eval: "return window.prasi_root",
      };
    },
    route(pathname) {
      return {
        params: {},
        data: {
          page_id: "default",
        },
      };
    },
    async pages(ids) {
      return [
        {
          id: "default",
          url: "",
          root: `return window.prasi_root`,
        },
      ];
    },
  },
});
