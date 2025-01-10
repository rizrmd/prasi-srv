import type { SiteConfig } from "utils/deploy-config";
import { ensurePrismaReady } from "./ensure-prisma";
import { fs } from "utils/fs";

export const initDB = async (db: SiteConfig["db"]) => {
  if (db.orm === "prisma") {
    if (db.url) {
      try {
        await ensurePrismaReady(db);

        const g = globalThis as any;
        const prisma_path = fs.path(
          "site:app/db/node_modules/.prisma/client/index.js"
        );
        const prisma = require(prisma_path);
        g.db = new prisma.PrismaClient();
      } catch (e: any) {
        if (e && e.stderr instanceof Buffer) {
          console.error(new TextDecoder().decode(e.stderr));
        } else {
          console.error(e);
        }
      }
    }
  }
};
