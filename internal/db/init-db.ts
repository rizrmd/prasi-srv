import type { SiteConfig } from "utils/deploy-config";
import { ensurePrismaReady } from "./ensure-prisma";

export const initDB = async (db: SiteConfig["db"]) => {
  if (db.orm === "prisma") {
    if (db.url) {
      try {
        await ensurePrismaReady(db);
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
