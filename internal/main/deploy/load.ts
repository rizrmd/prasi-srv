import { gunzipSync } from "bun";
import { removeAsync } from "fs-jetpack";
import get from "lodash.get";
import { decode } from "msgpackr";
import { config } from "utils/deploy-config";
import { fs } from "utils/fs";
import { prasi } from "../prasi-var";

export const loadCurrentDeploy = async (ts: number) => {
  if (fs.exists(`site:deploy/current/${ts}.gz`)) {
    await removeAsync(fs.path(`site:deploy/current/files`));

    const content = decode(
      gunzipSync(
        new Uint8Array(
          await Bun.file(fs.path(`site:deploy/current/${ts}.gz`)).arrayBuffer()
        )
      )
    );

    prasi.deployed = {
      layouts: content.layouts,
      pages: content.pages,
      comps: content.comps,
      db: config.current?.db,
      info: content.site,
    };

    for (const key of ["public", "code.server", "code.site", "code.core"]) {
      const files = get(content, key);
      if (files) {
        for (const [path, raw_content] of Object.entries(files)) {
          const prefix = key.split(".").pop() || "";
          await fs.write(
            `site:deploy/current/files/${prefix ? `${prefix}/` : ""}${path}`,
            raw_content,
            {
              mode: "raw",
            }
          );
        }
      }
    }
  }
};
