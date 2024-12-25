// @bun @bun-cjs
(function(exports, require, module, __filename, __dirname) {var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
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
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/@bokuweb/zstd-wasm/dist/common/zstd.js
var require_zstd = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.Module = undefined;
  var Module = typeof Module !== "undefined" ? Module : {};
  exports2.Module = Module;
  var moduleOverrides = {};
  var key;
  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key];
    }
  }
  var arguments_ = [];
  var err = Module["printErr"] || console.warn.bind(console);
  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }
  moduleOverrides = null;
  if (Module["arguments"])
    arguments_ = Module["arguments"];
  if (Module["thisProgram"])
    thisProgram = Module["thisProgram"];
  if (Module["quit"])
    quit_ = Module["quit"];
  var tempRet0 = 0;
  var setTempRet0 = function(value) {
    tempRet0 = value;
  };
  if (typeof WebAssembly !== "object") {
    abort("no native wasm support detected");
  }
  var wasmMemory;
  var ABORT = false;
  function ___assert_fail(condition, filename, line, func) {
    abort("Assertion failed: " + [filename ? filename : "unknown filename", line, func ? func : "unknown function"]);
  }
  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - x % multiple;
    }
    return x;
  }
  var buffer;
  var HEAPU8;
  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = new Int8Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
  }
  var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
  var wasmTable;
  var __ATPRERUN__ = [];
  var __ATINIT__ = [];
  var __ATPOSTRUN__ = [];
  var runtimeInitialized = false;
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function")
        Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPRERUN__);
  }
  function initRuntime() {
    runtimeInitialized = true;
    callRuntimeCallbacks(__ATINIT__);
  }
  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function")
        Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(__ATPOSTRUN__);
  }
  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }
  function addOnInit(cb) {
    __ATINIT__.unshift(cb);
  }
  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null;
  function addRunDependency(id) {
    runDependencies++;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
  }
  function removeRunDependency(id) {
    runDependencies--;
    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }
  Module["preloadedImages"] = {};
  Module["preloadedAudios"] = {};
  function abort(what) {
    if (Module["onAbort"]) {
      Module["onAbort"](what);
    }
    what += "";
    err(what);
    ABORT = true;
    what = "abort(" + what + ").";
    var e = new WebAssembly.RuntimeError(what);
    throw e;
  }
  function getBinaryPromise(url) {
    return fetch(url, { credentials: "same-origin" }).then(function(response) {
      if (!response["ok"]) {
        throw "failed to load wasm binary file at '" + url + "'";
      }
      return response["arrayBuffer"]();
    });
  }
  function init(filePathOrBuf) {
    var info = { a: asmLibraryArg };
    function receiveInstance(instance, module3) {
      var exports4 = instance.exports;
      Module["asm"] = exports4;
      wasmMemory = Module["asm"]["d"];
      updateGlobalBufferAndViews(wasmMemory.buffer);
      wasmTable = Module["asm"]["s"];
      addOnInit(Module["asm"]["e"]);
      removeRunDependency("wasm-instantiate");
    }
    addRunDependency("wasm-instantiate");
    function receiveInstantiationResult(result) {
      receiveInstance(result["instance"]);
    }
    function instantiateArrayBuffer(receiver) {
      return getBinaryPromise(filePathOrBuf).then(function(binary) {
        var result = WebAssembly.instantiate(binary, info);
        return result;
      }).then(receiver, function(reason) {
        err("failed to asynchronously prepare wasm: " + reason);
        abort(reason);
      });
    }
    function instantiateAsync() {
      if (filePathOrBuf && filePathOrBuf.byteLength > 0) {
        return WebAssembly.instantiate(filePathOrBuf, info).then(receiveInstantiationResult, function(reason) {
          err("wasm compile failed: " + reason);
        });
      } else if (typeof WebAssembly.instantiateStreaming === "function" && typeof filePathOrBuf === "string" && typeof fetch === "function") {
        return fetch(filePathOrBuf, { credentials: "same-origin" }).then(function(response) {
          var result = WebAssembly.instantiateStreaming(response, info);
          return result.then(receiveInstantiationResult, function(reason) {
            err("wasm streaming compile failed: " + reason);
            err("falling back to ArrayBuffer instantiation");
            return instantiateArrayBuffer(receiveInstantiationResult);
          });
        });
      } else {
        return instantiateArrayBuffer(receiveInstantiationResult);
      }
    }
    if (Module["instantiateWasm"]) {
      try {
        var exports3 = Module["instantiateWasm"](info, receiveInstance);
        return exports3;
      } catch (e) {
        err("Module.instantiateWasm callback failed with error: " + e);
        return false;
      }
    }
    instantiateAsync();
    return {};
  }
  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();
      if (typeof callback == "function") {
        callback(Module);
        continue;
      }
      var func = callback.func;
      if (typeof func === "number") {
        if (callback.arg === undefined) {
          wasmTable.get(func)();
        } else {
          wasmTable.get(func)(callback.arg);
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg);
      }
    }
  }
  function emscripten_realloc_buffer(size) {
    try {
      wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
      updateGlobalBufferAndViews(wasmMemory.buffer);
      return 1;
    } catch (e) {
    }
  }
  function _emscripten_resize_heap(requestedSize) {
    var oldSize = HEAPU8.length;
    requestedSize = requestedSize >>> 0;
    var maxHeapSize = 2147483648;
    if (requestedSize > maxHeapSize) {
      return false;
    }
    for (var cutDown = 1;cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = emscripten_realloc_buffer(newSize);
      if (replacement) {
        return true;
      }
    }
    return false;
  }
  function _setTempRet0(val) {
    setTempRet0(val);
  }
  var asmLibraryArg = { a: ___assert_fail, b: _emscripten_resize_heap, c: _setTempRet0 };
  Module["___wasm_call_ctors"] = function() {
    return (Module["___wasm_call_ctors"] = Module["asm"]["e"]).apply(null, arguments);
  };
  Module["_malloc"] = function() {
    return (Module["_malloc"] = Module["asm"]["q"]).apply(null, arguments);
  };
  Module["_free"] = function() {
    return (Module["_free"] = Module["asm"]["r"]).apply(null, arguments);
  };
  Module["_ZSTD_isError"] = function() {
    return (Module["_ZSTD_isError"] = Module["asm"]["f"]).apply(null, arguments);
  };
  Module["_ZSTD_compressBound"] = function() {
    return (Module["_ZSTD_compressBound"] = Module["asm"]["g"]).apply(null, arguments);
  };
  Module["_ZSTD_createCCtx"] = function() {
    return (Module["_ZSTD_createCCtx"] = Module["asm"]["h"]).apply(null, arguments);
  };
  Module["_ZSTD_freeCCtx"] = function() {
    return (Module["_ZSTD_freeCCtx"] = Module["asm"]["i"]).apply(null, arguments);
  };
  Module["_ZSTD_compress_usingDict"] = function() {
    return (Module["_ZSTD_compress_usingDict"] = Module["asm"]["j"]).apply(null, arguments);
  };
  Module["_ZSTD_compress"] = function() {
    return (Module["_ZSTD_compress"] = Module["asm"]["k"]).apply(null, arguments);
  };
  Module["_ZSTD_createDCtx"] = function() {
    return (Module["_ZSTD_createDCtx"] = Module["asm"]["l"]).apply(null, arguments);
  };
  Module["_ZSTD_freeDCtx"] = function() {
    return (Module["_ZSTD_freeDCtx"] = Module["asm"]["m"]).apply(null, arguments);
  };
  Module["_ZSTD_getFrameContentSize"] = function() {
    return (Module["_ZSTD_getFrameContentSize"] = Module["asm"]["n"]).apply(null, arguments);
  };
  Module["_ZSTD_decompress_usingDict"] = function() {
    return (Module["_ZSTD_decompress_usingDict"] = Module["asm"]["o"]).apply(null, arguments);
  };
  Module["_ZSTD_decompress"] = function() {
    return (Module["_ZSTD_decompress"] = Module["asm"]["p"]).apply(null, arguments);
  };
  var calledRun;
  dependenciesFulfilled = function runCaller() {
    if (!calledRun)
      run();
    if (!calledRun)
      dependenciesFulfilled = runCaller;
  };
  function run(args) {
    args = args || arguments_;
    if (runDependencies > 0) {
      return;
    }
    preRun();
    if (runDependencies > 0) {
      return;
    }
    function doRun() {
      if (calledRun)
        return;
      calledRun = true;
      Module["calledRun"] = true;
      if (ABORT)
        return;
      initRuntime();
      if (Module["onRuntimeInitialized"])
        Module["onRuntimeInitialized"]();
      postRun();
    }
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(function() {
        setTimeout(function() {
          Module["setStatus"]("");
        }, 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  Module["run"] = run;
  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function")
      Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
      Module["preInit"].pop()();
    }
  }
  Module["init"] = init;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/module.js
var require_module = __commonJS((exports2) => {
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.Module = exports2.waitInitialized = undefined;
  var zstd_1 = require_zstd();
  Object.defineProperty(exports2, "Module", { enumerable: true, get: function() {
    return zstd_1.Module;
  } });
  var initialized = (() => new Promise((resolve) => {
    zstd_1.Module.onRuntimeInitialized = resolve;
  }))();
  var waitInitialized = () => __awaiter(undefined, undefined, undefined, function* () {
    yield initialized;
  });
  exports2.waitInitialized = waitInitialized;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/errors/index.js
var require_errors = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.isError = undefined;
  var module_1 = require_module();
  var isError = (code) => {
    const _isError = module_1.Module["_ZSTD_isError"];
    return _isError(code);
  };
  exports2.isError = isError;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress.js
var require_decompress = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.decompress = undefined;
  var module_1 = require_module();
  var errors_1 = require_errors();
  var getFrameContentSize = (src, size) => {
    const getSize = module_1.Module["_ZSTD_getFrameContentSize"];
    return getSize(src, size);
  };
  var decompress = (buf, opts = { defaultHeapSize: 1024 * 1024 }) => {
    const malloc = module_1.Module["_malloc"];
    const src = malloc(buf.byteLength);
    module_1.Module.HEAP8.set(buf, src);
    const contentSize = getFrameContentSize(src, buf.byteLength);
    const size = contentSize === -1 ? opts.defaultHeapSize : contentSize;
    const free = module_1.Module["_free"];
    const heap = malloc(size);
    try {
      const _decompress = module_1.Module["_ZSTD_decompress"];
      const sizeOrError = _decompress(heap, size, src, buf.byteLength);
      if ((0, errors_1.isError)(sizeOrError)) {
        throw new Error(`Failed to compress with code ${sizeOrError}`);
      }
      const data = new Uint8Array(module_1.Module.HEAPU8.buffer, heap, sizeOrError).slice();
      free(heap, size);
      free(src, buf.byteLength);
      return data;
    } catch (e) {
      free(heap, size);
      free(src, buf.byteLength);
      throw e;
    }
  };
  exports2.decompress = decompress;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress.js
var require_compress = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.compress = undefined;
  var module_1 = require_module();
  var errors_1 = require_errors();
  var compressBound = (size) => {
    const bound = module_1.Module["_ZSTD_compressBound"];
    return bound(size);
  };
  var compress = (buf, level) => {
    const bound = compressBound(buf.byteLength);
    const malloc = module_1.Module["_malloc"];
    const compressed = malloc(bound);
    const src = malloc(buf.byteLength);
    module_1.Module.HEAP8.set(buf, src);
    const free = module_1.Module["_free"];
    try {
      const _compress = module_1.Module["_ZSTD_compress"];
      const sizeOrError = _compress(compressed, bound, src, buf.byteLength, level !== null && level !== undefined ? level : 3);
      if ((0, errors_1.isError)(sizeOrError)) {
        throw new Error(`Failed to compress with code ${sizeOrError}`);
      }
      const data = new Uint8Array(module_1.Module.HEAPU8.buffer, compressed, sizeOrError).slice();
      free(compressed, bound);
      free(src, buf.byteLength);
      return data;
    } catch (e) {
      free(compressed, bound);
      free(src, buf.byteLength);
      throw e;
    }
  };
  exports2.compress = compress;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/decompress_using_dict.js
var require_decompress_using_dict = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.decompressUsingDict = exports2.freeDCtx = exports2.createDCtx = undefined;
  var module_1 = require_module();
  var errors_1 = require_errors();
  var getFrameContentSize = (src, size) => {
    const getSize = module_1.Module["_ZSTD_getFrameContentSize"];
    return getSize(src, size);
  };
  var createDCtx = () => {
    return module_1.Module["_ZSTD_createDCtx"]();
  };
  exports2.createDCtx = createDCtx;
  var freeDCtx = (dctx) => {
    return module_1.Module["_ZSTD_freeDCtx"](dctx);
  };
  exports2.freeDCtx = freeDCtx;
  var decompressUsingDict = (dctx, buf, dict, opts = { defaultHeapSize: 1024 * 1024 }) => {
    const malloc = module_1.Module["_malloc"];
    const src = malloc(buf.byteLength);
    module_1.Module.HEAP8.set(buf, src);
    const pdict = malloc(dict.byteLength);
    module_1.Module.HEAP8.set(dict, pdict);
    const contentSize = getFrameContentSize(src, buf.byteLength);
    const size = contentSize === -1 ? opts.defaultHeapSize : contentSize;
    const free = module_1.Module["_free"];
    const heap = malloc(size);
    try {
      const _decompress = module_1.Module["_ZSTD_decompress_usingDict"];
      const sizeOrError = _decompress(dctx, heap, size, src, buf.byteLength, pdict, dict.byteLength);
      if ((0, errors_1.isError)(sizeOrError)) {
        throw new Error(`Failed to compress with code ${sizeOrError}`);
      }
      const data = new Uint8Array(module_1.Module.HEAPU8.buffer, heap, sizeOrError).slice();
      free(heap, size);
      free(src, buf.byteLength);
      free(pdict, dict.byteLength);
      return data;
    } catch (e) {
      free(heap, size);
      free(src, buf.byteLength);
      free(pdict, dict.byteLength);
      throw e;
    }
  };
  exports2.decompressUsingDict = decompressUsingDict;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/simple/compress_using_dict.js
var require_compress_using_dict = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.compressUsingDict = exports2.freeCCtx = exports2.createCCtx = undefined;
  var module_1 = require_module();
  var errors_1 = require_errors();
  var compressBound = (size) => {
    const bound = module_1.Module["_ZSTD_compressBound"];
    return bound(size);
  };
  var createCCtx = () => {
    return module_1.Module["_ZSTD_createCCtx"]();
  };
  exports2.createCCtx = createCCtx;
  var freeCCtx = (cctx) => {
    return module_1.Module["_ZSTD_freeCCtx"](cctx);
  };
  exports2.freeCCtx = freeCCtx;
  var compressUsingDict = (cctx, buf, dict, level) => {
    const bound = compressBound(buf.byteLength);
    const malloc = module_1.Module["_malloc"];
    const compressed = malloc(bound);
    const src = malloc(buf.byteLength);
    module_1.Module.HEAP8.set(buf, src);
    const pdict = malloc(dict.byteLength);
    module_1.Module.HEAP8.set(dict, pdict);
    const free = module_1.Module["_free"];
    try {
      const _compress = module_1.Module["_ZSTD_compress_usingDict"];
      const sizeOrError = _compress(cctx, compressed, bound, src, buf.byteLength, pdict, dict.byteLength, level !== null && level !== undefined ? level : 3);
      if ((0, errors_1.isError)(sizeOrError)) {
        throw new Error(`Failed to compress with code ${sizeOrError}`);
      }
      const data = new Uint8Array(module_1.Module.HEAPU8.buffer, compressed, sizeOrError).slice();
      free(compressed, bound);
      free(src, buf.byteLength);
      free(pdict, dict.byteLength);
      return data;
    } catch (e) {
      free(compressed, bound);
      free(src, buf.byteLength);
      free(pdict, dict.byteLength);
      throw e;
    }
  };
  exports2.compressUsingDict = compressUsingDict;
});

// node_modules/@bokuweb/zstd-wasm/dist/common/index.node.js
var require_index_node = __commonJS((exports2) => {
  var __dirname = "/Users/riz/Developer/data/site-srv/main/node_modules/@bokuweb/zstd-wasm/dist/common";
  var __createBinding = exports2 && exports2.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === undefined)
      k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = exports2 && exports2.__exportStar || function(m, exports3) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports3, p))
        __createBinding(exports3, m, p);
  };
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.init = undefined;
  var module_1 = require_module();
  var init = () => __awaiter(undefined, undefined, undefined, function* () {
    const { readFile } = require("fs/promises");
    const { resolve } = require("path");
    const buf = yield readFile(resolve(__dirname, "./zstd.wasm"));
    module_1.Module["init"](buf);
    yield (0, module_1.waitInitialized)();
  });
  exports2.init = init;
  __exportStar(require_decompress(), exports2);
  __exportStar(require_compress(), exports2);
  __exportStar(require_decompress_using_dict(), exports2);
  __exportStar(require_compress_using_dict(), exports2);
});

// node_modules/fs-jetpack/lib/utils/promisify.js
var require_promisify = __commonJS((exports2, module2) => {
  module2.exports = (fn) => {
    return function() {
      const length = arguments.length;
      const args = new Array(length);
      for (let i = 0;i < length; i += 1) {
        args[i] = arguments[i];
      }
      return new Promise((resolve2, reject) => {
        args.push((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve2(data);
          }
        });
        fn.apply(null, args);
      });
    };
  };
});

// node_modules/fs-jetpack/lib/utils/fs.js
var require_fs = __commonJS((exports2, module2) => {
  var fs = require("fs");
  var promisify = require_promisify();
  var isCallbackMethod = (key) => {
    return [
      typeof fs[key] === "function",
      !key.match(/Sync$/),
      !key.match(/^[A-Z]/),
      !key.match(/^create/),
      !key.match(/^(un)?watch/)
    ].every(Boolean);
  };
  var adaptMethod = (name) => {
    const original = fs[name];
    return promisify(original);
  };
  var adaptAllMethods = () => {
    const adapted = {};
    Object.keys(fs).forEach((key) => {
      if (isCallbackMethod(key)) {
        if (key === "exists") {
          adapted.exists = () => {
            throw new Error("fs.exists() is deprecated");
          };
        } else {
          adapted[key] = adaptMethod(key);
        }
      } else {
        adapted[key] = fs[key];
      }
    });
    return adapted;
  };
  module2.exports = adaptAllMethods();
});

// node_modules/fs-jetpack/lib/utils/validate.js
var require_validate = __commonJS((exports2, module2) => {
  var prettyPrintTypes = (types) => {
    const addArticle = (str) => {
      const vowels = ["a", "e", "i", "o", "u"];
      if (vowels.indexOf(str[0]) !== -1) {
        return `an ${str}`;
      }
      return `a ${str}`;
    };
    return types.map(addArticle).join(" or ");
  };
  var isArrayOfNotation = (typeDefinition) => {
    return /array of /.test(typeDefinition);
  };
  var extractTypeFromArrayOfNotation = (typeDefinition) => {
    return typeDefinition.split(" of ")[1];
  };
  var isValidTypeDefinition = (typeStr) => {
    if (isArrayOfNotation(typeStr)) {
      return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
    }
    return [
      "string",
      "number",
      "boolean",
      "array",
      "object",
      "buffer",
      "null",
      "undefined",
      "function"
    ].some((validType) => {
      return validType === typeStr;
    });
  };
  var detectType = (value) => {
    if (value === null) {
      return "null";
    }
    if (Array.isArray(value)) {
      return "array";
    }
    if (Buffer.isBuffer(value)) {
      return "buffer";
    }
    return typeof value;
  };
  var onlyUniqueValuesInArrayFilter = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  var detectTypeDeep = (value) => {
    let type = detectType(value);
    let typesInArray;
    if (type === "array") {
      typesInArray = value.map((element) => {
        return detectType(element);
      }).filter(onlyUniqueValuesInArrayFilter);
      type += ` of ${typesInArray.join(", ")}`;
    }
    return type;
  };
  var validateArray = (argumentValue, typeToCheck) => {
    const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
    if (detectType(argumentValue) !== "array") {
      return false;
    }
    return argumentValue.every((element) => {
      return detectType(element) === allowedTypeInArray;
    });
  };
  var validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
    const isOneOfAllowedTypes = argumentMustBe.some((type) => {
      if (!isValidTypeDefinition(type)) {
        throw new Error(`Unknown type "${type}"`);
      }
      if (isArrayOfNotation(type)) {
        return validateArray(argumentValue, type);
      }
      return type === detectType(argumentValue);
    });
    if (!isOneOfAllowedTypes) {
      throw new Error(`Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(argumentMustBe)}. Received ${detectTypeDeep(argumentValue)}`);
    }
  };
  var validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
    if (obj !== undefined) {
      validateArgument(methodName, optionsObjName, obj, ["object"]);
      Object.keys(obj).forEach((key) => {
        const argName = `${optionsObjName}.${key}`;
        if (allowedOptions[key] !== undefined) {
          validateArgument(methodName, argName, obj[key], allowedOptions[key]);
        } else {
          throw new Error(`Unknown argument "${argName}" passed to ${methodName}`);
        }
      });
    }
  };
  module2.exports = {
    argument: validateArgument,
    options: validateOptions
  };
});

// node_modules/fs-jetpack/lib/utils/mode.js
var require_mode = __commonJS((exports2) => {
  exports2.normalizeFileMode = (mode) => {
    let modeAsString;
    if (typeof mode === "number") {
      modeAsString = mode.toString(8);
    } else {
      modeAsString = mode;
    }
    return modeAsString.substring(modeAsString.length - 3);
  };
});

