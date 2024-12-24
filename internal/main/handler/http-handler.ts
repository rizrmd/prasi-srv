import type { Server } from "bun";
import { prasi } from "main/prasi-var";
import type { PrasiHttpHandler } from "typings/server";

export const createHttpHandler = (server: Server, mode: "dev" | "prod") => {
  const handle: PrasiHttpHandler = async (req, opt) => {
    return new Response("karambol rakus asodina");
  };

  const index = {
    head: [],
    body: [],
    render: () => "",
  };

  const handler: typeof prasi.handler.http = async (req) => {
    const server = prasi.server;

    if (server && typeof server.http === "function") {
      return await server.http({
        handle,
        index,
        mode,
        prasi: { page_id: "", params: {} },
        req,
        server,
        url: { pathname: new URL(req.url).pathname, raw: new URL(req.url) },
      });
    }

    return new Response("Page Not Found", { status: 404 });
  };
  return handler;
};
