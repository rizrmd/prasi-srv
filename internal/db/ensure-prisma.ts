import { dirAsync, removeAsync } from "fs-jetpack";
import { c } from "utils/color";
import type { SiteConfig } from "utils/deploy-config";
import { fs } from "utils/fs";
import { dbLog } from "utils/log";

export const ensurePrismaReady = async (config: SiteConfig["db"]) => {
  if (config.orm !== "prisma") {
    dbLog("Warning: Current DB ORM is not prisma, but forced to use prisma");
    return;
  }
  const $ = Bun.$;

  const db = config;
  if (db.orm === "prisma") {
    const cwd = fs.path(`site:app/db`);

    const url = new URL(db.url);
    const host = `[${c.blue}${url.hostname}${c.esc}]`;
    const db_type = `[${c.red}${url.protocol.slice(0, -1).toUpperCase()}${
      c.esc
    }]`;

    if (!fs.exists("site:app/db")) {
      dbLog(`Preparing PrismaDB ${db_type} on ${host} ${url.pathname}`);
      await removeAsync(cwd);
      await dirAsync(cwd);

      await $`bun init .`.cwd(cwd).quiet();
      await $`bun add prisma`.cwd(cwd).quiet();
      await $`bun prisma init`.cwd(cwd).quiet();

      dbLog(`PrismaDB created at ${cwd}`);
      fs.write(`site:app/db/.env`, `DATABASE_URL=${db.url}`);

      await $`bun prisma db pull`.cwd(cwd).quiet();
      dbLog(`PrismaDB instrospected (db pull)`);

      await $`bun prisma generate`.cwd(cwd).quiet();
      dbLog(`PrismaDB ready`);

      await fs.write(
        `site:app/db/index.ts`,
        `\
import { PrismaClient } from "@prisma/client/extension";
export const db = new PrismaClient();
`
      );
    } else {
      await $`bun prisma generate`.cwd(cwd).quiet();
      dbLog(`PrismaDB Ready: ${db_type} on ${host} ${url.pathname}`);
    }
  }
};
