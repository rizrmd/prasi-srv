import { config } from "utils/config";
import { fs } from "utils/fs";
import { downloadDeployedSite } from "./download";

export const ensureDeployExists = async (site_id: string) => {
  if (!site_id) return 0;
  let download_deploy = false;
  const ts = config.current?.deploy.current;
  if (!ts) {
    download_deploy = true;
  } else if (!fs.exists(`site:deploy/current/${ts}.gz`)) {
    if (fs.exists(`site:deploy/history/${ts}.gz`)) {
      await fs.copy(
        `site:deploy/history/${ts}.gz`,
        `site:deploy/current/${ts}.gz`
      );
    } else {
      download_deploy = true;
    }
  }

  if (download_deploy) {
    const ts = await downloadDeployedSite(site_id);
    process.stdout.write("\n");
    return ts;
  }
  return ts as number;
};
