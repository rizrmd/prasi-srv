import type { Serve } from "bun";

export type ServerCtx = {
  server: Serve;
  url: {
    pathname: string;
    raw: URL;
  };
  req: Request;
};