// node_modules/fs-jetpack/lib/remove.js
var require_remove = __commonJS((exports2) => {
  var fs = require_fs();
  var validate = require_validate();
  var validateInput = (methodName, path) => {
    const methodSignature = `${methodName}([path])`;
    validate.argument(methodSignature, "path", path, ["string", "undefined"]);
  };
  var removeSync = (path) => {
    fs.rmSync(path, {
      recursive: true,
      force: true,
      maxRetries: 3
    });
  };
  var removeAsync = (path) => {
    return fs.rm(path, {
      recursive: true,
      force: true,
      maxRetries: 3
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = removeSync;
  exports2.async = removeAsync;
});

// node_modules/fs-jetpack/lib/dir.js
var require_dir = __commonJS((exports2) => {
  var pathUtil = require("path");
  var fs = require_fs();
  var modeUtil = require_mode();
  var validate = require_validate();
  var remove = require_remove();
  var validateInput = (methodName, path, criteria) => {
    const methodSignature = `${methodName}(path, [criteria])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.options(methodSignature, "criteria", criteria, {
      empty: ["boolean"],
      mode: ["string", "number"]
    });
  };
  var getCriteriaDefaults = (passedCriteria) => {
    const criteria = passedCriteria || {};
    if (typeof criteria.empty !== "boolean") {
      criteria.empty = false;
    }
    if (criteria.mode !== undefined) {
      criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
    }
    return criteria;
  };
  var generatePathOccupiedByNotDirectoryError = (path) => {
    return new Error(`Path ${path} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`);
  };
  var checkWhatAlreadyOccupiesPathSync = (path) => {
    let stat;
    try {
      stat = fs.statSync(path);
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    if (stat && !stat.isDirectory()) {
      throw generatePathOccupiedByNotDirectoryError(path);
    }
    return stat;
  };
  var createBrandNewDirectorySync = (path, opts) => {
    const options = opts || {};
    try {
      fs.mkdirSync(path, options.mode);
    } catch (err) {
      if (err.code === "ENOENT") {
        createBrandNewDirectorySync(pathUtil.dirname(path), options);
        fs.mkdirSync(path, options.mode);
      } else if (err.code === "EEXIST") {
      } else {
        throw err;
      }
    }
  };
  var checkExistingDirectoryFulfillsCriteriaSync = (path, stat, criteria) => {
    const checkMode = () => {
      const mode = modeUtil.normalizeFileMode(stat.mode);
      if (criteria.mode !== undefined && criteria.mode !== mode) {
        fs.chmodSync(path, criteria.mode);
      }
    };
    const checkEmptiness = () => {
      if (criteria.empty) {
        const list = fs.readdirSync(path);
        list.forEach((filename) => {
          remove.sync(pathUtil.resolve(path, filename));
        });
      }
    };
    checkMode();
    checkEmptiness();
  };
  var dirSync = (path, passedCriteria) => {
    const criteria = getCriteriaDefaults(passedCriteria);
    const stat = checkWhatAlreadyOccupiesPathSync(path);
    if (stat) {
      checkExistingDirectoryFulfillsCriteriaSync(path, stat, criteria);
    } else {
      createBrandNewDirectorySync(path, criteria);
    }
  };
  var checkWhatAlreadyOccupiesPathAsync = (path) => {
    return new Promise((resolve2, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isDirectory()) {
          resolve2(stat);
        } else {
          reject(generatePathOccupiedByNotDirectoryError(path));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  var emptyAsync = (path) => {
    return new Promise((resolve2, reject) => {
      fs.readdir(path).then((list) => {
        const doOne = (index) => {
          if (index === list.length) {
            resolve2();
          } else {
            const subPath = pathUtil.resolve(path, list[index]);
            remove.async(subPath).then(() => {
              doOne(index + 1);
            });
          }
        };
        doOne(0);
      }).catch(reject);
    });
  };
  var checkExistingDirectoryFulfillsCriteriaAsync = (path, stat, criteria) => {
    return new Promise((resolve2, reject) => {
      const checkMode = () => {
        const mode = modeUtil.normalizeFileMode(stat.mode);
        if (criteria.mode !== undefined && criteria.mode !== mode) {
          return fs.chmod(path, criteria.mode);
        }
        return Promise.resolve();
      };
      const checkEmptiness = () => {
        if (criteria.empty) {
          return emptyAsync(path);
        }
        return Promise.resolve();
      };
      checkMode().then(checkEmptiness).then(resolve2, reject);
    });
  };
  var createBrandNewDirectoryAsync = (path, opts) => {
    const options = opts || {};
    return new Promise((resolve2, reject) => {
      fs.mkdir(path, options.mode).then(resolve2).catch((err) => {
        if (err.code === "ENOENT") {
          createBrandNewDirectoryAsync(pathUtil.dirname(path), options).then(() => {
            return fs.mkdir(path, options.mode);
          }).then(resolve2).catch((err2) => {
            if (err2.code === "EEXIST") {
              resolve2();
            } else {
              reject(err2);
            }
          });
        } else if (err.code === "EEXIST") {
          resolve2();
        } else {
          reject(err);
        }
      });
    });
  };
  var dirAsync = (path, passedCriteria) => {
    return new Promise((resolve2, reject) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      checkWhatAlreadyOccupiesPathAsync(path).then((stat) => {
        if (stat !== undefined) {
          return checkExistingDirectoryFulfillsCriteriaAsync(path, stat, criteria);
        }
        return createBrandNewDirectoryAsync(path, criteria);
      }).then(resolve2, reject);
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = dirSync;
  exports2.createSync = createBrandNewDirectorySync;
  exports2.async = dirAsync;
  exports2.createAsync = createBrandNewDirectoryAsync;
});

// node_modules/fs-jetpack/lib/write.js
var require_write = __commonJS((exports2) => {
  var pathUtil = require("path");
  var fs = require_fs();
  var validate = require_validate();
  var dir = require_dir();
  var validateInput = (methodName, path, data, options) => {
    const methodSignature = `${methodName}(path, data, [options])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.argument(methodSignature, "data", data, [
      "string",
      "buffer",
      "object",
      "array"
    ]);
    validate.options(methodSignature, "options", options, {
      mode: ["string", "number"],
      atomic: ["boolean"],
      jsonIndent: ["number"]
    });
  };
  var newExt = ".__new__";
  var serializeToJsonMaybe = (data, jsonIndent) => {
    let indent = jsonIndent;
    if (typeof indent !== "number") {
      indent = 2;
    }
    if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
      return JSON.stringify(data, null, indent);
    }
    return data;
  };
  var writeFileSync = (path, data, options) => {
    try {
      fs.writeFileSync(path, data, options);
    } catch (err) {
      if (err.code === "ENOENT") {
        dir.createSync(pathUtil.dirname(path));
        fs.writeFileSync(path, data, options);
      } else {
        throw err;
      }
    }
  };
  var writeAtomicSync = (path, data, options) => {
    writeFileSync(path + newExt, data, options);
    fs.renameSync(path + newExt, path);
  };
  var writeSync = (path, data, options) => {
    const opts = options || {};
    const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
    let writeStrategy = writeFileSync;
    if (opts.atomic) {
      writeStrategy = writeAtomicSync;
    }
    writeStrategy(path, processedData, { mode: opts.mode });
  };
  var writeFileAsync = (path, data, options) => {
    return new Promise((resolve2, reject) => {
      fs.writeFile(path, data, options).then(resolve2).catch((err) => {
        if (err.code === "ENOENT") {
          dir.createAsync(pathUtil.dirname(path)).then(() => {
            return fs.writeFile(path, data, options);
          }).then(resolve2, reject);
        } else {
          reject(err);
        }
      });
    });
  };
  var writeAtomicAsync = (path, data, options) => {
    return new Promise((resolve2, reject) => {
      writeFileAsync(path + newExt, data, options).then(() => {
        return fs.rename(path + newExt, path);
      }).then(resolve2, reject);
    });
  };
  var writeAsync = (path, data, options) => {
    const opts = options || {};
    const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
    let writeStrategy = writeFileAsync;
    if (opts.atomic) {
      writeStrategy = writeAtomicAsync;
    }
    return writeStrategy(path, processedData, { mode: opts.mode });
  };
  exports2.validateInput = validateInput;
  exports2.sync = writeSync;
  exports2.async = writeAsync;
});

// node_modules/fs-jetpack/lib/append.js
var require_append = __commonJS((exports2) => {
  var fs = require_fs();
  var write = require_write();
  var validate = require_validate();
  var validateInput = (methodName, path, data, options) => {
    const methodSignature = `${methodName}(path, data, [options])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.argument(methodSignature, "data", data, ["string", "buffer"]);
    validate.options(methodSignature, "options", options, {
      mode: ["string", "number"]
    });
  };
  var appendSync = (path, data, options) => {
    try {
      fs.appendFileSync(path, data, options);
    } catch (err) {
      if (err.code === "ENOENT") {
        write.sync(path, data, options);
      } else {
        throw err;
      }
    }
  };
  var appendAsync = (path, data, options) => {
    return new Promise((resolve2, reject) => {
      fs.appendFile(path, data, options).then(resolve2).catch((err) => {
        if (err.code === "ENOENT") {
          write.async(path, data, options).then(resolve2, reject);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = appendSync;
  exports2.async = appendAsync;
});

// node_modules/fs-jetpack/lib/file.js
var require_file = __commonJS((exports2) => {
  var fs = require_fs();
  var modeUtil = require_mode();
  var validate = require_validate();
  var write = require_write();
  var validateInput = (methodName, path, criteria) => {
    const methodSignature = `${methodName}(path, [criteria])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.options(methodSignature, "criteria", criteria, {
      content: ["string", "buffer", "object", "array"],
      jsonIndent: ["number"],
      mode: ["string", "number"]
    });
  };
  var getCriteriaDefaults = (passedCriteria) => {
    const criteria = passedCriteria || {};
    if (criteria.mode !== undefined) {
      criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
    }
    return criteria;
  };
  var generatePathOccupiedByNotFileError = (path) => {
    return new Error(`Path ${path} exists but is not a file. Halting jetpack.file() call for safety reasons.`);
  };
  var checkWhatAlreadyOccupiesPathSync = (path) => {
    let stat;
    try {
      stat = fs.statSync(path);
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    if (stat && !stat.isFile()) {
      throw generatePathOccupiedByNotFileError(path);
    }
    return stat;
  };
  var checkExistingFileFulfillsCriteriaSync = (path, stat, criteria) => {
    const mode = modeUtil.normalizeFileMode(stat.mode);
    const checkContent = () => {
      if (criteria.content !== undefined) {
        write.sync(path, criteria.content, {
          mode,
          jsonIndent: criteria.jsonIndent
        });
        return true;
      }
      return false;
    };
    const checkMode = () => {
      if (criteria.mode !== undefined && criteria.mode !== mode) {
        fs.chmodSync(path, criteria.mode);
      }
    };
    const contentReplaced = checkContent();
    if (!contentReplaced) {
      checkMode();
    }
  };
  var createBrandNewFileSync = (path, criteria) => {
    let content = "";
    if (criteria.content !== undefined) {
      content = criteria.content;
    }
    write.sync(path, content, {
      mode: criteria.mode,
      jsonIndent: criteria.jsonIndent
    });
  };
  var fileSync = (path, passedCriteria) => {
    const criteria = getCriteriaDefaults(passedCriteria);
    const stat = checkWhatAlreadyOccupiesPathSync(path);
    if (stat !== undefined) {
      checkExistingFileFulfillsCriteriaSync(path, stat, criteria);
    } else {
      createBrandNewFileSync(path, criteria);
    }
  };
  var checkWhatAlreadyOccupiesPathAsync = (path) => {
    return new Promise((resolve2, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isFile()) {
          resolve2(stat);
        } else {
          reject(generatePathOccupiedByNotFileError(path));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  var checkExistingFileFulfillsCriteriaAsync = (path, stat, criteria) => {
    const mode = modeUtil.normalizeFileMode(stat.mode);
    const checkContent = () => {
      return new Promise((resolve2, reject) => {
        if (criteria.content !== undefined) {
          write.async(path, criteria.content, {
            mode,
            jsonIndent: criteria.jsonIndent
          }).then(() => {
            resolve2(true);
          }).catch(reject);
        } else {
          resolve2(false);
        }
      });
    };
    const checkMode = () => {
      if (criteria.mode !== undefined && criteria.mode !== mode) {
        return fs.chmod(path, criteria.mode);
      }
      return;
    };
    return checkContent().then((contentReplaced) => {
      if (!contentReplaced) {
        return checkMode();
      }
      return;
    });
  };
  var createBrandNewFileAsync = (path, criteria) => {
    let content = "";
    if (criteria.content !== undefined) {
      content = criteria.content;
    }
    return write.async(path, content, {
      mode: criteria.mode,
      jsonIndent: criteria.jsonIndent
    });
  };
  var fileAsync = (path, passedCriteria) => {
    return new Promise((resolve2, reject) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      checkWhatAlreadyOccupiesPathAsync(path).then((stat) => {
        if (stat !== undefined) {
          return checkExistingFileFulfillsCriteriaAsync(path, stat, criteria);
        }
        return createBrandNewFileAsync(path, criteria);
      }).then(resolve2, reject);
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = fileSync;
  exports2.async = fileAsync;
});

// node_modules/fs-jetpack/lib/inspect.js
var require_inspect = __commonJS((exports2) => {
  var crypto2 = require("crypto");
  var pathUtil = require("path");
  var fs = require_fs();
  var validate = require_validate();
  var supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];
  var symlinkOptions = ["report", "follow"];
  var validateInput = (methodName, path, options) => {
    const methodSignature = `${methodName}(path, [options])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.options(methodSignature, "options", options, {
      checksum: ["string"],
      mode: ["boolean"],
      times: ["boolean"],
      absolutePath: ["boolean"],
      symlinks: ["string"]
    });
    if (options && options.checksum !== undefined && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
      throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(", ")}`);
    }
    if (options && options.symlinks !== undefined && symlinkOptions.indexOf(options.symlinks) === -1) {
      throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(", ")}`);
    }
  };
  var createInspectObj = (path, options, stat) => {
    const obj = {};
    obj.name = pathUtil.basename(path);
    if (stat.isFile()) {
      obj.type = "file";
      obj.size = stat.size;
    } else if (stat.isDirectory()) {
      obj.type = "dir";
    } else if (stat.isSymbolicLink()) {
      obj.type = "symlink";
    } else {
      obj.type = "other";
    }
    if (options.mode) {
      obj.mode = stat.mode;
    }
    if (options.times) {
      obj.accessTime = stat.atime;
      obj.modifyTime = stat.mtime;
      obj.changeTime = stat.ctime;
      obj.birthTime = stat.birthtime;
    }
    if (options.absolutePath) {
      obj.absolutePath = path;
    }
    return obj;
  };
  var fileChecksum = (path, algo) => {
    const hash = crypto2.createHash(algo);
    const data = fs.readFileSync(path);
    hash.update(data);
    return hash.digest("hex");
  };
  var addExtraFieldsSync = (path, inspectObj, options) => {
    if (inspectObj.type === "file" && options.checksum) {
      inspectObj[options.checksum] = fileChecksum(path, options.checksum);
    } else if (inspectObj.type === "symlink") {
      inspectObj.pointsAt = fs.readlinkSync(path);
    }
  };
  var inspectSync = (path, options) => {
    let statOperation = fs.lstatSync;
    let stat;
    const opts = options || {};
    if (opts.symlinks === "follow") {
      statOperation = fs.statSync;
    }
    try {
      stat = statOperation(path);
    } catch (err) {
      if (err.code === "ENOENT") {
        return;
      }
      throw err;
    }
    const inspectObj = createInspectObj(path, opts, stat);
    addExtraFieldsSync(path, inspectObj, opts);
    return inspectObj;
  };
  var fileChecksumAsync = (path, algo) => {
    return new Promise((resolve2, reject) => {
      const hash = crypto2.createHash(algo);
      const s = fs.createReadStream(path);
      s.on("data", (data) => {
        hash.update(data);
      });
      s.on("end", () => {
        resolve2(hash.digest("hex"));
      });
      s.on("error", reject);
    });
  };
  var addExtraFieldsAsync = (path, inspectObj, options) => {
    if (inspectObj.type === "file" && options.checksum) {
      return fileChecksumAsync(path, options.checksum).then((checksum) => {
        inspectObj[options.checksum] = checksum;
        return inspectObj;
      });
    } else if (inspectObj.type === "symlink") {
      return fs.readlink(path).then((linkPath) => {
        inspectObj.pointsAt = linkPath;
        return inspectObj;
      });
    }
    return Promise.resolve(inspectObj);
  };
  var inspectAsync = (path, options) => {
    return new Promise((resolve2, reject) => {
      let statOperation = fs.lstat;
      const opts = options || {};
      if (opts.symlinks === "follow") {
        statOperation = fs.stat;
      }
      statOperation(path).then((stat) => {
        const inspectObj = createInspectObj(path, opts, stat);
        addExtraFieldsAsync(path, inspectObj, opts).then(resolve2, reject);
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
  exports2.symlinkOptions = symlinkOptions;
  exports2.validateInput = validateInput;
  exports2.sync = inspectSync;
  exports2.async = inspectAsync;
});

// node_modules/fs-jetpack/lib/list.js
var require_list = __commonJS((exports2) => {
  var fs = require_fs();
  var validate = require_validate();
  var validateInput = (methodName, path) => {
    const methodSignature = `${methodName}(path)`;
    validate.argument(methodSignature, "path", path, ["string", "undefined"]);
  };
  var listSync = (path) => {
    try {
      return fs.readdirSync(path);
    } catch (err) {
      if (err.code === "ENOENT") {
        return;
      }
      throw err;
    }
  };
  var listAsync = (path) => {
    return new Promise((resolve2, reject) => {
      fs.readdir(path).then((list) => {
        resolve2(list);
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = listSync;
  exports2.async = listAsync;
});

// node_modules/fs-jetpack/lib/utils/tree_walker.js
var require_tree_walker = __commonJS((exports2) => {
  var fs = require("fs");
  var pathUtil = require("path");
  var inspect = require_inspect();
  var list = require_list();
  var fileType = (dirent) => {
    if (dirent.isDirectory()) {
      return "dir";
    }
    if (dirent.isFile()) {
      return "file";
    }
    if (dirent.isSymbolicLink()) {
      return "symlink";
    }
    return "other";
  };
  var initialWalkSync = (path, options, callback) => {
    if (options.maxLevelsDeep === undefined) {
      options.maxLevelsDeep = Infinity;
    }
    const performInspectOnEachNode = options.inspectOptions !== undefined;
    if (options.symlinks) {
      if (options.inspectOptions === undefined) {
        options.inspectOptions = { symlinks: options.symlinks };
      } else {
        options.inspectOptions.symlinks = options.symlinks;
      }
    }
    const walkSync = (path2, currentLevel) => {
      fs.readdirSync(path2, { withFileTypes: true }).forEach((direntItem) => {
        const withFileTypesNotSupported = typeof direntItem === "string";
        let fileItemPath;
        if (withFileTypesNotSupported) {
          fileItemPath = pathUtil.join(path2, direntItem);
        } else {
          fileItemPath = pathUtil.join(path2, direntItem.name);
        }
        let fileItem;
        if (performInspectOnEachNode) {
          fileItem = inspect.sync(fileItemPath, options.inspectOptions);
        } else if (withFileTypesNotSupported) {
          const inspectObject = inspect.sync(fileItemPath, options.inspectOptions);
          fileItem = { name: inspectObject.name, type: inspectObject.type };
        } else {
          const type = fileType(direntItem);
          if (type === "symlink" && options.symlinks === "follow") {
            const symlinkPointsTo = fs.statSync(fileItemPath);
            fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
          } else {
            fileItem = { name: direntItem.name, type };
          }
        }
        if (fileItem !== undefined) {
          callback(fileItemPath, fileItem);
          if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
            walkSync(fileItemPath, currentLevel + 1);
          }
        }
      });
    };
    const item = inspect.sync(path, options.inspectOptions);
    if (item) {
      if (performInspectOnEachNode) {
        callback(path, item);
      } else {
        callback(path, { name: item.name, type: item.type });
      }
      if (item.type === "dir") {
        walkSync(path, 1);
      }
    } else {
      callback(path, undefined);
    }
  };
  var maxConcurrentOperations = 5;
  var initialWalkAsync = (path, options, callback, doneCallback) => {
    if (options.maxLevelsDeep === undefined) {
      options.maxLevelsDeep = Infinity;
    }
    const performInspectOnEachNode = options.inspectOptions !== undefined;
    if (options.symlinks) {
      if (options.inspectOptions === undefined) {
        options.inspectOptions = { symlinks: options.symlinks };
      } else {
        options.inspectOptions.symlinks = options.symlinks;
      }
    }
    const concurrentOperationsQueue = [];
    let nowDoingConcurrentOperations = 0;
    const checkConcurrentOperations = () => {
      if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) {
        doneCallback();
      } else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
        const operation = concurrentOperationsQueue.pop();
        nowDoingConcurrentOperations += 1;
        operation();
      }
    };
    const whenConcurrencySlotAvailable = (operation) => {
      concurrentOperationsQueue.push(operation);
      checkConcurrentOperations();
    };
    const concurrentOperationDone = () => {
      nowDoingConcurrentOperations -= 1;
      checkConcurrentOperations();
    };
    const walkAsync = (path2, currentLevel) => {
      const goDeeperIfDir = (fileItemPath, fileItem) => {
        if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
          walkAsync(fileItemPath, currentLevel + 1);
        }
      };
      whenConcurrencySlotAvailable(() => {
        fs.readdir(path2, { withFileTypes: true }, (err, files) => {
          if (err) {
            doneCallback(err);
          } else {
            files.forEach((direntItem) => {
              const withFileTypesNotSupported = typeof direntItem === "string";
              let fileItemPath;
              if (withFileTypesNotSupported) {
                fileItemPath = pathUtil.join(path2, direntItem);
              } else {
                fileItemPath = pathUtil.join(path2, direntItem.name);
              }
              if (performInspectOnEachNode || withFileTypesNotSupported) {
                whenConcurrencySlotAvailable(() => {
                  inspect.async(fileItemPath, options.inspectOptions).then((fileItem) => {
                    if (fileItem !== undefined) {
                      if (performInspectOnEachNode) {
                        callback(fileItemPath, fileItem);
                      } else {
                        callback(fileItemPath, {
                          name: fileItem.name,
                          type: fileItem.type
                        });
                      }
                      goDeeperIfDir(fileItemPath, fileItem);
                    }
                    concurrentOperationDone();
                  }).catch((err2) => {
                    doneCallback(err2);
                  });
                });
              } else {
                const type = fileType(direntItem);
                if (type === "symlink" && options.symlinks === "follow") {
                  whenConcurrencySlotAvailable(() => {
                    fs.stat(fileItemPath, (err2, symlinkPointsTo) => {
                      if (err2) {
                        doneCallback(err2);
                      } else {
                        const fileItem = {
                          name: direntItem.name,
                          type: fileType(symlinkPointsTo)
                        };
                        callback(fileItemPath, fileItem);
                        goDeeperIfDir(fileItemPath, fileItem);
                        concurrentOperationDone();
                      }
                    });
                  });
                } else {
                  const fileItem = { name: direntItem.name, type };
                  callback(fileItemPath, fileItem);
                  goDeeperIfDir(fileItemPath, fileItem);
                }
              }
            });
            concurrentOperationDone();
          }
        });
      });
    };
    inspect.async(path, options.inspectOptions).then((item) => {
      if (item) {
        if (performInspectOnEachNode) {
          callback(path, item);
        } else {
          callback(path, { name: item.name, type: item.type });
        }
        if (item.type === "dir") {
          walkAsync(path, 1);
        } else {
          doneCallback();
        }
      } else {
        callback(path, undefined);
        doneCallback();
      }
    }).catch((err) => {
      doneCallback(err);
    });
  };
  exports2.sync = initialWalkSync;
  exports2.async = initialWalkAsync;
});

// node_modules/minimatch/lib/path.js
var require_path = __commonJS((exports2, module2) => {
  var isWindows = typeof process === "object" && process && process.platform === "win32";
  module2.exports = isWindows ? { sep: "\\" } : { sep: "/" };
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS((exports2, module2) => {
  module2.exports = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp)
      a = maybeMatch(a, str);
    if (b instanceof RegExp)
      b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
      if (a === b) {
        return [ai, bi];
      }
      begs = [];
      left = str.length;
      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }
          bi = str.indexOf(b, i + 1);
        }
        i = ai < bi && ai >= 0 ? ai : bi;
      }
      if (begs.length) {
        result = [left, right];
      }
    }
    return result;
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS((exports2, module2) => {
  var balanced = require_balanced_match();
  module2.exports = expandTop;
  var escSlash = "\x00SLASH" + Math.random() + "\x00";
  var escOpen = "\x00OPEN" + Math.random() + "\x00";
  var escClose = "\x00CLOSE" + Math.random() + "\x00";
  var escComma = "\x00COMMA" + Math.random() + "\x00";
  var escPeriod = "\x00PERIOD" + Math.random() + "\x00";
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
  }
  function parseCommaParts(str) {
    if (!str)
      return [""];
    var parts = [];
    var m = balanced("{", "}", str);
    if (!m)
      return str.split(",");
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(",");
    p[p.length - 1] += "{" + body + "}";
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str)
      return [];
    if (str.substr(0, 2) === "{}") {
      str = "\\{\\}" + str.substr(2);
    }
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function embrace(str) {
    return "{" + str + "}";
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced("{", "}", str);
    if (!m)
      return [str];
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [""];
    if (/\$$/.test(m.pre)) {
      for (var k = 0;k < post.length; k++) {
        var expansion = pre + "{" + m.body + "}" + post[k];
        expansions.push(expansion);
      }
    } else {
      var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
      var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
      var isSequence = isNumericSequence || isAlphaSequence;
      var isOptions = m.body.indexOf(",") >= 0;
      if (!isSequence && !isOptions) {
        if (m.post.match(/,.*\}/)) {
          str = m.pre + "{" + m.body + escClose + m.post;
          return expand(str);
        }
        return [str];
      }
      var n;
      if (isSequence) {
        n = m.body.split(/\.\./);
      } else {
        n = parseCommaParts(m.body);
        if (n.length === 1) {
          n = expand(n[0], false).map(embrace);
          if (n.length === 1) {
            return post.map(function(p) {
              return m.pre + n[0] + p;
            });
          }
        }
      }
      var N;
      if (isSequence) {
        var x = numeric(n[0]);
        var y = numeric(n[1]);
        var width = Math.max(n[0].length, n[1].length);
        var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
        var test = lte;
        var reverse = y < x;
        if (reverse) {
          incr *= -1;
          test = gte;
        }
        var pad = n.some(isPadded);
        N = [];
        for (var i = x;test(i, y); i += incr) {
          var c2;
          if (isAlphaSequence) {
            c2 = String.fromCharCode(i);
            if (c2 === "\\")
              c2 = "";
          } else {
            c2 = String(i);
            if (pad) {
              var need = width - c2.length;
              if (need > 0) {
                var z = new Array(need + 1).join("0");
                if (i < 0)
                  c2 = "-" + z + c2.slice(1);
                else
                  c2 = z + c2;
              }
            }
          }
          N.push(c2);
        }
      } else {
        N = [];
        for (var j = 0;j < n.length; j++) {
          N.push.apply(N, expand(n[j], false));
        }
      }
      for (var j = 0;j < N.length; j++) {
        for (var k = 0;k < post.length; k++) {
          var expansion = pre + N[j] + post[k];
          if (!isTop || isSequence || expansion)
            expansions.push(expansion);
        }
      }
    }
    return expansions;
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS((exports2, module2) => {
  var minimatch = module2.exports = (p, pattern, options = {}) => {
    assertValidPattern(pattern);
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    return new Minimatch(pattern, options).match(p);
  };
  module2.exports = minimatch;
  var path = require_path();
  minimatch.sep = path.sep;
  var GLOBSTAR = Symbol("globstar **");
  minimatch.GLOBSTAR = GLOBSTAR;
  var expand = require_brace_expansion();
  var plTypes = {
    "!": { open: "(?:(?!(?:", close: "))[^/]*?)" },
    "?": { open: "(?:", close: ")?" },
    "+": { open: "(?:", close: ")+" },
    "*": { open: "(?:", close: ")*" },
    "@": { open: "(?:", close: ")" }
  };
  var qmark = "[^/]";
  var star = qmark + "*?";
  var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  var charSet = (s) => s.split("").reduce((set, c2) => {
    set[c2] = true;
    return set;
  }, {});
  var reSpecials = charSet("().*{}+?[]^$\\!");
  var addPatternStartSet = charSet("[.(");
  var slashSplit = /\/+/;
  minimatch.filter = (pattern, options = {}) => (p, i, list) => minimatch(p, pattern, options);
  var ext = (a, b = {}) => {
    const t = {};
    Object.keys(a).forEach((k) => t[k] = a[k]);
    Object.keys(b).forEach((k) => t[k] = b[k]);
    return t;
  };
  minimatch.defaults = (def) => {
    if (!def || typeof def !== "object" || !Object.keys(def).length) {
      return minimatch;
    }
    const orig = minimatch;
    const m = (p, pattern, options) => orig(p, pattern, ext(def, options));
    m.Minimatch = class Minimatch2 extends orig.Minimatch {
      constructor(pattern, options) {
        super(pattern, ext(def, options));
      }
    };
    m.Minimatch.defaults = (options) => orig.defaults(ext(def, options)).Minimatch;
    m.filter = (pattern, options) => orig.filter(pattern, ext(def, options));
    m.defaults = (options) => orig.defaults(ext(def, options));
    m.makeRe = (pattern, options) => orig.makeRe(pattern, ext(def, options));
    m.braceExpand = (pattern, options) => orig.braceExpand(pattern, ext(def, options));
    m.match = (list, pattern, options) => orig.match(list, pattern, ext(def, options));
    return m;
  };
  minimatch.braceExpand = (pattern, options) => braceExpand(pattern, options);
  var braceExpand = (pattern, options = {}) => {
    assertValidPattern(pattern);
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
      return [pattern];
    }
    return expand(pattern);
  };
  var MAX_PATTERN_LENGTH = 1024 * 64;
  var assertValidPattern = (pattern) => {
    if (typeof pattern !== "string") {
      throw new TypeError("invalid pattern");
    }
    if (pattern.length > MAX_PATTERN_LENGTH) {
      throw new TypeError("pattern is too long");
    }
  };
  var SUBPARSE = Symbol("subparse");
  minimatch.makeRe = (pattern, options) => new Minimatch(pattern, options || {}).makeRe();
  minimatch.match = (list, pattern, options = {}) => {
    const mm = new Minimatch(pattern, options);
    list = list.filter((f) => mm.match(f));
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  var globUnescape = (s) => s.replace(/\\(.)/g, "$1");
  var charUnescape = (s) => s.replace(/\\([^-\]])/g, "$1");
  var regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  var braExpEscape = (s) => s.replace(/[[\]\\]/g, "\\$&");

  class Minimatch {
    constructor(pattern, options) {
      assertValidPattern(pattern);
      if (!options)
        options = {};
      this.options = options;
      this.set = [];
      this.pattern = pattern;
      this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
      if (this.windowsPathsNoEscape) {
        this.pattern = this.pattern.replace(/\\/g, "/");
      }
      this.regexp = null;
      this.negate = false;
      this.comment = false;
      this.empty = false;
      this.partial = !!options.partial;
      this.make();
    }
    debug() {
    }
    make() {
      const pattern = this.pattern;
      const options = this.options;
      if (!options.nocomment && pattern.charAt(0) === "#") {
        this.comment = true;
        return;
      }
      if (!pattern) {
        this.empty = true;
        return;
      }
      this.parseNegate();
      let set = this.globSet = this.braceExpand();
      if (options.debug)
        this.debug = (...args) => console.error(...args);
      this.debug(this.pattern, set);
      set = this.globParts = set.map((s) => s.split(slashSplit));
      this.debug(this.pattern, set);
      set = set.map((s, si, set2) => s.map(this.parse, this));
      this.debug(this.pattern, set);
      set = set.filter((s) => s.indexOf(false) === -1);
      this.debug(this.pattern, set);
      this.set = set;
    }
    parseNegate() {
      if (this.options.nonegate)
        return;
      const pattern = this.pattern;
      let negate = false;
      let negateOffset = 0;
      for (let i = 0;i < pattern.length && pattern.charAt(i) === "!"; i++) {
        negate = !negate;
        negateOffset++;
      }
      if (negateOffset)
        this.pattern = pattern.slice(negateOffset);
      this.negate = negate;
    }
    matchOne(file, pattern, partial) {
      var options = this.options;
      this.debug("matchOne", { this: this, file, pattern });
      this.debug("matchOne", file.length, pattern.length);
      for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length;fi < fl && pi < pl; fi++, pi++) {
        this.debug("matchOne loop");
        var p = pattern[pi];
        var f = file[fi];
        this.debug(pattern, p, f);
        if (p === false)
          return false;
        if (p === GLOBSTAR) {
          this.debug("GLOBSTAR", [pattern, p, f]);
          var fr = fi;
          var pr = pi + 1;
          if (pr === pl) {
            this.debug("** at the end");
            for (;fi < fl; fi++) {
              if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
                return false;
            }
            return true;
          }
          while (fr < fl) {
            var swallowee = file[fr];
            this.debug(`
globstar while`, file, fr, pattern, pr, swallowee);
            if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
              this.debug("globstar found match!", fr, fl, swallowee);
              return true;
            } else {
              if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                this.debug("dot detected!", file, fr, pattern, pr);
                break;
              }
              this.debug("globstar swallow a segment, and continue");
              fr++;
            }
          }
          if (partial) {
            this.debug(`
>>> no match, partial?`, file, fr, pattern, pr);
            if (fr === fl)
              return true;
          }
          return false;
        }
        var hit;
        if (typeof p === "string") {
          hit = f === p;
          this.debug("string match", p, f, hit);
        } else {
          hit = f.match(p);
          this.debug("pattern match", p, f, hit);
        }
        if (!hit)
          return false;
      }
      if (fi === fl && pi === pl) {
        return true;
      } else if (fi === fl) {
        return partial;
      } else if (pi === pl) {
        return fi === fl - 1 && file[fi] === "";
      }
      throw new Error("wtf?");
    }
    braceExpand() {
      return braceExpand(this.pattern, this.options);
    }
    parse(pattern, isSub) {
      assertValidPattern(pattern);
      const options = this.options;
      if (pattern === "**") {
        if (!options.noglobstar)
          return GLOBSTAR;
        else
          pattern = "*";
      }
      if (pattern === "")
        return "";
      let re = "";
      let hasMagic = false;
      let escaping = false;
      const patternListStack = [];
      const negativeLists = [];
      let stateChar;
      let inClass = false;
      let reClassStart = -1;
      let classStart = -1;
      let cs;
      let pl;
      let sp;
      let dotTravAllowed = pattern.charAt(0) === ".";
      let dotFileAllowed = options.dot || dotTravAllowed;
      const patternStart = () => dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      const subPatternStart = (p) => p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
      const clearStateChar = () => {
        if (stateChar) {
          switch (stateChar) {
            case "*":
              re += star;
              hasMagic = true;
              break;
            case "?":
              re += qmark;
              hasMagic = true;
              break;
            default:
              re += "\\" + stateChar;
              break;
          }
          this.debug("clearStateChar %j %j", stateChar, re);
          stateChar = false;
        }
      };
      for (let i = 0, c2;i < pattern.length && (c2 = pattern.charAt(i)); i++) {
        this.debug("%s\t%s %s %j", pattern, i, re, c2);
        if (escaping) {
          if (c2 === "/") {
            return false;
          }
          if (reSpecials[c2]) {
            re += "\\";
          }
          re += c2;
          escaping = false;
          continue;
        }
        switch (c2) {
          case "/": {
            return false;
          }
          case "\\":
            if (inClass && pattern.charAt(i + 1) === "-") {
              re += c2;
              continue;
            }
            clearStateChar();
            escaping = true;
            continue;
          case "?":
          case "*":
          case "+":
          case "@":
          case "!":
            this.debug("%s\t%s %s %j <-- stateChar", pattern, i, re, c2);
            if (inClass) {
              this.debug("  in class");
              if (c2 === "!" && i === classStart + 1)
                c2 = "^";
              re += c2;
              continue;
            }
            this.debug("call clearStateChar %j", stateChar);
            clearStateChar();
            stateChar = c2;
            if (options.noext)
              clearStateChar();
            continue;
          case "(": {
            if (inClass) {
              re += "(";
              continue;
            }
            if (!stateChar) {
              re += "\\(";
              continue;
            }
            const plEntry = {
              type: stateChar,
              start: i - 1,
              reStart: re.length,
              open: plTypes[stateChar].open,
              close: plTypes[stateChar].close
            };
            this.debug(this.pattern, "\t", plEntry);
            patternListStack.push(plEntry);
            re += plEntry.open;
            if (plEntry.start === 0 && plEntry.type !== "!") {
              dotTravAllowed = true;
              re += subPatternStart(pattern.slice(i + 1));
            }
            this.debug("plType %j %j", stateChar, re);
            stateChar = false;
            continue;
          }
          case ")": {
            const plEntry = patternListStack[patternListStack.length - 1];
            if (inClass || !plEntry) {
              re += "\\)";
              continue;
            }
            patternListStack.pop();
            clearStateChar();
            hasMagic = true;
            pl = plEntry;
            re += pl.close;
            if (pl.type === "!") {
              negativeLists.push(Object.assign(pl, { reEnd: re.length }));
            }
            continue;
          }
          case "|": {
            const plEntry = patternListStack[patternListStack.length - 1];
            if (inClass || !plEntry) {
              re += "\\|";
              continue;
            }
            clearStateChar();
            re += "|";
            if (plEntry.start === 0 && plEntry.type !== "!") {
              dotTravAllowed = true;
              re += subPatternStart(pattern.slice(i + 1));
            }
            continue;
          }
          case "[":
            clearStateChar();
            if (inClass) {
              re += "\\" + c2;
              continue;
            }
            inClass = true;
            classStart = i;
            reClassStart = re.length;
            re += c2;
            continue;
          case "]":
            if (i === classStart + 1 || !inClass) {
              re += "\\" + c2;
              continue;
            }
            cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
              re += c2;
            } catch (er) {
              re = re.substring(0, reClassStart) + "(?:$.)";
            }
            hasMagic = true;
            inClass = false;
            continue;
          default:
            clearStateChar();
            if (reSpecials[c2] && !(c2 === "^" && inClass)) {
              re += "\\";
            }
            re += c2;
            break;
        }
      }
      if (inClass) {
        cs = pattern.slice(classStart + 1);
        sp = this.parse(cs, SUBPARSE);
        re = re.substring(0, reClassStart) + "\\[" + sp[0];
        hasMagic = hasMagic || sp[1];
      }
      for (pl = patternListStack.pop();pl; pl = patternListStack.pop()) {
        let tail;
        tail = re.slice(pl.reStart + pl.open.length);
        this.debug("setting tail", re, pl);
        tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2) => {
          if (!$2) {
            $2 = "\\";
          }
          return $1 + $1 + $2 + "|";
        });
        this.debug(`tail=%j
   %s`, tail, tail, pl, re);
        const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
        hasMagic = true;
        re = re.slice(0, pl.reStart) + t + "\\(" + tail;
      }
      clearStateChar();
      if (escaping) {
        re += "\\\\";
      }
      const addPatternStart = addPatternStartSet[re.charAt(0)];
      for (let n = negativeLists.length - 1;n > -1; n--) {
        const nl = negativeLists[n];
        const nlBefore = re.slice(0, nl.reStart);
        const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
        let nlAfter = re.slice(nl.reEnd);
        const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
        const closeParensBefore = nlBefore.split(")").length;
        const openParensBefore = nlBefore.split("(").length - closeParensBefore;
        let cleanAfter = nlAfter;
        for (let i = 0;i < openParensBefore; i++) {
          cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
        }
        nlAfter = cleanAfter;
        const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
        re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      }
      if (re !== "" && hasMagic) {
        re = "(?=.)" + re;
      }
      if (addPatternStart) {
        re = patternStart() + re;
      }
      if (isSub === SUBPARSE) {
        return [re, hasMagic];
      }
      if (options.nocase && !hasMagic) {
        hasMagic = pattern.toUpperCase() !== pattern.toLowerCase();
      }
      if (!hasMagic) {
        return globUnescape(pattern);
      }
      const flags = options.nocase ? "i" : "";
      try {
        return Object.assign(new RegExp("^" + re + "$", flags), {
          _glob: pattern,
          _src: re
        });
      } catch (er) {
        return new RegExp("$.");
      }
    }
    makeRe() {
      if (this.regexp || this.regexp === false)
        return this.regexp;
      const set = this.set;
      if (!set.length) {
        this.regexp = false;
        return this.regexp;
      }
      const options = this.options;
      const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
      const flags = options.nocase ? "i" : "";
      let re = set.map((pattern) => {
        pattern = pattern.map((p) => typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src).reduce((set2, p) => {
          if (!(set2[set2.length - 1] === GLOBSTAR && p === GLOBSTAR)) {
            set2.push(p);
          }
          return set2;
        }, []);
        pattern.forEach((p, i) => {
          if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) {
            return;
          }
          if (i === 0) {
            if (pattern.length > 1) {
              pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
            } else {
              pattern[i] = twoStar;
            }
          } else if (i === pattern.length - 1) {
            pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
          } else {
            pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
            pattern[i + 1] = GLOBSTAR;
          }
        });
        return pattern.filter((p) => p !== GLOBSTAR).join("/");
      }).join("|");
      re = "^(?:" + re + ")$";
      if (this.negate)
        re = "^(?!" + re + ").*$";
      try {
        this.regexp = new RegExp(re, flags);
      } catch (ex) {
        this.regexp = false;
      }
      return this.regexp;
    }
    match(f, partial = this.partial) {
      this.debug("match", f, this.pattern);
      if (this.comment)
        return false;
      if (this.empty)
        return f === "";
      if (f === "/" && partial)
        return true;
      const options = this.options;
      if (path.sep !== "/") {
        f = f.split(path.sep).join("/");
      }
      f = f.split(slashSplit);
      this.debug(this.pattern, "split", f);
      const set = this.set;
      this.debug(this.pattern, "set", set);
      let filename;
      for (let i = f.length - 1;i >= 0; i--) {
        filename = f[i];
        if (filename)
          break;
      }
      for (let i = 0;i < set.length; i++) {
        const pattern = set[i];
        let file = f;
        if (options.matchBase && pattern.length === 1) {
          file = [filename];
        }
        const hit = this.matchOne(file, pattern, partial);
        if (hit) {
          if (options.flipNegate)
            return true;
          return !this.negate;
        }
      }
      if (options.flipNegate)
        return false;
      return this.negate;
    }
    static defaults(def) {
      return minimatch.defaults(def).Minimatch;
    }
  }
  minimatch.Minimatch = Minimatch;
});

// node_modules/fs-jetpack/lib/utils/matcher.js
var require_matcher = __commonJS((exports2) => {
  var Minimatch = require_minimatch().Minimatch;
  var convertPatternToAbsolutePath = (basePath, pattern) => {
    const hasSlash = pattern.indexOf("/") !== -1;
    const isAbsolute = /^!?\//.test(pattern);
    const isNegated = /^!/.test(pattern);
    let separator;
    if (!isAbsolute && hasSlash) {
      const patternWithoutFirstCharacters = pattern.replace(/^!/, "").replace(/^\.\//, "");
      if (/\/$/.test(basePath)) {
        separator = "";
      } else {
        separator = "/";
      }
      if (isNegated) {
        return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
      }
      return `${basePath}${separator}${patternWithoutFirstCharacters}`;
    }
    return pattern;
  };
  exports2.create = (basePath, patterns, ignoreCase) => {
    let normalizedPatterns;
    if (typeof patterns === "string") {
      normalizedPatterns = [patterns];
    } else {
      normalizedPatterns = patterns;
    }
    const matchers = normalizedPatterns.map((pattern) => {
      return convertPatternToAbsolutePath(basePath, pattern);
    }).map((pattern) => {
      return new Minimatch(pattern, {
        matchBase: true,
        nocomment: true,
        nocase: ignoreCase || false,
        dot: true,
        windowsPathsNoEscape: true
      });
    });
    const performMatch = (absolutePath) => {
      let mode = "matching";
      let weHaveMatch = false;
      let currentMatcher;
      let i;
      for (i = 0;i < matchers.length; i += 1) {
        currentMatcher = matchers[i];
        if (currentMatcher.negate) {
          mode = "negation";
          if (i === 0) {
            weHaveMatch = true;
          }
        }
        if (mode === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) {
          return false;
        }
        if (mode === "matching" && !weHaveMatch) {
          weHaveMatch = currentMatcher.match(absolutePath);
        }
      }
      return weHaveMatch;
    };
    return performMatch;
  };
});

// node_modules/fs-jetpack/lib/find.js
var require_find = __commonJS((exports2) => {
  var pathUtil = require("path");
  var treeWalker = require_tree_walker();
  var inspect = require_inspect();
  var matcher = require_matcher();
  var validate = require_validate();
  var validateInput = (methodName, path, options) => {
    const methodSignature = `${methodName}([path], options)`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.options(methodSignature, "options", options, {
      matching: ["string", "array of string"],
      filter: ["function"],
      files: ["boolean"],
      directories: ["boolean"],
      recursive: ["boolean"],
      ignoreCase: ["boolean"]
    });
  };
  var normalizeOptions = (options) => {
    const opts = options || {};
    if (opts.matching === undefined) {
      opts.matching = "*";
    }
    if (opts.files === undefined) {
      opts.files = true;
    }
    if (opts.ignoreCase === undefined) {
      opts.ignoreCase = false;
    }
    if (opts.directories === undefined) {
      opts.directories = false;
    }
    if (opts.recursive === undefined) {
      opts.recursive = true;
    }
    return opts;
  };
  var processFoundPaths = (foundPaths, cwd) => {
    return foundPaths.map((path) => {
      return pathUtil.relative(cwd, path);
    });
  };
  var generatePathDoesntExistError = (path) => {
    const err = new Error(`Path you want to find stuff in doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
  };
  var generatePathNotDirectoryError = (path) => {
    const err = new Error(`Path you want to find stuff in must be a directory ${path}`);
    err.code = "ENOTDIR";
    return err;
  };
  var findSync = (path, options) => {
    const foundAbsolutePaths = [];
    const matchesAnyOfGlobs = matcher.create(path, options.matching, options.ignoreCase);
    let maxLevelsDeep = Infinity;
    if (options.recursive === false) {
      maxLevelsDeep = 1;
    }
    treeWalker.sync(path, {
      maxLevelsDeep,
      symlinks: "follow",
      inspectOptions: { times: true, absolutePath: true }
    }, (itemPath, item) => {
      if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
        const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
        if (weHaveMatch) {
          if (options.filter) {
            const passedThroughFilter = options.filter(item);
            if (passedThroughFilter) {
              foundAbsolutePaths.push(itemPath);
            }
          } else {
            foundAbsolutePaths.push(itemPath);
          }
        }
      }
    });
    foundAbsolutePaths.sort();
    return processFoundPaths(foundAbsolutePaths, options.cwd);
  };
  var findSyncInit = (path, options) => {
    const entryPointInspect = inspect.sync(path, { symlinks: "follow" });
    if (entryPointInspect === undefined) {
      throw generatePathDoesntExistError(path);
    } else if (entryPointInspect.type !== "dir") {
      throw generatePathNotDirectoryError(path);
    }
    return findSync(path, normalizeOptions(options));
  };
  var findAsync = (path, options) => {
    return new Promise((resolve2, reject) => {
      const foundAbsolutePaths = [];
      const matchesAnyOfGlobs = matcher.create(path, options.matching, options.ignoreCase);
      let maxLevelsDeep = Infinity;
      if (options.recursive === false) {
        maxLevelsDeep = 1;
      }
      let waitingForFiltersToFinish = 0;
      let treeWalkerDone = false;
      const maybeDone = () => {
        if (treeWalkerDone && waitingForFiltersToFinish === 0) {
          foundAbsolutePaths.sort();
          resolve2(processFoundPaths(foundAbsolutePaths, options.cwd));
        }
      };
      treeWalker.async(path, {
        maxLevelsDeep,
        symlinks: "follow",
        inspectOptions: { times: true, absolutePath: true }
      }, (itemPath, item) => {
        if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
          const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
          if (weHaveMatch) {
            if (options.filter) {
              const passedThroughFilter = options.filter(item);
              const isPromise = typeof passedThroughFilter.then === "function";
              if (isPromise) {
                waitingForFiltersToFinish += 1;
                passedThroughFilter.then((passedThroughFilterResult) => {
                  if (passedThroughFilterResult) {
                    foundAbsolutePaths.push(itemPath);
                  }
                  waitingForFiltersToFinish -= 1;
                  maybeDone();
                }).catch((err) => {
                  reject(err);
                });
              } else if (passedThroughFilter) {
                foundAbsolutePaths.push(itemPath);
              }
            } else {
              foundAbsolutePaths.push(itemPath);
            }
          }
        }
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          treeWalkerDone = true;
          maybeDone();
        }
      });
    });
  };
  var findAsyncInit = (path, options) => {
    return inspect.async(path, { symlinks: "follow" }).then((entryPointInspect) => {
      if (entryPointInspect === undefined) {
        throw generatePathDoesntExistError(path);
      } else if (entryPointInspect.type !== "dir") {
        throw generatePathNotDirectoryError(path);
      }
      return findAsync(path, normalizeOptions(options));
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = findSyncInit;
  exports2.async = findAsyncInit;
});

// node_modules/fs-jetpack/lib/inspect_tree.js
var require_inspect_tree = __commonJS((exports2) => {
  var crypto2 = require("crypto");
  var pathUtil = require("path");
  var inspect = require_inspect();
  var list = require_list();
  var validate = require_validate();
  var treeWalker = require_tree_walker();
  var validateInput = (methodName, path, options) => {
    const methodSignature = `${methodName}(path, [options])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.options(methodSignature, "options", options, {
      checksum: ["string"],
      relativePath: ["boolean"],
      times: ["boolean"],
      symlinks: ["string"]
    });
    if (options && options.checksum !== undefined && inspect.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
      throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect.supportedChecksumAlgorithms.join(", ")}`);
    }
    if (options && options.symlinks !== undefined && inspect.symlinkOptions.indexOf(options.symlinks) === -1) {
      throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect.symlinkOptions.join(", ")}`);
    }
  };
  var relativePathInTree = (parentInspectObj, inspectObj) => {
    if (parentInspectObj === undefined) {
      return ".";
    }
    return parentInspectObj.relativePath + "/" + inspectObj.name;
  };
  var checksumOfDir = (inspectList, algo) => {
    const hash = crypto2.createHash(algo);
    inspectList.forEach((inspectObj) => {
      hash.update(inspectObj.name + inspectObj[algo]);
    });
    return hash.digest("hex");
  };
  var calculateTreeDependentProperties = (parentInspectObj, inspectObj, options) => {
    if (options.relativePath) {
      inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
    }
    if (inspectObj.type === "dir") {
      inspectObj.children.forEach((childInspectObj) => {
        calculateTreeDependentProperties(inspectObj, childInspectObj, options);
      });
      inspectObj.size = 0;
      inspectObj.children.sort((a, b) => {
        if (a.type === "dir" && b.type === "file") {
          return -1;
        }
        if (a.type === "file" && b.type === "dir") {
          return 1;
        }
        return a.name.localeCompare(b.name);
      });
      inspectObj.children.forEach((child) => {
        inspectObj.size += child.size || 0;
      });
      if (options.checksum) {
        inspectObj[options.checksum] = checksumOfDir(inspectObj.children, options.checksum);
      }
    }
  };
  var findParentInTree = (treeNode, pathChain, item) => {
    const name = pathChain[0];
    if (pathChain.length > 1) {
      const itemInTreeForPathChain = treeNode.children.find((child) => {
        return child.name === name;
      });
      return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
    }
    return treeNode;
  };
  var inspectTreeSync = (path, opts) => {
    const options = opts || {};
    let tree;
    treeWalker.sync(path, { inspectOptions: options }, (itemPath, item) => {
      if (item) {
        if (item.type === "dir") {
          item.children = [];
        }
        const relativePath = pathUtil.relative(path, itemPath);
        if (relativePath === "") {
          tree = item;
        } else {
          const parentItem = findParentInTree(tree, relativePath.split(pathUtil.sep), item);
          parentItem.children.push(item);
        }
      }
    });
    if (tree) {
      calculateTreeDependentProperties(undefined, tree, options);
    }
    return tree;
  };
  var inspectTreeAsync = (path, opts) => {
    const options = opts || {};
    let tree;
    return new Promise((resolve2, reject) => {
      treeWalker.async(path, { inspectOptions: options }, (itemPath, item) => {
        if (item) {
          if (item.type === "dir") {
            item.children = [];
          }
          const relativePath = pathUtil.relative(path, itemPath);
          if (relativePath === "") {
            tree = item;
          } else {
            const parentItem = findParentInTree(tree, relativePath.split(pathUtil.sep), item);
            parentItem.children.push(item);
          }
        }
      }, (err) => {
        if (err) {
          reject(err);
        } else {
          if (tree) {
            calculateTreeDependentProperties(undefined, tree, options);
          }
          resolve2(tree);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = inspectTreeSync;
  exports2.async = inspectTreeAsync;
});

// node_modules/fs-jetpack/lib/exists.js
var require_exists = __commonJS((exports2) => {
  var fs = require_fs();
  var validate = require_validate();
  var validateInput = (methodName, path) => {
    const methodSignature = `${methodName}(path)`;
    validate.argument(methodSignature, "path", path, ["string"]);
  };
  var existsSync2 = (path) => {
    try {
      const stat = fs.statSync(path);
      if (stat.isDirectory()) {
        return "dir";
      } else if (stat.isFile()) {
        return "file";
      }
      return "other";
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }
    return false;
  };
  var existsAsync = (path) => {
    return new Promise((resolve2, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isDirectory()) {
          resolve2("dir");
        } else if (stat.isFile()) {
          resolve2("file");
        } else {
          resolve2("other");
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(false);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = existsSync2;
  exports2.async = existsAsync;
});

// node_modules/fs-jetpack/lib/copy.js
var require_copy = __commonJS((exports2) => {
  var pathUtil = require("path");
  var fs = require_fs();
  var dir = require_dir();
  var exists = require_exists();
  var inspect = require_inspect();
  var write = require_write();
  var matcher = require_matcher();
  var fileMode = require_mode();
  var treeWalker = require_tree_walker();
  var validate = require_validate();
  var validateInput = (methodName, from, to, options) => {
    const methodSignature = `${methodName}(from, to, [options])`;
    validate.argument(methodSignature, "from", from, ["string"]);
    validate.argument(methodSignature, "to", to, ["string"]);
    validate.options(methodSignature, "options", options, {
      overwrite: ["boolean", "function"],
      matching: ["string", "array of string"],
      ignoreCase: ["boolean"]
    });
  };
  var parseOptions = (options, from) => {
    const opts = options || {};
    const parsedOptions = {};
    if (opts.ignoreCase === undefined) {
      opts.ignoreCase = false;
    }
    parsedOptions.overwrite = opts.overwrite;
    if (opts.matching) {
      parsedOptions.allowedToCopy = matcher.create(from, opts.matching, opts.ignoreCase);
    } else {
      parsedOptions.allowedToCopy = () => {
        return true;
      };
    }
    return parsedOptions;
  };
  var generateNoSourceError = (path) => {
    const err = new Error(`Path to copy doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
  };
  var generateDestinationExistsError = (path) => {
    const err = new Error(`Destination path already exists ${path}`);
    err.code = "EEXIST";
    return err;
  };
  var inspectOptions = {
    mode: true,
    symlinks: "report",
    times: true,
    absolutePath: true
  };
  var shouldThrowDestinationExistsError = (context) => {
    return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
  };
  var checksBeforeCopyingSync = (from, to, opts) => {
    if (!exists.sync(from)) {
      throw generateNoSourceError(from);
    }
    if (exists.sync(to) && !opts.overwrite) {
      throw generateDestinationExistsError(to);
    }
  };
  var canOverwriteItSync = (context) => {
    if (typeof context.opts.overwrite === "function") {
      const destInspectData = inspect.sync(context.destPath, inspectOptions);
      return context.opts.overwrite(context.srcInspectData, destInspectData);
    }
    return context.opts.overwrite === true;
  };
  var copyFileSync = (srcPath, destPath, mode, context) => {
    const data = fs.readFileSync(srcPath);
    try {
      fs.writeFileSync(destPath, data, { mode, flag: "wx" });
    } catch (err) {
      if (err.code === "ENOENT") {
        write.sync(destPath, data, { mode });
      } else if (err.code === "EEXIST") {
        if (canOverwriteItSync(context)) {
          fs.writeFileSync(destPath, data, { mode });
        } else if (shouldThrowDestinationExistsError(context)) {
          throw generateDestinationExistsError(context.destPath);
        }
      } else {
        throw err;
      }
    }
  };
  var copySymlinkSync = (from, to) => {
    const symlinkPointsAt = fs.readlinkSync(from);
    try {
      fs.symlinkSync(symlinkPointsAt, to);
    } catch (err) {
      if (err.code === "EEXIST") {
        fs.unlinkSync(to);
        fs.symlinkSync(symlinkPointsAt, to);
      } else {
        throw err;
      }
    }
  };
  var copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
    const context = { srcPath, destPath, srcInspectData, opts };
    const mode = fileMode.normalizeFileMode(srcInspectData.mode);
    if (srcInspectData.type === "dir") {
      dir.createSync(destPath, { mode });
    } else if (srcInspectData.type === "file") {
      copyFileSync(srcPath, destPath, mode, context);
    } else if (srcInspectData.type === "symlink") {
      copySymlinkSync(srcPath, destPath);
    }
  };
  var copySync = (from, to, options) => {
    const opts = parseOptions(options, from);
    checksBeforeCopyingSync(from, to, opts);
    treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
      const rel = pathUtil.relative(from, srcPath);
      const destPath = pathUtil.resolve(to, rel);
      if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
        copyItemSync(srcPath, srcInspectData, destPath, opts);
      }
    });
  };
  var checksBeforeCopyingAsync = (from, to, opts) => {
    return exists.async(from).then((srcPathExists) => {
      if (!srcPathExists) {
        throw generateNoSourceError(from);
      } else {
        return exists.async(to);
      }
    }).then((destPathExists) => {
      if (destPathExists && !opts.overwrite) {
        throw generateDestinationExistsError(to);
      }
    });
  };
  var canOverwriteItAsync = (context) => {
    return new Promise((resolve2, reject) => {
      if (typeof context.opts.overwrite === "function") {
        inspect.async(context.destPath, inspectOptions).then((destInspectData) => {
          resolve2(context.opts.overwrite(context.srcInspectData, destInspectData));
        }).catch(reject);
      } else {
        resolve2(context.opts.overwrite === true);
      }
    });
  };
  var copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
    return new Promise((resolve2, reject) => {
      const runOpts = runOptions || {};
      let flags = "wx";
      if (runOpts.overwrite) {
        flags = "w";
      }
      const readStream = fs.createReadStream(srcPath);
      const writeStream = fs.createWriteStream(destPath, { mode, flags });
      readStream.on("error", reject);
      writeStream.on("error", (err) => {
        readStream.resume();
        if (err.code === "ENOENT") {
          dir.createAsync(pathUtil.dirname(destPath)).then(() => {
            copyFileAsync(srcPath, destPath, mode, context).then(resolve2, reject);
          }).catch(reject);
        } else if (err.code === "EEXIST") {
          canOverwriteItAsync(context).then((canOverwite) => {
            if (canOverwite) {
              copyFileAsync(srcPath, destPath, mode, context, {
                overwrite: true
              }).then(resolve2, reject);
            } else if (shouldThrowDestinationExistsError(context)) {
              reject(generateDestinationExistsError(destPath));
            } else {
              resolve2();
            }
          }).catch(reject);
        } else {
          reject(err);
        }
      });
      writeStream.on("finish", resolve2);
      readStream.pipe(writeStream);
    });
  };
  var copySymlinkAsync = (from, to) => {
    return fs.readlink(from).then((symlinkPointsAt) => {
      return new Promise((resolve2, reject) => {
        fs.symlink(symlinkPointsAt, to).then(resolve2).catch((err) => {
          if (err.code === "EEXIST") {
            fs.unlink(to).then(() => {
              return fs.symlink(symlinkPointsAt, to);
            }).then(resolve2, reject);
          } else {
            reject(err);
          }
        });
      });
    });
  };
  var copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
    const context = { srcPath, destPath, srcInspectData, opts };
    const mode = fileMode.normalizeFileMode(srcInspectData.mode);
    if (srcInspectData.type === "dir") {
      return dir.createAsync(destPath, { mode });
    } else if (srcInspectData.type === "file") {
      return copyFileAsync(srcPath, destPath, mode, context);
    } else if (srcInspectData.type === "symlink") {
      return copySymlinkAsync(srcPath, destPath);
    }
    return Promise.resolve();
  };
  var copyAsync = (from, to, options) => {
    return new Promise((resolve2, reject) => {
      const opts = parseOptions(options, from);
      checksBeforeCopyingAsync(from, to, opts).then(() => {
        let allFilesDelivered = false;
        let filesInProgress = 0;
        treeWalker.async(from, { inspectOptions }, (srcPath, item) => {
          if (item) {
            const rel = pathUtil.relative(from, srcPath);
            const destPath = pathUtil.resolve(to, rel);
            if (opts.allowedToCopy(srcPath, item, destPath)) {
              filesInProgress += 1;
              copyItemAsync(srcPath, item, destPath, opts).then(() => {
                filesInProgress -= 1;
                if (allFilesDelivered && filesInProgress === 0) {
                  resolve2();
                }
              }).catch(reject);
            }
          }
        }, (err) => {
          if (err) {
            reject(err);
          } else {
            allFilesDelivered = true;
            if (allFilesDelivered && filesInProgress === 0) {
              resolve2();
            }
          }
        });
      }).catch(reject);
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = copySync;
  exports2.async = copyAsync;
});

// node_modules/fs-jetpack/lib/move.js
var require_move = __commonJS((exports2) => {
  var pathUtil = require("path");
  var fs = require_fs();
  var validate = require_validate();
  var copy = require_copy();
  var dir = require_dir();
  var exists = require_exists();
  var remove = require_remove();
  var validateInput = (methodName, from, to, options) => {
    const methodSignature = `${methodName}(from, to, [options])`;
    validate.argument(methodSignature, "from", from, ["string"]);
    validate.argument(methodSignature, "to", to, ["string"]);
    validate.options(methodSignature, "options", options, {
      overwrite: ["boolean"]
    });
  };
  var parseOptions = (options) => {
    const opts = options || {};
    return opts;
  };
  var generateDestinationExistsError = (path) => {
    const err = new Error(`Destination path already exists ${path}`);
    err.code = "EEXIST";
    return err;
  };
  var generateSourceDoesntExistError = (path) => {
    const err = new Error(`Path to move doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
  };
  var moveSync = (from, to, options) => {
    const opts = parseOptions(options);
    if (exists.sync(to) !== false && opts.overwrite !== true) {
      throw generateDestinationExistsError(to);
    }
    try {
      fs.renameSync(from, to);
    } catch (err) {
      if (err.code === "EISDIR" || err.code === "EPERM") {
        remove.sync(to);
        fs.renameSync(from, to);
      } else if (err.code === "EXDEV") {
        copy.sync(from, to, { overwrite: true });
        remove.sync(from);
      } else if (err.code === "ENOENT") {
        if (!exists.sync(from)) {
          throw generateSourceDoesntExistError(from);
        }
        dir.createSync(pathUtil.dirname(to));
        fs.renameSync(from, to);
      } else {
        throw err;
      }
    }
  };
  var ensureDestinationPathExistsAsync = (to) => {
    return new Promise((resolve2, reject) => {
      const destDir = pathUtil.dirname(to);
      exists.async(destDir).then((dstExists) => {
        if (!dstExists) {
          dir.createAsync(destDir).then(resolve2, reject);
        } else {
          reject();
        }
      }).catch(reject);
    });
  };
  var moveAsync = (from, to, options) => {
    const opts = parseOptions(options);
    return new Promise((resolve2, reject) => {
      exists.async(to).then((destinationExists) => {
        if (destinationExists !== false && opts.overwrite !== true) {
          reject(generateDestinationExistsError(to));
        } else {
          fs.rename(from, to).then(resolve2).catch((err) => {
            if (err.code === "EISDIR" || err.code === "EPERM") {
              remove.async(to).then(() => fs.rename(from, to)).then(resolve2, reject);
            } else if (err.code === "EXDEV") {
              copy.async(from, to, { overwrite: true }).then(() => remove.async(from)).then(resolve2, reject);
            } else if (err.code === "ENOENT") {
              exists.async(from).then((srcExists) => {
                if (!srcExists) {
                  reject(generateSourceDoesntExistError(from));
                } else {
                  ensureDestinationPathExistsAsync(to).then(() => {
                    return fs.rename(from, to);
                  }).then(resolve2, reject);
                }
              }).catch(reject);
            } else {
              reject(err);
            }
          });
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = moveSync;
  exports2.async = moveAsync;
});

// node_modules/fs-jetpack/lib/read.js
var require_read = __commonJS((exports2) => {
  var fs = require_fs();
  var validate = require_validate();
  var supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];
  var validateInput = (methodName, path, returnAs) => {
    const methodSignature = `${methodName}(path, returnAs)`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.argument(methodSignature, "returnAs", returnAs, [
      "string",
      "undefined"
    ]);
    if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
      throw new Error(`Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(", ")}`);
    }
  };
  var jsonDateParser = (key, value) => {
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    if (typeof value === "string") {
      if (reISO.exec(value)) {
        return new Date(value);
      }
    }
    return value;
  };
  var makeNicerJsonParsingError = (path, err) => {
    const nicerError = new Error(`JSON parsing failed while reading ${path} [${err}]`);
    nicerError.originalError = err;
    return nicerError;
  };
  var readSync = (path, returnAs) => {
    const retAs = returnAs || "utf8";
    let data;
    let encoding = "utf8";
    if (retAs === "buffer") {
      encoding = null;
    }
    try {
      data = fs.readFileSync(path, { encoding });
    } catch (err) {
      if (err.code === "ENOENT") {
        return;
      }
      throw err;
    }
    try {
      if (retAs === "json") {
        data = JSON.parse(data);
      } else if (retAs === "jsonWithDates") {
        data = JSON.parse(data, jsonDateParser);
      }
    } catch (err) {
      throw makeNicerJsonParsingError(path, err);
    }
    return data;
  };
  var readAsync = (path, returnAs) => {
    return new Promise((resolve2, reject) => {
      const retAs = returnAs || "utf8";
      let encoding = "utf8";
      if (retAs === "buffer") {
        encoding = null;
      }
      fs.readFile(path, { encoding }).then((data) => {
        try {
          if (retAs === "json") {
            resolve2(JSON.parse(data));
          } else if (retAs === "jsonWithDates") {
            resolve2(JSON.parse(data, jsonDateParser));
          } else {
            resolve2(data);
          }
        } catch (err) {
          reject(makeNicerJsonParsingError(path, err));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve2(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = readSync;
  exports2.async = readAsync;
});

// node_modules/fs-jetpack/lib/rename.js
var require_rename = __commonJS((exports2) => {
  var pathUtil = require("path");
  var move = require_move();
  var validate = require_validate();
  var validateInput = (methodName, path, newName, options) => {
    const methodSignature = `${methodName}(path, newName, [options])`;
    validate.argument(methodSignature, "path", path, ["string"]);
    validate.argument(methodSignature, "newName", newName, ["string"]);
    validate.options(methodSignature, "options", options, {
      overwrite: ["boolean"]
    });
    if (pathUtil.basename(newName) !== newName) {
      throw new Error(`Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`);
    }
  };
  var renameSync = (path, newName, options) => {
    const newPath = pathUtil.join(pathUtil.dirname(path), newName);
    move.sync(path, newPath, options);
  };
  var renameAsync = (path, newName, options) => {
    const newPath = pathUtil.join(pathUtil.dirname(path), newName);
    return move.async(path, newPath, options);
  };
  exports2.validateInput = validateInput;
  exports2.sync = renameSync;
  exports2.async = renameAsync;
});

// node_modules/fs-jetpack/lib/symlink.js
var require_symlink = __commonJS((exports2) => {
  var pathUtil = require("path");
  var fs = require_fs();
  var validate = require_validate();
  var dir = require_dir();
  var validateInput = (methodName, symlinkValue, path) => {
    const methodSignature = `${methodName}(symlinkValue, path)`;
    validate.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
    validate.argument(methodSignature, "path", path, ["string"]);
  };
  var symlinkSync = (symlinkValue, path) => {
    try {
      fs.symlinkSync(symlinkValue, path);
    } catch (err) {
      if (err.code === "ENOENT") {
        dir.createSync(pathUtil.dirname(path));
        fs.symlinkSync(symlinkValue, path);
      } else {
        throw err;
      }
    }
  };
  var symlinkAsync = (symlinkValue, path) => {
    return new Promise((resolve2, reject) => {
      fs.symlink(symlinkValue, path).then(resolve2).catch((err) => {
        if (err.code === "ENOENT") {
          dir.createAsync(pathUtil.dirname(path)).then(() => {
            return fs.symlink(symlinkValue, path);
          }).then(resolve2, reject);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = symlinkSync;
  exports2.async = symlinkAsync;
});

// node_modules/fs-jetpack/lib/streams.js
var require_streams = __commonJS((exports2) => {
  var fs = require("fs");
  exports2.createWriteStream = fs.createWriteStream;
  exports2.createReadStream = fs.createReadStream;
});

// node_modules/fs-jetpack/lib/tmp_dir.js
var require_tmp_dir = __commonJS((exports2) => {
  var pathUtil = require("path");
  var os = require("os");
  var crypto2 = require("crypto");
  var dir = require_dir();
  var fs = require_fs();
  var validate = require_validate();
  var validateInput = (methodName, options) => {
    const methodSignature = `${methodName}([options])`;
    validate.options(methodSignature, "options", options, {
      prefix: ["string"],
      basePath: ["string"]
    });
  };
  var getOptionsDefaults = (passedOptions, cwdPath) => {
    passedOptions = passedOptions || {};
    const options = {};
    if (typeof passedOptions.prefix !== "string") {
      options.prefix = "";
    } else {
      options.prefix = passedOptions.prefix;
    }
    if (typeof passedOptions.basePath === "string") {
      options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
    } else {
      options.basePath = os.tmpdir();
    }
    return options;
  };
  var randomStringLength = 32;
  var tmpDirSync = (cwdPath, passedOptions) => {
    const options = getOptionsDefaults(passedOptions, cwdPath);
    const randomString = crypto2.randomBytes(randomStringLength / 2).toString("hex");
    const dirPath = pathUtil.join(options.basePath, options.prefix + randomString);
    try {
      fs.mkdirSync(dirPath);
    } catch (err) {
      if (err.code === "ENOENT") {
        dir.sync(dirPath);
      } else {
        throw err;
      }
    }
    return dirPath;
  };
  var tmpDirAsync = (cwdPath, passedOptions) => {
    return new Promise((resolve2, reject) => {
      const options = getOptionsDefaults(passedOptions, cwdPath);
      crypto2.randomBytes(randomStringLength / 2, (err, bytes) => {
        if (err) {
          reject(err);
        } else {
          const randomString = bytes.toString("hex");
          const dirPath = pathUtil.join(options.basePath, options.prefix + randomString);
          fs.mkdir(dirPath, (err2) => {
            if (err2) {
              if (err2.code === "ENOENT") {
                dir.async(dirPath).then(() => {
                  resolve2(dirPath);
                }, reject);
              } else {
                reject(err2);
              }
            } else {
              resolve2(dirPath);
            }
          });
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = tmpDirSync;
  exports2.async = tmpDirAsync;
});

// node_modules/fs-jetpack/lib/jetpack.js
var require_jetpack = __commonJS((exports2, module2) => {
  var util = require("util");
  var pathUtil = require("path");
  var append = require_append();
  var dir = require_dir();
  var file = require_file();
  var find = require_find();
  var inspect = require_inspect();
  var inspectTree = require_inspect_tree();
  var copy = require_copy();
  var exists = require_exists();
  var list = require_list();
  var move = require_move();
  var read = require_read();
  var remove = require_remove();
  var rename = require_rename();
  var symlink = require_symlink();
  var streams = require_streams();
  var tmpDir = require_tmp_dir();
  var write = require_write();
  var jetpackContext = (cwdPath) => {
    const getCwdPath = () => {
      return cwdPath || process.cwd();
    };
    const cwd = function() {
      if (arguments.length === 0) {
        return getCwdPath();
      }
      const args = Array.prototype.slice.call(arguments);
      const pathParts = [getCwdPath()].concat(args);
      return jetpackContext(pathUtil.resolve.apply(null, pathParts));
    };
    const resolvePath = (path) => {
      return pathUtil.resolve(getCwdPath(), path);
    };
    const getPath = function() {
      Array.prototype.unshift.call(arguments, getCwdPath());
      return pathUtil.resolve.apply(null, arguments);
    };
    const normalizeOptions = (options) => {
      const opts = options || {};
      opts.cwd = getCwdPath();
      return opts;
    };
    const api = {
      cwd,
      path: getPath,
      append: (path, data, options) => {
        append.validateInput("append", path, data, options);
        append.sync(resolvePath(path), data, options);
      },
      appendAsync: (path, data, options) => {
        append.validateInput("appendAsync", path, data, options);
        return append.async(resolvePath(path), data, options);
      },
      copy: (from, to, options) => {
        copy.validateInput("copy", from, to, options);
        copy.sync(resolvePath(from), resolvePath(to), options);
      },
      copyAsync: (from, to, options) => {
        copy.validateInput("copyAsync", from, to, options);
        return copy.async(resolvePath(from), resolvePath(to), options);
      },
      createWriteStream: (path, options) => {
        return streams.createWriteStream(resolvePath(path), options);
      },
      createReadStream: (path, options) => {
        return streams.createReadStream(resolvePath(path), options);
      },
      dir: (path, criteria) => {
        dir.validateInput("dir", path, criteria);
        const normalizedPath = resolvePath(path);
        dir.sync(normalizedPath, criteria);
        return cwd(normalizedPath);
      },
      dirAsync: (path, criteria) => {
        dir.validateInput("dirAsync", path, criteria);
        return new Promise((resolve2, reject) => {
          const normalizedPath = resolvePath(path);
          dir.async(normalizedPath, criteria).then(() => {
            resolve2(cwd(normalizedPath));
          }, reject);
        });
      },
      exists: (path) => {
        exists.validateInput("exists", path);
        return exists.sync(resolvePath(path));
      },
      existsAsync: (path) => {
        exists.validateInput("existsAsync", path);
        return exists.async(resolvePath(path));
      },
      file: (path, criteria) => {
        file.validateInput("file", path, criteria);
        file.sync(resolvePath(path), criteria);
        return api;
      },
      fileAsync: (path, criteria) => {
        file.validateInput("fileAsync", path, criteria);
        return new Promise((resolve2, reject) => {
          file.async(resolvePath(path), criteria).then(() => {
            resolve2(api);
          }, reject);
        });
      },
      find: (startPath, options) => {
        if (typeof options === "undefined" && typeof startPath === "object") {
          options = startPath;
          startPath = ".";
        }
        find.validateInput("find", startPath, options);
        return find.sync(resolvePath(startPath), normalizeOptions(options));
      },
      findAsync: (startPath, options) => {
        if (typeof options === "undefined" && typeof startPath === "object") {
          options = startPath;
          startPath = ".";
        }
        find.validateInput("findAsync", startPath, options);
        return find.async(resolvePath(startPath), normalizeOptions(options));
      },
      inspect: (path, fieldsToInclude) => {
        inspect.validateInput("inspect", path, fieldsToInclude);
        return inspect.sync(resolvePath(path), fieldsToInclude);
      },
      inspectAsync: (path, fieldsToInclude) => {
        inspect.validateInput("inspectAsync", path, fieldsToInclude);
        return inspect.async(resolvePath(path), fieldsToInclude);
      },
      inspectTree: (path, options) => {
        inspectTree.validateInput("inspectTree", path, options);
        return inspectTree.sync(resolvePath(path), options);
      },
      inspectTreeAsync: (path, options) => {
        inspectTree.validateInput("inspectTreeAsync", path, options);
        return inspectTree.async(resolvePath(path), options);
      },
      list: (path) => {
        list.validateInput("list", path);
        return list.sync(resolvePath(path || "."));
      },
      listAsync: (path) => {
        list.validateInput("listAsync", path);
        return list.async(resolvePath(path || "."));
      },
      move: (from, to, options) => {
        move.validateInput("move", from, to, options);
        move.sync(resolvePath(from), resolvePath(to), options);
      },
      moveAsync: (from, to, options) => {
        move.validateInput("moveAsync", from, to, options);
        return move.async(resolvePath(from), resolvePath(to), options);
      },
      read: (path, returnAs) => {
        read.validateInput("read", path, returnAs);
        return read.sync(resolvePath(path), returnAs);
      },
      readAsync: (path, returnAs) => {
        read.validateInput("readAsync", path, returnAs);
        return read.async(resolvePath(path), returnAs);
      },
      remove: (path) => {
        remove.validateInput("remove", path);
        remove.sync(resolvePath(path || "."));
      },
      removeAsync: (path) => {
        remove.validateInput("removeAsync", path);
        return remove.async(resolvePath(path || "."));
      },
      rename: (path, newName, options) => {
        rename.validateInput("rename", path, newName, options);
        rename.sync(resolvePath(path), newName, options);
      },
      renameAsync: (path, newName, options) => {
        rename.validateInput("renameAsync", path, newName, options);
        return rename.async(resolvePath(path), newName, options);
      },
      symlink: (symlinkValue, path) => {
        symlink.validateInput("symlink", symlinkValue, path);
        symlink.sync(symlinkValue, resolvePath(path));
      },
      symlinkAsync: (symlinkValue, path) => {
        symlink.validateInput("symlinkAsync", symlinkValue, path);
        return symlink.async(symlinkValue, resolvePath(path));
      },
      tmpDir: (options) => {
        tmpDir.validateInput("tmpDir", options);
        const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
        return cwd(pathOfCreatedDirectory);
      },
      tmpDirAsync: (options) => {
        tmpDir.validateInput("tmpDirAsync", options);
        return new Promise((resolve2, reject) => {
          tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
            resolve2(cwd(pathOfCreatedDirectory));
          }, reject);
        });
      },
      write: (path, data, options) => {
        write.validateInput("write", path, data, options);
        write.sync(resolvePath(path), data, options);
      },
      writeAsync: (path, data, options) => {
        write.validateInput("writeAsync", path, data, options);
        return write.async(resolvePath(path), data, options);
      }
    };
    if (util.inspect.custom !== undefined) {
      api[util.inspect.custom] = () => {
        return `[fs-jetpack CWD: ${getCwdPath()}]`;
      };
    }
    return api;
  };
  module2.exports = jetpackContext;
});

// node_modules/fs-jetpack/main.js
var require_main = __commonJS((exports2, module2) => {
  var jetpack = require_jetpack();
  module2.exports = jetpack();
});

// internal/main/init.ts
var exports_init = {};
__export(exports_init, {
  init: () => init2
});
module.exports = __toCommonJS(exports_init);

// internal/utils/color.ts
var c = {
  esc: "\x1B[0m",
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  blackbg: "\x1B[40m",
  redbg: "\x1B[41m",
  greenbg: "\x1B[42m",
  yellowbg: "\x1B[43m",
  bluebg: "\x1B[44m",
  magentabg: "\x1B[45m",
  cyanbg: "\x1B[46m",
  whitebg: "\x1B[47m",
  bold: "\x1B[1m",
  dim: "\x1B[2m",
  italic: "\x1B[3m",
  underline: "\x1B[4m",
  rgb: (r, g, b) => `\x1B[38;2;${r};${g};${b}m`,
  rgbbg: (r, g, b) => `\x1B[48;2;${r};${g};${b}m`
};

// internal/utils/static.ts
var zstd = __toESM(require_index_node());

// node_modules/bun-sqlite-key-value/dist/index.js
var import_bun_sqlite = require("bun:sqlite");
var import_node_v8 = require("v8");
var import_node_path = require("path");
var import_node_fs = require("fs");
var MIN_UTF8_CHAR = String.fromCodePoint(1);
var MAX_UTF8_CHAR = String.fromCodePoint(1114111);
var INVALID_COUNT_ERROR_LABEL = "[INVALID_COUNT_ERROR]";
var NO_ARRAY_ERROR_LABEL = "[NO_ARRAY_ERROR]";
var ITEM_NOT_EXISTS_ERROR_LABEL = "[ITEM_NOT_EXISTS]";
var INDEX_OUT_OF_RANGE_ERROR_LABEL = "[INDEX_OUT_OF_RANGE]";

class BunSqliteKeyValue {
  db;
  ttlMs;
  maxExpiringItemsInDb;
  data = this.getDataObject();
  d = this.data;
  deleteExpiredStatement;
  deleteStatement;
  clearStatement;
  countStatement;
  countValidStatement;
  setItemStatement;
  getItemStatement;
  getAllItemsStatement;
  getItemsStartsWithStatement;
  getKeyStatement;
  getAllKeysStatement;
  getKeysStartsWithStatement;
  countExpiringStatement;
  deleteExpiringStatement;
  getRandomKeyStatement;
  getRandomItemStatement;
  renameStatement;
  setExpiresStatement;
  getExpiresStatement;
  addTagStatement;
  deleteTagStatement;
  deleteAllTagsStatement;
  getTaggedKeysStatement;
  deleteTaggedItemsStatement;
  constructor(filename, options) {
    const {
      ttlMs,
      maxExpiringItemsInDb,
      ...otherOptions
    } = options ?? {};
    this.ttlMs = ttlMs;
    this.maxExpiringItemsInDb = maxExpiringItemsInDb;
    const dbOptions = {
      ...otherOptions,
      strict: true,
      readwrite: otherOptions?.readwrite ?? true,
      create: otherOptions?.create ?? true
    };
    if (filename?.length && filename.toLowerCase() !== ":memory:" && dbOptions.create) {
      const dbDir = import_node_path.dirname(import_node_path.resolve(filename));
      if (!import_node_fs.existsSync(dbDir)) {
        console.log(`The "${dbDir}" folder is created.`);
        import_node_fs.mkdirSync(dbDir, { recursive: true });
      }
    }
    this.db = new import_bun_sqlite.Database(filename, dbOptions);
    this.db.run("PRAGMA journal_mode = WAL");
    this.db.run("PRAGMA foreign_keys = ON");
    this.db.run(`
        CREATE TABLE IF NOT EXISTS items (
            key TEXT NOT NULL PRIMARY KEY, 
            value BLOB, 
            expires INT
        ) STRICT`);
    this.db.run("CREATE INDEX IF NOT EXISTS ix_items_expires ON items (expires)");
    this.db.run(`
        CREATE TABLE IF NOT EXISTS tags (
            tag TEXT NOT NULL,
            item_key TEXT NOT NULL REFERENCES items ON DELETE CASCADE ON UPDATE CASCADE,
            PRIMARY KEY (tag, item_key)
        ) STRICT`);
    this.db.run("CREATE INDEX IF NOT EXISTS ix_tags_item_key ON tags (item_key)");
    this.clearStatement = this.db.query("DELETE FROM items");
    this.deleteStatement = this.db.query("DELETE FROM items WHERE key = $key");
    this.deleteExpiredStatement = this.db.query("DELETE FROM items WHERE expires < $now");
    this.setItemStatement = this.db.query("INSERT OR REPLACE INTO items (key, value, expires) VALUES ($key, $value, $expires)");
    this.countStatement = this.db.query("SELECT COUNT(*) AS count FROM items");
    this.countValidStatement = this.db.query("SELECT COUNT(*) AS count FROM items WHERE expires IS NULL OR expires > $now");
    this.getAllItemsStatement = this.db.query("SELECT key, value, expires FROM items");
    this.getItemStatement = this.db.query("SELECT value, expires FROM items WHERE key = $key");
    this.getItemsStartsWithStatement = this.db.query("SELECT key, value, expires FROM items WHERE key = $key OR key >= $gte AND key < $lt");
    this.getAllKeysStatement = this.db.query("SELECT key, expires FROM items");
    this.getKeyStatement = this.db.query("SELECT expires FROM items WHERE key = $key");
    this.getKeysStartsWithStatement = this.db.query("SELECT key, expires FROM items WHERE key = $key OR key >= $gte AND key < $lt");
    this.countExpiringStatement = this.db.query("SELECT COUNT(*) as count FROM items WHERE expires IS NOT NULL");
    this.deleteExpiringStatement = this.db.query(`
        DELETE FROM items WHERE key IN (
            SELECT key FROM items
            WHERE expires IS NOT NULL
            ORDER BY expires ASC
            LIMIT $limit
        )`);
    this.getRandomKeyStatement = this.db.query(`
        SELECT key FROM items 
        WHERE expires IS NULL OR expires > $now
        ORDER BY RANDOM() 
        LIMIT 1
        `);
    this.getRandomItemStatement = this.db.query(`
        SELECT key, value from items
        WHERE key = (
            SELECT key FROM items 
            WHERE expires IS NULL OR expires > $now
            ORDER BY RANDOM() 
            LIMIT 1
        )`);
    this.renameStatement = this.db.query("UPDATE items SET key = $newKey WHERE key = $oldKey");
    this.setExpiresStatement = this.db.query("UPDATE items SET expires = $expires WHERE key = $key");
    this.getExpiresStatement = this.db.query("SELECT expires FROM items WHERE key = $key");
    this.addTagStatement = this.db.query("INSERT OR IGNORE INTO tags (tag, item_key) VALUES ($tag, $item_key)");
    this.deleteTagStatement = this.db.query("DELETE FROM tags WHERE tag = $tag AND item_key = $key");
    this.deleteAllTagsStatement = this.db.query("DELETE FROM tags WHERE item_key = $key");
    this.getTaggedKeysStatement = this.db.query("SELECT item_key AS key FROM tags WHERE tag = $tag");
    this.deleteTaggedItemsStatement = this.db.query("DELETE FROM items WHERE key IN (SELECT item_key FROM tags WHERE tag = $tag)");
    this.deleteExpired();
    this.deleteOldExpiringItems();
  }
  deleteExpired() {
    this.deleteExpiredStatement.run({ now: Date.now() });
  }
  delete(keyOrKeys) {
    if (typeof keyOrKeys === "string") {
      this.deleteStatement.run({ key: keyOrKeys });
    } else if (keyOrKeys?.length) {
      this.db.transaction(() => {
        keyOrKeys.forEach((key) => {
          this.deleteStatement.run({ key });
        });
      })();
    } else {
      this.clearStatement.run();
    }
  }
  del = this.delete;
  clear() {
    this.delete();
  }
  close() {
    this.db.close();
  }
  getCount() {
    return this.countStatement.get().count;
  }
  count = this.getCount;
  get length() {
    return this.getCount();
  }
  getCountValid(deleteExpired) {
    if (deleteExpired === true) {
      return this.db.transaction(() => {
        this.deleteExpiredStatement.run({ now: Date.now() });
        return this.countStatement.get().count;
      })();
    } else {
      return this.countValidStatement.get({ now: Date.now() }).count;
    }
  }
  set(key, value, ttlMs) {
    let expires;
    ttlMs = ttlMs ?? this.ttlMs;
    if (ttlMs !== undefined && ttlMs > 0) {
      expires = Date.now() + ttlMs;
    }
    if (key === undefined) {
      key = crypto.randomUUID();
    }
    this.setItemStatement.run({ key, value: import_node_v8.serialize(value), expires });
    return key;
  }
  setValue = this.set;
  put = this.set;
  setItems(items) {
    this.db.transaction(() => {
      items.forEach(({ key, value, ttlMs }) => {
        this.set(key, value, ttlMs);
      });
    })();
  }
  get(key) {
    const record = this.getItemStatement.get({ key });
    if (!record)
      return;
    const { value, expires } = record;
    if (expires) {
      if (expires < Date.now()) {
        this.delete(key);
        return;
      }
    }
    return value ? import_node_v8.deserialize(value) : undefined;
  }
  getValue = this.get;
  getItem(key) {
    return {
      key,
      value: this.get(key)
    };
  }
  getItems(startsWithOrKeys) {
    let records;
    if (startsWithOrKeys && typeof startsWithOrKeys === "string") {
      const key = startsWithOrKeys;
      const gte = key + MIN_UTF8_CHAR;
      const lt = key + MAX_UTF8_CHAR;
      records = this.getItemsStartsWithStatement.all({ key, gte, lt });
    } else if (startsWithOrKeys) {
      records = this.db.transaction(() => {
        return startsWithOrKeys.map((key) => {
          const record = this.getItemStatement.get({ key });
          return { ...record, key };
        });
      })();
    } else {
      records = this.getAllItemsStatement.all();
    }
    if (!records?.length)
      return;
    const now = Date.now();
    const result = [];
    const keysToDelete = [];
    for (const record of records) {
      const { key, value, expires } = record;
      if (expires && expires < now) {
        keysToDelete.push(key);
      } else {
        result.push({
          key,
          value: value ? import_node_v8.deserialize(value) : undefined
        });
      }
    }
    if (keysToDelete.length === 1) {
      this.delete(keysToDelete[0]);
    } else if (keysToDelete.length > 1) {
      this.delete(keysToDelete);
    }
    if (result.length) {
      return result;
    }
  }
  getItemsArray = this.getItems;
  get items() {
    return this.getItems();
  }
  getValues(startsWithOrKeys) {
    return this.getItems(startsWithOrKeys)?.map((result) => result.value);
  }
  getValuesArray = this.getValues;
  get values() {
    return this.getValues();
  }
  getItemsAsObject(startsWithOrKeys) {
    const items = this.getItems(startsWithOrKeys);
    if (!items)
      return;
    return Object.fromEntries(items.map((item) => [item.key, item.value]));
  }
  getItemsObject = this.getItemsAsObject;
  getItemsAsMap(startsWithOrKeys) {
    const items = this.getItems(startsWithOrKeys);
    if (!items)
      return;
    return new Map(items.map((item) => [item.key, item.value]));
  }
  getItemsMap = this.getItemsAsMap;
  getValuesAsSet(startsWithOrKeys) {
    const values = this.getValues(startsWithOrKeys);
    if (!values)
      return;
    return new Set(values);
  }
  getValuesSet = this.getValuesAsSet;
  has(key) {
    const record = this.getKeyStatement.get({ key });
    if (!record)
      return false;
    if (record.expires) {
      if (record.expires < Date.now()) {
        this.delete(key);
        return false;
      }
    }
    return true;
  }
  exists = this.has;
  getKeys(startsWithOrKeys) {
    let records;
    if (startsWithOrKeys && typeof startsWithOrKeys === "string") {
      const key = startsWithOrKeys;
      const gte = key + MIN_UTF8_CHAR;
      const lt = key + MAX_UTF8_CHAR;
      records = this.getKeysStartsWithStatement.all({ key, gte, lt });
    } else if (startsWithOrKeys) {
      records = this.db.transaction(() => {
        return startsWithOrKeys.map((key) => {
          const record = this.getKeyStatement.get({ key });
          return record ? { ...record, key } : undefined;
        });
      })();
    } else {
      records = this.getAllKeysStatement.all();
    }
    if (!records?.length)
      return;
    const now = Date.now();
    const result = [];
    const keysToDelete = [];
    for (const record of records) {
      if (!record)
        continue;
      const { key, expires } = record;
      if (expires && expires < now) {
        keysToDelete.push(key);
      } else {
        result.push(key);
      }
    }
    if (keysToDelete.length === 1) {
      this.delete(keysToDelete[0]);
    } else if (keysToDelete.length > 1) {
      this.delete(keysToDelete);
    }
    if (result.length) {
      return result;
    }
  }
  get keys() {
    return this.getKeys();
  }
  getExpiringItemsCount() {
    return this.countExpiringStatement.get().count;
  }
  deleteOldExpiringItems(maxExpiringItemsInDb) {
    let maxExpiringItems = maxExpiringItemsInDb ?? this.maxExpiringItemsInDb;
    if (maxExpiringItems === undefined)
      return;
    this.db.transaction(() => {
      const count = this.getExpiringItemsCount();
      if (count <= maxExpiringItems)
        return;
      const limit = count - maxExpiringItems;
      this.deleteExpiringStatement.run({ limit });
    })();
  }
  deleteOldestExpiringItems = this.deleteOldExpiringItems;
  getDataObject() {
    const self = this;
    return new Proxy({}, {
      get(_, property) {
        return self.get(property);
      },
      set(_, property, value) {
        self.set(property, value);
        return true;
      },
      has(_, property) {
        return self.has(property);
      },
      deleteProperty(_, property) {
        self.delete(property);
        return true;
      }
    });
  }
  incr(key, incrBy = 1, ttlMs) {
    return this.db.transaction(() => {
      const newValue = Number(this.get(key) ?? 0) + incrBy;
      if (isNaN(newValue))
        return NaN;
      this.set(key, newValue, ttlMs);
      return newValue;
    }).immediate();
  }
  decr(key, decrBy = 1, ttlMs) {
    return this.incr(key, decrBy * -1, ttlMs);
  }
  append(key, value, ttlMs) {
    return this.db.transaction(() => {
      const newValue = String(this.get(key) ?? "") + value;
      this.set(key, newValue, ttlMs);
      return newValue.length;
    }).immediate();
  }
  getSet(key, value, ttlMs) {
    return this.db.transaction(() => {
      const oldValue = this.get(key);
      this.set(key, value, ttlMs);
      return oldValue;
    }).immediate();
  }
  getRandomKey() {
    return this.getRandomKeyStatement.get({ now: Date.now() })?.key ?? undefined;
  }
  randomKey = this.getRandomKey;
  getRandomItem() {
    const record = this.getRandomItemStatement.get({ now: Date.now() });
    if (!record)
      return;
    return {
      key: record.key,
      value: record.value ? import_node_v8.deserialize(record.value) : undefined
    };
  }
  randomItem = this.getRandomItem;
  getRandomValue() {
    const item = this.randomItem();
    if (item)
      return item.value;
  }
  randomValue = this.getRandomValue;
  rename(oldKey, newKey) {
    return this.db.transaction(() => {
      if (this.has(oldKey)) {
        this.deleteStatement.run({ key: newKey });
        this.renameStatement.run({ oldKey, newKey });
        return true;
      } else {
        return false;
      }
    }).immediate();
  }
  setTtl(key, ttlMs) {
    let expires;
    ttlMs = ttlMs ?? this.ttlMs;
    if (ttlMs !== undefined && ttlMs > 0) {
      expires = Date.now() + ttlMs;
    }
    return this.setExpiresStatement.run({ key, expires }).changes === 1;
  }
  getTtl(key) {
    const record = this.getExpiresStatement.get({ key });
    if (!record)
      return;
    const expires = record?.expires;
    if (!expires)
      return;
    const now = Date.now();
    if (expires < now) {
      this.delete(key);
      return;
    }
    return expires - now;
  }
  hSet(key, field, value, ttlMs) {
    return this.db.transaction(() => {
      const map = this.get(key) ?? new Map;
      const isNewField = !map.has(field);
      map.set(field, value);
      this.set(key, map, ttlMs);
      return isNewField;
    }).immediate();
  }
  hGet(key, field) {
    const map = this.get(key);
    if (map === undefined)
      return;
    return map.get(field);
  }
  hmSet(key, fields, ttlMs) {
    this.db.transaction(() => {
      const map = this.get(key) ?? new Map;
      Object.entries(fields).forEach(([field, value]) => {
        map.set(field, value);
      });
      this.set(key, map, ttlMs);
    }).immediate();
  }
  hmGet(key, fields) {
    const map = this.get(key);
    if (map === undefined)
      return;
    const result = {};
    if (fields) {
      fields.forEach((field) => {
        result[field] = map.get(field);
      });
    } else {
      Object.assign(result, Object.fromEntries(map.entries()));
    }
    return result;
  }
  hHasField(key, field) {
    const map = this.get(key);
    if (map === undefined)
      return;
    return map.has(field);
  }
  hExists = this.hHasField;
  hGetCount(key) {
    const map = this.get(key);
    if (map === undefined)
      return;
    return map.size;
  }
  hLen = this.hGetCount;
  hGetFields(key) {
    const map = this.get(key);
    if (map === undefined)
      return;
    return Array.from(map.keys());
  }
  hKeys = this.hGetFields;
  hGetValues(key) {
    const map = this.get(key);
    if (map === undefined)
      return;
    return Array.from(map.values());
  }
  hVals = this.hGetValues;
  hDelete(key, field) {
    return this.db.transaction(() => {
      const map = this.get(key);
      if (map === undefined)
        return;
      const result = map.delete(field);
      this.set(key, map);
      return result;
    }).immediate();
  }
  hIncr(key, field, incrBy = 1, ttlMs) {
    return this.db.transaction(() => {
      const map = this.get(key) ?? new Map;
      let newValue;
      try {
        newValue = Number(map.get(field) ?? 0) + incrBy;
      } catch (error) {
        if (error.toString().includes("TypeError"))
          return NaN;
        throw error;
      }
      if (isNaN(newValue))
        return NaN;
      map.set(field, newValue);
      this.set(key, map, ttlMs);
      return newValue;
    }).immediate();
  }
  hDecr(key, field, decrBy = 1, ttlMs) {
    return this.hIncr(key, field, decrBy * -1, ttlMs);
  }
  lPush(key, ...values) {
    return this.db.transaction(() => {
      const array = this.get(key) ?? new Array;
      let newLength;
      try {
        values.forEach((value) => {
          newLength = array.unshift(value);
        });
      } catch (error) {
        if (error.toString().includes("TypeError")) {
          throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
        }
        throw error;
      }
      this.set(key, array);
      return newLength;
    }).immediate();
  }
  rPush(key, ...values) {
    return this.db.transaction(() => {
      const array = this.get(key) ?? new Array;
      let newLength;
      try {
        newLength = array.push(...values);
      } catch (error) {
        if (error.toString().includes("TypeError")) {
          throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
        }
        throw error;
      }
      this.set(key, array);
      return newLength;
    }).immediate();
  }
  lPop(key, count) {
    return this.db.transaction(() => {
      const array = this.get(key);
      if (array === undefined)
        return;
      let result;
      try {
        if (count === undefined) {
          result = array.shift();
        } else if (count > 0) {
          result = array.splice(0, count);
          if (!result?.length)
            return;
        } else {
          throw new Error(INVALID_COUNT_ERROR_LABEL + " `count` must be greater then 0.");
        }
      } catch (error) {
        if (error.toString().includes("TypeError")) {
          throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
        }
        throw error;
      }
      this.set(key, array);
      return result;
    }).immediate();
  }
  rPop(key, count) {
    return this.db.transaction(() => {
      const array = this.get(key);
      if (array === undefined)
        return;
      let result;
      try {
        if (count === undefined) {
          result = array.pop();
        } else if (count > 0) {
          result = array.splice(count * -1, count);
          if (!result?.length)
            return;
          result.reverse();
        } else {
          throw new Error(INVALID_COUNT_ERROR_LABEL + " `count` must be greater then 0.");
        }
      } catch (error) {
        if (error.toString().includes("TypeError")) {
          throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
        }
        throw error;
      }
      this.set(key, array);
      return result;
    }).immediate();
  }
  lIndex(key, index) {
    const array = this.get(key);
    if (array === undefined)
      return;
    try {
      return array.at(index);
    } catch (error) {
      if (error.toString().includes("TypeError")) {
        throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
      }
      throw error;
    }
  }
  lLen(key) {
    const array = this.get(key);
    if (array === undefined)
      return 0;
    if (Array.isArray(array) === false) {
      throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
    }
    return array.length;
  }
  lSet(key, index, value) {
    return this.db.transaction(() => {
      const array = this.get(key);
      if (array === undefined) {
        throw new Error(ITEM_NOT_EXISTS_ERROR_LABEL + ` Key "${key.substring(-80)}" not found.`);
      }
      if (Array.isArray(array) === false) {
        throw new Error(NO_ARRAY_ERROR_LABEL + ` Value at "${key.substring(-80)}" is not an array.`);
      }
      const len = array.length;
      if (index >= len || index < len * -1) {
        throw new Error(INDEX_OUT_OF_RANGE_ERROR_LABEL + ` Array length: ${len}`);
      }
      if (index < 0) {
        array[len + index] = value;
      } else {
        array[index] = value;
      }
      this.set(key, array);
      return true;
    }).immediate();
  }
  addTag(key, tag) {
    try {
      return this.addTagStatement.run({ item_key: key, tag }).changes === 1;
    } catch (error) {
      if (error.toString().includes("FOREIGN KEY constraint failed")) {
        throw new Error(ITEM_NOT_EXISTS_ERROR_LABEL + ` Key "${key.substring(-80)}" not found.`);
      } else {
        throw error;
      }
    }
  }
  deleteTag(key, tag) {
    return this.deleteTagStatement.run({ key, tag }).changes === 1;
  }
  deleteTags(key, tags) {
    if (tags) {
      this.db.transaction(() => {
        tags.forEach((tag) => this.deleteTag(key, tag));
      })();
    } else {
      this.deleteAllTagsStatement.run({ key });
    }
  }
  deleteTaggedItems(tag) {
    this.deleteTaggedItemsStatement.run({ tag });
  }
  getTaggedKeys(tag) {
    const records = this.getTaggedKeysStatement.all({ tag });
    if (!records?.length)
      return;
    return records.map((record) => record.key);
  }
  getTaggedValues(tag) {
    return this.db.transaction(() => {
      const taggedKeys = this.getTaggedKeys(tag);
      if (!taggedKeys)
        return;
      return this.getValues(taggedKeys);
    })();
  }
  getTaggedItems(tag) {
    return this.db.transaction(() => {
      const taggedKeys = this.getTaggedKeys(tag);
      if (!taggedKeys)
        return;
      return this.getItems(taggedKeys);
    })();
  }
}

// internal/utils/static.ts
var import_fs_jetpack = __toESM(require_main());

// internal/main/prasi-var.ts
if (!globalThis.prasi) {
  globalThis.prasi = {};
}
var prasi = globalThis.prasi;

// node_modules/mime/dist/types/other.js
var types = {
  "application/prs.cww": ["cww"],
  "application/prs.xsf+xml": ["xsf"],
  "application/vnd.1000minds.decision-model+xml": ["1km"],
  "application/vnd.3gpp.pic-bw-large": ["plb"],
  "application/vnd.3gpp.pic-bw-small": ["psb"],
  "application/vnd.3gpp.pic-bw-var": ["pvb"],
  "application/vnd.3gpp2.tcap": ["tcap"],
  "application/vnd.3m.post-it-notes": ["pwn"],
  "application/vnd.accpac.simply.aso": ["aso"],
  "application/vnd.accpac.simply.imp": ["imp"],
  "application/vnd.acucobol": ["acu"],
  "application/vnd.acucorp": ["atc", "acutc"],
  "application/vnd.adobe.air-application-installer-package+zip": ["air"],
  "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
  "application/vnd.adobe.fxp": ["fxp", "fxpl"],
  "application/vnd.adobe.xdp+xml": ["xdp"],
  "application/vnd.adobe.xfdf": ["*xfdf"],
  "application/vnd.age": ["age"],
  "application/vnd.ahead.space": ["ahead"],
  "application/vnd.airzip.filesecure.azf": ["azf"],
  "application/vnd.airzip.filesecure.azs": ["azs"],
  "application/vnd.amazon.ebook": ["azw"],
  "application/vnd.americandynamics.acc": ["acc"],
  "application/vnd.amiga.ami": ["ami"],
  "application/vnd.android.package-archive": ["apk"],
  "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
  "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
  "application/vnd.antix.game-component": ["atx"],
  "application/vnd.apple.installer+xml": ["mpkg"],
  "application/vnd.apple.keynote": ["key"],
  "application/vnd.apple.mpegurl": ["m3u8"],
  "application/vnd.apple.numbers": ["numbers"],
  "application/vnd.apple.pages": ["pages"],
  "application/vnd.apple.pkpass": ["pkpass"],
  "application/vnd.aristanetworks.swi": ["swi"],
  "application/vnd.astraea-software.iota": ["iota"],
  "application/vnd.audiograph": ["aep"],
  "application/vnd.balsamiq.bmml+xml": ["bmml"],
  "application/vnd.blueice.multipass": ["mpm"],
  "application/vnd.bmi": ["bmi"],
  "application/vnd.businessobjects": ["rep"],
  "application/vnd.chemdraw+xml": ["cdxml"],
  "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
  "application/vnd.cinderella": ["cdy"],
  "application/vnd.citationstyles.style+xml": ["csl"],
  "application/vnd.claymore": ["cla"],
  "application/vnd.cloanto.rp9": ["rp9"],
  "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
  "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
  "application/vnd.commonspace": ["csp"],
  "application/vnd.contact.cmsg": ["cdbcmsg"],
  "application/vnd.cosmocaller": ["cmc"],
  "application/vnd.crick.clicker": ["clkx"],
  "application/vnd.crick.clicker.keyboard": ["clkk"],
  "application/vnd.crick.clicker.palette": ["clkp"],
  "application/vnd.crick.clicker.template": ["clkt"],
  "application/vnd.crick.clicker.wordbank": ["clkw"],
  "application/vnd.criticaltools.wbs+xml": ["wbs"],
  "application/vnd.ctc-posml": ["pml"],
  "application/vnd.cups-ppd": ["ppd"],
  "application/vnd.curl.car": ["car"],
  "application/vnd.curl.pcurl": ["pcurl"],
  "application/vnd.dart": ["dart"],
  "application/vnd.data-vision.rdz": ["rdz"],
  "application/vnd.dbf": ["dbf"],
  "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
  "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
  "application/vnd.dece.unspecified": ["uvx", "uvvx"],
  "application/vnd.dece.zip": ["uvz", "uvvz"],
  "application/vnd.denovo.fcselayout-link": ["fe_launch"],
  "application/vnd.dna": ["dna"],
  "application/vnd.dolby.mlp": ["mlp"],
  "application/vnd.dpgraph": ["dpg"],
  "application/vnd.dreamfactory": ["dfac"],
  "application/vnd.ds-keypoint": ["kpxx"],
  "application/vnd.dvb.ait": ["ait"],
  "application/vnd.dvb.service": ["svc"],
  "application/vnd.dynageo": ["geo"],
  "application/vnd.ecowin.chart": ["mag"],
  "application/vnd.enliven": ["nml"],
  "application/vnd.epson.esf": ["esf"],
  "application/vnd.epson.msf": ["msf"],
  "application/vnd.epson.quickanime": ["qam"],
  "application/vnd.epson.salt": ["slt"],
  "application/vnd.epson.ssf": ["ssf"],
  "application/vnd.eszigno3+xml": ["es3", "et3"],
  "application/vnd.ezpix-album": ["ez2"],
  "application/vnd.ezpix-package": ["ez3"],
  "application/vnd.fdf": ["*fdf"],
  "application/vnd.fdsn.mseed": ["mseed"],
  "application/vnd.fdsn.seed": ["seed", "dataless"],
  "application/vnd.flographit": ["gph"],
  "application/vnd.fluxtime.clip": ["ftc"],
  "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
  "application/vnd.frogans.fnc": ["fnc"],
  "application/vnd.frogans.ltf": ["ltf"],
  "application/vnd.fsc.weblaunch": ["fsc"],
  "application/vnd.fujitsu.oasys": ["oas"],
  "application/vnd.fujitsu.oasys2": ["oa2"],
  "application/vnd.fujitsu.oasys3": ["oa3"],
  "application/vnd.fujitsu.oasysgp": ["fg5"],
  "application/vnd.fujitsu.oasysprs": ["bh2"],
  "application/vnd.fujixerox.ddd": ["ddd"],
  "application/vnd.fujixerox.docuworks": ["xdw"],
  "application/vnd.fujixerox.docuworks.binder": ["xbd"],
  "application/vnd.fuzzysheet": ["fzs"],
  "application/vnd.genomatix.tuxedo": ["txd"],
  "application/vnd.geogebra.file": ["ggb"],
  "application/vnd.geogebra.slides": ["ggs"],
  "application/vnd.geogebra.tool": ["ggt"],
  "application/vnd.geometry-explorer": ["gex", "gre"],
  "application/vnd.geonext": ["gxt"],
  "application/vnd.geoplan": ["g2w"],
  "application/vnd.geospace": ["g3w"],
  "application/vnd.gmx": ["gmx"],
  "application/vnd.google-apps.document": ["gdoc"],
  "application/vnd.google-apps.presentation": ["gslides"],
  "application/vnd.google-apps.spreadsheet": ["gsheet"],
  "application/vnd.google-earth.kml+xml": ["kml"],
  "application/vnd.google-earth.kmz": ["kmz"],
  "application/vnd.gov.sk.xmldatacontainer+xml": ["xdcf"],
  "application/vnd.grafeq": ["gqf", "gqs"],
  "application/vnd.groove-account": ["gac"],
  "application/vnd.groove-help": ["ghf"],
  "application/vnd.groove-identity-message": ["gim"],
  "application/vnd.groove-injector": ["grv"],
  "application/vnd.groove-tool-message": ["gtm"],
  "application/vnd.groove-tool-template": ["tpl"],
  "application/vnd.groove-vcard": ["vcg"],
  "application/vnd.hal+xml": ["hal"],
  "application/vnd.handheld-entertainment+xml": ["zmm"],
  "application/vnd.hbci": ["hbci"],
  "application/vnd.hhe.lesson-player": ["les"],
  "application/vnd.hp-hpgl": ["hpgl"],
  "application/vnd.hp-hpid": ["hpid"],
  "application/vnd.hp-hps": ["hps"],
  "application/vnd.hp-jlyt": ["jlt"],
  "application/vnd.hp-pcl": ["pcl"],
  "application/vnd.hp-pclxl": ["pclxl"],
  "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
  "application/vnd.ibm.minipay": ["mpy"],
  "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
  "application/vnd.ibm.rights-management": ["irm"],
  "application/vnd.ibm.secure-container": ["sc"],
  "application/vnd.iccprofile": ["icc", "icm"],
  "application/vnd.igloader": ["igl"],
  "application/vnd.immervision-ivp": ["ivp"],
  "application/vnd.immervision-ivu": ["ivu"],
  "application/vnd.insors.igm": ["igm"],
  "application/vnd.intercon.formnet": ["xpw", "xpx"],
  "application/vnd.intergeo": ["i2g"],
  "application/vnd.intu.qbo": ["qbo"],
  "application/vnd.intu.qfx": ["qfx"],
  "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
  "application/vnd.irepository.package+xml": ["irp"],
  "application/vnd.is-xpr": ["xpr"],
  "application/vnd.isac.fcs": ["fcs"],
  "application/vnd.jam": ["jam"],
  "application/vnd.jcp.javame.midlet-rms": ["rms"],
  "application/vnd.jisp": ["jisp"],
  "application/vnd.joost.joda-archive": ["joda"],
  "application/vnd.kahootz": ["ktz", "ktr"],
  "application/vnd.kde.karbon": ["karbon"],
  "application/vnd.kde.kchart": ["chrt"],
  "application/vnd.kde.kformula": ["kfo"],
  "application/vnd.kde.kivio": ["flw"],
  "application/vnd.kde.kontour": ["kon"],
  "application/vnd.kde.kpresenter": ["kpr", "kpt"],
  "application/vnd.kde.kspread": ["ksp"],
  "application/vnd.kde.kword": ["kwd", "kwt"],
  "application/vnd.kenameaapp": ["htke"],
  "application/vnd.kidspiration": ["kia"],
  "application/vnd.kinar": ["kne", "knp"],
  "application/vnd.koan": ["skp", "skd", "skt", "skm"],
  "application/vnd.kodak-descriptor": ["sse"],
  "application/vnd.las.las+xml": ["lasxml"],
  "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
  "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
  "application/vnd.lotus-1-2-3": ["123"],
  "application/vnd.lotus-approach": ["apr"],
  "application/vnd.lotus-freelance": ["pre"],
  "application/vnd.lotus-notes": ["nsf"],
  "application/vnd.lotus-organizer": ["org"],
  "application/vnd.lotus-screencam": ["scm"],
  "application/vnd.lotus-wordpro": ["lwp"],
  "application/vnd.macports.portpkg": ["portpkg"],
  "application/vnd.mapbox-vector-tile": ["mvt"],
  "application/vnd.mcd": ["mcd"],
  "application/vnd.medcalcdata": ["mc1"],
  "application/vnd.mediastation.cdkey": ["cdkey"],
  "application/vnd.mfer": ["mwf"],
  "application/vnd.mfmp": ["mfm"],
  "application/vnd.micrografx.flo": ["flo"],
  "application/vnd.micrografx.igx": ["igx"],
  "application/vnd.mif": ["mif"],
  "application/vnd.mobius.daf": ["daf"],
  "application/vnd.mobius.dis": ["dis"],
  "application/vnd.mobius.mbk": ["mbk"],
  "application/vnd.mobius.mqy": ["mqy"],
  "application/vnd.mobius.msl": ["msl"],
  "application/vnd.mobius.plc": ["plc"],
  "application/vnd.mobius.txf": ["txf"],
  "application/vnd.mophun.application": ["mpn"],
  "application/vnd.mophun.certificate": ["mpc"],
  "application/vnd.mozilla.xul+xml": ["xul"],
  "application/vnd.ms-artgalry": ["cil"],
  "application/vnd.ms-cab-compressed": ["cab"],
  "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
  "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
  "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
  "application/vnd.ms-fontobject": ["eot"],
  "application/vnd.ms-htmlhelp": ["chm"],
  "application/vnd.ms-ims": ["ims"],
  "application/vnd.ms-lrm": ["lrm"],
  "application/vnd.ms-officetheme": ["thmx"],
  "application/vnd.ms-outlook": ["msg"],
  "application/vnd.ms-pki.seccat": ["cat"],
  "application/vnd.ms-pki.stl": ["*stl"],
  "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
  "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
  "application/vnd.ms-project": ["*mpp", "mpt"],
  "application/vnd.ms-word.document.macroenabled.12": ["docm"],
  "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
  "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
  "application/vnd.ms-wpl": ["wpl"],
  "application/vnd.ms-xpsdocument": ["xps"],
  "application/vnd.mseq": ["mseq"],
  "application/vnd.musician": ["mus"],
  "application/vnd.muvee.style": ["msty"],
  "application/vnd.mynfc": ["taglet"],
  "application/vnd.nato.bindingdataobject+xml": ["bdo"],
  "application/vnd.neurolanguage.nlu": ["nlu"],
  "application/vnd.nitf": ["ntf", "nitf"],
  "application/vnd.noblenet-directory": ["nnd"],
  "application/vnd.noblenet-sealer": ["nns"],
  "application/vnd.noblenet-web": ["nnw"],
  "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
  "application/vnd.nokia.n-gage.data": ["ngdat"],
  "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
  "application/vnd.nokia.radio-preset": ["rpst"],
  "application/vnd.nokia.radio-presets": ["rpss"],
  "application/vnd.novadigm.edm": ["edm"],
  "application/vnd.novadigm.edx": ["edx"],
  "application/vnd.novadigm.ext": ["ext"],
  "application/vnd.oasis.opendocument.chart": ["odc"],
  "application/vnd.oasis.opendocument.chart-template": ["otc"],
  "application/vnd.oasis.opendocument.database": ["odb"],
  "application/vnd.oasis.opendocument.formula": ["odf"],
  "application/vnd.oasis.opendocument.formula-template": ["odft"],
  "application/vnd.oasis.opendocument.graphics": ["odg"],
  "application/vnd.oasis.opendocument.graphics-template": ["otg"],
  "application/vnd.oasis.opendocument.image": ["odi"],
  "application/vnd.oasis.opendocument.image-template": ["oti"],
  "application/vnd.oasis.opendocument.presentation": ["odp"],
  "application/vnd.oasis.opendocument.presentation-template": ["otp"],
  "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
  "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
  "application/vnd.oasis.opendocument.text": ["odt"],
  "application/vnd.oasis.opendocument.text-master": ["odm"],
  "application/vnd.oasis.opendocument.text-template": ["ott"],
  "application/vnd.oasis.opendocument.text-web": ["oth"],
  "application/vnd.olpc-sugar": ["xo"],
  "application/vnd.oma.dd2+xml": ["dd2"],
  "application/vnd.openblox.game+xml": ["obgx"],
  "application/vnd.openofficeorg.extension": ["oxt"],
  "application/vnd.openstreetmap.data+xml": ["osm"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    "pptx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": [
    "sldx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
    "ppsx"
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.template": [
    "potx"
  ],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": [
    "xltx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    "docx"
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": [
    "dotx"
  ],
  "application/vnd.osgeo.mapguide.package": ["mgp"],
  "application/vnd.osgi.dp": ["dp"],
  "application/vnd.osgi.subsystem": ["esa"],
  "application/vnd.palm": ["pdb", "pqa", "oprc"],
  "application/vnd.pawaafile": ["paw"],
  "application/vnd.pg.format": ["str"],
  "application/vnd.pg.osasli": ["ei6"],
  "application/vnd.picsel": ["efif"],
  "application/vnd.pmi.widget": ["wg"],
  "application/vnd.pocketlearn": ["plf"],
  "application/vnd.powerbuilder6": ["pbd"],
  "application/vnd.previewsystems.box": ["box"],
  "application/vnd.proteus.magazine": ["mgz"],
  "application/vnd.publishare-delta-tree": ["qps"],
  "application/vnd.pvi.ptid1": ["ptid"],
  "application/vnd.pwg-xhtml-print+xml": ["xhtm"],
  "application/vnd.quark.quarkxpress": [
    "qxd",
    "qxt",
    "qwd",
    "qwt",
    "qxl",
    "qxb"
  ],
  "application/vnd.rar": ["rar"],
  "application/vnd.realvnc.bed": ["bed"],
  "application/vnd.recordare.musicxml": ["mxl"],
  "application/vnd.recordare.musicxml+xml": ["musicxml"],
  "application/vnd.rig.cryptonote": ["cryptonote"],
  "application/vnd.rim.cod": ["cod"],
  "application/vnd.rn-realmedia": ["rm"],
  "application/vnd.rn-realmedia-vbr": ["rmvb"],
  "application/vnd.route66.link66+xml": ["link66"],
  "application/vnd.sailingtracker.track": ["st"],
  "application/vnd.seemail": ["see"],
  "application/vnd.sema": ["sema"],
  "application/vnd.semd": ["semd"],
  "application/vnd.semf": ["semf"],
  "application/vnd.shana.informed.formdata": ["ifm"],
  "application/vnd.shana.informed.formtemplate": ["itp"],
  "application/vnd.shana.informed.interchange": ["iif"],
  "application/vnd.shana.informed.package": ["ipk"],
  "application/vnd.simtech-mindmapper": ["twd", "twds"],
  "application/vnd.smaf": ["mmf"],
  "application/vnd.smart.teacher": ["teacher"],
  "application/vnd.software602.filler.form+xml": ["fo"],
  "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
  "application/vnd.spotfire.dxp": ["dxp"],
  "application/vnd.spotfire.sfs": ["sfs"],
  "application/vnd.stardivision.calc": ["sdc"],
  "application/vnd.stardivision.draw": ["sda"],
  "application/vnd.stardivision.impress": ["sdd"],
  "application/vnd.stardivision.math": ["smf"],
  "application/vnd.stardivision.writer": ["sdw", "vor"],
  "application/vnd.stardivision.writer-global": ["sgl"],
  "application/vnd.stepmania.package": ["smzip"],
  "application/vnd.stepmania.stepchart": ["sm"],
  "application/vnd.sun.wadl+xml": ["wadl"],
  "application/vnd.sun.xml.calc": ["sxc"],
  "application/vnd.sun.xml.calc.template": ["stc"],
  "application/vnd.sun.xml.draw": ["sxd"],
  "application/vnd.sun.xml.draw.template": ["std"],
  "application/vnd.sun.xml.impress": ["sxi"],
  "application/vnd.sun.xml.impress.template": ["sti"],
  "application/vnd.sun.xml.math": ["sxm"],
  "application/vnd.sun.xml.writer": ["sxw"],
  "application/vnd.sun.xml.writer.global": ["sxg"],
  "application/vnd.sun.xml.writer.template": ["stw"],
  "application/vnd.sus-calendar": ["sus", "susp"],
  "application/vnd.svd": ["svd"],
  "application/vnd.symbian.install": ["sis", "sisx"],
  "application/vnd.syncml+xml": ["xsm"],
  "application/vnd.syncml.dm+wbxml": ["bdm"],
  "application/vnd.syncml.dm+xml": ["xdm"],
  "application/vnd.syncml.dmddf+xml": ["ddf"],
  "application/vnd.tao.intent-module-archive": ["tao"],
  "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
  "application/vnd.tmobile-livetv": ["tmo"],
  "application/vnd.trid.tpt": ["tpt"],
  "application/vnd.triscape.mxs": ["mxs"],
  "application/vnd.trueapp": ["tra"],
  "application/vnd.ufdl": ["ufd", "ufdl"],
  "application/vnd.uiq.theme": ["utz"],
  "application/vnd.umajin": ["umj"],
  "application/vnd.unity": ["unityweb"],
  "application/vnd.uoml+xml": ["uoml", "uo"],
  "application/vnd.vcx": ["vcx"],
  "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
  "application/vnd.visionary": ["vis"],
  "application/vnd.vsf": ["vsf"],
  "application/vnd.wap.wbxml": ["wbxml"],
  "application/vnd.wap.wmlc": ["wmlc"],
  "application/vnd.wap.wmlscriptc": ["wmlsc"],
  "application/vnd.webturbo": ["wtb"],
  "application/vnd.wolfram.player": ["nbp"],
  "application/vnd.wordperfect": ["wpd"],
  "application/vnd.wqd": ["wqd"],
  "application/vnd.wt.stf": ["stf"],
  "application/vnd.xara": ["xar"],
  "application/vnd.xfdl": ["xfdl"],
  "application/vnd.yamaha.hv-dic": ["hvd"],
  "application/vnd.yamaha.hv-script": ["hvs"],
  "application/vnd.yamaha.hv-voice": ["hvp"],
  "application/vnd.yamaha.openscoreformat": ["osf"],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
  "application/vnd.yamaha.smaf-audio": ["saf"],
  "application/vnd.yamaha.smaf-phrase": ["spf"],
  "application/vnd.yellowriver-custom-menu": ["cmp"],
  "application/vnd.zul": ["zir", "zirz"],
  "application/vnd.zzazz.deck+xml": ["zaz"],
  "application/x-7z-compressed": ["7z"],
  "application/x-abiword": ["abw"],
  "application/x-ace-compressed": ["ace"],
  "application/x-apple-diskimage": ["*dmg"],
  "application/x-arj": ["arj"],
  "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
  "application/x-authorware-map": ["aam"],
  "application/x-authorware-seg": ["aas"],
  "application/x-bcpio": ["bcpio"],
  "application/x-bdoc": ["*bdoc"],
  "application/x-bittorrent": ["torrent"],
  "application/x-blorb": ["blb", "blorb"],
  "application/x-bzip": ["bz"],
  "application/x-bzip2": ["bz2", "boz"],
  "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
  "application/x-cdlink": ["vcd"],
  "application/x-cfs-compressed": ["cfs"],
  "application/x-chat": ["chat"],
  "application/x-chess-pgn": ["pgn"],
  "application/x-chrome-extension": ["crx"],
  "application/x-cocoa": ["cco"],
  "application/x-conference": ["nsc"],
  "application/x-cpio": ["cpio"],
  "application/x-csh": ["csh"],
  "application/x-debian-package": ["*deb", "udeb"],
  "application/x-dgc-compressed": ["dgc"],
  "application/x-director": [
    "dir",
    "dcr",
    "dxr",
    "cst",
    "cct",
    "cxt",
    "w3d",
    "fgd",
    "swa"
  ],
  "application/x-doom": ["wad"],
  "application/x-dtbncx+xml": ["ncx"],
  "application/x-dtbook+xml": ["dtb"],
  "application/x-dtbresource+xml": ["res"],
  "application/x-dvi": ["dvi"],
  "application/x-envoy": ["evy"],
  "application/x-eva": ["eva"],
  "application/x-font-bdf": ["bdf"],
  "application/x-font-ghostscript": ["gsf"],
  "application/x-font-linux-psf": ["psf"],
  "application/x-font-pcf": ["pcf"],
  "application/x-font-snf": ["snf"],
  "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
  "application/x-freearc": ["arc"],
  "application/x-futuresplash": ["spl"],
  "application/x-gca-compressed": ["gca"],
  "application/x-glulx": ["ulx"],
  "application/x-gnumeric": ["gnumeric"],
  "application/x-gramps-xml": ["gramps"],
  "application/x-gtar": ["gtar"],
  "application/x-hdf": ["hdf"],
  "application/x-httpd-php": ["php"],
  "application/x-install-instructions": ["install"],
  "application/x-iso9660-image": ["*iso"],
  "application/x-iwork-keynote-sffkey": ["*key"],
  "application/x-iwork-numbers-sffnumbers": ["*numbers"],
  "application/x-iwork-pages-sffpages": ["*pages"],
  "application/x-java-archive-diff": ["jardiff"],
  "application/x-java-jnlp-file": ["jnlp"],
  "application/x-keepass2": ["kdbx"],
  "application/x-latex": ["latex"],
  "application/x-lua-bytecode": ["luac"],
  "application/x-lzh-compressed": ["lzh", "lha"],
  "application/x-makeself": ["run"],
  "application/x-mie": ["mie"],
  "application/x-mobipocket-ebook": ["*prc", "mobi"],
  "application/x-ms-application": ["application"],
  "application/x-ms-shortcut": ["lnk"],
  "application/x-ms-wmd": ["wmd"],
  "application/x-ms-wmz": ["wmz"],
  "application/x-ms-xbap": ["xbap"],
  "application/x-msaccess": ["mdb"],
  "application/x-msbinder": ["obd"],
  "application/x-mscardfile": ["crd"],
  "application/x-msclip": ["clp"],
  "application/x-msdos-program": ["*exe"],
  "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
  "application/x-msmediaview": ["mvb", "m13", "m14"],
  "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
  "application/x-msmoney": ["mny"],
  "application/x-mspublisher": ["pub"],
  "application/x-msschedule": ["scd"],
  "application/x-msterminal": ["trm"],
  "application/x-mswrite": ["wri"],
  "application/x-netcdf": ["nc", "cdf"],
  "application/x-ns-proxy-autoconfig": ["pac"],
  "application/x-nzb": ["nzb"],
  "application/x-perl": ["pl", "pm"],
  "application/x-pilot": ["*prc", "*pdb"],
  "application/x-pkcs12": ["p12", "pfx"],
  "application/x-pkcs7-certificates": ["p7b", "spc"],
  "application/x-pkcs7-certreqresp": ["p7r"],
  "application/x-rar-compressed": ["*rar"],
  "application/x-redhat-package-manager": ["rpm"],
  "application/x-research-info-systems": ["ris"],
  "application/x-sea": ["sea"],
  "application/x-sh": ["sh"],
  "application/x-shar": ["shar"],
  "application/x-shockwave-flash": ["swf"],
  "application/x-silverlight-app": ["xap"],
  "application/x-sql": ["*sql"],
  "application/x-stuffit": ["sit"],
  "application/x-stuffitx": ["sitx"],
  "application/x-subrip": ["srt"],
  "application/x-sv4cpio": ["sv4cpio"],
  "application/x-sv4crc": ["sv4crc"],
  "application/x-t3vm-image": ["t3"],
  "application/x-tads": ["gam"],
  "application/x-tar": ["tar"],
  "application/x-tcl": ["tcl", "tk"],
  "application/x-tex": ["tex"],
  "application/x-tex-tfm": ["tfm"],
  "application/x-texinfo": ["texinfo", "texi"],
  "application/x-tgif": ["*obj"],
  "application/x-ustar": ["ustar"],
  "application/x-virtualbox-hdd": ["hdd"],
  "application/x-virtualbox-ova": ["ova"],
  "application/x-virtualbox-ovf": ["ovf"],
  "application/x-virtualbox-vbox": ["vbox"],
  "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
  "application/x-virtualbox-vdi": ["vdi"],
  "application/x-virtualbox-vhd": ["vhd"],
  "application/x-virtualbox-vmdk": ["vmdk"],
  "application/x-wais-source": ["src"],
  "application/x-web-app-manifest+json": ["webapp"],
  "application/x-x509-ca-cert": ["der", "crt", "pem"],
  "application/x-xfig": ["fig"],
  "application/x-xliff+xml": ["*xlf"],
  "application/x-xpinstall": ["xpi"],
  "application/x-xz": ["xz"],
  "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  "audio/vnd.dece.audio": ["uva", "uvva"],
  "audio/vnd.digital-winds": ["eol"],
  "audio/vnd.dra": ["dra"],
  "audio/vnd.dts": ["dts"],
  "audio/vnd.dts.hd": ["dtshd"],
  "audio/vnd.lucent.voice": ["lvp"],
  "audio/vnd.ms-playready.media.pya": ["pya"],
  "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
  "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
  "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
  "audio/vnd.rip": ["rip"],
  "audio/x-aac": ["*aac"],
  "audio/x-aiff": ["aif", "aiff", "aifc"],
  "audio/x-caf": ["caf"],
  "audio/x-flac": ["flac"],
  "audio/x-m4a": ["*m4a"],
  "audio/x-matroska": ["mka"],
  "audio/x-mpegurl": ["m3u"],
  "audio/x-ms-wax": ["wax"],
  "audio/x-ms-wma": ["wma"],
  "audio/x-pn-realaudio": ["ram", "ra"],
  "audio/x-pn-realaudio-plugin": ["rmp"],
  "audio/x-realaudio": ["*ra"],
  "audio/x-wav": ["*wav"],
  "chemical/x-cdx": ["cdx"],
  "chemical/x-cif": ["cif"],
  "chemical/x-cmdf": ["cmdf"],
  "chemical/x-cml": ["cml"],
  "chemical/x-csml": ["csml"],
  "chemical/x-xyz": ["xyz"],
  "image/prs.btif": ["btif", "btf"],
  "image/prs.pti": ["pti"],
  "image/vnd.adobe.photoshop": ["psd"],
  "image/vnd.airzip.accelerator.azv": ["azv"],
  "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
  "image/vnd.djvu": ["djvu", "djv"],
  "image/vnd.dvb.subtitle": ["*sub"],
  "image/vnd.dwg": ["dwg"],
  "image/vnd.dxf": ["dxf"],
  "image/vnd.fastbidsheet": ["fbs"],
  "image/vnd.fpx": ["fpx"],
  "image/vnd.fst": ["fst"],
  "image/vnd.fujixerox.edmics-mmr": ["mmr"],
  "image/vnd.fujixerox.edmics-rlc": ["rlc"],
  "image/vnd.microsoft.icon": ["ico"],
  "image/vnd.ms-dds": ["dds"],
  "image/vnd.ms-modi": ["mdi"],
  "image/vnd.ms-photo": ["wdp"],
  "image/vnd.net-fpx": ["npx"],
  "image/vnd.pco.b16": ["b16"],
  "image/vnd.tencent.tap": ["tap"],
  "image/vnd.valve.source.texture": ["vtf"],
  "image/vnd.wap.wbmp": ["wbmp"],
  "image/vnd.xiff": ["xif"],
  "image/vnd.zbrush.pcx": ["pcx"],
  "image/x-3ds": ["3ds"],
  "image/x-cmu-raster": ["ras"],
  "image/x-cmx": ["cmx"],
  "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
  "image/x-icon": ["*ico"],
  "image/x-jng": ["jng"],
  "image/x-mrsid-image": ["sid"],
  "image/x-ms-bmp": ["*bmp"],
  "image/x-pcx": ["*pcx"],
  "image/x-pict": ["pic", "pct"],
  "image/x-portable-anymap": ["pnm"],
  "image/x-portable-bitmap": ["pbm"],
  "image/x-portable-graymap": ["pgm"],
  "image/x-portable-pixmap": ["ppm"],
  "image/x-rgb": ["rgb"],
  "image/x-tga": ["tga"],
  "image/x-xbitmap": ["xbm"],
  "image/x-xpixmap": ["xpm"],
  "image/x-xwindowdump": ["xwd"],
  "message/vnd.wfa.wsc": ["wsc"],
  "model/vnd.bary": ["bary"],
  "model/vnd.cld": ["cld"],
  "model/vnd.collada+xml": ["dae"],
  "model/vnd.dwf": ["dwf"],
  "model/vnd.gdl": ["gdl"],
  "model/vnd.gtw": ["gtw"],
  "model/vnd.mts": ["*mts"],
  "model/vnd.opengex": ["ogex"],
  "model/vnd.parasolid.transmit.binary": ["x_b"],
  "model/vnd.parasolid.transmit.text": ["x_t"],
  "model/vnd.pytha.pyox": ["pyo", "pyox"],
  "model/vnd.sap.vds": ["vds"],
  "model/vnd.usda": ["usda"],
  "model/vnd.usdz+zip": ["usdz"],
  "model/vnd.valve.source.compiled-map": ["bsp"],
  "model/vnd.vtu": ["vtu"],
  "text/prs.lines.tag": ["dsc"],
  "text/vnd.curl": ["curl"],
  "text/vnd.curl.dcurl": ["dcurl"],
  "text/vnd.curl.mcurl": ["mcurl"],
  "text/vnd.curl.scurl": ["scurl"],
  "text/vnd.dvb.subtitle": ["sub"],
  "text/vnd.familysearch.gedcom": ["ged"],
  "text/vnd.fly": ["fly"],
  "text/vnd.fmi.flexstor": ["flx"],
  "text/vnd.graphviz": ["gv"],
  "text/vnd.in3d.3dml": ["3dml"],
  "text/vnd.in3d.spot": ["spot"],
  "text/vnd.sun.j2me.app-descriptor": ["jad"],
  "text/vnd.wap.wml": ["wml"],
  "text/vnd.wap.wmlscript": ["wmls"],
  "text/x-asm": ["s", "asm"],
  "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  "text/x-component": ["htc"],
  "text/x-fortran": ["f", "for", "f77", "f90"],
  "text/x-handlebars-template": ["hbs"],
  "text/x-java-source": ["java"],
  "text/x-lua": ["lua"],
  "text/x-markdown": ["mkd"],
  "text/x-nfo": ["nfo"],
  "text/x-opml": ["opml"],
  "text/x-org": ["*org"],
  "text/x-pascal": ["p", "pas"],
  "text/x-processing": ["pde"],
  "text/x-sass": ["sass"],
  "text/x-scss": ["scss"],
  "text/x-setext": ["etx"],
  "text/x-sfv": ["sfv"],
  "text/x-suse-ymp": ["ymp"],
  "text/x-uuencode": ["uu"],
  "text/x-vcalendar": ["vcs"],
  "text/x-vcard": ["vcf"],
  "video/vnd.dece.hd": ["uvh", "uvvh"],
  "video/vnd.dece.mobile": ["uvm", "uvvm"],
  "video/vnd.dece.pd": ["uvp", "uvvp"],
  "video/vnd.dece.sd": ["uvs", "uvvs"],
  "video/vnd.dece.video": ["uvv", "uvvv"],
  "video/vnd.dvb.file": ["dvb"],
  "video/vnd.fvt": ["fvt"],
  "video/vnd.mpegurl": ["mxu", "m4u"],
  "video/vnd.ms-playready.media.pyv": ["pyv"],
  "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
  "video/vnd.vivo": ["viv"],
  "video/x-f4v": ["f4v"],
  "video/x-fli": ["fli"],
  "video/x-flv": ["flv"],
  "video/x-m4v": ["m4v"],
  "video/x-matroska": ["mkv", "mk3d", "mks"],
  "video/x-mng": ["mng"],
  "video/x-ms-asf": ["asf", "asx"],
  "video/x-ms-vob": ["vob"],
  "video/x-ms-wm": ["wm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-ms-wmx": ["wmx"],
  "video/x-ms-wvx": ["wvx"],
  "video/x-msvideo": ["avi"],
  "video/x-sgi-movie": ["movie"],
  "video/x-smv": ["smv"],
  "x-conference/x-cooltalk": ["ice"]
};
Object.freeze(types);
var other_default = types;

// node_modules/mime/dist/types/standard.js
var types2 = {
  "application/andrew-inset": ["ez"],
  "application/appinstaller": ["appinstaller"],
  "application/applixware": ["aw"],
  "application/appx": ["appx"],
  "application/appxbundle": ["appxbundle"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/automationml-aml+xml": ["aml"],
  "application/automationml-amlx+zip": ["amlx"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cpl+xml": ["cpl"],
  "application/cu-seeme": ["cu"],
  "application/cwl": ["cwl"],
  "application/dash+xml": ["mpd"],
  "application/dash-patch+xml": ["mpp"],
  "application/davmount+xml": ["davmount"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/express": ["exp"],
  "application/fdf": ["fdf"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["*js"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/media-policy-dataset+xml": ["mpf"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["*mp4", "*mpg4", "mp4s", "m4p"],
  "application/msix": ["msix"],
  "application/msixbundle": ["msixbundle"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": [
    "bin",
    "dms",
    "lrf",
    "mar",
    "so",
    "dist",
    "distz",
    "pkg",
    "bpk",
    "dump",
    "elc",
    "deploy",
    "exe",
    "dll",
    "deb",
    "dmg",
    "iso",
    "img",
    "msi",
    "msp",
    "msm",
    "buffer"
  ],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-keys": ["asc"],
  "application/pgp-signature": ["sig", "*asc"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/sql": ["sql"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/trig": ["trig"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/watcherinfo+xml": ["wif"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xfdf": ["xfdf"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "audio/3gpp": ["*3gpp"],
  "audio/aac": ["adts", "aac"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avci": ["avci"],
  "image/avcs": ["avcs"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp", "dib"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/dpx": ["dpx"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/hsj2": ["hsj2"],
  "image/ief": ["ief"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpeg", "jpg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm", "jpgm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxl": ["jxl"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/jt": ["jt"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/prc": ["prc"],
  "model/step+xml": ["stpx"],
  "model/step+zip": ["stpz"],
  "model/step-xml+zip": ["stpxz"],
  "model/stl": ["stl"],
  "model/u3d": ["u3d"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/javascript": ["js", "mjs"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["md", "markdown"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/wgsl": ["wgsl"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "*jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts", "m2t", "m2ts", "mts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};
Object.freeze(types2);
var standard_default = types2;

// node_modules/mime/dist/src/Mime.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Mime_extensionToType;
var _Mime_typeToExtension;
var _Mime_typeToExtensions;

class Mime {
  constructor(...args) {
    _Mime_extensionToType.set(this, new Map);
    _Mime_typeToExtension.set(this, new Map);
    _Mime_typeToExtensions.set(this, new Map);
    for (const arg of args) {
      this.define(arg);
    }
  }
  define(typeMap, force = false) {
    for (let [type, extensions] of Object.entries(typeMap)) {
      type = type.toLowerCase();
      extensions = extensions.map((ext) => ext.toLowerCase());
      if (!__classPrivateFieldGet(this, _Mime_typeToExtensions, "f").has(type)) {
        __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").set(type, new Set);
      }
      const allExtensions = __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type);
      let first = true;
      for (let extension of extensions) {
        const starred = extension.startsWith("*");
        extension = starred ? extension.slice(1) : extension;
        allExtensions?.add(extension);
        if (first) {
          __classPrivateFieldGet(this, _Mime_typeToExtension, "f").set(type, extension);
        }
        first = false;
        if (starred)
          continue;
        const currentType = __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(extension);
        if (currentType && currentType != type && !force) {
          throw new Error(`"${type} -> ${extension}" conflicts with "${currentType} -> ${extension}". Pass \`force=true\` to override this definition.`);
        }
        __classPrivateFieldGet(this, _Mime_extensionToType, "f").set(extension, type);
      }
    }
    return this;
  }
  getType(path) {
    if (typeof path !== "string")
      return null;
    const last = path.replace(/^.*[/\\]/, "").toLowerCase();
    const ext = last.replace(/^.*\./, "").toLowerCase();
    const hasPath = last.length < path.length;
    const hasDot = ext.length < last.length - 1;
    if (!hasDot && hasPath)
      return null;
    return __classPrivateFieldGet(this, _Mime_extensionToType, "f").get(ext) ?? null;
  }
  getExtension(type) {
    if (typeof type !== "string")
      return null;
    type = type?.split?.(";")[0];
    return (type && __classPrivateFieldGet(this, _Mime_typeToExtension, "f").get(type.trim().toLowerCase())) ?? null;
  }
  getAllExtensions(type) {
    if (typeof type !== "string")
      return null;
    return __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").get(type.toLowerCase()) ?? null;
  }
  _freeze() {
    this.define = () => {
      throw new Error("define() not allowed for built-in Mime objects. See https://github.com/broofa/mime/blob/main/README.md#custom-mime-instances");
    };
    Object.freeze(this);
    for (const extensions of __classPrivateFieldGet(this, _Mime_typeToExtensions, "f").values()) {
      Object.freeze(extensions);
    }
    return this;
  }
  _getTestState() {
    return {
      types: __classPrivateFieldGet(this, _Mime_extensionToType, "f"),
      extensions: __classPrivateFieldGet(this, _Mime_typeToExtension, "f")
    };
  }
}
_Mime_extensionToType = new WeakMap, _Mime_typeToExtension = new WeakMap, _Mime_typeToExtensions = new WeakMap;
var Mime_default = Mime;

