import { config } from "utils/config";
import { startup } from "utils/global";

startup("site", async () => {
  await config.init("site:site.json");
  const ts = config.current?.deploy.current;
  if (ts) {
  }
});
