import { inspectAsync, listAsync } from "fs-jetpack";
import { join } from "path";
import { siteLog } from "utils/log";
import { parseArgs } from "utils/parse-args";
import { createRouter } from "radix3";

export const api_route = {
  async init() {
    const router = createRouter({ strictTrailingSlash: true });
    const api = {};
    const scan = async (path: string, root?: string) => {
      const apis = await listAsync(path);
      if (apis) {
        for (const filename of apis) {
          const importPath = join(path, filename);
          if (filename.endsWith(".ts")) {
            try {
              const api = await import(importPath);
              let args: string[] = await parseArgs(importPath);
              const route = {
                url: api._.url,
                args,
                raw: !!api._.raw,
                fn: api._.api,
                path: importPath.substring((root || path).length + 1),
              };
              api[filename] = route;
              router.insert(route.url, api[filename]);
            } catch (e) {
              siteLog(
                `Failed to import app/srv/api${importPath.substring(
                  (root || path).length
                )}`
              );

              const f = Bun.file(importPath);
              if (f.size > 0) {
                console.error(e);
              } else {
                siteLog(` ➨ file is empty`);
              }
            }
          } else {
            const dir = await inspectAsync(importPath);
            if (dir?.type === "dir") {
              await scan(importPath, path);
            }
          }
        }
      }
    };
    await scan("internal/api");
  },
};
