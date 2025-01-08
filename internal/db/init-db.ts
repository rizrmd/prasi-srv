import type { SiteConfig } from "utils/deploy-config";
import { ensurePrismaReady } from "./ensure-prisma";

export const initDB = async (db: SiteConfig["db"]) => {
  if (db.orm === "prisma") {
    if (db.url) {
      await ensurePrismaReady(db);
    }
  }
};
