import { inspectAsync, listAsync } from "fs-jetpack";
import { join } from "path";
import { addRoute, createRouter, type RouterContext, findRoute } from "rou3";
import { siteLog } from "utils/log";
import { parseArgs } from "utils/parse-args";

export const route_api = {
  _router: null as null | RouterContext<{
    url: any;
    args: string[];
    raw: boolean;
    fn: any;
    path: string;
  }>,
  async init() {
    this._router = createRouter();
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
              if (this._router)
                addRoute(this._router, undefined, route.url, route);
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
  async handle(pathname: string, req: Request) {
    if (this._router) {
      const found = findRoute(this._router, undefined, pathname);
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
            }
          } catch (e) {}
        }

        const res = await fn.bind({ req })(...arg_val);

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
        }

        return { body: res.body, headers: res.headers, status: res.status };
      }
    }
  },
};
