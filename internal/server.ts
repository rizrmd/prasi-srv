import { init } from "main/init";
import { prasi } from "main/prasi-var";

const port = 3000;

await init({
  mode: "server",
  port,
  root_dir: "",
  script_path: "",
});

Bun.serve({
  websocket: prasi.handler.ws,
  fetch: async (req) => {
    return await prasi.handler.http(req);
  },
  port,
});
