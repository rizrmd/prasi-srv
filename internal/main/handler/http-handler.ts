import * as zstd from "@bokuweb/zstd-wasm";
import type { BunFile } from "bun";
import { type PrasiGlobal } from "main/prasi-var";
import mime from "mime";
import { join } from "path";
import type { PrasiHttpHandler } from "typings/server";
import { internal_prasi_api } from "./api-internal";
import { route_index } from "./route-index";

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
    const result = {
      body: null as any,
      headers: undefined as Record<string, string> | Headers | undefined,
      status: 200,
    };
    const url = this.url;

    let is_file = false;
    if (url.pathname.startsWith("/nova")) {
      const nova_file = join(prasi.static.nova, url.pathname.substring(6));
      if (nova_file) {
        result.body = Bun.file(nova_file);
        is_file = true;
      }
    } else {
      const frontend_file = prasi.static.frontend.exists(url.pathname);

      if (frontend_file) {
        result.body = Bun.file(frontend_file.data.fullpath);
        is_file = true;
      } else {
        const public_file = prasi.static.public.exists(url.pathname);
        if (public_file) {
          result.body = Bun.file(public_file.data.fullpath);
          is_file = true;
        } else {
          const api_result = await internal_prasi_api.handle(
            this.url,
            req,
            prasi
          );
          if (api_result) {
            result.body = api_result.body;
            result.headers = api_result.headers;
            result.status = api_result.status;
          }

          if (prasi.handler.api) {
            const api_result = await prasi.handler.api.handle(
              this.url,
              req,
              prasi
            );

            if (api_result) {
              result.body = api_result.body;
              result.headers = api_result.headers;
              result.status = api_result.status;
            }
          }
        }
      }
    }

    if (typeof result.body === "object" && result.body && !is_file) {
      result.body = JSON.stringify(result.body);
      head(result, "content-type", "application/json");
    }

    if (result.body === null) {
      result.body = route_index.handle(prasi.site_id, url.pathname, prasi);
      head(result, "content-type", "text/html");
    }

    if (!head(result, "content-type") && typeof url.pathname === "string") {
      const ext = url.pathname.split(".").pop() || "";
      if (ext.length >= 2 && ext.length <= 4) {
        const type = mime.getType(url.pathname);
        if (type) head(result, "content-type", type);
      }
    }

    if (opt?.rewrite) {
      result.body = opt.rewrite(result);
    }

    const accept = req.headers.get("accept-encoding");
    if (accept && !head(result, "content-encoding")) {
      let compression = "";
      if (accept.includes("zstd")) {
        compression = "zstd";
      } else if (accept.includes("gzip")) {
        compression = "gzip";
      }

      if (compression) {
        let should_compress = true;
        if (is_file) {
          const file = result.body as BunFile;
          if (file.size === 0) {
            should_compress = false;
          }
        } else if (!result.body) {
          should_compress = false;
        }

        if (should_compress) {
          await compress({
            result,
            is_file,
            compression,
          });
        }
      }
    }

    return new Response(result.body, {
      headers: result.headers,
      status: result.status,
    });
  };

  const index = {
    head: [],
    body: [],
    render: () => "",
  };

  const compress = async ({
    result,
    is_file,
    compression,
  }: {
    result: {
      headers: Record<string, string> | Headers | undefined;
      body: any;
    };
    is_file: boolean;
    compression: string;
  }) => {
    if (compression === "gzip") {
      head(result, "content-encoding", "gzip");
      if (is_file) {
        const file = result.body as BunFile;
        head(result, "content-type", file.type);
        result.body = Bun.gzipSync(await file.arrayBuffer());
      } else {
        result.body = Bun.gzipSync(result.body);
      }
    } else if ((compression = "zstd")) {
      head(result, "content-encoding", "zstd");

      if (is_file) {
        const file = result.body as BunFile;
        head(result, "content-type", file.type);

        result.body = zstd.compress(
          new Uint8Array(await file.arrayBuffer()),
          10
        );
      } else {
        result.body = zstd.compress(encoder.encode(result.body), 10);
      }
    }
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
  result: { headers: Record<string, string> | Headers | undefined },
  name: string,
  set_value?: string
) => {
  if (!result.headers) {
    if (typeof set_value === "string") {
      result.headers = { [name]: set_value };
    }
    return set_value || "";
  }

  if (result.headers instanceof Headers) {
    if (typeof set_value === "string") {
      result.headers.set(name, set_value);
    }
    return result.headers.get(name);
  }

  if (typeof set_value === "string") {
    result.headers[name] = set_value;
  }
  return result.headers[name];
};
