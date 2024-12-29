import type { BunFile, Server } from "bun";
import { prasi } from "main/prasi-var";
import { join } from "path";
import type { PrasiHttpHandler } from "typings/server";
import { route_api } from "./route-api";
import { route_index } from "./route-index";

export const createHttpHandler = (mode: "dev" | "prod") => {
  const handle: PrasiHttpHandler = async function (
    this: { url: URL },
    req,
    opt
  ) {
    let body: any = null;
    let headers = undefined as Record<string, string> | Headers | undefined;
    let status = 200;
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
          const api = await route_api.handle(this.url.pathname, req);
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
        body = route_index.handle(prasi.site_id);
        let new_headers = {};
        head(headers || new_headers, "content-type", "text/html");
        if (!headers) {
          headers = new_headers;
        }
      }
    }

    if (typeof body === "object" && body && !is_file) {
      body = JSON.stringify(body);
      head(headers, "content-type", "application/json");
    }

    if (opt?.rewrite) {
      body = opt.rewrite({ body, headers });
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
  set_value?: string
) => {
  if (!headers) {
    if (typeof set_value === "string") {
      return { [name]: set_value };
    }
    return "";
  }

  if (headers instanceof Headers) {
    if (typeof set_value === "string") {
      headers.set(name, set_value);
    }
    return headers.get(name);
  }

  if (typeof set_value === "string") {
    headers[name] = set_value;
  }
  return headers[name];
};
