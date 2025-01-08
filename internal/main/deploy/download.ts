import { config } from "utils/deploy-config";
import { downloadFile } from "utils/download";
import { fs } from "utils/fs";
import { siteLog } from "utils/log";

export const downloadDeployedSite = async (site_id: string) => {
  if (!site_id) {
    siteLog(`No site_id defined in site/site.json`);
    return 0;
  }

  let base_url = "https://prasi.avolut.com";
  const ts = Date.now();
  siteLog(`Downloading site [${site_id}] deploy: `);
  await downloadFile(
    `${base_url}/prod-zip/${site_id}?ts=${ts}&msgpack=1`,
    fs.path(`site:deploy/history/${ts}.gz`),
    (rec, total) => {
      if (rec % 10 === 0) process.stdout.write(".");
    }
  );
  config.set("deploy.current", ts);
  config.set("deploy.history", [...(config.current?.deploy.history || []), ts]);
  await fs.copy(`site:deploy/history/${ts}.gz`, `site:deploy/current/${ts}.gz`);
  return ts;
};
