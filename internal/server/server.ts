import { config } from "utils/config";
import { g, startup } from "utils/global";

startup("site", async () => {
  await config.init("site:site.json");
  const ts = config.current?.deploy.current;
  if (ts) {
    // g.server = process.argv.includes("--ipc") ? "ipc" : "gz";
  }
});
