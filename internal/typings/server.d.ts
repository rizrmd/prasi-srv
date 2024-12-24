import type { Serve, WebSocketHandler } from "bun";

export type PrasiHttpHandler = (
  req: Request,
  opt?: {
    rewrite?: (arg: {
      body: Bun.BodyInit;
      headers: Headers | any;
    }) => Bun.BodyInit;
  }
) => Promise<Response>;

export interface PrasiServer {
  ws?: PrasiWsHandler;
  http: (arg: {
    url: { raw: URL; pathname: string };
    req: Request;
    server: Server;
    mode: "dev" | "prod";
    handle: PrasiHttpHandler;
    serveStatic?: any;
    serveAPI?: any;
    index: { head: string[]; body: string[]; render: () => string };
    prasi: { page_id?: string; params?: Record<string, any> };
  }) => Promise<Response>;
  init?: (arg: { port?: number }) => Promise<void>;
}

export type ServerCtx = {
  server: Serve;
  url: {
    pathname: string;
    raw: URL;
  };
  req: Request;
};
