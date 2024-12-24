// @bun
// internal/main/handler/http-handler.ts
var createHttpHandler = () => {
  return async () => {
    return new Response("wuwu");
  };
};

// internal/main/handler/ws-handler.ts
var createWsHandler = () => {
  return { message(ws, message) {
  } };
};

// internal/main/prasi-var.ts
if (!globalThis.prasi) {
  globalThis.prasi = {};
}
var prasi = globalThis.prasi;

// internal/main/init.ts
var init = async ({
  root_dir,
  script_path,
  port
}) => {
  prasi.dir.root = root_dir;
  delete import.meta.require.cache[script_path];
  prasi.server = import.meta.require(script_path).server;
  if (prasi.server?.init && port) {
    await prasi.server.init({ port });
  }
  prasi.handler.http = createHttpHandler();
  prasi.handler.ws = createWsHandler();
};
export {
  init
};
