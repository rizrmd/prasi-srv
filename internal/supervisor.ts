import { c } from "utils/color";
import { config } from "utils/config";
import { fs } from "utils/fs";
import { g, startup } from "utils/global";
import { siteLog } from "utils/log";
import { prasi_content_deploy } from "./content/content-deploy";
import { ensureDBReady } from "./db/ensure";
import { ensureServerReady } from "./server/ensure";
import { startServer } from "./server/start";

const is_dev = process.argv.includes("--dev");
const is_ipc = process.argv.includes("--ipc");
startup("supervisor", async () => {
  console.log(`${c.green}Prasi Server:${c.esc} ${fs.path("site:")}`);
  await config.init("site:site.json");

  if (!is_ipc) {
    const site_id = config.get("site_id") as string;
    await prasi_content_deploy.prepare(site_id);

    if (!site_id) {
      siteLog("No Site Loaded");
    } else {
      siteLog(`Site ID: ${site_id}`);
    }
    await ensureDBReady();
  } else {
    g.mode = "site";
    if (g.mode === "site") g.ipc = true;
  }

  await ensureServerReady(is_dev);

  startServer({
    mode: is_dev ? "dev" : "prod",
  });
});
