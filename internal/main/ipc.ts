import type { PrasiGlobal } from "main/prasi-var";
import imported from "../vm/init";

process.on(
  "message",
  async (arg: { action: "init" } | { action: "req"; req: Request }) => {
    const action = arg?.action;
    if (action === "req") {
      return;
    }
    const init_arg = {
      ...arg,
      server: () => {
        const server = Bun.serve({
          websocket: { message(ws, message) {} },
          fetch(req, server) {
            return prasi.handler.http(req);
          },
          port: 0,
        });
        process.send?.({ action: "port", port: server.port });
        return server
      },
      content: new Proxy(
        {},
        {
          get(target, p, receiver) {
            return () => {
              console.log('mantap', p);
            };
          },
        }
      ),
    };
    const prasi: PrasiGlobal = await imported.init(init_arg);
    if (arg.action === "init") {
      process.exit();
    }
  }
);
