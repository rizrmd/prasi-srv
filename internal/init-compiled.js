// @bun @bun-cjs
(function(exports, require, module, __filename, __dirname) {var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// internal/main/init.ts
var exports_init = {};
__export(exports_init, {
  init: () => init
});
module.exports = __toCommonJS(exports_init);

// internal/main/prasi-var.ts
if (!globalThis.prasi) {
  globalThis.prasi = {};
}
var prasi = globalThis.prasi;

// internal/main/handler/http-handler.ts
var createHttpHandler = (server, mode) => {
  const handle = async (req, opt) => {
    return new Response("karambol rakus asodina");
  };
  const index = {
    head: [],
    body: [],
    render: () => ""
  };
  const handler = async (req) => {
    const server2 = prasi.server;
    if (server2 && typeof server2.http === "function") {
      return await server2.http({
        handle,
        index,
        mode,
        prasi: { page_id: "", params: {} },
        req,
        server: server2,
        url: { pathname: new URL(req.url).pathname, raw: new URL(req.url) }
      });
    }
    return new Response("Page Not Found", { status: 404 });
  };
  return handler;
};

// internal/main/handler/ws-handler.ts
var createWsHandler = () => {
  return { message(ws, message) {
  } };
};

// internal/main/init.ts
var init = async ({
  root_dir,
  script_path,
  server,
  mode
}) => {
  prasi.dir = { root: root_dir };
  delete require.cache[script_path];
  prasi.server = require(script_path).server;
  if (!prasi.server) {
    prasi.server = {
      async http(arg) {
        return new Response("server.ts do not have http handler", {
          status: 503
        });
      }
    };
  }
  const server_instance = server(prasi.server);
  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }
  prasi.handler = {
    http: createHttpHandler(server_instance, mode === "vm" ? "dev" : "prod"),
    ws: createWsHandler()
  };
};
})
