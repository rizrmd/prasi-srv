import { dirAsync } from "fs-jetpack";
import { fs } from "./fs";
import get from "lodash.get";
import set from "lodash.set";
import { readdirSync } from "fs";

export const config = {
  async init(path: string) {
    if (!fs.exists(path)) {
      await fs.write(path, default_config);
    }

    const result = await fs.read(path, "json");
    if (!this.current) {
      this.current = result as typeof default_config;
    }
    this.file_path = path;

    const deploys = readdirSync(fs.path(`site:deploy/history`));
    this.current.deploy.history = deploys
      .filter((e) => e.endsWith(".gz"))
      .map((e) => parseInt(e.replace(".gz", "")));

    return result as typeof default_config;
  },
  get(path: string) {
    return get(this.current, path);
  },
  async set(path: string, value: any) {
    set(this.current as any, path, value);
    await fs.write(this.file_path, this.current);
  },
  file_path: "",
  current: null as null | typeof default_config,
};

const default_config = {
  site_id: "",
  port: 0,
  upload_path: "upload",
  db: { orm: "prisma" as "prisma" | "prasi", url: "" },
  deploy: {
    current: 0,
    history: [] as number[],
  },
};

export type SiteConfig = typeof default_config;