// node_modules/mime/dist/src/index.js
var src_default = new Mime_default(standard_default, other_default)._freeze();

// internal/utils/static.ts
var import_node_fs2 = require("fs");
var import_path = require("path");

// node_modules/rou3/dist/index.mjs
var EmptyObject = /* @__PURE__ */ (() => {
  const C = function() {
  };
  C.prototype = /* @__PURE__ */ Object.create(null);
  return C;
})();
function createRouter() {
  const ctx = {
    root: { key: "" },
    static: new EmptyObject
  };
  return ctx;
}
function splitPath(path) {
  return path.split("/").filter(Boolean);
}
function getMatchParams(segments, paramsMap) {
  const params = new EmptyObject;
  for (const [index, name] of paramsMap) {
    const segment = index < 0 ? segments.slice(-1 * index).join("/") : segments[index];
    if (typeof name === "string") {
      params[name] = segment;
    } else {
      const match = segment.match(name);
      if (match) {
        for (const key in match.groups) {
          params[key] = match.groups[key];
        }
      }
    }
  }
  return params;
}
function addRoute(ctx, method = "", path, data) {
  const segments = splitPath(path);
  let node = ctx.root;
  let _unnamedParamIndex = 0;
  const paramsMap = [];
  for (let i = 0;i < segments.length; i++) {
    const segment = segments[i];
    if (segment.startsWith("**")) {
      if (!node.wildcard) {
        node.wildcard = { key: "**" };
      }
      node = node.wildcard;
      paramsMap.push([
        -i,
        segment.split(":")[1] || "_",
        segment.length === 2
      ]);
      break;
    }
    if (segment === "*" || segment.includes(":")) {
      if (!node.param) {
        node.param = { key: "*" };
      }
      node = node.param;
      const isOptional = segment === "*";
      paramsMap.push([
        i,
        isOptional ? `_${_unnamedParamIndex++}` : _getParamMatcher(segment),
        isOptional
      ]);
      continue;
    }
    const child = node.static?.[segment];
    if (child) {
      node = child;
    } else {
      const staticNode = { key: segment };
      if (!node.static) {
        node.static = new EmptyObject;
      }
      node.static[segment] = staticNode;
      node = staticNode;
    }
  }
  const hasParams = paramsMap.length > 0;
  if (!node.methods) {
    node.methods = new EmptyObject;
  }
  if (!node.methods[method]) {
    node.methods[method] = [];
  }
  node.methods[method].push({
    data: data || null,
    paramsMap: hasParams ? paramsMap : undefined
  });
  if (!hasParams) {
    ctx.static[path] = node;
  }
}
function _getParamMatcher(segment) {
  if (!segment.includes(":", 1)) {
    return segment.slice(1);
  }
  const regex = segment.replace(/:(\w+)/g, (_, id) => `(?<${id}>\\w+)`);
  return new RegExp(`^${regex}$`);
}
function findRoute(ctx, method = "", path, opts) {
  if (path[path.length - 1] === "/") {
    path = path.slice(0, -1);
  }
  const staticNode = ctx.static[path];
  if (staticNode && staticNode.methods) {
    const staticMatch = staticNode.methods[method] || staticNode.methods[""];
    if (staticMatch !== undefined) {
      return staticMatch[0];
    }
  }
  const segments = splitPath(path);
  const match = _lookupTree(ctx, ctx.root, method, segments, 0)?.[0];
  if (match === undefined) {
    return;
  }
  if (opts?.params === false) {
    return match;
  }
  return {
    data: match.data,
    params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : undefined
  };
}
function _lookupTree(ctx, node, method, segments, index) {
  if (index === segments.length) {
    if (node.methods) {
      const match = node.methods[method] || node.methods[""];
      if (match) {
        return match;
      }
    }
    if (node.param && node.param.methods) {
      const match = node.param.methods[method] || node.param.methods[""];
      if (match) {
        const pMap = match[0].paramsMap;
        if (pMap?.[pMap?.length - 1]?.[2]) {
          return match;
        }
      }
    }
    if (node.wildcard && node.wildcard.methods) {
      const match = node.wildcard.methods[method] || node.wildcard.methods[""];
      if (match) {
        const pMap = match[0].paramsMap;
        if (pMap?.[pMap?.length - 1]?.[2]) {
          return match;
        }
      }
    }
    return;
  }
  const segment = segments[index];
  if (node.static) {
    const staticChild = node.static[segment];
    if (staticChild) {
      const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
      if (match) {
        return match;
      }
    }
  }
  if (node.param) {
    const match = _lookupTree(ctx, node.param, method, segments, index + 1);
    if (match) {
      return match;
    }
  }
  if (node.wildcard && node.wildcard.methods) {
    return node.wildcard.methods[method] || node.wildcard.methods[""];
  }
  return;
}

