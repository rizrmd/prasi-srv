import { c } from "utils/color";
import { config } from "utils/config";
import { g, startup } from "utils/global";
import { siteLog } from "utils/log";
import { loadCurrentDeploy } from "../deploy/load";

startup("site", async () => {
  await config.init("site:site.json");
  const ts = config.current?.deploy.current;
  if (ts) {
    await loadCurrentDeploy(ts);
    siteLog(
      `Site Loaded [${c.green}${g.site.pages.length} pages${c.esc}] [${c.blue}${g.site.comps.length} components${c.esc}]`
    );
  }
});
