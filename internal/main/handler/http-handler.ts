import type { Server } from "bun";
import { prasi } from "main/prasi-var";
import type { PrasiHttpHandler } from "typings/server";
import { route_api } from "./route-api";

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

    const static_file = prasi.static.exists(url.pathname);
    if (static_file) {
      body = Bun.file(static_file.data.fullpath);
    } else {
      const api = await route_api.handle(this.url.pathname, req);
      if (api) {
        body = api.body;
        headers = api.headers;
        status = api.status;
      }
    }

    if (body === null) {
      // body = route_index.handle()
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