// internal/utils/wait-until.ts
var waitUntil = (condition, arg) => {
  return new Promise(async (resolve2) => {
    if (typeof condition === "function") {
      let tout = null;
      if (arg?.timeout) {
        tout = setTimeout(resolve2, arg?.timeout);
      }
      if (await condition()) {
        clearTimeout(tout);
        resolve2();
        return;
      }
      let count = 0;
      const c2 = setInterval(async () => {
        if (await condition()) {
          if (tout)
            clearTimeout(tout);
          clearInterval(c2);
          resolve2();
        }
        if (count > 100) {
          clearInterval(c2);
        }
      }, arg?.interval || 10);
    } else if (typeof condition === "number") {
      setTimeout(() => {
        resolve2();
      }, condition);
    }
  });
};

// internal/utils/static.ts
var staticFile = async (path, opt) => {
  await zstd.init();
  if (!prasi.static_cache) {
    prasi.static_cache = {};
    if (!prasi.static_cache.gz) {
      prasi.static_cache.gz = new BunSqliteKeyValue(":memory:");
    }
    if (!prasi.static_cache.zstd) {
      prasi.static_cache.zstd = new BunSqliteKeyValue(":memory:");
    }
  }
  const store = prasi.static_cache;
  const glob = new Bun.Glob("**");
  const internal = {
    indexPath: "",
    rescan_timeout: null,
    router: createRouter()
  };
  const static_file = {
    scanning: false,
    paths: new Set,
    async rescan(arg) {
    },
    exists(rpath, arg) {
      let pathname = rpath;
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      return findRoute(internal.router, undefined, pathname);
    },
    serve: (ctx, arg) => {
      let pathname = ctx.url.pathname || "";
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      const found = findRoute(internal.router, undefined, pathname);
      if (found) {
        const { fullpath, mime } = found.data;
        if (import_fs_jetpack.exists(fullpath)) {
          const { headers, content } = cachedResponse(ctx, fullpath, mime, store);
          headers["cache-control"] = "public, max-age=604800, immutable";
          return new Response(content, {
            headers
          });
        } else {
          store.gz.delete(fullpath);
          store.zstd.delete(fullpath);
        }
      }
      if (opt?.index) {
        const { headers, content } = cachedResponse(ctx, internal.indexPath, "text/html", store);
        return new Response(content, { headers });
      }
    }
  };
  const scan = async () => {
    if (static_file.scanning) {
      await waitUntil(() => !static_file.scanning);
      return;
    }
    static_file.scanning = true;
    if (await import_fs_jetpack.existsAsync(path)) {
      if (static_file.paths.size > 0) {
        store.gz.delete([...static_file.paths]);
        store.zstd.delete([...static_file.paths]);
      }
      for await (const file of glob.scan(path)) {
        if (file === opt?.index)
          internal.indexPath = import_path.join(path, file);
        static_file.paths.add(import_path.join(path, file));
        let type = src_default.getType(file);
        if (file.endsWith(".ts")) {
          type = "application/javascript";
        }
        addRoute(internal.router, undefined, `/${file}`, {
          mime: type,
          path: file,
          fullpath: import_path.join(path, file)
        });
      }
    }
    static_file.scanning = false;
  };
  await scan();
  static_file.rescan = (arg) => {
    return new Promise((resolve2) => {
      clearTimeout(internal.rescan_timeout);
      internal.rescan_timeout = setTimeout(async () => {
        await scan();
        resolve2();
      }, arg?.immediately ? 0 : 300);
    });
  };
  return static_file;
};
var cachedResponse = (ctx, file_path, mime, store) => {
  const accept = ctx.req.headers.get("accept-encoding") || "";
  const headers = {
    "content-type": mime || ""
  };
  let content = null;
  if (accept.includes("zstd")) {
    content = store.zstd.get(file_path);
    if (!content) {
      content = zstd.compress(new Uint8Array(import_node_fs2.readFileSync(file_path)), 10);
      store.zstd.set(file_path, content);
    }
    headers["content-encoding"] = "zstd";
  }
  if (!content && accept.includes("gz")) {
    content = store.gz.get(file_path);
    if (!content) {
      content = Bun.gzipSync(new Uint8Array(import_node_fs2.readFileSync(file_path)));
      store.gz.set(file_path, content);
    }
    headers["content-encoding"] = "gzip";
  }
  return { content, headers };
};

