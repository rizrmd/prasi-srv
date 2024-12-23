import { mkdirSync, statSync } from "fs";
import { copyAsync } from "fs-jetpack";
import { prasi } from "../prasi";
import { dirname, join } from "path";
import type { SiteConfig } from "./config";
const internal = Symbol("internal");

export const fs = {
  exists(path: string) {
    try {
      const s = statSync(this.path(path));
      return s.isDirectory() || s.isFile();
    } catch (e) {}
    return false;
  },
  path(path: string) {
    const all_prefix = this[internal].prefix as Record<string, string>;
    const prefix_key = Object.keys(all_prefix).find((e) => path.startsWith(e));
    const prefix_path = all_prefix[prefix_key!];

    if (prefix_key && prefix_path) {
      return `${prefix_path}/${path.substring(prefix_key.length + 1)}`;
    }
    return path;
  },
  async copy(from: string, to: string) {
    const from_dir = this.path(from);
    const to_path = this.path(to);
    const is_dir = statSync(from_dir).isDirectory();
    if (is_dir && !this.exists(to)) {
      mkdirSync(to_path, { recursive: true });
    } else {
      const to_dir = dirname(to_path);
      if (!fs.exists(to_dir)) {
        mkdirSync(to_dir, { recursive: true });
      }
    }

    return await copyAsync(from_dir, to_path, { overwrite: true });
  },

  async modify(arg: {
    path: string;
    save: (content: any) => string | object | Promise<string | object>;
    as?: "json" | "string";
  }) {
    const as = arg.as || arg.path.endsWith(".json") ? "json" : "string";
    const content = await this.read(arg.path, as);
    const result = await arg.save(content);
    return await this.write(arg.path, result);
  },
  async read(path: string, as?: "json" | "string") {
    const file = Bun.file(this.path(path));
    if (as === "json") {
      return await file.json();
    }

    return await file.text();
  },

  async write(
    path: string,
    data: any,
    opt?: {
      mode?: "json" | "raw";
    }
  ) {
    const file = Bun.file(this.path(path));
    if (typeof data === "object" && opt?.mode !== "raw") {
      return await Bun.write(file, JSON.stringify(data, null, 2), {
        createPath: true,
      });
    }

    return await Bun.write(file, data, {
      createPath: true,
    });
  },
  init(config: SiteConfig) {
    this[internal].prefix.site = config.dir.site;
    this[internal].prefix.upload = config.dir.upload;
    this[internal].prefix.internal = join(process.cwd(), "internal");
  },
  [internal]: {
    prefix: {
      site: "",
      upload: "",
      internal: "",
    },
  },
};
