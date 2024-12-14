import { dirAsync } from "fs-jetpack";
import { fs } from "./fs";
import get from "lodash.get";
import set from "lodash.set";

export const config = {
  async init(path: string) {
    if (!fs.exists(path)) {
      await fs.write(path, default_config);
    }

    const result = await fs.read(path, "json");
    this.current = result as typeof default_config;
    this.file_path = path;
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
    history: [],
  },
};

export type SiteConfig = typeof default_config;