// internal/main/handler/http-handler.ts
var createHttpHandler = (server, mode) => {
  const handle = async function(req, opt) {
    let body = null;
    let headers = undefined;
    const url = this.url;
    const static_file = prasi.static.exists(url.pathname);
    if (static_file) {
      body = Bun.file(static_file.data.fullpath);
    } else {
    }
    if (opt?.rewrite) {
      body = opt.rewrite({ body, headers });
    }
    if (body === null) {
      return new Response("Page Not Found", { status: 404 });
    }
    return new Response(body, { headers });
  };
  const index = {
    head: [],
    body: [],
    render: () => ""
  };
  const handler = async (req) => {
    const server2 = prasi.server;
    if (server2 && typeof server2.http === "function") {
      const url = new URL(req.url);
      if (mode === "dev") {
        const parts = url.pathname.split("/");
        url.pathname = "/" + parts.slice(3).join("/");
      }
      return await server2.http({
        handle: handle.bind({ url }),
        index,
        mode,
        prasi: { page_id: "", params: {} },
        req,
        server: server2,
        url: { pathname: url.pathname, raw: url }
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
var import_path2 = require("path");
var init2 = async ({
  site_id,
  server,
  mode,
  prasi: init_prasi
}) => {
  const script_dir = init_prasi.paths.dir.script;
  const script_path = import_path2.join(script_dir, "index.js");
  prasi.static = await staticFile(script_dir);
  delete require.cache[script_path];
  const module2 = require(script_path);
  prasi.server = module2.server;
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
  console.log(JSON.stringify(init_prasi, null, 2), script_dir);
  console.log(`${c.magenta}[SITE]${c.esc} ${site_id} Backend Started.`);
  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }
  prasi.handler = {
    http: createHttpHandler(server_instance, mode === "vm" ? "dev" : "prod"),
    ws: createWsHandler()
  };
};
})
