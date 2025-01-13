import { inspectAsync, listAsync } from "fs-jetpack";
import type { PrasiGlobal } from "main/prasi-var";
import { join } from "path";
import { addRoute, createRouter, findRoute } from "rou3";
import { siteLog } from "utils/log";
import { parseArgs } from "utils/parse-args";

export const defineApiBase = ({ path: base_path }: { path: string }) => {
  const base = {
    router: createRouter<{
      url: any;
      args: string[];
      raw: boolean;
      fn: any;
      path: string;
    }>(),
    imported: {} as Record<
      string,
      {
        url: any;
        args: string[];
        raw: boolean;
        fn: any;
        path: string;
      }
    >,
    rescan: async () => {},
    async handle(url: URL, req: Request, prasi: PrasiGlobal) {
      const pathname = url.pathname;
      if (this.router) {
        const found = findRoute(this.router, undefined, pathname);
        if (found) {
          const params = found?.params || {};
          const args = found.data.args;
          const fn = found.data.fn;
          const arg_val = [];
          if (req.method !== "GET") {
            try {
              const json = await req.json();

              if (Array.isArray(json)) {
                for (const i in json) {
                  const arg_name = args[i];
                  if (arg_name) {
                    params[arg_name] = json[i];
                  }
                  arg_val.push(json[i]);
                }
              } else if (json) {
                for (const [k, v] of Object.entries(json)) {
                  (params as any)[k] = v;
                }
              }
            } catch (e) {}
          }

          try {
            const res = await fn.bind({ req, params, url, prasi })(...arg_val);

            if (typeof res.headers === "object" && res.headers) {
              if (res instanceof Response) {
                return res;
              }

              if (
                res.headers["content-type"] === "application/json" &&
                typeof res.body === "object"
              ) {
                return {
                  body: JSON.stringify(res.body),
                  headers: res.headers,
                  status: res.status,
                };
              }
            } else if (res.body && res.headers && res.status) {
              return {
                body: res.body,
                headers: res.headers,
                status: res.status,
              };
            }

            if (typeof res === "object" && res) {
              return {
                body: JSON.stringify(res),
                headers: { "content-type": "application/json", status: 200 },
              };
            }
          } catch (e: any) {
            return {
              body: JSON.stringify({ __error: e.message }),
              headers: { "content-type": "application/json", status: 200 },
            };
          }
        }
      }
    },
  };

  const scan = async (path: string, root: string) => {
    const base_dir = join(root, path);
    const apis = await listAsync(base_dir);

    if (apis) {
      for (const filename of apis) {
        const importPath = join(base_dir, filename);

        if (filename.endsWith(".ts")) {
          try {
            delete require.cache[importPath];
            const api = require(importPath);
            let args: string[] = await parseArgs(importPath);

            const route = {
              url: api._.url,
              args,
              raw: !!api._.raw,
              fn: api._.api,
              path: importPath.substring((root || path).length + 1),
            };

            if (base.router) {
              addRoute(base.router, undefined, route.url, route);
            }
            if (base.imported) {
              base.imported[route.url] = route;
            }
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

  base.rescan = async () => {
    base.imported = {};
    base.router = createRouter();
    await scan("", base_path);
  };

  return base;
};
