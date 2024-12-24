import type { Server } from "bun";
import { prasi } from "main/prasi-var";
import type { PrasiHttpHandler } from "typings/server";

export const createHttpHandler = (server: Server, mode: "dev" | "prod") => {
  const route: PrasiHttpHandler = async (req, opt) => {
    return new Response("ok");
  };

  const index = {
    head: [],
    body: [],
    render: () => "",
  };

  const handler: typeof prasi.handler.http = async (req) => {
    const server = prasi.server;
    if (server) {
      server.http({
        handle: route,
        index,
        mode,
        prasi: { page_id: "", params: {} },
        req,
        server,
        url: { pathname: new URL(req.url).pathname, raw: new URL(req.url) },
      });
    }

    return new Response("Site Not Ready", { status: 503 });
  };
  return handler;
};
