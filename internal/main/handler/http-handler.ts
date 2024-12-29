import { type PrasiGlobal } from "main/prasi-var";
import { join } from "path";
import type { PrasiHttpHandler } from "typings/server";
import { route_api } from "./route-api";
import { route_index } from "./route-index";
import type { BunFile } from "bun";
import * as zstd from "@bokuweb/zstd-wasm";

const encoder = new TextEncoder();
export const createHttpHandler = async (
  prasi: PrasiGlobal,
  mode: "dev" | "prod"
) => {
  await zstd.init();

  const handle: PrasiHttpHandler = async function (
    this: { url: URL },
    req,
    opt
  ) {
    let body: any = null;
    let headers = undefined as Record<string, string> | Headers | undefined;
    let status = 200;
    const set_headers = (v: any) => {
      if (!headers) {
        headers = v;
      }
      if (headers instanceof Headers && v instanceof Headers) {
      } else {
        headers = { ...headers, ...v };
      }
    };
    const url = this.url;

    let is_file = false;
    if (url.pathname.startsWith("/nova")) {
      const nova_file = join(prasi.static.nova, url.pathname.substring(6));
      if (nova_file) {
        body = Bun.file(nova_file);
        is_file = true;
      }
    } else {
      const frontend_file = prasi.static.frontend.exists(url.pathname);

      if (frontend_file) {
        body = Bun.file(frontend_file.data.fullpath);
        is_file = true;
      } else {
        const public_file = prasi.static.public.exists(url.pathname);
        if (public_file) {
          body = Bun.file(public_file.data.fullpath);
          is_file = true;
        } else {
          const api = await route_api.handle(this.url, req, prasi);
          if (api) {
            body = api.body;
            headers = api.headers;
            status = api.status;
          }
        }
      }

      if (
        body === null &&
        ![".js", ".css"].find((e) => url.pathname.endsWith(e))
      ) {
        body = route_index.handle(prasi.site_id, url.pathname);
        let new_headers = {};
        head(headers || new_headers, "content-type", [
          set_headers,
          "text/html",
        ]);
        if (!headers) {
          headers = new_headers;
        }
      }
    }

    if (typeof body === "object" && body && !is_file) {
      body = JSON.stringify(body);
      head(headers, "content-type", [set_headers, "application/json"]);
    }

    if (opt?.rewrite) {
      body = opt.rewrite({ body, headers });
    }

    const accept = req.headers.get("accept-encoding");
    if (accept && !head(headers, "content-encoding")) {
      let compression = "";
      if (accept.includes("zstd")) {
        compression = "zstd";
      } else if (accept.includes("gzip")) {
        compression = "gzip";
      }

      if (compression) {
        let should_compress = true;
        if (is_file) {
          const file = body as BunFile;
          if (!headers) {
            headers = { "content-type": body.type };
          }
          if (file.size === 0) {
            should_compress = false;
          }
        }

        if (should_compress) {
          if (compression === "gzip") {
            head(headers, "content-encoding", [set_headers, "gzip"]);
            if (is_file) {
              const file = body as BunFile;
              body = Bun.gzipSync(await file.arrayBuffer());
            } else {
              body = Bun.gzipSync(body);
            }
          } else if ((compression = "zstd")) {
            head(headers, "content-encoding", [set_headers, "zstd"]);
            if (is_file) {
              const file = body as BunFile;
              body = zstd.compress(
                new Uint8Array(await file.arrayBuffer()),
                10
              );
            } else {
              body = zstd.compress(encoder.encode(body), 10);
            }
          }
        }
      }
    }

    return new Response(body, { headers, status });
  };

  const index = {
    head: [],
    body: [],
    render: () => "",
  };

  const handler: typeof prasi.handler.http = async (req) => {
    const server = prasi.server;

    if (server && typeof server.http === "function") {
      const url = new URL(req.url);

      if (mode === "dev") {
        const parts = url.pathname.split("/");
        url.pathname = "/" + parts.slice(3).join("/");
      }

      return await server.http({
        handle: handle.bind({ url }),
        index,
        mode,
        prasi: { page_id: "", params: {} },
        req,
        server,
        url: { pathname: url.pathname, raw: url },
      });
    }

    return new Response("Page Not Found", { status: 404 });
  };
  return handler;
};

const head = (
  headers: Record<string, string> | Headers | undefined,
  name: string,
  set?: [(new_headers: Record<string, string> | Headers) => void, string]
) => {
  if (!headers) {
    if (set) {
      set[0]({ [name]: set[1] });
    }
    return "";
  }

  if (headers instanceof Headers) {
    if (set) {
      headers.set(name, set[1]);
      set[0](headers);
    }
    return headers.get(name);
  }

  if (set) {
    set[0]({ [name]: set[1] });
  }
  return headers[name];
};
