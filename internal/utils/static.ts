import * as zstd from "@bokuweb/zstd-wasm";
import { BunSqliteKeyValue } from "bun-sqlite-key-value";
import { exists, existsAsync } from "fs-jetpack";
import { prasi } from "main/prasi-var";
import mime from "mime";
import { readFileSync } from "node:fs";
import { join } from "path";
import { addRoute, createRouter, findRoute } from "rou3";
import type { ServerCtx } from "typings/server";
import { waitUntil } from "./wait-until";

export type StaticFile = Awaited<ReturnType<typeof staticFile>>;
export const staticFile = async (
  path: string,
  opt?: { index?: string; debug?: boolean }
) => {
  await zstd.init();

  if (!prasi.static_cache) {
    prasi.static_cache = {} as any;

    if (!prasi.static_cache.gz) {
      prasi.static_cache.gz = new BunSqliteKeyValue(":memory:");
    }

    if (!prasi.static_cache.zstd) {
      prasi.static_cache.zstd = new BunSqliteKeyValue(":memory:");
    }
  }

  const store = prasi.static_cache;

  const glob = new Bun.Glob("**");

  const internal = {
    indexPath: "",
    rescan_timeout: null as any,
    router: createRouter<{
      mime: string | null;
      fullpath: string;
      path: string;
    }>(),
  };
  const static_file = {
    scanning: false,
    paths: new Set<string>(),
    root: path,
    async rescan(arg?: { immediately?: boolean }) {
      // rescan will be overwritten after static_file definition.
    },
    exists(rpath: string, arg?: { prefix?: string; debug?: boolean }) {
      let pathname = rpath;
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      return findRoute(internal.router, undefined, pathname);
    },
    serve: (ctx: ServerCtx, arg?: { prefix?: string; debug?: boolean }) => {
      let pathname = ctx.url.pathname || "";
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      const found = findRoute(internal.router, undefined, pathname);

      if (found) {
        const { fullpath, mime } = found.data;
        if (exists(fullpath)) {
          const { headers, content } = cachedResponse(
            ctx,
            fullpath,
            mime,
            store
          );
          headers["cache-control"] = "public, max-age=604800, immutable";
          return new Response(content, {
            headers,
          });
        } else {
          store.gz.delete(fullpath);
          store.zstd.delete(fullpath);
        }
      }

      if (opt?.index) {
        const { headers, content } = cachedResponse(
          ctx,
          internal.indexPath,
          "text/html",
          store
        );
        return new Response(content, { headers });
      }
    },
  };

  const scan = async () => {
    if (static_file.scanning) {
      await waitUntil(() => !static_file.scanning);
      return;
    }
    static_file.scanning = true;
    if (path && await existsAsync(path)) {
      if (static_file.paths.size > 0) {
        store.gz.delete([...static_file.paths]);
        store.zstd.delete([...static_file.paths]);
      }

      for await (const file of glob.scan(path)) {
        if (file === opt?.index) internal.indexPath = join(path, file);

        static_file.paths.add(join(path, file));

        let type = mime.getType(file);
        if (file.endsWith(".ts")) {
          type = "application/javascript";
        }

        addRoute(internal.router, undefined, `/${file}`, {
          mime: type,
          path: file,
          fullpath: join(path, file),
        });
      }
    }
    static_file.scanning = false;
  };
  await scan();

  static_file.rescan = (arg?: { immediately?: boolean }) => {
    return new Promise<void>((resolve) => {
      clearTimeout(internal.rescan_timeout);
      internal.rescan_timeout = setTimeout(
        async () => {
          await scan();
          resolve();
        },
        arg?.immediately ? 0 : 300
      );
    });
  };

  return static_file;
};

const cachedResponse = (
  ctx: ServerCtx,
  file_path: string,
  mime: string | null,
  store: any
) => {
  const accept = ctx.req.headers.get("accept-encoding") || "";
  const headers: any = {
    "content-type": mime || "",
  };
  let content = null as any;

  if (accept.includes("zstd")) {
    content = store.zstd.get(file_path);
    if (!content) {
      content = zstd.compress(
        new Uint8Array(readFileSync(file_path)) as any,
        10
      );
      store.zstd.set(file_path, content);
    }
    headers["content-encoding"] = "zstd";
  }

  if (!content && accept.includes("gz")) {
    content = store.gz.get(file_path);
    if (!content) {
      content = Bun.gzipSync(new Uint8Array(readFileSync(file_path)));
      store.gz.set(file_path, content);
    }
    headers["content-encoding"] = "gzip";
  }

  return { content, headers };
};
