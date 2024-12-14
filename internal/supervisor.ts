import { c } from "utils/color";
import { config } from "utils/config";
import { fs } from "utils/fs";
import { startup } from "utils/global";
import { siteLog } from "utils/log";
import { ensureDBReady } from "./db/ensure";
import { ensureDeployExists } from "./deploy/ensure";
import { ensureServerReady } from "./server/ensure";
import { startServer } from "./server/start";

const is_dev = process.argv.includes("--dev");
startup("supervisor", async () => {
  console.log(`${c.green}Prasi Server:${c.esc} ${fs.path("site:")}`);
  await config.init("site:site.json");

  const site_id = config.get("site_id") as string;
  if (!site_id) {
    siteLog("No Site Loaded");
  } else {
    siteLog(`Site ID: ${site_id}`);
    await ensureDeployExists(site_id);
    await ensureServerReady(is_dev);
    await ensureDBReady();

    startServer(is_dev);
  }
});
