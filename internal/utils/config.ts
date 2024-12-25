import { readdirSync } from "fs";
import get from "lodash.get";
import set from "lodash.set";
import { fs } from "./fs";

export const initConfig = async () => {
  if (Object.keys(gconf.prasi_config).length === 0) {
    gconf.prasi_config = { ...default_config };
  }
  const config = gconf.prasi_config as typeof default_config;

  const path = fs.path("site:site.json");
  if (!fs.exists(path)) {
    await fs.write(path, default_config);
  }

  const result = await fs.read(path, "json");
  if (!config.current) {
    config.current = result as SiteConfig;
  }
  config.config_path = path;

  const deploys = readdirSync(fs.path(`site:deploy/history`));
  config.current.deploy.history = deploys
    .filter((e) => e.endsWith(".gz"))
    .map((e) => parseInt(e.replace(".gz", "")));

  return result as typeof default_config;
};

const gconf = global as unknown as { prasi_config: typeof default_config };
if (!gconf.prasi_config) {
  gconf.prasi_config = {} as any;
}

export const config = gconf.prasi_config;

const default_config = {
  get(path: string) {
    return get(this.current, path);
  },
  async set(path: string, value: any) {
    set(this.current as any, path, value);
    await fs.write(this.config_path, this.current);
  },
  config_path: "",
  current: {
    site_id: "",
    port: 0,
    db: { orm: "prisma" as "prisma" | "prasi", url: "" },
    deploy: {
      current: 0,
      history: [] as number[],
    },
    dir: {
      site: "",
      upload: "",
    },
  },
};

export type SiteConfig = (typeof default_config)["current"];
