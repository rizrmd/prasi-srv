import type { BunFile, Server } from "bun";
import { prasi } from "main/prasi-var";
import { join } from "path";
import type { PrasiHttpHandler } from "typings/server";
import { route_api } from "./route-api";
import { route_index } from "./route-index";

export const createHttpHandler = (server: Server, mode: "dev" | "prod") => {
  const handle: PrasiHttpHandler = async function (
    this: { url: URL },
    req,
    opt
  ) {
    let body: any = null;
    let headers = undefined as any;
    let status = 200;
    const url = this.url;

    if (url.pathname.startsWith("/nova")) {
      const nova_file = join(prasi.static.nova, url.pathname.substring(6));
      if (nova_file) {
        body = Bun.file(nova_file);
      }
    } else {
      const frontend_file = prasi.static.frontend.exists(url.pathname);
      if (frontend_file) {
        body = Bun.file(frontend_file.data.fullpath);
      } else {
        const public_file = prasi.static.public.exists(url.pathname);
        if (public_file) {
          body = Bun.file(public_file.data.fullpath);
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
        const index = route_index.handle(prasi.site_id, {});
        if (index) {
          body = index.render();
          headers = { "content-type": "text/html" };
        }
      }
    }

    if (typeof body === "object" && body) {
      const file = body as BunFile;
      if (typeof file.type === "string" && typeof file.exists === "function") {
        if (!headers && file.type.includes("octet")) {
          headers = {
            "content-type": "text/plain",
          };
        }
      }
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
