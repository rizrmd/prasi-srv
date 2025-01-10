import { init } from "main/init";
import { prasi } from "main/prasi-var";
import { join } from "path";
import { initBuild } from "./build/init";
import { existsSync } from "fs";

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

await init({
  mode: "server",
  db,
  prasi: {
    version: 5,
    paths: {
      index: "index.tsx",
      server: "server.ts",
      internal: "internal.tsx",
      typings: "",
      dir: {
        backend: "backend",
        frontend: "frontend",
        nova: "",
        public: "public",
        site: "",
        upload: "upload",
      },
    },
  },
  server: () => {
    console.clear();
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
        urls: [{ id: "default", url: "/" }],
      };
    },
    route(pathname) {
      return {
        params: {},
        data: {
          page_id: "default"
        }
      }
    },
  },
});
