import { mkdirSync, statSync } from "fs";
import { copyAsync, writeAsync } from "fs-jetpack";
import { dirname, join } from "path";
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
      return join(prefix_path, path.substring(prefix_key.length + 1));
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
    if (typeof data === "object" && opt?.mode !== "raw") {
      await writeAsync(this.path(path), JSON.stringify(data, null, 2));
    }
    await writeAsync(this.path(path), data);
  },
  init(paths: { site: string; upload: string; public: string }) {
    this[internal].prefix.site = paths.site;
    this[internal].prefix.upload = paths.upload;
    this[internal].prefix.public = paths.public;
    this[internal].prefix.internal = join(process.cwd(), "internal");
  },
  [internal]: {
    prefix: {
      site: "",
      public: "",
      upload: "",
      internal: "",
    },
  },
};
