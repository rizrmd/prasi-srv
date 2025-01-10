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
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// internal/utils/color.ts
var c;
var init_color = __esm(() => {
  c = {
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
      return new Promise((resolve, reject) => {
        args.push((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
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
  var onlyUniqueValuesInArrayFilter = (value, index, self2) => {
    return self2.indexOf(value) === index;
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
    return new Promise((resolve, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isDirectory()) {
          resolve(stat);
        } else {
          reject(generatePathOccupiedByNotDirectoryError(path));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  var emptyAsync = (path) => {
    return new Promise((resolve, reject) => {
      fs.readdir(path).then((list) => {
        const doOne = (index) => {
          if (index === list.length) {
            resolve();
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
    return new Promise((resolve, reject) => {
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
      checkMode().then(checkEmptiness).then(resolve, reject);
    });
  };
  var createBrandNewDirectoryAsync = (path, opts) => {
    const options = opts || {};
    return new Promise((resolve, reject) => {
      fs.mkdir(path, options.mode).then(resolve).catch((err) => {
        if (err.code === "ENOENT") {
          createBrandNewDirectoryAsync(pathUtil.dirname(path), options).then(() => {
            return fs.mkdir(path, options.mode);
          }).then(resolve).catch((err2) => {
            if (err2.code === "EEXIST") {
              resolve();
            } else {
              reject(err2);
            }
          });
        } else if (err.code === "EEXIST") {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  };
  var dirAsync = (path, passedCriteria) => {
    return new Promise((resolve, reject) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      checkWhatAlreadyOccupiesPathAsync(path).then((stat) => {
        if (stat !== undefined) {
          return checkExistingDirectoryFulfillsCriteriaAsync(path, stat, criteria);
        }
        return createBrandNewDirectoryAsync(path, criteria);
      }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, options).then(resolve).catch((err) => {
        if (err.code === "ENOENT") {
          dir.createAsync(pathUtil.dirname(path)).then(() => {
            return fs.writeFile(path, data, options);
          }).then(resolve, reject);
        } else {
          reject(err);
        }
      });
    });
  };
  var writeAtomicAsync = (path, data, options) => {
    return new Promise((resolve, reject) => {
      writeFileAsync(path + newExt, data, options).then(() => {
        return fs.rename(path + newExt, path);
      }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
      fs.appendFile(path, data, options).then(resolve).catch((err) => {
        if (err.code === "ENOENT") {
          write.async(path, data, options).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isFile()) {
          resolve(stat);
        } else {
          reject(generatePathOccupiedByNotFileError(path));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(undefined);
        } else {
          reject(err);
        }
      });
    });
  };
  var checkExistingFileFulfillsCriteriaAsync = (path, stat, criteria) => {
    const mode = modeUtil.normalizeFileMode(stat.mode);
    const checkContent = () => {
      return new Promise((resolve, reject) => {
        if (criteria.content !== undefined) {
          write.async(path, criteria.content, {
            mode,
            jsonIndent: criteria.jsonIndent
          }).then(() => {
            resolve(true);
          }).catch(reject);
        } else {
          resolve(false);
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
    return new Promise((resolve, reject) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      checkWhatAlreadyOccupiesPathAsync(path).then((stat) => {
        if (stat !== undefined) {
          return checkExistingFileFulfillsCriteriaAsync(path, stat, criteria);
        }
        return createBrandNewFileAsync(path, criteria);
      }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
      const hash = crypto2.createHash(algo);
      const s = fs.createReadStream(path);
      s.on("data", (data) => {
        hash.update(data);
      });
      s.on("end", () => {
        resolve(hash.digest("hex"));
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
    return new Promise((resolve, reject) => {
      let statOperation = fs.lstat;
      const opts = options || {};
      if (opts.symlinks === "follow") {
        statOperation = fs.stat;
      }
      statOperation(path).then((stat) => {
        const inspectObj = createInspectObj(path, opts, stat);
        addExtraFieldsAsync(path, inspectObj, opts).then(resolve, reject);
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(undefined);
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
    return new Promise((resolve, reject) => {
      fs.readdir(path).then((list) => {
        resolve(list);
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(undefined);
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
    return new Promise((resolve, reject) => {
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
          resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
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
    return new Promise((resolve, reject) => {
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
          resolve(tree);
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
  var existsSync = (path) => {
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
    return new Promise((resolve, reject) => {
      fs.stat(path).then((stat) => {
        if (stat.isDirectory()) {
          resolve("dir");
        } else if (stat.isFile()) {
          resolve("file");
        } else {
          resolve("other");
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(false);
        } else {
          reject(err);
        }
      });
    });
  };
  exports2.validateInput = validateInput;
  exports2.sync = existsSync;
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
    return new Promise((resolve, reject) => {
      if (typeof context.opts.overwrite === "function") {
        inspect.async(context.destPath, inspectOptions).then((destInspectData) => {
          resolve(context.opts.overwrite(context.srcInspectData, destInspectData));
        }).catch(reject);
      } else {
        resolve(context.opts.overwrite === true);
      }
    });
  };
  var copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
    return new Promise((resolve, reject) => {
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
            copyFileAsync(srcPath, destPath, mode, context).then(resolve, reject);
          }).catch(reject);
        } else if (err.code === "EEXIST") {
          canOverwriteItAsync(context).then((canOverwite) => {
            if (canOverwite) {
              copyFileAsync(srcPath, destPath, mode, context, {
                overwrite: true
              }).then(resolve, reject);
            } else if (shouldThrowDestinationExistsError(context)) {
              reject(generateDestinationExistsError(destPath));
            } else {
              resolve();
            }
          }).catch(reject);
        } else {
          reject(err);
        }
      });
      writeStream.on("finish", resolve);
      readStream.pipe(writeStream);
    });
  };
  var copySymlinkAsync = (from, to) => {
    return fs.readlink(from).then((symlinkPointsAt) => {
      return new Promise((resolve, reject) => {
        fs.symlink(symlinkPointsAt, to).then(resolve).catch((err) => {
          if (err.code === "EEXIST") {
            fs.unlink(to).then(() => {
              return fs.symlink(symlinkPointsAt, to);
            }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
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
                  resolve();
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
              resolve();
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
    return new Promise((resolve, reject) => {
      const destDir = pathUtil.dirname(to);
      exists.async(destDir).then((dstExists) => {
        if (!dstExists) {
          dir.createAsync(destDir).then(resolve, reject);
        } else {
          reject();
        }
      }).catch(reject);
    });
  };
  var moveAsync = (from, to, options) => {
    const opts = parseOptions(options);
    return new Promise((resolve, reject) => {
      exists.async(to).then((destinationExists) => {
        if (destinationExists !== false && opts.overwrite !== true) {
          reject(generateDestinationExistsError(to));
        } else {
          fs.rename(from, to).then(resolve).catch((err) => {
            if (err.code === "EISDIR" || err.code === "EPERM") {
              remove.async(to).then(() => fs.rename(from, to)).then(resolve, reject);
            } else if (err.code === "EXDEV") {
              copy.async(from, to, { overwrite: true }).then(() => remove.async(from)).then(resolve, reject);
            } else if (err.code === "ENOENT") {
              exists.async(from).then((srcExists) => {
                if (!srcExists) {
                  reject(generateSourceDoesntExistError(from));
                } else {
                  ensureDestinationPathExistsAsync(to).then(() => {
                    return fs.rename(from, to);
                  }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
      const retAs = returnAs || "utf8";
      let encoding = "utf8";
      if (retAs === "buffer") {
        encoding = null;
      }
      fs.readFile(path, { encoding }).then((data) => {
        try {
          if (retAs === "json") {
            resolve(JSON.parse(data));
          } else if (retAs === "jsonWithDates") {
            resolve(JSON.parse(data, jsonDateParser));
          } else {
            resolve(data);
          }
        } catch (err) {
          reject(makeNicerJsonParsingError(path, err));
        }
      }).catch((err) => {
        if (err.code === "ENOENT") {
          resolve(undefined);
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
    return new Promise((resolve, reject) => {
      fs.symlink(symlinkValue, path).then(resolve).catch((err) => {
        if (err.code === "ENOENT") {
          dir.createAsync(pathUtil.dirname(path)).then(() => {
            return fs.symlink(symlinkValue, path);
          }).then(resolve, reject);
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
    return new Promise((resolve, reject) => {
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
                  resolve(dirPath);
                }, reject);
              } else {
                reject(err2);
              }
            } else {
              resolve(dirPath);
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
        return new Promise((resolve, reject) => {
          const normalizedPath = resolvePath(path);
          dir.async(normalizedPath, criteria).then(() => {
            resolve(cwd(normalizedPath));
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
        return new Promise((resolve, reject) => {
          file.async(resolvePath(path), criteria).then(() => {
            resolve(api);
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
        return new Promise((resolve, reject) => {
          tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
            resolve(cwd(pathOfCreatedDirectory));
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

// node_modules/rou3/dist/index.mjs
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
var EmptyObject;
var init_dist = __esm(() => {
  EmptyObject = /* @__PURE__ */ (() => {
    const C = function() {
    };
    C.prototype = /* @__PURE__ */ Object.create(null);
    return C;
  })();
});

// internal/utils/log.ts
var siteLog = (msg) => {
  console.log(`${c.magenta}[SITE]${c.esc} ${msg}`);
}, dbLog = (msg) => {
  console.log(`${c.cyan}[ DB ]${c.esc} ${msg}`);
};
var init_log = __esm(() => {
  init_color();
});

// node_modules/@swc/core-darwin-arm64/swc.darwin-arm64.node
var require_swc_darwin_arm64 = __commonJS((exports2, module2) => {
  module2.exports = require("./swc.darwin-arm64-3qwg7nwf.node");
});

// node_modules/@swc/core/binding.js
var require_binding = __commonJS((exports2, module2) => {
  var { readFileSync: readFileSync2 } = require("fs");
  var nativeBinding = null;
  var loadErrors = [];
  var isMusl = () => {
    let musl = false;
    if (process.platform === "linux") {
      musl = isMuslFromFilesystem();
      if (musl === null) {
        musl = isMuslFromReport();
      }
      if (musl === null) {
        musl = isMuslFromChildProcess();
      }
    }
    return musl;
  };
  var isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
  var isMuslFromFilesystem = () => {
    try {
      return readFileSync2("/usr/bin/ldd", "utf-8").includes("musl");
    } catch {
      return null;
    }
  };
  var isMuslFromReport = () => {
    const report = typeof process.report.getReport === "function" ? process.report.getReport() : null;
    if (!report) {
      return null;
    }
    if (report.header && report.header.glibcVersionRuntime) {
      return false;
    }
    if (Array.isArray(report.sharedObjects)) {
      if (report.sharedObjects.some(isFileMusl)) {
        return true;
      }
    }
    return false;
  };
  var isMuslFromChildProcess = () => {
    try {
      return require("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
    } catch (e) {
      return false;
    }
  };
  function requireNative() {
    if (process.platform === "android") {
      if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.android-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-android-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.android-arm-eabi.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-android-arm-eabi");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Android ${process.arch}`));
      }
    } else if (process.platform === "win32") {
      if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.win32-x64-msvc.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-win32-x64-msvc");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "ia32") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.win32-ia32-msvc.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-win32-ia32-msvc");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.win32-arm64-msvc.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-win32-arm64-msvc");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
      }
    } else if (process.platform === "darwin") {
      try {
        return (()=>{throw new Error("Cannot require module "+"./swc.darwin-universal.node");})();
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        return (()=>{throw new Error("Cannot require module "+"@swc/core-darwin-universal");})();
      } catch (e) {
        loadErrors.push(e);
      }
      if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.darwin-x64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-darwin-x64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.darwin-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return require_swc_darwin_arm64();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
      }
    } else if (process.platform === "freebsd") {
      if (process.arch === "x64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.freebsd-x64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-freebsd-x64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "arm64") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.freebsd-arm64.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-freebsd-arm64");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
      }
    } else if (process.platform === "linux") {
      if (process.arch === "x64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-x64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-x64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-x64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-x64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "arm64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-arm64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-arm64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-arm64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-arm64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "arm") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.linux-arm-gnueabihf.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-arm-gnueabihf");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else if (process.arch === "riscv64") {
        if (isMusl()) {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-riscv64-musl.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-riscv64-musl");})();
          } catch (e) {
            loadErrors.push(e);
          }
        } else {
          try {
            return (()=>{throw new Error("Cannot require module "+"./swc.linux-riscv64-gnu.node");})();
          } catch (e) {
            loadErrors.push(e);
          }
          try {
            return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-riscv64-gnu");})();
          } catch (e) {
            loadErrors.push(e);
          }
        }
      } else if (process.arch === "s390x") {
        try {
          return (()=>{throw new Error("Cannot require module "+"./swc.linux-s390x-gnu.node");})();
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          return (()=>{throw new Error("Cannot require module "+"@swc/core-linux-s390x-gnu");})();
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        loadErrors.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
      }
    } else {
      loadErrors.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
    }
  }
  nativeBinding = requireNative();
  if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
    try {
      nativeBinding = (()=>{throw new Error("Cannot require module "+"./swc.wasi.cjs");})();
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        console.error(err);
      }
    }
    if (!nativeBinding) {
      try {
        nativeBinding = (()=>{throw new Error("Cannot require module "+"@swc/core-wasm32-wasi");})();
      } catch (err) {
        if (process.env.NAPI_RS_FORCE_WASI) {
          console.error(err);
        }
      }
    }
  }
  if (!nativeBinding) {
    if (loadErrors.length > 0) {
      throw new Error("Failed to load native binding", { cause: loadErrors });
    }
    throw new Error(`Failed to load native binding`);
  }
  module2.exports.Compiler = nativeBinding.Compiler;
  module2.exports.JsCompiler = nativeBinding.JsCompiler;
  module2.exports.bundle = nativeBinding.bundle;
  module2.exports.getTargetTriple = nativeBinding.getTargetTriple;
  module2.exports.initCustomTraceSubscriber = nativeBinding.initCustomTraceSubscriber;
  module2.exports.minify = nativeBinding.minify;
  module2.exports.minifySync = nativeBinding.minifySync;
  module2.exports.newMangleNameCache = nativeBinding.newMangleNameCache;
  module2.exports.parse = nativeBinding.parse;
  module2.exports.parseFile = nativeBinding.parseFile;
  module2.exports.parseFileSync = nativeBinding.parseFileSync;
  module2.exports.parseSync = nativeBinding.parseSync;
  module2.exports.print = nativeBinding.print;
  module2.exports.printSync = nativeBinding.printSync;
  module2.exports.transform = nativeBinding.transform;
  module2.exports.transformFile = nativeBinding.transformFile;
  module2.exports.transformFileSync = nativeBinding.transformFileSync;
  module2.exports.transformSync = nativeBinding.transformSync;
});

// node_modules/@swc/core/spack.js
var require_spack = __commonJS((exports2) => {
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
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
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.config = exports2.compileBundleOptions = exports2.isLocalFile = undefined;
  var path = __importStar(require("path"));
  exports2.isLocalFile = /^\.{0,2}\//;
  function compileBundleOptions(config2) {
    return __awaiter(this, undefined, undefined, function* () {
      const f = config2 === undefined ? "." : config2;
      try {
        const filepath = typeof f === "string" ? f : "spack.config.js";
        const fileModule = exports2.isLocalFile.test(filepath) ? path.resolve(filepath) : filepath;
        let configFromFile = require(fileModule);
        if (configFromFile.default) {
          configFromFile = configFromFile.default;
        }
        if (Array.isArray(configFromFile)) {
          if (Array.isArray(f)) {
            return [...configFromFile, ...f];
          }
          if (typeof f !== "string") {
            configFromFile.push(f);
          }
          return configFromFile;
        }
        return Object.assign(Object.assign({}, configFromFile), typeof config2 === "string" ? {} : config2);
      } catch (e) {
        if (typeof f === "string") {
          throw new Error(`Error occurred while loading config file at ${config2}: ${e}`);
        }
        return f;
      }
    });
  }
  exports2.compileBundleOptions = compileBundleOptions;
  function config(c2) {
    return c2;
  }
  exports2.config = config;
});

// node_modules/@swc/wasm/wasm.js
var require_wasm = __commonJS((exports2, module2) => {
  var __dirname = "/Users/riz/Developer/data/site-srv/main/node_modules/@swc/wasm";
  var imports = {};
  imports["__wbindgen_placeholder__"] = module2.exports;
  var wasm;
  var { TextEncoder: TextEncoder2, TextDecoder: TextDecoder2 } = require("util");
  var heap = new Array(128).fill(undefined);
  heap.push(undefined, null, true, false);
  function getObject(idx) {
    return heap[idx];
  }
  var heap_next = heap.length;
  function dropObject(idx) {
    if (idx < 132)
      return;
    heap[idx] = heap_next;
    heap_next = idx;
  }
  function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
  }
  var WASM_VECTOR_LEN = 0;
  var cachedUint8ArrayMemory0 = null;
  function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
      cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
  }
  var cachedTextEncoder = new TextEncoder2("utf-8");
  var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
  } : function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
  function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr2 = malloc(buf.length, 1) >>> 0;
      getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr2;
    }
    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;
    const mem = getUint8ArrayMemory0();
    let offset = 0;
    for (;offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 127)
        break;
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
      const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);
      offset += ret.written;
      ptr = realloc(ptr, len, offset, 1) >>> 0;
    }
    WASM_VECTOR_LEN = offset;
    return ptr;
  }
  function isLikeNone(x) {
    return x === undefined || x === null;
  }
  var cachedDataViewMemory0 = null;
  function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
      cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
  }
  var cachedTextDecoder = new TextDecoder2("utf-8", { ignoreBOM: true, fatal: true });
  cachedTextDecoder.decode();
  function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
  }
  function addHeapObject(obj) {
    if (heap_next === heap.length)
      heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
  }
  function debugString(val) {
    const type = typeof val;
    if (type == "number" || type == "boolean" || val == null) {
      return `${val}`;
    }
    if (type == "string") {
      return `"${val}"`;
    }
    if (type == "symbol") {
      const description = val.description;
      if (description == null) {
        return "Symbol";
      } else {
        return `Symbol(${description})`;
      }
    }
    if (type == "function") {
      const name = val.name;
      if (typeof name == "string" && name.length > 0) {
        return `Function(${name})`;
      } else {
        return "Function";
      }
    }
    if (Array.isArray(val)) {
      const length = val.length;
      let debug = "[";
      if (length > 0) {
        debug += debugString(val[0]);
      }
      for (let i = 1;i < length; i++) {
        debug += ", " + debugString(val[i]);
      }
      debug += "]";
      return debug;
    }
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
      className = builtInMatches[1];
    } else {
      return toString.call(val);
    }
    if (className == "Object") {
      try {
        return "Object(" + JSON.stringify(val) + ")";
      } catch (_) {
        return "Object";
      }
    }
    if (val instanceof Error) {
      return `${val.name}: ${val.message}
${val.stack}`;
    }
    return className;
  }
  var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
  }, unregister: () => {
  } } : new FinalizationRegistry((state) => {
    wasm.__wbindgen_export_2.get(state.dtor)(state.a, state.b);
  });
  function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
      state.cnt++;
      const a = state.a;
      state.a = 0;
      try {
        return f(a, state.b, ...args);
      } finally {
        if (--state.cnt === 0) {
          wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);
          CLOSURE_DTORS.unregister(state);
        } else {
          state.a = a;
        }
      }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
  }
  function __wbg_adapter_50(arg0, arg1, arg2) {
    wasm.__wbindgen_export_3(arg0, arg1, addHeapObject(arg2));
  }
  module2.exports.minifySync = function(s, opts) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.minifySync(retptr, addHeapObject(s), addHeapObject(opts));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  };
  module2.exports.minify = function(s, opts) {
    const ret = wasm.minify(addHeapObject(s), addHeapObject(opts));
    return takeObject(ret);
  };
  module2.exports.parseSync = function(s, opts) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.parseSync(retptr, addHeapObject(s), addHeapObject(opts));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  };
  module2.exports.parse = function(s, opts) {
    const ret = wasm.parse(addHeapObject(s), addHeapObject(opts));
    return takeObject(ret);
  };
  module2.exports.printSync = function(s, opts) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.printSync(retptr, addHeapObject(s), addHeapObject(opts));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  };
  module2.exports.print = function(s, opts) {
    const ret = wasm.print(addHeapObject(s), addHeapObject(opts));
    return takeObject(ret);
  };
  module2.exports.transformSync = function(s, opts, experimental_plugin_bytes_resolver) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.transformSync(retptr, addHeapObject(s), addHeapObject(opts), addHeapObject(experimental_plugin_bytes_resolver));
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      return takeObject(r0);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  };
  module2.exports.transform = function(s, opts, experimental_plugin_bytes_resolver) {
    const ret = wasm.transform(addHeapObject(s), addHeapObject(opts), addHeapObject(experimental_plugin_bytes_resolver));
    return takeObject(ret);
  };
  function getCachedStringFromWasm0(ptr, len) {
    if (ptr === 0) {
      return getObject(len);
    } else {
      return getStringFromWasm0(ptr, len);
    }
  }
  function handleError(f, args) {
    try {
      return f.apply(this, args);
    } catch (e) {
      wasm.__wbindgen_export_5(addHeapObject(e));
    }
  }
  function __wbg_adapter_119(arg0, arg1, arg2, arg3) {
    wasm.__wbindgen_export_6(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
  }
  module2.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  module2.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  module2.exports.__wbg_new_e69b5f66fda8f13c = function() {
    const ret = new Object;
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_set_20cbc34131e76824 = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  module2.exports.__wbg_new_034f913e7636e987 = function() {
    const ret = new Array;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_set_425e70f7c64ac962 = function(arg0, arg1, arg2) {
    getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
  };
  module2.exports.__wbg_set_277a63e77c89279f = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).set(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_is_string = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  module2.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_new_7a87a0376e40533b = function() {
    const ret = new Map;
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
    const ret = getObject(arg0) == getObject(arg1);
    return ret;
  };
  module2.exports.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  module2.exports.__wbg_entries_c02034de337d3ee2 = function(arg0) {
    const ret = Object.entries(getObject(arg0));
    return addHeapObject(ret);
  };
  module2.exports.__wbg_length_f217bbbf7e8e4df4 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  module2.exports.__wbg_get_5419cf6b954aa11d = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  module2.exports.__wbg_getwithrefkey_15c62c2b8546208d = function(arg0, arg1) {
    const ret = getObject(arg0)[getObject(arg1)];
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === undefined;
    return ret;
  };
  module2.exports.__wbindgen_in = function(arg0, arg1) {
    const ret = getObject(arg0) in getObject(arg1);
    return ret;
  };
  module2.exports.__wbindgen_boolean_get = function(arg0) {
    const v = getObject(arg0);
    const ret = typeof v === "boolean" ? v ? 1 : 0 : 2;
    return ret;
  };
  module2.exports.__wbindgen_is_bigint = function(arg0) {
    const ret = typeof getObject(arg0) === "bigint";
    return ret;
  };
  module2.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "number" ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  module2.exports.__wbg_isArray_6f3b47f09adb61b5 = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  module2.exports.__wbg_isSafeInteger_b9dff570f01a9100 = function(arg0) {
    const ret = Number.isSafeInteger(getObject(arg0));
    return ret;
  };
  module2.exports.__wbg_iterator_695d699a44d6234c = function() {
    const ret = Symbol.iterator;
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
    const v = getObject(arg1);
    const ret = typeof v === "bigint" ? v : undefined;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
  };
  module2.exports.__wbindgen_bigint_from_i64 = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_jsval_eq = function(arg0, arg1) {
    const ret = getObject(arg0) === getObject(arg1);
    return ret;
  };
  module2.exports.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_next_b06e115d1b01e10b = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).next();
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_done_983b5ffcaec8c583 = function(arg0) {
    const ret = getObject(arg0).done;
    return ret;
  };
  module2.exports.__wbg_value_2ab8a198c834c26a = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_new_1073970097e5a420 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wbg_adapter_119(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  module2.exports.__wbindgen_is_null = function(arg0) {
    const ret = getObject(arg0) === null;
    return ret;
  };
  module2.exports.__wbg_call_3bfa248576352471 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  module2.exports.__wbg_set_f975102236d3c502 = function(arg0, arg1, arg2) {
    getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
  };
  module2.exports.__wbg_new_abda76e883ba8a5f = function() {
    const ret = new Error;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
    const ret = getObject(arg1).stack;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  module2.exports.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    if (arg0 !== 0) {
      wasm.__wbindgen_export_4(arg0, arg1, 1);
    }
    console.error(v0);
  };
  module2.exports.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_crypto_1d1f22824a6a080c = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_process_4a72847cc503995b = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_versions_f686565e586dd935 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_node_104a2ff8d6ea03a2 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_require_cca90b1a94a0255b = function() {
    return handleError(function() {
      const ret = module2.require;
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  module2.exports.__wbg_msCrypto_eb05e62b530a1508 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_newwithlength_76462a666eca145f = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_buffer_ccaed51a635d8a2d = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_newwithbyteoffsetandlength_7e3eb787208af730 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_randomFillSync_5c9c955aa56b6049 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
  };
  module2.exports.__wbg_subarray_975a06f9dbd16995 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_getRandomValues_3aa56aa6edec874c = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };
  module2.exports.__wbg_new_fec2611eb9180f95 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  module2.exports.__wbg_set_ec2fcf81bc573fd9 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  module2.exports.__wbg_get_ef828680c64da212 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_call_a9ef466721e824f2 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_next_13b477da1eaa3897 = function(arg0) {
    const ret = getObject(arg0).next;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_length_9254c4bd3b9f23c4 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  module2.exports.__wbg_self_bf91bf94d9e04084 = function() {
    return handleError(function() {
      const ret = self.self;
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_window_52dd9f07d03fd5f8 = function() {
    return handleError(function() {
      const ret = window.window;
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_globalThis_05c129bf37fcf1be = function() {
    return handleError(function() {
      const ret = globalThis.globalThis;
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_global_3eca19bb09e9c484 = function() {
    return handleError(function() {
      const ret = global.global;
      return addHeapObject(ret);
    }, arguments);
  };
  module2.exports.__wbg_newnoargs_1ede4bf2ebbaaf43 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new Function(v0);
    return addHeapObject(ret);
  };
  module2.exports.__wbg_instanceof_Uint8Array_df0761410414ef36 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  module2.exports.__wbg_instanceof_ArrayBuffer_74945570b4a62ec7 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  module2.exports.__wbg_String_91fba7ded13ba54c = function(arg0, arg1) {
    const ret = String(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  module2.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  module2.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  module2.exports.__wbg_queueMicrotask_848aa4969108a57e = function(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
  };
  module2.exports.__wbg_resolve_0aad7c1484731c99 = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
  };
  module2.exports.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return true;
    }
    const ret = false;
    return ret;
  };
  module2.exports.__wbg_then_748f75edfb032440 = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
  };
  module2.exports.__wbg_queueMicrotask_c5419c06eab41e73 = function(arg0) {
    queueMicrotask(getObject(arg0));
  };
  module2.exports.__wbindgen_closure_wrapper14468 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 987, __wbg_adapter_50);
    return addHeapObject(ret);
  };
  var path = require("path").join(__dirname, "wasm_bg.wasm");
  var bytes = require("fs").readFileSync(path);
  var wasmModule = new WebAssembly.Module(bytes);
  var wasmInstance = new WebAssembly.Instance(wasmModule, imports);
  wasm = wasmInstance.exports;
  module2.exports.__wasm = wasm;
});

// node_modules/@swc/core/package.json
var require_package = __commonJS((exports2, module2) => {
  module2.exports = {
    name: "@swc/core",
    version: "1.10.1",
    description: "Super-fast alternative for babel",
    homepage: "https://swc.rs",
    main: "./index.js",
    author: "\uAC15\uB3D9\uC724 <kdy1997.dev@gmail.com>",
    license: "Apache-2.0",
    keywords: [
      "swc",
      "swcpack",
      "babel",
      "typescript",
      "rust",
      "webpack",
      "tsc"
    ],
    engines: {
      node: ">=10"
    },
    repository: {
      type: "git",
      url: "git+https://github.com/swc-project/swc.git"
    },
    bugs: {
      url: "https://github.com/swc-project/swc/issues"
    },
    napi: {
      binaryName: "swc",
      targets: [
        "x86_64-apple-darwin",
        "x86_64-pc-windows-msvc",
        "x86_64-unknown-linux-gnu",
        "x86_64-unknown-linux-musl",
        "i686-pc-windows-msvc",
        "armv7-unknown-linux-gnueabihf",
        "aarch64-apple-darwin",
        "aarch64-unknown-linux-gnu",
        "aarch64-unknown-linux-musl",
        "aarch64-pc-windows-msvc"
      ]
    },
    publishConfig: {
      registry: "https://registry.npmjs.org/",
      access: "public"
    },
    types: "./index.d.ts",
    scripts: {
      postinstall: "node postinstall.js",
      artifacts: "napi artifacts --npm-dir scripts/npm",
      prepack: "tsc -d && napi prepublish -p scripts/npm --tag-style npm",
      pack: "wasm-pack",
      "build:ts": "tsc -d",
      "build:wasm": 'npm-run-all "pack -- build ../../bindings/binding_core_wasm --scope swc {1} -t {2} --features plugin" --',
      build: "tsc -d && napi build --manifest-path ../../bindings/Cargo.toml --platform -p binding_core_node --js ./binding.js --dts ./binding.d.ts --release -o .",
      "build:dev": "tsc -d && napi build --manifest-path ../../bindings/Cargo.toml --platform -p binding_core_node --js ./binding.js --dts ./binding.d.ts -o .",
      test: "cross-env NODE_OPTIONS='--experimental-vm-modules ${NODE_OPTIONS}' jest --config ./jest.config.js",
      version: "napi version --npm-dir scripts/npm"
    },
    peerDependencies: {
      "@swc/helpers": "*"
    },
    peerDependenciesMeta: {
      "@swc/helpers": {
        optional: true
      }
    },
    funding: {
      type: "opencollective",
      url: "https://opencollective.com/swc"
    },
    files: [
      "CHANGELOG.md",
      "Visitor.d.ts",
      "index.d.ts",
      "spack.js",
      "util.d.ts",
      "LICENSE",
      "Visitor.js",
      "binding.d.ts",
      "index.js",
      "types.d.ts",
      "util.js",
      "README.md",
      "binding.js",
      "package.json",
      "spack.d.ts",
      "types.js",
      "postinstall.js",
      "bindings/binding_core_wasm/pkg/binding_core_wasm.d.ts"
    ],
    dependencies: {
      "@swc/counter": "^0.1.3",
      "@swc/types": "^0.1.17"
    },
    devDependencies: {
      "@napi-rs/cli": "^3.0.0-alpha.43",
      "cross-env": "^7.0.3",
      jest: "^29.7.0",
      typescript: "^5.3.3"
    },
    optionalDependencies: {
      "@swc/core-darwin-x64": "1.10.1",
      "@swc/core-win32-x64-msvc": "1.10.1",
      "@swc/core-linux-x64-gnu": "1.10.1",
      "@swc/core-linux-x64-musl": "1.10.1",
      "@swc/core-win32-ia32-msvc": "1.10.1",
      "@swc/core-linux-arm-gnueabihf": "1.10.1",
      "@swc/core-darwin-arm64": "1.10.1",
      "@swc/core-linux-arm64-gnu": "1.10.1",
      "@swc/core-linux-arm64-musl": "1.10.1",
      "@swc/core-win32-arm64-msvc": "1.10.1"
    }
  };
});

// node_modules/@swc/core/index.js
var require_core = __commonJS((exports2) => {
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
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
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __rest = exports2 && exports2.__rest || function(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s);i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.DEFAULT_EXTENSIONS = exports2.getBinaryMetadata = exports2.__experimental_registerGlobalTraceConfig = exports2.minifySync = exports2.minify = exports2.bundle = exports2.transformFileSync = exports2.transformFile = exports2.transformSync = exports2.transform = exports2.printSync = exports2.print = exports2.parseFileSync = exports2.parseFile = exports2.parseSync = exports2.parse = exports2.Compiler = exports2.plugins = exports2.version = exports2.experimental_newMangleNameCache = undefined;
  var path_1 = require("path");
  var binding_1 = require_binding();
  Object.defineProperty(exports2, "experimental_newMangleNameCache", { enumerable: true, get: function() {
    return binding_1.newMangleNameCache;
  } });
  var spack_1 = require_spack();
  var assert = __importStar(require("assert"));
  var bindingsOverride = process.env["SWC_BINARY_PATH"];
  var fallbackBindings;
  var bindings = (() => {
    let binding;
    try {
      binding = bindingsOverride ? require((0, path_1.resolve)(bindingsOverride)) : require_binding();
      const triple = binding.getTargetTriple();
      assert.ok(triple, "Failed to read target triple from native binary.");
      return binding;
    } catch (_) {
      fallbackBindings = require_wasm();
    } finally {
      return binding;
    }
  })();
  exports2.version = require_package().version;
  function plugins(ps) {
    return (mod) => {
      let m = mod;
      for (const p of ps) {
        m = p(m);
      }
      return m;
    };
  }
  exports2.plugins = plugins;

  class Compiler {
    constructor() {
      this.fallbackBindingsPluginWarningDisplayed = false;
    }
    minify(src, opts, extras) {
      return __awaiter(this, undefined, undefined, function* () {
        if (bindings) {
          return bindings.minify(toBuffer(src), toBuffer(opts !== null && opts !== undefined ? opts : {}), extras !== null && extras !== undefined ? extras : {});
        } else if (fallbackBindings) {
          return fallbackBindings.minify(src, opts);
        }
        throw new Error("Bindings not found.");
      });
    }
    minifySync(src, opts, extras) {
      if (bindings) {
        return bindings.minifySync(toBuffer(src), toBuffer(opts !== null && opts !== undefined ? opts : {}), extras !== null && extras !== undefined ? extras : {});
      } else if (fallbackBindings) {
        return fallbackBindings.minifySync(src, opts);
      }
      throw new Error("Bindings not found.");
    }
    parse(src, options, filename) {
      return __awaiter(this, undefined, undefined, function* () {
        options = options || { syntax: "ecmascript" };
        options.syntax = options.syntax || "ecmascript";
        if (!bindings && !!fallbackBindings) {
          throw new Error("Fallback bindings does not support this interface yet.");
        } else if (!bindings) {
          throw new Error("Bindings not found.");
        }
        if (bindings) {
          const res = yield bindings.parse(src, toBuffer(options), filename);
          return JSON.parse(res);
        } else if (fallbackBindings) {
          return fallbackBindings.parse(src, options);
        }
        throw new Error("Bindings not found.");
      });
    }
    parseSync(src, options, filename) {
      options = options || { syntax: "ecmascript" };
      options.syntax = options.syntax || "ecmascript";
      if (bindings) {
        return JSON.parse(bindings.parseSync(src, toBuffer(options), filename));
      } else if (fallbackBindings) {
        return fallbackBindings.parseSync(src, options);
      }
      throw new Error("Bindings not found.");
    }
    parseFile(path, options) {
      return __awaiter(this, undefined, undefined, function* () {
        options = options || { syntax: "ecmascript" };
        options.syntax = options.syntax || "ecmascript";
        if (!bindings && !!fallbackBindings) {
          throw new Error("Fallback bindings does not support filesystem access.");
        } else if (!bindings) {
          throw new Error("Bindings not found.");
        }
        const res = yield bindings.parseFile(path, toBuffer(options));
        return JSON.parse(res);
      });
    }
    parseFileSync(path, options) {
      options = options || { syntax: "ecmascript" };
      options.syntax = options.syntax || "ecmascript";
      if (!bindings && !!fallbackBindings) {
        throw new Error("Fallback bindings does not support filesystem access");
      } else if (!bindings) {
        throw new Error("Bindings not found.");
      }
      return JSON.parse(bindings.parseFileSync(path, toBuffer(options)));
    }
    print(m, options) {
      return __awaiter(this, undefined, undefined, function* () {
        options = options || {};
        if (bindings) {
          return bindings.print(JSON.stringify(m), toBuffer(options));
        } else if (fallbackBindings) {
          return fallbackBindings.print(m, options);
        }
        throw new Error("Bindings not found.");
      });
    }
    printSync(m, options) {
      options = options || {};
      if (bindings) {
        return bindings.printSync(JSON.stringify(m), toBuffer(options));
      } else if (fallbackBindings) {
        return fallbackBindings.printSync(m, options);
      }
      throw new Error("Bindings not found.");
    }
    transform(src, options) {
      var _a, _b, _c;
      return __awaiter(this, undefined, undefined, function* () {
        const isModule = typeof src !== "string";
        options = options || {};
        if ((_a = options === null || options === undefined ? undefined : options.jsc) === null || _a === undefined ? undefined : _a.parser) {
          options.jsc.parser.syntax = (_b = options.jsc.parser.syntax) !== null && _b !== undefined ? _b : "ecmascript";
        }
        const { plugin } = options, newOptions = __rest(options, ["plugin"]);
        if (bindings) {
          if (plugin) {
            const m = typeof src === "string" ? yield this.parse(src, (_c = options === null || options === undefined ? undefined : options.jsc) === null || _c === undefined ? undefined : _c.parser, options.filename) : src;
            return this.transform(plugin(m), newOptions);
          }
          return bindings.transform(isModule ? JSON.stringify(src) : src, isModule, toBuffer(newOptions));
        } else if (fallbackBindings) {
          if (plugin && !this.fallbackBindingsPluginWarningDisplayed) {
            console.warn(`Fallback bindings does not support legacy plugins, it'll be ignored.`);
            this.fallbackBindingsPluginWarningDisplayed = true;
          }
          return fallbackBindings.transform(src, options);
        }
        throw new Error("Bindings not found.");
      });
    }
    transformSync(src, options) {
      var _a, _b, _c;
      const isModule = typeof src !== "string";
      options = options || {};
      if ((_a = options === null || options === undefined ? undefined : options.jsc) === null || _a === undefined ? undefined : _a.parser) {
        options.jsc.parser.syntax = (_b = options.jsc.parser.syntax) !== null && _b !== undefined ? _b : "ecmascript";
      }
      const { plugin } = options, newOptions = __rest(options, ["plugin"]);
      if (bindings) {
        if (plugin) {
          const m = typeof src === "string" ? this.parseSync(src, (_c = options === null || options === undefined ? undefined : options.jsc) === null || _c === undefined ? undefined : _c.parser, options.filename) : src;
          return this.transformSync(plugin(m), newOptions);
        }
        return bindings.transformSync(isModule ? JSON.stringify(src) : src, isModule, toBuffer(newOptions));
      } else if (fallbackBindings) {
        if (plugin && !this.fallbackBindingsPluginWarningDisplayed) {
          console.warn(`Fallback bindings does not support legacy plugins, it'll be ignored.`);
          this.fallbackBindingsPluginWarningDisplayed = true;
        }
        return fallbackBindings.transformSync(isModule ? JSON.stringify(src) : src, options);
      }
      throw new Error("Bindings not found");
    }
    transformFile(path, options) {
      var _a, _b, _c;
      return __awaiter(this, undefined, undefined, function* () {
        if (!bindings && !!fallbackBindings) {
          throw new Error("Fallback bindings does not support filesystem access.");
        } else if (!bindings) {
          throw new Error("Bindings not found.");
        }
        options = options || {};
        if ((_a = options === null || options === undefined ? undefined : options.jsc) === null || _a === undefined ? undefined : _a.parser) {
          options.jsc.parser.syntax = (_b = options.jsc.parser.syntax) !== null && _b !== undefined ? _b : "ecmascript";
        }
        const { plugin } = options, newOptions = __rest(options, ["plugin"]);
        newOptions.filename = path;
        if (plugin) {
          const m = yield this.parseFile(path, (_c = options === null || options === undefined ? undefined : options.jsc) === null || _c === undefined ? undefined : _c.parser);
          return this.transform(plugin(m), newOptions);
        }
        return bindings.transformFile(path, false, toBuffer(newOptions));
      });
    }
    transformFileSync(path, options) {
      var _a, _b, _c;
      if (!bindings && !!fallbackBindings) {
        throw new Error("Fallback bindings does not support filesystem access.");
      } else if (!bindings) {
        throw new Error("Bindings not found.");
      }
      options = options || {};
      if ((_a = options === null || options === undefined ? undefined : options.jsc) === null || _a === undefined ? undefined : _a.parser) {
        options.jsc.parser.syntax = (_b = options.jsc.parser.syntax) !== null && _b !== undefined ? _b : "ecmascript";
      }
      const { plugin } = options, newOptions = __rest(options, ["plugin"]);
      newOptions.filename = path;
      if (plugin) {
        const m = this.parseFileSync(path, (_c = options === null || options === undefined ? undefined : options.jsc) === null || _c === undefined ? undefined : _c.parser);
        return this.transformSync(plugin(m), newOptions);
      }
      return bindings.transformFileSync(path, false, toBuffer(newOptions));
    }
    bundle(options) {
      return __awaiter(this, undefined, undefined, function* () {
        if (!bindings && !!fallbackBindings) {
          throw new Error("Fallback bindings does not support this interface yet.");
        } else if (!bindings) {
          throw new Error("Bindings not found.");
        }
        const opts = yield (0, spack_1.compileBundleOptions)(options);
        if (Array.isArray(opts)) {
          const all = yield Promise.all(opts.map((opt) => __awaiter(this, undefined, undefined, function* () {
            return this.bundle(opt);
          })));
          let obj = {};
          for (const o of all) {
            obj = Object.assign(Object.assign({}, obj), o);
          }
          return obj;
        }
        return bindings.bundle(toBuffer(Object.assign({}, opts)));
      });
    }
  }
  exports2.Compiler = Compiler;
  var compiler = new Compiler;
  function parse(src, options) {
    return compiler.parse(src, options);
  }
  exports2.parse = parse;
  function parseSync(src, options) {
    return compiler.parseSync(src, options);
  }
  exports2.parseSync = parseSync;
  function parseFile(path, options) {
    return compiler.parseFile(path, options);
  }
  exports2.parseFile = parseFile;
  function parseFileSync(path, options) {
    return compiler.parseFileSync(path, options);
  }
  exports2.parseFileSync = parseFileSync;
  function print(m, options) {
    return compiler.print(m, options);
  }
  exports2.print = print;
  function printSync(m, options) {
    return compiler.printSync(m, options);
  }
  exports2.printSync = printSync;
  function transform(src, options) {
    return compiler.transform(src, options);
  }
  exports2.transform = transform;
  function transformSync(src, options) {
    return compiler.transformSync(src, options);
  }
  exports2.transformSync = transformSync;
  function transformFile(path, options) {
    return compiler.transformFile(path, options);
  }
  exports2.transformFile = transformFile;
  function transformFileSync(path, options) {
    return compiler.transformFileSync(path, options);
  }
  exports2.transformFileSync = transformFileSync;
  function bundle(options) {
    return compiler.bundle(options);
  }
  exports2.bundle = bundle;
  function minify(src, opts, extras) {
    return __awaiter(this, undefined, undefined, function* () {
      return compiler.minify(src, opts, extras);
    });
  }
  exports2.minify = minify;
  function minifySync(src, opts, extras) {
    return compiler.minifySync(src, opts, extras);
  }
  exports2.minifySync = minifySync;
  function __experimental_registerGlobalTraceConfig(traceConfig) {
    if (bindings) {
      if (traceConfig.type === "traceEvent") {
        bindings.initCustomTraceSubscriber(traceConfig.fileName);
      }
    }
  }
  exports2.__experimental_registerGlobalTraceConfig = __experimental_registerGlobalTraceConfig;
  function getBinaryMetadata() {
    return {
      target: bindings ? bindings === null || bindings === undefined ? undefined : bindings.getTargetTriple() : undefined
    };
  }
  exports2.getBinaryMetadata = getBinaryMetadata;
  exports2.DEFAULT_EXTENSIONS = Object.freeze([
    ".js",
    ".jsx",
    ".es6",
    ".es",
    ".mjs",
    ".ts",
    ".tsx",
    ".cts",
    ".mts"
  ]);
  function toBuffer(t) {
    return Buffer.from(JSON.stringify(t));
  }
});

// internal/utils/parse-args.ts
var import_core, parseArgs = async (path) => {
  const res = await import_core.parseFile(path, { syntax: "typescript" });
  const args = [];
  for (const e of res.body) {
    if (e.type === "ExportDeclaration" && e.declaration.type === "VariableDeclaration") {
      const declare = e.declaration.declarations[0];
      if (declare && declare.type === "VariableDeclarator" && declare.id.type === "Identifier" && declare.id.value === "_" && declare.init?.type === "ObjectExpression") {
        for (const prop of declare.init.properties) {
          if (prop.type === "MethodProperty") {
            for (const param of prop.params) {
              if (param.type === "Parameter" && param.pat.type === "Identifier") {
                args.push(param.pat.value);
              }
            }
          }
        }
      }
    }
  }
  return args;
};
var init_parse_args = __esm(() => {
  import_core = __toESM(require_core());
});

// internal/main/handler/route-api.ts
var exports_route_api = {};
__export(exports_route_api, {
  route_api: () => route_api
});
var import_fs_jetpack4, import_path3, __dirname = "/Users/riz/Developer/data/site-srv/main/internal/main/handler", route_api;
var init_route_api = __esm(() => {
  import_fs_jetpack4 = __toESM(require_main());
  import_path3 = require("path");
  init_dist();
  init_log();
  init_parse_args();
  route_api = {
    _router: null,
    async init() {
      this._router = createRouter();
      const scan = async (path, root) => {
        const base_dir = import_path3.join(__dirname, "..", "..", "..", path);
        const apis = await import_fs_jetpack4.listAsync(base_dir);
        if (apis) {
          for (const filename of apis) {
            const importPath = import_path3.join(base_dir, filename);
            if (filename.endsWith(".ts")) {
              try {
                delete require.cache[importPath];
                const api = require(importPath);
                let args = await parseArgs(importPath);
                const route = {
                  url: api._.url,
                  args,
                  raw: !!api._.raw,
                  fn: api._.api,
                  path: importPath.substring((root || path).length + 1)
                };
                if (this._router) {
                  addRoute(this._router, undefined, route.url, route);
                }
              } catch (e) {
                siteLog(`Failed to import app/srv/api${importPath.substring((root || path).length)}`);
                const f = Bun.file(importPath);
                if (f.size > 0) {
                  console.error(e);
                } else {
                  siteLog(` \u27A8 file is empty`);
                }
              }
            } else {
              const dir = await import_fs_jetpack4.inspectAsync(importPath);
              if (dir?.type === "dir") {
                await scan(importPath, path);
              }
            }
          }
        }
      };
      await scan("internal/api");
    },
    async handle(url, req, prasi2) {
      const pathname = url.pathname;
      if (this._router) {
        const found = findRoute(this._router, undefined, pathname);
        if (found) {
          const params = found?.params || {};
          const args = found.data.args;
          const fn = found.data.fn;
          const arg_val = [];
          if (req.method !== "GET") {
            try {
              const json = await req.json();
              if (Array.isArray(json)) {
                for (const i in json) {
                  const arg_name = args[i];
                  if (arg_name) {
                    params[arg_name] = json[i];
                  }
                  arg_val.push(json[i]);
                }
              } else if (json) {
                for (const [k, v] of Object.entries(json)) {
                  params[k] = v;
                }
              }
            } catch (e) {
            }
          }
          const res = await fn.bind({ req, params, url, prasi: prasi2 })(...arg_val);
          if (typeof res.headers === "object" && res.headers) {
            if (res instanceof Response) {
              return res;
            }
            if (res.headers["content-type"] === "application/json" && typeof res.body === "object") {
              return {
                body: JSON.stringify(res.body),
                headers: res.headers,
                status: res.status
              };
            }
          }
          return { body: res.body, headers: res.headers, status: res.status };
        }
      }
    }
  };
});

// node_modules/he/he.js
var require_he = __commonJS((exports2, module2) => {
  /*! https://mths.be/he v1.2.0 by @mathias | MIT license */
  (function(root) {
    var freeExports = typeof exports2 == "object" && exports2;
    var freeModule = typeof module2 == "object" && module2 && module2.exports == freeExports && module2;
    var freeGlobal = typeof global == "object" && global;
    if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
      root = freeGlobal;
    }
    var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var regexAsciiWhitelist = /[\x01-\x7F]/g;
    var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
    var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
    var encodeMap = { "\xAD": "shy", "\u200C": "zwnj", "\u200D": "zwj", "\u200E": "lrm", "\u2063": "ic", "\u2062": "it", "\u2061": "af", "\u200F": "rlm", "\u200B": "ZeroWidthSpace", "\u2060": "NoBreak", "\u0311": "DownBreve", "\u20DB": "tdot", "\u20DC": "DotDot", "\t": "Tab", "\n": "NewLine", "\u2008": "puncsp", "\u205F": "MediumSpace", "\u2009": "thinsp", "\u200A": "hairsp", "\u2004": "emsp13", "\u2002": "ensp", "\u2005": "emsp14", "\u2003": "emsp", "\u2007": "numsp", "\xA0": "nbsp", "\u205F\u200A": "ThickSpace", "\u203E": "oline", _: "lowbar", "\u2010": "dash", "\u2013": "ndash", "\u2014": "mdash", "\u2015": "horbar", ",": "comma", ";": "semi", "\u204F": "bsemi", ":": "colon", "\u2A74": "Colone", "!": "excl", "\xA1": "iexcl", "?": "quest", "\xBF": "iquest", ".": "period", "\u2025": "nldr", "\u2026": "mldr", "\xB7": "middot", "'": "apos", "\u2018": "lsquo", "\u2019": "rsquo", "\u201A": "sbquo", "\u2039": "lsaquo", "\u203A": "rsaquo", '"': "quot", "\u201C": "ldquo", "\u201D": "rdquo", "\u201E": "bdquo", "\xAB": "laquo", "\xBB": "raquo", "(": "lpar", ")": "rpar", "[": "lsqb", "]": "rsqb", "{": "lcub", "}": "rcub", "\u2308": "lceil", "\u2309": "rceil", "\u230A": "lfloor", "\u230B": "rfloor", "\u2985": "lopar", "\u2986": "ropar", "\u298B": "lbrke", "\u298C": "rbrke", "\u298D": "lbrkslu", "\u298E": "rbrksld", "\u298F": "lbrksld", "\u2990": "rbrkslu", "\u2991": "langd", "\u2992": "rangd", "\u2993": "lparlt", "\u2994": "rpargt", "\u2995": "gtlPar", "\u2996": "ltrPar", "\u27E6": "lobrk", "\u27E7": "robrk", "\u27E8": "lang", "\u27E9": "rang", "\u27EA": "Lang", "\u27EB": "Rang", "\u27EC": "loang", "\u27ED": "roang", "\u2772": "lbbrk", "\u2773": "rbbrk", "\u2016": "Vert", "\xA7": "sect", "\xB6": "para", "@": "commat", "*": "ast", "/": "sol", undefined: null, "&": "amp", "#": "num", "%": "percnt", "\u2030": "permil", "\u2031": "pertenk", "\u2020": "dagger", "\u2021": "Dagger", "\u2022": "bull", "\u2043": "hybull", "\u2032": "prime", "\u2033": "Prime", "\u2034": "tprime", "\u2057": "qprime", "\u2035": "bprime", "\u2041": "caret", "`": "grave", "\xB4": "acute", "\u02DC": "tilde", "^": "Hat", "\xAF": "macr", "\u02D8": "breve", "\u02D9": "dot", "\xA8": "die", "\u02DA": "ring", "\u02DD": "dblac", "\xB8": "cedil", "\u02DB": "ogon", "\u02C6": "circ", "\u02C7": "caron", "\xB0": "deg", "\xA9": "copy", "\xAE": "reg", "\u2117": "copysr", "\u2118": "wp", "\u211E": "rx", "\u2127": "mho", "\u2129": "iiota", "\u2190": "larr", "\u219A": "nlarr", "\u2192": "rarr", "\u219B": "nrarr", "\u2191": "uarr", "\u2193": "darr", "\u2194": "harr", "\u21AE": "nharr", "\u2195": "varr", "\u2196": "nwarr", "\u2197": "nearr", "\u2198": "searr", "\u2199": "swarr", "\u219D": "rarrw", "\u219D\u0338": "nrarrw", "\u219E": "Larr", "\u219F": "Uarr", "\u21A0": "Rarr", "\u21A1": "Darr", "\u21A2": "larrtl", "\u21A3": "rarrtl", "\u21A4": "mapstoleft", "\u21A5": "mapstoup", "\u21A6": "map", "\u21A7": "mapstodown", "\u21A9": "larrhk", "\u21AA": "rarrhk", "\u21AB": "larrlp", "\u21AC": "rarrlp", "\u21AD": "harrw", "\u21B0": "lsh", "\u21B1": "rsh", "\u21B2": "ldsh", "\u21B3": "rdsh", "\u21B5": "crarr", "\u21B6": "cularr", "\u21B7": "curarr", "\u21BA": "olarr", "\u21BB": "orarr", "\u21BC": "lharu", "\u21BD": "lhard", "\u21BE": "uharr", "\u21BF": "uharl", "\u21C0": "rharu", "\u21C1": "rhard", "\u21C2": "dharr", "\u21C3": "dharl", "\u21C4": "rlarr", "\u21C5": "udarr", "\u21C6": "lrarr", "\u21C7": "llarr", "\u21C8": "uuarr", "\u21C9": "rrarr", "\u21CA": "ddarr", "\u21CB": "lrhar", "\u21CC": "rlhar", "\u21D0": "lArr", "\u21CD": "nlArr", "\u21D1": "uArr", "\u21D2": "rArr", "\u21CF": "nrArr", "\u21D3": "dArr", "\u21D4": "iff", "\u21CE": "nhArr", "\u21D5": "vArr", "\u21D6": "nwArr", "\u21D7": "neArr", "\u21D8": "seArr", "\u21D9": "swArr", "\u21DA": "lAarr", "\u21DB": "rAarr", "\u21DD": "zigrarr", "\u21E4": "larrb", "\u21E5": "rarrb", "\u21F5": "duarr", "\u21FD": "loarr", "\u21FE": "roarr", "\u21FF": "hoarr", "\u2200": "forall", "\u2201": "comp", "\u2202": "part", "\u2202\u0338": "npart", "\u2203": "exist", "\u2204": "nexist", "\u2205": "empty", "\u2207": "Del", "\u2208": "in", "\u2209": "notin", "\u220B": "ni", "\u220C": "notni", "\u03F6": "bepsi", "\u220F": "prod", "\u2210": "coprod", "\u2211": "sum", "+": "plus", "\xB1": "pm", "\xF7": "div", "\xD7": "times", "<": "lt", "\u226E": "nlt", "<\u20D2": "nvlt", "=": "equals", "\u2260": "ne", "=\u20E5": "bne", "\u2A75": "Equal", ">": "gt", "\u226F": "ngt", ">\u20D2": "nvgt", "\xAC": "not", "|": "vert", "\xA6": "brvbar", "\u2212": "minus", "\u2213": "mp", "\u2214": "plusdo", "\u2044": "frasl", "\u2216": "setmn", "\u2217": "lowast", "\u2218": "compfn", "\u221A": "Sqrt", "\u221D": "prop", "\u221E": "infin", "\u221F": "angrt", "\u2220": "ang", "\u2220\u20D2": "nang", "\u2221": "angmsd", "\u2222": "angsph", "\u2223": "mid", "\u2224": "nmid", "\u2225": "par", "\u2226": "npar", "\u2227": "and", "\u2228": "or", "\u2229": "cap", "\u2229\uFE00": "caps", "\u222A": "cup", "\u222A\uFE00": "cups", "\u222B": "int", "\u222C": "Int", "\u222D": "tint", "\u2A0C": "qint", "\u222E": "oint", "\u222F": "Conint", "\u2230": "Cconint", "\u2231": "cwint", "\u2232": "cwconint", "\u2233": "awconint", "\u2234": "there4", "\u2235": "becaus", "\u2236": "ratio", "\u2237": "Colon", "\u2238": "minusd", "\u223A": "mDDot", "\u223B": "homtht", "\u223C": "sim", "\u2241": "nsim", "\u223C\u20D2": "nvsim", "\u223D": "bsim", "\u223D\u0331": "race", "\u223E": "ac", "\u223E\u0333": "acE", "\u223F": "acd", "\u2240": "wr", "\u2242": "esim", "\u2242\u0338": "nesim", "\u2243": "sime", "\u2244": "nsime", "\u2245": "cong", "\u2247": "ncong", "\u2246": "simne", "\u2248": "ap", "\u2249": "nap", "\u224A": "ape", "\u224B": "apid", "\u224B\u0338": "napid", "\u224C": "bcong", "\u224D": "CupCap", "\u226D": "NotCupCap", "\u224D\u20D2": "nvap", "\u224E": "bump", "\u224E\u0338": "nbump", "\u224F": "bumpe", "\u224F\u0338": "nbumpe", "\u2250": "doteq", "\u2250\u0338": "nedot", "\u2251": "eDot", "\u2252": "efDot", "\u2253": "erDot", "\u2254": "colone", "\u2255": "ecolon", "\u2256": "ecir", "\u2257": "cire", "\u2259": "wedgeq", "\u225A": "veeeq", "\u225C": "trie", "\u225F": "equest", "\u2261": "equiv", "\u2262": "nequiv", "\u2261\u20E5": "bnequiv", "\u2264": "le", "\u2270": "nle", "\u2264\u20D2": "nvle", "\u2265": "ge", "\u2271": "nge", "\u2265\u20D2": "nvge", "\u2266": "lE", "\u2266\u0338": "nlE", "\u2267": "gE", "\u2267\u0338": "ngE", "\u2268\uFE00": "lvnE", "\u2268": "lnE", "\u2269": "gnE", "\u2269\uFE00": "gvnE", "\u226A": "ll", "\u226A\u0338": "nLtv", "\u226A\u20D2": "nLt", "\u226B": "gg", "\u226B\u0338": "nGtv", "\u226B\u20D2": "nGt", "\u226C": "twixt", "\u2272": "lsim", "\u2274": "nlsim", "\u2273": "gsim", "\u2275": "ngsim", "\u2276": "lg", "\u2278": "ntlg", "\u2277": "gl", "\u2279": "ntgl", "\u227A": "pr", "\u2280": "npr", "\u227B": "sc", "\u2281": "nsc", "\u227C": "prcue", "\u22E0": "nprcue", "\u227D": "sccue", "\u22E1": "nsccue", "\u227E": "prsim", "\u227F": "scsim", "\u227F\u0338": "NotSucceedsTilde", "\u2282": "sub", "\u2284": "nsub", "\u2282\u20D2": "vnsub", "\u2283": "sup", "\u2285": "nsup", "\u2283\u20D2": "vnsup", "\u2286": "sube", "\u2288": "nsube", "\u2287": "supe", "\u2289": "nsupe", "\u228A\uFE00": "vsubne", "\u228A": "subne", "\u228B\uFE00": "vsupne", "\u228B": "supne", "\u228D": "cupdot", "\u228E": "uplus", "\u228F": "sqsub", "\u228F\u0338": "NotSquareSubset", "\u2290": "sqsup", "\u2290\u0338": "NotSquareSuperset", "\u2291": "sqsube", "\u22E2": "nsqsube", "\u2292": "sqsupe", "\u22E3": "nsqsupe", "\u2293": "sqcap", "\u2293\uFE00": "sqcaps", "\u2294": "sqcup", "\u2294\uFE00": "sqcups", "\u2295": "oplus", "\u2296": "ominus", "\u2297": "otimes", "\u2298": "osol", "\u2299": "odot", "\u229A": "ocir", "\u229B": "oast", "\u229D": "odash", "\u229E": "plusb", "\u229F": "minusb", "\u22A0": "timesb", "\u22A1": "sdotb", "\u22A2": "vdash", "\u22AC": "nvdash", "\u22A3": "dashv", "\u22A4": "top", "\u22A5": "bot", "\u22A7": "models", "\u22A8": "vDash", "\u22AD": "nvDash", "\u22A9": "Vdash", "\u22AE": "nVdash", "\u22AA": "Vvdash", "\u22AB": "VDash", "\u22AF": "nVDash", "\u22B0": "prurel", "\u22B2": "vltri", "\u22EA": "nltri", "\u22B3": "vrtri", "\u22EB": "nrtri", "\u22B4": "ltrie", "\u22EC": "nltrie", "\u22B4\u20D2": "nvltrie", "\u22B5": "rtrie", "\u22ED": "nrtrie", "\u22B5\u20D2": "nvrtrie", "\u22B6": "origof", "\u22B7": "imof", "\u22B8": "mumap", "\u22B9": "hercon", "\u22BA": "intcal", "\u22BB": "veebar", "\u22BD": "barvee", "\u22BE": "angrtvb", "\u22BF": "lrtri", "\u22C0": "Wedge", "\u22C1": "Vee", "\u22C2": "xcap", "\u22C3": "xcup", "\u22C4": "diam", "\u22C5": "sdot", "\u22C6": "Star", "\u22C7": "divonx", "\u22C8": "bowtie", "\u22C9": "ltimes", "\u22CA": "rtimes", "\u22CB": "lthree", "\u22CC": "rthree", "\u22CD": "bsime", "\u22CE": "cuvee", "\u22CF": "cuwed", "\u22D0": "Sub", "\u22D1": "Sup", "\u22D2": "Cap", "\u22D3": "Cup", "\u22D4": "fork", "\u22D5": "epar", "\u22D6": "ltdot", "\u22D7": "gtdot", "\u22D8": "Ll", "\u22D8\u0338": "nLl", "\u22D9": "Gg", "\u22D9\u0338": "nGg", "\u22DA\uFE00": "lesg", "\u22DA": "leg", "\u22DB": "gel", "\u22DB\uFE00": "gesl", "\u22DE": "cuepr", "\u22DF": "cuesc", "\u22E6": "lnsim", "\u22E7": "gnsim", "\u22E8": "prnsim", "\u22E9": "scnsim", "\u22EE": "vellip", "\u22EF": "ctdot", "\u22F0": "utdot", "\u22F1": "dtdot", "\u22F2": "disin", "\u22F3": "isinsv", "\u22F4": "isins", "\u22F5": "isindot", "\u22F5\u0338": "notindot", "\u22F6": "notinvc", "\u22F7": "notinvb", "\u22F9": "isinE", "\u22F9\u0338": "notinE", "\u22FA": "nisd", "\u22FB": "xnis", "\u22FC": "nis", "\u22FD": "notnivc", "\u22FE": "notnivb", "\u2305": "barwed", "\u2306": "Barwed", "\u230C": "drcrop", "\u230D": "dlcrop", "\u230E": "urcrop", "\u230F": "ulcrop", "\u2310": "bnot", "\u2312": "profline", "\u2313": "profsurf", "\u2315": "telrec", "\u2316": "target", "\u231C": "ulcorn", "\u231D": "urcorn", "\u231E": "dlcorn", "\u231F": "drcorn", "\u2322": "frown", "\u2323": "smile", "\u232D": "cylcty", "\u232E": "profalar", "\u2336": "topbot", "\u233D": "ovbar", "\u233F": "solbar", "\u237C": "angzarr", "\u23B0": "lmoust", "\u23B1": "rmoust", "\u23B4": "tbrk", "\u23B5": "bbrk", "\u23B6": "bbrktbrk", "\u23DC": "OverParenthesis", "\u23DD": "UnderParenthesis", "\u23DE": "OverBrace", "\u23DF": "UnderBrace", "\u23E2": "trpezium", "\u23E7": "elinters", "\u2423": "blank", "\u2500": "boxh", "\u2502": "boxv", "\u250C": "boxdr", "\u2510": "boxdl", "\u2514": "boxur", "\u2518": "boxul", "\u251C": "boxvr", "\u2524": "boxvl", "\u252C": "boxhd", "\u2534": "boxhu", "\u253C": "boxvh", "\u2550": "boxH", "\u2551": "boxV", "\u2552": "boxdR", "\u2553": "boxDr", "\u2554": "boxDR", "\u2555": "boxdL", "\u2556": "boxDl", "\u2557": "boxDL", "\u2558": "boxuR", "\u2559": "boxUr", "\u255A": "boxUR", "\u255B": "boxuL", "\u255C": "boxUl", "\u255D": "boxUL", "\u255E": "boxvR", "\u255F": "boxVr", "\u2560": "boxVR", "\u2561": "boxvL", "\u2562": "boxVl", "\u2563": "boxVL", "\u2564": "boxHd", "\u2565": "boxhD", "\u2566": "boxHD", "\u2567": "boxHu", "\u2568": "boxhU", "\u2569": "boxHU", "\u256A": "boxvH", "\u256B": "boxVh", "\u256C": "boxVH", "\u2580": "uhblk", "\u2584": "lhblk", "\u2588": "block", "\u2591": "blk14", "\u2592": "blk12", "\u2593": "blk34", "\u25A1": "squ", "\u25AA": "squf", "\u25AB": "EmptyVerySmallSquare", "\u25AD": "rect", "\u25AE": "marker", "\u25B1": "fltns", "\u25B3": "xutri", "\u25B4": "utrif", "\u25B5": "utri", "\u25B8": "rtrif", "\u25B9": "rtri", "\u25BD": "xdtri", "\u25BE": "dtrif", "\u25BF": "dtri", "\u25C2": "ltrif", "\u25C3": "ltri", "\u25CA": "loz", "\u25CB": "cir", "\u25EC": "tridot", "\u25EF": "xcirc", "\u25F8": "ultri", "\u25F9": "urtri", "\u25FA": "lltri", "\u25FB": "EmptySmallSquare", "\u25FC": "FilledSmallSquare", "\u2605": "starf", "\u2606": "star", "\u260E": "phone", "\u2640": "female", "\u2642": "male", "\u2660": "spades", "\u2663": "clubs", "\u2665": "hearts", "\u2666": "diams", "\u266A": "sung", "\u2713": "check", "\u2717": "cross", "\u2720": "malt", "\u2736": "sext", "\u2758": "VerticalSeparator", "\u27C8": "bsolhsub", "\u27C9": "suphsol", "\u27F5": "xlarr", "\u27F6": "xrarr", "\u27F7": "xharr", "\u27F8": "xlArr", "\u27F9": "xrArr", "\u27FA": "xhArr", "\u27FC": "xmap", "\u27FF": "dzigrarr", "\u2902": "nvlArr", "\u2903": "nvrArr", "\u2904": "nvHarr", "\u2905": "Map", "\u290C": "lbarr", "\u290D": "rbarr", "\u290E": "lBarr", "\u290F": "rBarr", "\u2910": "RBarr", "\u2911": "DDotrahd", "\u2912": "UpArrowBar", "\u2913": "DownArrowBar", "\u2916": "Rarrtl", "\u2919": "latail", "\u291A": "ratail", "\u291B": "lAtail", "\u291C": "rAtail", "\u291D": "larrfs", "\u291E": "rarrfs", "\u291F": "larrbfs", "\u2920": "rarrbfs", "\u2923": "nwarhk", "\u2924": "nearhk", "\u2925": "searhk", "\u2926": "swarhk", "\u2927": "nwnear", "\u2928": "toea", "\u2929": "tosa", "\u292A": "swnwar", "\u2933": "rarrc", "\u2933\u0338": "nrarrc", "\u2935": "cudarrr", "\u2936": "ldca", "\u2937": "rdca", "\u2938": "cudarrl", "\u2939": "larrpl", "\u293C": "curarrm", "\u293D": "cularrp", "\u2945": "rarrpl", "\u2948": "harrcir", "\u2949": "Uarrocir", "\u294A": "lurdshar", "\u294B": "ldrushar", "\u294E": "LeftRightVector", "\u294F": "RightUpDownVector", "\u2950": "DownLeftRightVector", "\u2951": "LeftUpDownVector", "\u2952": "LeftVectorBar", "\u2953": "RightVectorBar", "\u2954": "RightUpVectorBar", "\u2955": "RightDownVectorBar", "\u2956": "DownLeftVectorBar", "\u2957": "DownRightVectorBar", "\u2958": "LeftUpVectorBar", "\u2959": "LeftDownVectorBar", "\u295A": "LeftTeeVector", "\u295B": "RightTeeVector", "\u295C": "RightUpTeeVector", "\u295D": "RightDownTeeVector", "\u295E": "DownLeftTeeVector", "\u295F": "DownRightTeeVector", "\u2960": "LeftUpTeeVector", "\u2961": "LeftDownTeeVector", "\u2962": "lHar", "\u2963": "uHar", "\u2964": "rHar", "\u2965": "dHar", "\u2966": "luruhar", "\u2967": "ldrdhar", "\u2968": "ruluhar", "\u2969": "rdldhar", "\u296A": "lharul", "\u296B": "llhard", "\u296C": "rharul", "\u296D": "lrhard", "\u296E": "udhar", "\u296F": "duhar", "\u2970": "RoundImplies", "\u2971": "erarr", "\u2972": "simrarr", "\u2973": "larrsim", "\u2974": "rarrsim", "\u2975": "rarrap", "\u2976": "ltlarr", "\u2978": "gtrarr", "\u2979": "subrarr", "\u297B": "suplarr", "\u297C": "lfisht", "\u297D": "rfisht", "\u297E": "ufisht", "\u297F": "dfisht", "\u299A": "vzigzag", "\u299C": "vangrt", "\u299D": "angrtvbd", "\u29A4": "ange", "\u29A5": "range", "\u29A6": "dwangle", "\u29A7": "uwangle", "\u29A8": "angmsdaa", "\u29A9": "angmsdab", "\u29AA": "angmsdac", "\u29AB": "angmsdad", "\u29AC": "angmsdae", "\u29AD": "angmsdaf", "\u29AE": "angmsdag", "\u29AF": "angmsdah", "\u29B0": "bemptyv", "\u29B1": "demptyv", "\u29B2": "cemptyv", "\u29B3": "raemptyv", "\u29B4": "laemptyv", "\u29B5": "ohbar", "\u29B6": "omid", "\u29B7": "opar", "\u29B9": "operp", "\u29BB": "olcross", "\u29BC": "odsold", "\u29BE": "olcir", "\u29BF": "ofcir", "\u29C0": "olt", "\u29C1": "ogt", "\u29C2": "cirscir", "\u29C3": "cirE", "\u29C4": "solb", "\u29C5": "bsolb", "\u29C9": "boxbox", "\u29CD": "trisb", "\u29CE": "rtriltri", "\u29CF": "LeftTriangleBar", "\u29CF\u0338": "NotLeftTriangleBar", "\u29D0": "RightTriangleBar", "\u29D0\u0338": "NotRightTriangleBar", "\u29DC": "iinfin", "\u29DD": "infintie", "\u29DE": "nvinfin", "\u29E3": "eparsl", "\u29E4": "smeparsl", "\u29E5": "eqvparsl", "\u29EB": "lozf", "\u29F4": "RuleDelayed", "\u29F6": "dsol", "\u2A00": "xodot", "\u2A01": "xoplus", "\u2A02": "xotime", "\u2A04": "xuplus", "\u2A06": "xsqcup", "\u2A0D": "fpartint", "\u2A10": "cirfnint", "\u2A11": "awint", "\u2A12": "rppolint", "\u2A13": "scpolint", "\u2A14": "npolint", "\u2A15": "pointint", "\u2A16": "quatint", "\u2A17": "intlarhk", "\u2A22": "pluscir", "\u2A23": "plusacir", "\u2A24": "simplus", "\u2A25": "plusdu", "\u2A26": "plussim", "\u2A27": "plustwo", "\u2A29": "mcomma", "\u2A2A": "minusdu", "\u2A2D": "loplus", "\u2A2E": "roplus", "\u2A2F": "Cross", "\u2A30": "timesd", "\u2A31": "timesbar", "\u2A33": "smashp", "\u2A34": "lotimes", "\u2A35": "rotimes", "\u2A36": "otimesas", "\u2A37": "Otimes", "\u2A38": "odiv", "\u2A39": "triplus", "\u2A3A": "triminus", "\u2A3B": "tritime", "\u2A3C": "iprod", "\u2A3F": "amalg", "\u2A40": "capdot", "\u2A42": "ncup", "\u2A43": "ncap", "\u2A44": "capand", "\u2A45": "cupor", "\u2A46": "cupcap", "\u2A47": "capcup", "\u2A48": "cupbrcap", "\u2A49": "capbrcup", "\u2A4A": "cupcup", "\u2A4B": "capcap", "\u2A4C": "ccups", "\u2A4D": "ccaps", "\u2A50": "ccupssm", "\u2A53": "And", "\u2A54": "Or", "\u2A55": "andand", "\u2A56": "oror", "\u2A57": "orslope", "\u2A58": "andslope", "\u2A5A": "andv", "\u2A5B": "orv", "\u2A5C": "andd", "\u2A5D": "ord", "\u2A5F": "wedbar", "\u2A66": "sdote", "\u2A6A": "simdot", "\u2A6D": "congdot", "\u2A6D\u0338": "ncongdot", "\u2A6E": "easter", "\u2A6F": "apacir", "\u2A70": "apE", "\u2A70\u0338": "napE", "\u2A71": "eplus", "\u2A72": "pluse", "\u2A73": "Esim", "\u2A77": "eDDot", "\u2A78": "equivDD", "\u2A79": "ltcir", "\u2A7A": "gtcir", "\u2A7B": "ltquest", "\u2A7C": "gtquest", "\u2A7D": "les", "\u2A7D\u0338": "nles", "\u2A7E": "ges", "\u2A7E\u0338": "nges", "\u2A7F": "lesdot", "\u2A80": "gesdot", "\u2A81": "lesdoto", "\u2A82": "gesdoto", "\u2A83": "lesdotor", "\u2A84": "gesdotol", "\u2A85": "lap", "\u2A86": "gap", "\u2A87": "lne", "\u2A88": "gne", "\u2A89": "lnap", "\u2A8A": "gnap", "\u2A8B": "lEg", "\u2A8C": "gEl", "\u2A8D": "lsime", "\u2A8E": "gsime", "\u2A8F": "lsimg", "\u2A90": "gsiml", "\u2A91": "lgE", "\u2A92": "glE", "\u2A93": "lesges", "\u2A94": "gesles", "\u2A95": "els", "\u2A96": "egs", "\u2A97": "elsdot", "\u2A98": "egsdot", "\u2A99": "el", "\u2A9A": "eg", "\u2A9D": "siml", "\u2A9E": "simg", "\u2A9F": "simlE", "\u2AA0": "simgE", "\u2AA1": "LessLess", "\u2AA1\u0338": "NotNestedLessLess", "\u2AA2": "GreaterGreater", "\u2AA2\u0338": "NotNestedGreaterGreater", "\u2AA4": "glj", "\u2AA5": "gla", "\u2AA6": "ltcc", "\u2AA7": "gtcc", "\u2AA8": "lescc", "\u2AA9": "gescc", "\u2AAA": "smt", "\u2AAB": "lat", "\u2AAC": "smte", "\u2AAC\uFE00": "smtes", "\u2AAD": "late", "\u2AAD\uFE00": "lates", "\u2AAE": "bumpE", "\u2AAF": "pre", "\u2AAF\u0338": "npre", "\u2AB0": "sce", "\u2AB0\u0338": "nsce", "\u2AB3": "prE", "\u2AB4": "scE", "\u2AB5": "prnE", "\u2AB6": "scnE", "\u2AB7": "prap", "\u2AB8": "scap", "\u2AB9": "prnap", "\u2ABA": "scnap", "\u2ABB": "Pr", "\u2ABC": "Sc", "\u2ABD": "subdot", "\u2ABE": "supdot", "\u2ABF": "subplus", "\u2AC0": "supplus", "\u2AC1": "submult", "\u2AC2": "supmult", "\u2AC3": "subedot", "\u2AC4": "supedot", "\u2AC5": "subE", "\u2AC5\u0338": "nsubE", "\u2AC6": "supE", "\u2AC6\u0338": "nsupE", "\u2AC7": "subsim", "\u2AC8": "supsim", "\u2ACB\uFE00": "vsubnE", "\u2ACB": "subnE", "\u2ACC\uFE00": "vsupnE", "\u2ACC": "supnE", "\u2ACF": "csub", "\u2AD0": "csup", "\u2AD1": "csube", "\u2AD2": "csupe", "\u2AD3": "subsup", "\u2AD4": "supsub", "\u2AD5": "subsub", "\u2AD6": "supsup", "\u2AD7": "suphsub", "\u2AD8": "supdsub", "\u2AD9": "forkv", "\u2ADA": "topfork", "\u2ADB": "mlcp", "\u2AE4": "Dashv", "\u2AE6": "Vdashl", "\u2AE7": "Barv", "\u2AE8": "vBar", "\u2AE9": "vBarv", "\u2AEB": "Vbar", "\u2AEC": "Not", "\u2AED": "bNot", "\u2AEE": "rnmid", "\u2AEF": "cirmid", "\u2AF0": "midcir", "\u2AF1": "topcir", "\u2AF2": "nhpar", "\u2AF3": "parsim", "\u2AFD": "parsl", "\u2AFD\u20E5": "nparsl", "\u266D": "flat", "\u266E": "natur", "\u266F": "sharp", "\xA4": "curren", "\xA2": "cent", $: "dollar", "\xA3": "pound", "\xA5": "yen", "\u20AC": "euro", "\xB9": "sup1", "\xBD": "half", "\u2153": "frac13", "\xBC": "frac14", "\u2155": "frac15", "\u2159": "frac16", "\u215B": "frac18", "\xB2": "sup2", "\u2154": "frac23", "\u2156": "frac25", "\xB3": "sup3", "\xBE": "frac34", "\u2157": "frac35", "\u215C": "frac38", "\u2158": "frac45", "\u215A": "frac56", "\u215D": "frac58", "\u215E": "frac78", "\uD835\uDCB6": "ascr", "\uD835\uDD52": "aopf", "\uD835\uDD1E": "afr", "\uD835\uDD38": "Aopf", "\uD835\uDD04": "Afr", "\uD835\uDC9C": "Ascr", "\xAA": "ordf", "\xE1": "aacute", "\xC1": "Aacute", "\xE0": "agrave", "\xC0": "Agrave", "\u0103": "abreve", "\u0102": "Abreve", "\xE2": "acirc", "\xC2": "Acirc", "\xE5": "aring", "\xC5": "angst", "\xE4": "auml", "\xC4": "Auml", "\xE3": "atilde", "\xC3": "Atilde", "\u0105": "aogon", "\u0104": "Aogon", "\u0101": "amacr", "\u0100": "Amacr", "\xE6": "aelig", "\xC6": "AElig", "\uD835\uDCB7": "bscr", "\uD835\uDD53": "bopf", "\uD835\uDD1F": "bfr", "\uD835\uDD39": "Bopf", "\u212C": "Bscr", "\uD835\uDD05": "Bfr", "\uD835\uDD20": "cfr", "\uD835\uDCB8": "cscr", "\uD835\uDD54": "copf", "\u212D": "Cfr", "\uD835\uDC9E": "Cscr", "\u2102": "Copf", "\u0107": "cacute", "\u0106": "Cacute", "\u0109": "ccirc", "\u0108": "Ccirc", "\u010D": "ccaron", "\u010C": "Ccaron", "\u010B": "cdot", "\u010A": "Cdot", "\xE7": "ccedil", "\xC7": "Ccedil", "\u2105": "incare", "\uD835\uDD21": "dfr", "\u2146": "dd", "\uD835\uDD55": "dopf", "\uD835\uDCB9": "dscr", "\uD835\uDC9F": "Dscr", "\uD835\uDD07": "Dfr", "\u2145": "DD", "\uD835\uDD3B": "Dopf", "\u010F": "dcaron", "\u010E": "Dcaron", "\u0111": "dstrok", "\u0110": "Dstrok", "\xF0": "eth", "\xD0": "ETH", "\u2147": "ee", "\u212F": "escr", "\uD835\uDD22": "efr", "\uD835\uDD56": "eopf", "\u2130": "Escr", "\uD835\uDD08": "Efr", "\uD835\uDD3C": "Eopf", "\xE9": "eacute", "\xC9": "Eacute", "\xE8": "egrave", "\xC8": "Egrave", "\xEA": "ecirc", "\xCA": "Ecirc", "\u011B": "ecaron", "\u011A": "Ecaron", "\xEB": "euml", "\xCB": "Euml", "\u0117": "edot", "\u0116": "Edot", "\u0119": "eogon", "\u0118": "Eogon", "\u0113": "emacr", "\u0112": "Emacr", "\uD835\uDD23": "ffr", "\uD835\uDD57": "fopf", "\uD835\uDCBB": "fscr", "\uD835\uDD09": "Ffr", "\uD835\uDD3D": "Fopf", "\u2131": "Fscr", "\uFB00": "fflig", "\uFB03": "ffilig", "\uFB04": "ffllig", "\uFB01": "filig", fj: "fjlig", "\uFB02": "fllig", "\u0192": "fnof", "\u210A": "gscr", "\uD835\uDD58": "gopf", "\uD835\uDD24": "gfr", "\uD835\uDCA2": "Gscr", "\uD835\uDD3E": "Gopf", "\uD835\uDD0A": "Gfr", "\u01F5": "gacute", "\u011F": "gbreve", "\u011E": "Gbreve", "\u011D": "gcirc", "\u011C": "Gcirc", "\u0121": "gdot", "\u0120": "Gdot", "\u0122": "Gcedil", "\uD835\uDD25": "hfr", "\u210E": "planckh", "\uD835\uDCBD": "hscr", "\uD835\uDD59": "hopf", "\u210B": "Hscr", "\u210C": "Hfr", "\u210D": "Hopf", "\u0125": "hcirc", "\u0124": "Hcirc", "\u210F": "hbar", "\u0127": "hstrok", "\u0126": "Hstrok", "\uD835\uDD5A": "iopf", "\uD835\uDD26": "ifr", "\uD835\uDCBE": "iscr", "\u2148": "ii", "\uD835\uDD40": "Iopf", "\u2110": "Iscr", "\u2111": "Im", "\xED": "iacute", "\xCD": "Iacute", "\xEC": "igrave", "\xCC": "Igrave", "\xEE": "icirc", "\xCE": "Icirc", "\xEF": "iuml", "\xCF": "Iuml", "\u0129": "itilde", "\u0128": "Itilde", "\u0130": "Idot", "\u012F": "iogon", "\u012E": "Iogon", "\u012B": "imacr", "\u012A": "Imacr", "\u0133": "ijlig", "\u0132": "IJlig", "\u0131": "imath", "\uD835\uDCBF": "jscr", "\uD835\uDD5B": "jopf", "\uD835\uDD27": "jfr", "\uD835\uDCA5": "Jscr", "\uD835\uDD0D": "Jfr", "\uD835\uDD41": "Jopf", "\u0135": "jcirc", "\u0134": "Jcirc", "\u0237": "jmath", "\uD835\uDD5C": "kopf", "\uD835\uDCC0": "kscr", "\uD835\uDD28": "kfr", "\uD835\uDCA6": "Kscr", "\uD835\uDD42": "Kopf", "\uD835\uDD0E": "Kfr", "\u0137": "kcedil", "\u0136": "Kcedil", "\uD835\uDD29": "lfr", "\uD835\uDCC1": "lscr", "\u2113": "ell", "\uD835\uDD5D": "lopf", "\u2112": "Lscr", "\uD835\uDD0F": "Lfr", "\uD835\uDD43": "Lopf", "\u013A": "lacute", "\u0139": "Lacute", "\u013E": "lcaron", "\u013D": "Lcaron", "\u013C": "lcedil", "\u013B": "Lcedil", "\u0142": "lstrok", "\u0141": "Lstrok", "\u0140": "lmidot", "\u013F": "Lmidot", "\uD835\uDD2A": "mfr", "\uD835\uDD5E": "mopf", "\uD835\uDCC2": "mscr", "\uD835\uDD10": "Mfr", "\uD835\uDD44": "Mopf", "\u2133": "Mscr", "\uD835\uDD2B": "nfr", "\uD835\uDD5F": "nopf", "\uD835\uDCC3": "nscr", "\u2115": "Nopf", "\uD835\uDCA9": "Nscr", "\uD835\uDD11": "Nfr", "\u0144": "nacute", "\u0143": "Nacute", "\u0148": "ncaron", "\u0147": "Ncaron", "\xF1": "ntilde", "\xD1": "Ntilde", "\u0146": "ncedil", "\u0145": "Ncedil", "\u2116": "numero", "\u014B": "eng", "\u014A": "ENG", "\uD835\uDD60": "oopf", "\uD835\uDD2C": "ofr", "\u2134": "oscr", "\uD835\uDCAA": "Oscr", "\uD835\uDD12": "Ofr", "\uD835\uDD46": "Oopf", "\xBA": "ordm", "\xF3": "oacute", "\xD3": "Oacute", "\xF2": "ograve", "\xD2": "Ograve", "\xF4": "ocirc", "\xD4": "Ocirc", "\xF6": "ouml", "\xD6": "Ouml", "\u0151": "odblac", "\u0150": "Odblac", "\xF5": "otilde", "\xD5": "Otilde", "\xF8": "oslash", "\xD8": "Oslash", "\u014D": "omacr", "\u014C": "Omacr", "\u0153": "oelig", "\u0152": "OElig", "\uD835\uDD2D": "pfr", "\uD835\uDCC5": "pscr", "\uD835\uDD61": "popf", "\u2119": "Popf", "\uD835\uDD13": "Pfr", "\uD835\uDCAB": "Pscr", "\uD835\uDD62": "qopf", "\uD835\uDD2E": "qfr", "\uD835\uDCC6": "qscr", "\uD835\uDCAC": "Qscr", "\uD835\uDD14": "Qfr", "\u211A": "Qopf", "\u0138": "kgreen", "\uD835\uDD2F": "rfr", "\uD835\uDD63": "ropf", "\uD835\uDCC7": "rscr", "\u211B": "Rscr", "\u211C": "Re", "\u211D": "Ropf", "\u0155": "racute", "\u0154": "Racute", "\u0159": "rcaron", "\u0158": "Rcaron", "\u0157": "rcedil", "\u0156": "Rcedil", "\uD835\uDD64": "sopf", "\uD835\uDCC8": "sscr", "\uD835\uDD30": "sfr", "\uD835\uDD4A": "Sopf", "\uD835\uDD16": "Sfr", "\uD835\uDCAE": "Sscr", "\u24C8": "oS", "\u015B": "sacute", "\u015A": "Sacute", "\u015D": "scirc", "\u015C": "Scirc", "\u0161": "scaron", "\u0160": "Scaron", "\u015F": "scedil", "\u015E": "Scedil", "\xDF": "szlig", "\uD835\uDD31": "tfr", "\uD835\uDCC9": "tscr", "\uD835\uDD65": "topf", "\uD835\uDCAF": "Tscr", "\uD835\uDD17": "Tfr", "\uD835\uDD4B": "Topf", "\u0165": "tcaron", "\u0164": "Tcaron", "\u0163": "tcedil", "\u0162": "Tcedil", "\u2122": "trade", "\u0167": "tstrok", "\u0166": "Tstrok", "\uD835\uDCCA": "uscr", "\uD835\uDD66": "uopf", "\uD835\uDD32": "ufr", "\uD835\uDD4C": "Uopf", "\uD835\uDD18": "Ufr", "\uD835\uDCB0": "Uscr", "\xFA": "uacute", "\xDA": "Uacute", "\xF9": "ugrave", "\xD9": "Ugrave", "\u016D": "ubreve", "\u016C": "Ubreve", "\xFB": "ucirc", "\xDB": "Ucirc", "\u016F": "uring", "\u016E": "Uring", "\xFC": "uuml", "\xDC": "Uuml", "\u0171": "udblac", "\u0170": "Udblac", "\u0169": "utilde", "\u0168": "Utilde", "\u0173": "uogon", "\u0172": "Uogon", "\u016B": "umacr", "\u016A": "Umacr", "\uD835\uDD33": "vfr", "\uD835\uDD67": "vopf", "\uD835\uDCCB": "vscr", "\uD835\uDD19": "Vfr", "\uD835\uDD4D": "Vopf", "\uD835\uDCB1": "Vscr", "\uD835\uDD68": "wopf", "\uD835\uDCCC": "wscr", "\uD835\uDD34": "wfr", "\uD835\uDCB2": "Wscr", "\uD835\uDD4E": "Wopf", "\uD835\uDD1A": "Wfr", "\u0175": "wcirc", "\u0174": "Wcirc", "\uD835\uDD35": "xfr", "\uD835\uDCCD": "xscr", "\uD835\uDD69": "xopf", "\uD835\uDD4F": "Xopf", "\uD835\uDD1B": "Xfr", "\uD835\uDCB3": "Xscr", "\uD835\uDD36": "yfr", "\uD835\uDCCE": "yscr", "\uD835\uDD6A": "yopf", "\uD835\uDCB4": "Yscr", "\uD835\uDD1C": "Yfr", "\uD835\uDD50": "Yopf", "\xFD": "yacute", "\xDD": "Yacute", "\u0177": "ycirc", "\u0176": "Ycirc", "\xFF": "yuml", "\u0178": "Yuml", "\uD835\uDCCF": "zscr", "\uD835\uDD37": "zfr", "\uD835\uDD6B": "zopf", "\u2128": "Zfr", "\u2124": "Zopf", "\uD835\uDCB5": "Zscr", "\u017A": "zacute", "\u0179": "Zacute", "\u017E": "zcaron", "\u017D": "Zcaron", "\u017C": "zdot", "\u017B": "Zdot", "\u01B5": "imped", "\xFE": "thorn", "\xDE": "THORN", "\u0149": "napos", "\u03B1": "alpha", "\u0391": "Alpha", "\u03B2": "beta", "\u0392": "Beta", "\u03B3": "gamma", "\u0393": "Gamma", "\u03B4": "delta", "\u0394": "Delta", "\u03B5": "epsi", "\u03F5": "epsiv", "\u0395": "Epsilon", "\u03DD": "gammad", "\u03DC": "Gammad", "\u03B6": "zeta", "\u0396": "Zeta", "\u03B7": "eta", "\u0397": "Eta", "\u03B8": "theta", "\u03D1": "thetav", "\u0398": "Theta", "\u03B9": "iota", "\u0399": "Iota", "\u03BA": "kappa", "\u03F0": "kappav", "\u039A": "Kappa", "\u03BB": "lambda", "\u039B": "Lambda", "\u03BC": "mu", "\xB5": "micro", "\u039C": "Mu", "\u03BD": "nu", "\u039D": "Nu", "\u03BE": "xi", "\u039E": "Xi", "\u03BF": "omicron", "\u039F": "Omicron", "\u03C0": "pi", "\u03D6": "piv", "\u03A0": "Pi", "\u03C1": "rho", "\u03F1": "rhov", "\u03A1": "Rho", "\u03C3": "sigma", "\u03A3": "Sigma", "\u03C2": "sigmaf", "\u03C4": "tau", "\u03A4": "Tau", "\u03C5": "upsi", "\u03A5": "Upsilon", "\u03D2": "Upsi", "\u03C6": "phi", "\u03D5": "phiv", "\u03A6": "Phi", "\u03C7": "chi", "\u03A7": "Chi", "\u03C8": "psi", "\u03A8": "Psi", "\u03C9": "omega", "\u03A9": "ohm", "\u0430": "acy", "\u0410": "Acy", "\u0431": "bcy", "\u0411": "Bcy", "\u0432": "vcy", "\u0412": "Vcy", "\u0433": "gcy", "\u0413": "Gcy", "\u0453": "gjcy", "\u0403": "GJcy", "\u0434": "dcy", "\u0414": "Dcy", "\u0452": "djcy", "\u0402": "DJcy", "\u0435": "iecy", "\u0415": "IEcy", "\u0451": "iocy", "\u0401": "IOcy", "\u0454": "jukcy", "\u0404": "Jukcy", "\u0436": "zhcy", "\u0416": "ZHcy", "\u0437": "zcy", "\u0417": "Zcy", "\u0455": "dscy", "\u0405": "DScy", "\u0438": "icy", "\u0418": "Icy", "\u0456": "iukcy", "\u0406": "Iukcy", "\u0457": "yicy", "\u0407": "YIcy", "\u0439": "jcy", "\u0419": "Jcy", "\u0458": "jsercy", "\u0408": "Jsercy", "\u043A": "kcy", "\u041A": "Kcy", "\u045C": "kjcy", "\u040C": "KJcy", "\u043B": "lcy", "\u041B": "Lcy", "\u0459": "ljcy", "\u0409": "LJcy", "\u043C": "mcy", "\u041C": "Mcy", "\u043D": "ncy", "\u041D": "Ncy", "\u045A": "njcy", "\u040A": "NJcy", "\u043E": "ocy", "\u041E": "Ocy", "\u043F": "pcy", "\u041F": "Pcy", "\u0440": "rcy", "\u0420": "Rcy", "\u0441": "scy", "\u0421": "Scy", "\u0442": "tcy", "\u0422": "Tcy", "\u045B": "tshcy", "\u040B": "TSHcy", "\u0443": "ucy", "\u0423": "Ucy", "\u045E": "ubrcy", "\u040E": "Ubrcy", "\u0444": "fcy", "\u0424": "Fcy", "\u0445": "khcy", "\u0425": "KHcy", "\u0446": "tscy", "\u0426": "TScy", "\u0447": "chcy", "\u0427": "CHcy", "\u045F": "dzcy", "\u040F": "DZcy", "\u0448": "shcy", "\u0428": "SHcy", "\u0449": "shchcy", "\u0429": "SHCHcy", "\u044A": "hardcy", "\u042A": "HARDcy", "\u044B": "ycy", "\u042B": "Ycy", "\u044C": "softcy", "\u042C": "SOFTcy", "\u044D": "ecy", "\u042D": "Ecy", "\u044E": "yucy", "\u042E": "YUcy", "\u044F": "yacy", "\u042F": "YAcy", "\u2135": "aleph", "\u2136": "beth", "\u2137": "gimel", "\u2138": "daleth" };
    var regexEscape = /["&'<>`]/g;
    var escapeMap = {
      '"': "&quot;",
      "&": "&amp;",
      "'": "&#x27;",
      "<": "&lt;",
      ">": "&gt;",
      "`": "&#x60;"
    };
    var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
    var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
    var decodeMap = { aacute: "\xE1", Aacute: "\xC1", abreve: "\u0103", Abreve: "\u0102", ac: "\u223E", acd: "\u223F", acE: "\u223E\u0333", acirc: "\xE2", Acirc: "\xC2", acute: "\xB4", acy: "\u0430", Acy: "\u0410", aelig: "\xE6", AElig: "\xC6", af: "\u2061", afr: "\uD835\uDD1E", Afr: "\uD835\uDD04", agrave: "\xE0", Agrave: "\xC0", alefsym: "\u2135", aleph: "\u2135", alpha: "\u03B1", Alpha: "\u0391", amacr: "\u0101", Amacr: "\u0100", amalg: "\u2A3F", amp: "&", AMP: "&", and: "\u2227", And: "\u2A53", andand: "\u2A55", andd: "\u2A5C", andslope: "\u2A58", andv: "\u2A5A", ang: "\u2220", ange: "\u29A4", angle: "\u2220", angmsd: "\u2221", angmsdaa: "\u29A8", angmsdab: "\u29A9", angmsdac: "\u29AA", angmsdad: "\u29AB", angmsdae: "\u29AC", angmsdaf: "\u29AD", angmsdag: "\u29AE", angmsdah: "\u29AF", angrt: "\u221F", angrtvb: "\u22BE", angrtvbd: "\u299D", angsph: "\u2222", angst: "\xC5", angzarr: "\u237C", aogon: "\u0105", Aogon: "\u0104", aopf: "\uD835\uDD52", Aopf: "\uD835\uDD38", ap: "\u2248", apacir: "\u2A6F", ape: "\u224A", apE: "\u2A70", apid: "\u224B", apos: "'", ApplyFunction: "\u2061", approx: "\u2248", approxeq: "\u224A", aring: "\xE5", Aring: "\xC5", ascr: "\uD835\uDCB6", Ascr: "\uD835\uDC9C", Assign: "\u2254", ast: "*", asymp: "\u2248", asympeq: "\u224D", atilde: "\xE3", Atilde: "\xC3", auml: "\xE4", Auml: "\xC4", awconint: "\u2233", awint: "\u2A11", backcong: "\u224C", backepsilon: "\u03F6", backprime: "\u2035", backsim: "\u223D", backsimeq: "\u22CD", Backslash: "\u2216", Barv: "\u2AE7", barvee: "\u22BD", barwed: "\u2305", Barwed: "\u2306", barwedge: "\u2305", bbrk: "\u23B5", bbrktbrk: "\u23B6", bcong: "\u224C", bcy: "\u0431", Bcy: "\u0411", bdquo: "\u201E", becaus: "\u2235", because: "\u2235", Because: "\u2235", bemptyv: "\u29B0", bepsi: "\u03F6", bernou: "\u212C", Bernoullis: "\u212C", beta: "\u03B2", Beta: "\u0392", beth: "\u2136", between: "\u226C", bfr: "\uD835\uDD1F", Bfr: "\uD835\uDD05", bigcap: "\u22C2", bigcirc: "\u25EF", bigcup: "\u22C3", bigodot: "\u2A00", bigoplus: "\u2A01", bigotimes: "\u2A02", bigsqcup: "\u2A06", bigstar: "\u2605", bigtriangledown: "\u25BD", bigtriangleup: "\u25B3", biguplus: "\u2A04", bigvee: "\u22C1", bigwedge: "\u22C0", bkarow: "\u290D", blacklozenge: "\u29EB", blacksquare: "\u25AA", blacktriangle: "\u25B4", blacktriangledown: "\u25BE", blacktriangleleft: "\u25C2", blacktriangleright: "\u25B8", blank: "\u2423", blk12: "\u2592", blk14: "\u2591", blk34: "\u2593", block: "\u2588", bne: "=\u20E5", bnequiv: "\u2261\u20E5", bnot: "\u2310", bNot: "\u2AED", bopf: "\uD835\uDD53", Bopf: "\uD835\uDD39", bot: "\u22A5", bottom: "\u22A5", bowtie: "\u22C8", boxbox: "\u29C9", boxdl: "\u2510", boxdL: "\u2555", boxDl: "\u2556", boxDL: "\u2557", boxdr: "\u250C", boxdR: "\u2552", boxDr: "\u2553", boxDR: "\u2554", boxh: "\u2500", boxH: "\u2550", boxhd: "\u252C", boxhD: "\u2565", boxHd: "\u2564", boxHD: "\u2566", boxhu: "\u2534", boxhU: "\u2568", boxHu: "\u2567", boxHU: "\u2569", boxminus: "\u229F", boxplus: "\u229E", boxtimes: "\u22A0", boxul: "\u2518", boxuL: "\u255B", boxUl: "\u255C", boxUL: "\u255D", boxur: "\u2514", boxuR: "\u2558", boxUr: "\u2559", boxUR: "\u255A", boxv: "\u2502", boxV: "\u2551", boxvh: "\u253C", boxvH: "\u256A", boxVh: "\u256B", boxVH: "\u256C", boxvl: "\u2524", boxvL: "\u2561", boxVl: "\u2562", boxVL: "\u2563", boxvr: "\u251C", boxvR: "\u255E", boxVr: "\u255F", boxVR: "\u2560", bprime: "\u2035", breve: "\u02D8", Breve: "\u02D8", brvbar: "\xA6", bscr: "\uD835\uDCB7", Bscr: "\u212C", bsemi: "\u204F", bsim: "\u223D", bsime: "\u22CD", bsol: "\\", bsolb: "\u29C5", bsolhsub: "\u27C8", bull: "\u2022", bullet: "\u2022", bump: "\u224E", bumpe: "\u224F", bumpE: "\u2AAE", bumpeq: "\u224F", Bumpeq: "\u224E", cacute: "\u0107", Cacute: "\u0106", cap: "\u2229", Cap: "\u22D2", capand: "\u2A44", capbrcup: "\u2A49", capcap: "\u2A4B", capcup: "\u2A47", capdot: "\u2A40", CapitalDifferentialD: "\u2145", caps: "\u2229\uFE00", caret: "\u2041", caron: "\u02C7", Cayleys: "\u212D", ccaps: "\u2A4D", ccaron: "\u010D", Ccaron: "\u010C", ccedil: "\xE7", Ccedil: "\xC7", ccirc: "\u0109", Ccirc: "\u0108", Cconint: "\u2230", ccups: "\u2A4C", ccupssm: "\u2A50", cdot: "\u010B", Cdot: "\u010A", cedil: "\xB8", Cedilla: "\xB8", cemptyv: "\u29B2", cent: "\xA2", centerdot: "\xB7", CenterDot: "\xB7", cfr: "\uD835\uDD20", Cfr: "\u212D", chcy: "\u0447", CHcy: "\u0427", check: "\u2713", checkmark: "\u2713", chi: "\u03C7", Chi: "\u03A7", cir: "\u25CB", circ: "\u02C6", circeq: "\u2257", circlearrowleft: "\u21BA", circlearrowright: "\u21BB", circledast: "\u229B", circledcirc: "\u229A", circleddash: "\u229D", CircleDot: "\u2299", circledR: "\xAE", circledS: "\u24C8", CircleMinus: "\u2296", CirclePlus: "\u2295", CircleTimes: "\u2297", cire: "\u2257", cirE: "\u29C3", cirfnint: "\u2A10", cirmid: "\u2AEF", cirscir: "\u29C2", ClockwiseContourIntegral: "\u2232", CloseCurlyDoubleQuote: "\u201D", CloseCurlyQuote: "\u2019", clubs: "\u2663", clubsuit: "\u2663", colon: ":", Colon: "\u2237", colone: "\u2254", Colone: "\u2A74", coloneq: "\u2254", comma: ",", commat: "@", comp: "\u2201", compfn: "\u2218", complement: "\u2201", complexes: "\u2102", cong: "\u2245", congdot: "\u2A6D", Congruent: "\u2261", conint: "\u222E", Conint: "\u222F", ContourIntegral: "\u222E", copf: "\uD835\uDD54", Copf: "\u2102", coprod: "\u2210", Coproduct: "\u2210", copy: "\xA9", COPY: "\xA9", copysr: "\u2117", CounterClockwiseContourIntegral: "\u2233", crarr: "\u21B5", cross: "\u2717", Cross: "\u2A2F", cscr: "\uD835\uDCB8", Cscr: "\uD835\uDC9E", csub: "\u2ACF", csube: "\u2AD1", csup: "\u2AD0", csupe: "\u2AD2", ctdot: "\u22EF", cudarrl: "\u2938", cudarrr: "\u2935", cuepr: "\u22DE", cuesc: "\u22DF", cularr: "\u21B6", cularrp: "\u293D", cup: "\u222A", Cup: "\u22D3", cupbrcap: "\u2A48", cupcap: "\u2A46", CupCap: "\u224D", cupcup: "\u2A4A", cupdot: "\u228D", cupor: "\u2A45", cups: "\u222A\uFE00", curarr: "\u21B7", curarrm: "\u293C", curlyeqprec: "\u22DE", curlyeqsucc: "\u22DF", curlyvee: "\u22CE", curlywedge: "\u22CF", curren: "\xA4", curvearrowleft: "\u21B6", curvearrowright: "\u21B7", cuvee: "\u22CE", cuwed: "\u22CF", cwconint: "\u2232", cwint: "\u2231", cylcty: "\u232D", dagger: "\u2020", Dagger: "\u2021", daleth: "\u2138", darr: "\u2193", dArr: "\u21D3", Darr: "\u21A1", dash: "\u2010", dashv: "\u22A3", Dashv: "\u2AE4", dbkarow: "\u290F", dblac: "\u02DD", dcaron: "\u010F", Dcaron: "\u010E", dcy: "\u0434", Dcy: "\u0414", dd: "\u2146", DD: "\u2145", ddagger: "\u2021", ddarr: "\u21CA", DDotrahd: "\u2911", ddotseq: "\u2A77", deg: "\xB0", Del: "\u2207", delta: "\u03B4", Delta: "\u0394", demptyv: "\u29B1", dfisht: "\u297F", dfr: "\uD835\uDD21", Dfr: "\uD835\uDD07", dHar: "\u2965", dharl: "\u21C3", dharr: "\u21C2", DiacriticalAcute: "\xB4", DiacriticalDot: "\u02D9", DiacriticalDoubleAcute: "\u02DD", DiacriticalGrave: "`", DiacriticalTilde: "\u02DC", diam: "\u22C4", diamond: "\u22C4", Diamond: "\u22C4", diamondsuit: "\u2666", diams: "\u2666", die: "\xA8", DifferentialD: "\u2146", digamma: "\u03DD", disin: "\u22F2", div: "\xF7", divide: "\xF7", divideontimes: "\u22C7", divonx: "\u22C7", djcy: "\u0452", DJcy: "\u0402", dlcorn: "\u231E", dlcrop: "\u230D", dollar: "$", dopf: "\uD835\uDD55", Dopf: "\uD835\uDD3B", dot: "\u02D9", Dot: "\xA8", DotDot: "\u20DC", doteq: "\u2250", doteqdot: "\u2251", DotEqual: "\u2250", dotminus: "\u2238", dotplus: "\u2214", dotsquare: "\u22A1", doublebarwedge: "\u2306", DoubleContourIntegral: "\u222F", DoubleDot: "\xA8", DoubleDownArrow: "\u21D3", DoubleLeftArrow: "\u21D0", DoubleLeftRightArrow: "\u21D4", DoubleLeftTee: "\u2AE4", DoubleLongLeftArrow: "\u27F8", DoubleLongLeftRightArrow: "\u27FA", DoubleLongRightArrow: "\u27F9", DoubleRightArrow: "\u21D2", DoubleRightTee: "\u22A8", DoubleUpArrow: "\u21D1", DoubleUpDownArrow: "\u21D5", DoubleVerticalBar: "\u2225", downarrow: "\u2193", Downarrow: "\u21D3", DownArrow: "\u2193", DownArrowBar: "\u2913", DownArrowUpArrow: "\u21F5", DownBreve: "\u0311", downdownarrows: "\u21CA", downharpoonleft: "\u21C3", downharpoonright: "\u21C2", DownLeftRightVector: "\u2950", DownLeftTeeVector: "\u295E", DownLeftVector: "\u21BD", DownLeftVectorBar: "\u2956", DownRightTeeVector: "\u295F", DownRightVector: "\u21C1", DownRightVectorBar: "\u2957", DownTee: "\u22A4", DownTeeArrow: "\u21A7", drbkarow: "\u2910", drcorn: "\u231F", drcrop: "\u230C", dscr: "\uD835\uDCB9", Dscr: "\uD835\uDC9F", dscy: "\u0455", DScy: "\u0405", dsol: "\u29F6", dstrok: "\u0111", Dstrok: "\u0110", dtdot: "\u22F1", dtri: "\u25BF", dtrif: "\u25BE", duarr: "\u21F5", duhar: "\u296F", dwangle: "\u29A6", dzcy: "\u045F", DZcy: "\u040F", dzigrarr: "\u27FF", eacute: "\xE9", Eacute: "\xC9", easter: "\u2A6E", ecaron: "\u011B", Ecaron: "\u011A", ecir: "\u2256", ecirc: "\xEA", Ecirc: "\xCA", ecolon: "\u2255", ecy: "\u044D", Ecy: "\u042D", eDDot: "\u2A77", edot: "\u0117", eDot: "\u2251", Edot: "\u0116", ee: "\u2147", efDot: "\u2252", efr: "\uD835\uDD22", Efr: "\uD835\uDD08", eg: "\u2A9A", egrave: "\xE8", Egrave: "\xC8", egs: "\u2A96", egsdot: "\u2A98", el: "\u2A99", Element: "\u2208", elinters: "\u23E7", ell: "\u2113", els: "\u2A95", elsdot: "\u2A97", emacr: "\u0113", Emacr: "\u0112", empty: "\u2205", emptyset: "\u2205", EmptySmallSquare: "\u25FB", emptyv: "\u2205", EmptyVerySmallSquare: "\u25AB", emsp: "\u2003", emsp13: "\u2004", emsp14: "\u2005", eng: "\u014B", ENG: "\u014A", ensp: "\u2002", eogon: "\u0119", Eogon: "\u0118", eopf: "\uD835\uDD56", Eopf: "\uD835\uDD3C", epar: "\u22D5", eparsl: "\u29E3", eplus: "\u2A71", epsi: "\u03B5", epsilon: "\u03B5", Epsilon: "\u0395", epsiv: "\u03F5", eqcirc: "\u2256", eqcolon: "\u2255", eqsim: "\u2242", eqslantgtr: "\u2A96", eqslantless: "\u2A95", Equal: "\u2A75", equals: "=", EqualTilde: "\u2242", equest: "\u225F", Equilibrium: "\u21CC", equiv: "\u2261", equivDD: "\u2A78", eqvparsl: "\u29E5", erarr: "\u2971", erDot: "\u2253", escr: "\u212F", Escr: "\u2130", esdot: "\u2250", esim: "\u2242", Esim: "\u2A73", eta: "\u03B7", Eta: "\u0397", eth: "\xF0", ETH: "\xD0", euml: "\xEB", Euml: "\xCB", euro: "\u20AC", excl: "!", exist: "\u2203", Exists: "\u2203", expectation: "\u2130", exponentiale: "\u2147", ExponentialE: "\u2147", fallingdotseq: "\u2252", fcy: "\u0444", Fcy: "\u0424", female: "\u2640", ffilig: "\uFB03", fflig: "\uFB00", ffllig: "\uFB04", ffr: "\uD835\uDD23", Ffr: "\uD835\uDD09", filig: "\uFB01", FilledSmallSquare: "\u25FC", FilledVerySmallSquare: "\u25AA", fjlig: "fj", flat: "\u266D", fllig: "\uFB02", fltns: "\u25B1", fnof: "\u0192", fopf: "\uD835\uDD57", Fopf: "\uD835\uDD3D", forall: "\u2200", ForAll: "\u2200", fork: "\u22D4", forkv: "\u2AD9", Fouriertrf: "\u2131", fpartint: "\u2A0D", frac12: "\xBD", frac13: "\u2153", frac14: "\xBC", frac15: "\u2155", frac16: "\u2159", frac18: "\u215B", frac23: "\u2154", frac25: "\u2156", frac34: "\xBE", frac35: "\u2157", frac38: "\u215C", frac45: "\u2158", frac56: "\u215A", frac58: "\u215D", frac78: "\u215E", frasl: "\u2044", frown: "\u2322", fscr: "\uD835\uDCBB", Fscr: "\u2131", gacute: "\u01F5", gamma: "\u03B3", Gamma: "\u0393", gammad: "\u03DD", Gammad: "\u03DC", gap: "\u2A86", gbreve: "\u011F", Gbreve: "\u011E", Gcedil: "\u0122", gcirc: "\u011D", Gcirc: "\u011C", gcy: "\u0433", Gcy: "\u0413", gdot: "\u0121", Gdot: "\u0120", ge: "\u2265", gE: "\u2267", gel: "\u22DB", gEl: "\u2A8C", geq: "\u2265", geqq: "\u2267", geqslant: "\u2A7E", ges: "\u2A7E", gescc: "\u2AA9", gesdot: "\u2A80", gesdoto: "\u2A82", gesdotol: "\u2A84", gesl: "\u22DB\uFE00", gesles: "\u2A94", gfr: "\uD835\uDD24", Gfr: "\uD835\uDD0A", gg: "\u226B", Gg: "\u22D9", ggg: "\u22D9", gimel: "\u2137", gjcy: "\u0453", GJcy: "\u0403", gl: "\u2277", gla: "\u2AA5", glE: "\u2A92", glj: "\u2AA4", gnap: "\u2A8A", gnapprox: "\u2A8A", gne: "\u2A88", gnE: "\u2269", gneq: "\u2A88", gneqq: "\u2269", gnsim: "\u22E7", gopf: "\uD835\uDD58", Gopf: "\uD835\uDD3E", grave: "`", GreaterEqual: "\u2265", GreaterEqualLess: "\u22DB", GreaterFullEqual: "\u2267", GreaterGreater: "\u2AA2", GreaterLess: "\u2277", GreaterSlantEqual: "\u2A7E", GreaterTilde: "\u2273", gscr: "\u210A", Gscr: "\uD835\uDCA2", gsim: "\u2273", gsime: "\u2A8E", gsiml: "\u2A90", gt: ">", Gt: "\u226B", GT: ">", gtcc: "\u2AA7", gtcir: "\u2A7A", gtdot: "\u22D7", gtlPar: "\u2995", gtquest: "\u2A7C", gtrapprox: "\u2A86", gtrarr: "\u2978", gtrdot: "\u22D7", gtreqless: "\u22DB", gtreqqless: "\u2A8C", gtrless: "\u2277", gtrsim: "\u2273", gvertneqq: "\u2269\uFE00", gvnE: "\u2269\uFE00", Hacek: "\u02C7", hairsp: "\u200A", half: "\xBD", hamilt: "\u210B", hardcy: "\u044A", HARDcy: "\u042A", harr: "\u2194", hArr: "\u21D4", harrcir: "\u2948", harrw: "\u21AD", Hat: "^", hbar: "\u210F", hcirc: "\u0125", Hcirc: "\u0124", hearts: "\u2665", heartsuit: "\u2665", hellip: "\u2026", hercon: "\u22B9", hfr: "\uD835\uDD25", Hfr: "\u210C", HilbertSpace: "\u210B", hksearow: "\u2925", hkswarow: "\u2926", hoarr: "\u21FF", homtht: "\u223B", hookleftarrow: "\u21A9", hookrightarrow: "\u21AA", hopf: "\uD835\uDD59", Hopf: "\u210D", horbar: "\u2015", HorizontalLine: "\u2500", hscr: "\uD835\uDCBD", Hscr: "\u210B", hslash: "\u210F", hstrok: "\u0127", Hstrok: "\u0126", HumpDownHump: "\u224E", HumpEqual: "\u224F", hybull: "\u2043", hyphen: "\u2010", iacute: "\xED", Iacute: "\xCD", ic: "\u2063", icirc: "\xEE", Icirc: "\xCE", icy: "\u0438", Icy: "\u0418", Idot: "\u0130", iecy: "\u0435", IEcy: "\u0415", iexcl: "\xA1", iff: "\u21D4", ifr: "\uD835\uDD26", Ifr: "\u2111", igrave: "\xEC", Igrave: "\xCC", ii: "\u2148", iiiint: "\u2A0C", iiint: "\u222D", iinfin: "\u29DC", iiota: "\u2129", ijlig: "\u0133", IJlig: "\u0132", Im: "\u2111", imacr: "\u012B", Imacr: "\u012A", image: "\u2111", ImaginaryI: "\u2148", imagline: "\u2110", imagpart: "\u2111", imath: "\u0131", imof: "\u22B7", imped: "\u01B5", Implies: "\u21D2", in: "\u2208", incare: "\u2105", infin: "\u221E", infintie: "\u29DD", inodot: "\u0131", int: "\u222B", Int: "\u222C", intcal: "\u22BA", integers: "\u2124", Integral: "\u222B", intercal: "\u22BA", Intersection: "\u22C2", intlarhk: "\u2A17", intprod: "\u2A3C", InvisibleComma: "\u2063", InvisibleTimes: "\u2062", iocy: "\u0451", IOcy: "\u0401", iogon: "\u012F", Iogon: "\u012E", iopf: "\uD835\uDD5A", Iopf: "\uD835\uDD40", iota: "\u03B9", Iota: "\u0399", iprod: "\u2A3C", iquest: "\xBF", iscr: "\uD835\uDCBE", Iscr: "\u2110", isin: "\u2208", isindot: "\u22F5", isinE: "\u22F9", isins: "\u22F4", isinsv: "\u22F3", isinv: "\u2208", it: "\u2062", itilde: "\u0129", Itilde: "\u0128", iukcy: "\u0456", Iukcy: "\u0406", iuml: "\xEF", Iuml: "\xCF", jcirc: "\u0135", Jcirc: "\u0134", jcy: "\u0439", Jcy: "\u0419", jfr: "\uD835\uDD27", Jfr: "\uD835\uDD0D", jmath: "\u0237", jopf: "\uD835\uDD5B", Jopf: "\uD835\uDD41", jscr: "\uD835\uDCBF", Jscr: "\uD835\uDCA5", jsercy: "\u0458", Jsercy: "\u0408", jukcy: "\u0454", Jukcy: "\u0404", kappa: "\u03BA", Kappa: "\u039A", kappav: "\u03F0", kcedil: "\u0137", Kcedil: "\u0136", kcy: "\u043A", Kcy: "\u041A", kfr: "\uD835\uDD28", Kfr: "\uD835\uDD0E", kgreen: "\u0138", khcy: "\u0445", KHcy: "\u0425", kjcy: "\u045C", KJcy: "\u040C", kopf: "\uD835\uDD5C", Kopf: "\uD835\uDD42", kscr: "\uD835\uDCC0", Kscr: "\uD835\uDCA6", lAarr: "\u21DA", lacute: "\u013A", Lacute: "\u0139", laemptyv: "\u29B4", lagran: "\u2112", lambda: "\u03BB", Lambda: "\u039B", lang: "\u27E8", Lang: "\u27EA", langd: "\u2991", langle: "\u27E8", lap: "\u2A85", Laplacetrf: "\u2112", laquo: "\xAB", larr: "\u2190", lArr: "\u21D0", Larr: "\u219E", larrb: "\u21E4", larrbfs: "\u291F", larrfs: "\u291D", larrhk: "\u21A9", larrlp: "\u21AB", larrpl: "\u2939", larrsim: "\u2973", larrtl: "\u21A2", lat: "\u2AAB", latail: "\u2919", lAtail: "\u291B", late: "\u2AAD", lates: "\u2AAD\uFE00", lbarr: "\u290C", lBarr: "\u290E", lbbrk: "\u2772", lbrace: "{", lbrack: "[", lbrke: "\u298B", lbrksld: "\u298F", lbrkslu: "\u298D", lcaron: "\u013E", Lcaron: "\u013D", lcedil: "\u013C", Lcedil: "\u013B", lceil: "\u2308", lcub: "{", lcy: "\u043B", Lcy: "\u041B", ldca: "\u2936", ldquo: "\u201C", ldquor: "\u201E", ldrdhar: "\u2967", ldrushar: "\u294B", ldsh: "\u21B2", le: "\u2264", lE: "\u2266", LeftAngleBracket: "\u27E8", leftarrow: "\u2190", Leftarrow: "\u21D0", LeftArrow: "\u2190", LeftArrowBar: "\u21E4", LeftArrowRightArrow: "\u21C6", leftarrowtail: "\u21A2", LeftCeiling: "\u2308", LeftDoubleBracket: "\u27E6", LeftDownTeeVector: "\u2961", LeftDownVector: "\u21C3", LeftDownVectorBar: "\u2959", LeftFloor: "\u230A", leftharpoondown: "\u21BD", leftharpoonup: "\u21BC", leftleftarrows: "\u21C7", leftrightarrow: "\u2194", Leftrightarrow: "\u21D4", LeftRightArrow: "\u2194", leftrightarrows: "\u21C6", leftrightharpoons: "\u21CB", leftrightsquigarrow: "\u21AD", LeftRightVector: "\u294E", LeftTee: "\u22A3", LeftTeeArrow: "\u21A4", LeftTeeVector: "\u295A", leftthreetimes: "\u22CB", LeftTriangle: "\u22B2", LeftTriangleBar: "\u29CF", LeftTriangleEqual: "\u22B4", LeftUpDownVector: "\u2951", LeftUpTeeVector: "\u2960", LeftUpVector: "\u21BF", LeftUpVectorBar: "\u2958", LeftVector: "\u21BC", LeftVectorBar: "\u2952", leg: "\u22DA", lEg: "\u2A8B", leq: "\u2264", leqq: "\u2266", leqslant: "\u2A7D", les: "\u2A7D", lescc: "\u2AA8", lesdot: "\u2A7F", lesdoto: "\u2A81", lesdotor: "\u2A83", lesg: "\u22DA\uFE00", lesges: "\u2A93", lessapprox: "\u2A85", lessdot: "\u22D6", lesseqgtr: "\u22DA", lesseqqgtr: "\u2A8B", LessEqualGreater: "\u22DA", LessFullEqual: "\u2266", LessGreater: "\u2276", lessgtr: "\u2276", LessLess: "\u2AA1", lesssim: "\u2272", LessSlantEqual: "\u2A7D", LessTilde: "\u2272", lfisht: "\u297C", lfloor: "\u230A", lfr: "\uD835\uDD29", Lfr: "\uD835\uDD0F", lg: "\u2276", lgE: "\u2A91", lHar: "\u2962", lhard: "\u21BD", lharu: "\u21BC", lharul: "\u296A", lhblk: "\u2584", ljcy: "\u0459", LJcy: "\u0409", ll: "\u226A", Ll: "\u22D8", llarr: "\u21C7", llcorner: "\u231E", Lleftarrow: "\u21DA", llhard: "\u296B", lltri: "\u25FA", lmidot: "\u0140", Lmidot: "\u013F", lmoust: "\u23B0", lmoustache: "\u23B0", lnap: "\u2A89", lnapprox: "\u2A89", lne: "\u2A87", lnE: "\u2268", lneq: "\u2A87", lneqq: "\u2268", lnsim: "\u22E6", loang: "\u27EC", loarr: "\u21FD", lobrk: "\u27E6", longleftarrow: "\u27F5", Longleftarrow: "\u27F8", LongLeftArrow: "\u27F5", longleftrightarrow: "\u27F7", Longleftrightarrow: "\u27FA", LongLeftRightArrow: "\u27F7", longmapsto: "\u27FC", longrightarrow: "\u27F6", Longrightarrow: "\u27F9", LongRightArrow: "\u27F6", looparrowleft: "\u21AB", looparrowright: "\u21AC", lopar: "\u2985", lopf: "\uD835\uDD5D", Lopf: "\uD835\uDD43", loplus: "\u2A2D", lotimes: "\u2A34", lowast: "\u2217", lowbar: "_", LowerLeftArrow: "\u2199", LowerRightArrow: "\u2198", loz: "\u25CA", lozenge: "\u25CA", lozf: "\u29EB", lpar: "(", lparlt: "\u2993", lrarr: "\u21C6", lrcorner: "\u231F", lrhar: "\u21CB", lrhard: "\u296D", lrm: "\u200E", lrtri: "\u22BF", lsaquo: "\u2039", lscr: "\uD835\uDCC1", Lscr: "\u2112", lsh: "\u21B0", Lsh: "\u21B0", lsim: "\u2272", lsime: "\u2A8D", lsimg: "\u2A8F", lsqb: "[", lsquo: "\u2018", lsquor: "\u201A", lstrok: "\u0142", Lstrok: "\u0141", lt: "<", Lt: "\u226A", LT: "<", ltcc: "\u2AA6", ltcir: "\u2A79", ltdot: "\u22D6", lthree: "\u22CB", ltimes: "\u22C9", ltlarr: "\u2976", ltquest: "\u2A7B", ltri: "\u25C3", ltrie: "\u22B4", ltrif: "\u25C2", ltrPar: "\u2996", lurdshar: "\u294A", luruhar: "\u2966", lvertneqq: "\u2268\uFE00", lvnE: "\u2268\uFE00", macr: "\xAF", male: "\u2642", malt: "\u2720", maltese: "\u2720", map: "\u21A6", Map: "\u2905", mapsto: "\u21A6", mapstodown: "\u21A7", mapstoleft: "\u21A4", mapstoup: "\u21A5", marker: "\u25AE", mcomma: "\u2A29", mcy: "\u043C", Mcy: "\u041C", mdash: "\u2014", mDDot: "\u223A", measuredangle: "\u2221", MediumSpace: "\u205F", Mellintrf: "\u2133", mfr: "\uD835\uDD2A", Mfr: "\uD835\uDD10", mho: "\u2127", micro: "\xB5", mid: "\u2223", midast: "*", midcir: "\u2AF0", middot: "\xB7", minus: "\u2212", minusb: "\u229F", minusd: "\u2238", minusdu: "\u2A2A", MinusPlus: "\u2213", mlcp: "\u2ADB", mldr: "\u2026", mnplus: "\u2213", models: "\u22A7", mopf: "\uD835\uDD5E", Mopf: "\uD835\uDD44", mp: "\u2213", mscr: "\uD835\uDCC2", Mscr: "\u2133", mstpos: "\u223E", mu: "\u03BC", Mu: "\u039C", multimap: "\u22B8", mumap: "\u22B8", nabla: "\u2207", nacute: "\u0144", Nacute: "\u0143", nang: "\u2220\u20D2", nap: "\u2249", napE: "\u2A70\u0338", napid: "\u224B\u0338", napos: "\u0149", napprox: "\u2249", natur: "\u266E", natural: "\u266E", naturals: "\u2115", nbsp: "\xA0", nbump: "\u224E\u0338", nbumpe: "\u224F\u0338", ncap: "\u2A43", ncaron: "\u0148", Ncaron: "\u0147", ncedil: "\u0146", Ncedil: "\u0145", ncong: "\u2247", ncongdot: "\u2A6D\u0338", ncup: "\u2A42", ncy: "\u043D", Ncy: "\u041D", ndash: "\u2013", ne: "\u2260", nearhk: "\u2924", nearr: "\u2197", neArr: "\u21D7", nearrow: "\u2197", nedot: "\u2250\u0338", NegativeMediumSpace: "\u200B", NegativeThickSpace: "\u200B", NegativeThinSpace: "\u200B", NegativeVeryThinSpace: "\u200B", nequiv: "\u2262", nesear: "\u2928", nesim: "\u2242\u0338", NestedGreaterGreater: "\u226B", NestedLessLess: "\u226A", NewLine: `
`, nexist: "\u2204", nexists: "\u2204", nfr: "\uD835\uDD2B", Nfr: "\uD835\uDD11", nge: "\u2271", ngE: "\u2267\u0338", ngeq: "\u2271", ngeqq: "\u2267\u0338", ngeqslant: "\u2A7E\u0338", nges: "\u2A7E\u0338", nGg: "\u22D9\u0338", ngsim: "\u2275", ngt: "\u226F", nGt: "\u226B\u20D2", ngtr: "\u226F", nGtv: "\u226B\u0338", nharr: "\u21AE", nhArr: "\u21CE", nhpar: "\u2AF2", ni: "\u220B", nis: "\u22FC", nisd: "\u22FA", niv: "\u220B", njcy: "\u045A", NJcy: "\u040A", nlarr: "\u219A", nlArr: "\u21CD", nldr: "\u2025", nle: "\u2270", nlE: "\u2266\u0338", nleftarrow: "\u219A", nLeftarrow: "\u21CD", nleftrightarrow: "\u21AE", nLeftrightarrow: "\u21CE", nleq: "\u2270", nleqq: "\u2266\u0338", nleqslant: "\u2A7D\u0338", nles: "\u2A7D\u0338", nless: "\u226E", nLl: "\u22D8\u0338", nlsim: "\u2274", nlt: "\u226E", nLt: "\u226A\u20D2", nltri: "\u22EA", nltrie: "\u22EC", nLtv: "\u226A\u0338", nmid: "\u2224", NoBreak: "\u2060", NonBreakingSpace: "\xA0", nopf: "\uD835\uDD5F", Nopf: "\u2115", not: "\xAC", Not: "\u2AEC", NotCongruent: "\u2262", NotCupCap: "\u226D", NotDoubleVerticalBar: "\u2226", NotElement: "\u2209", NotEqual: "\u2260", NotEqualTilde: "\u2242\u0338", NotExists: "\u2204", NotGreater: "\u226F", NotGreaterEqual: "\u2271", NotGreaterFullEqual: "\u2267\u0338", NotGreaterGreater: "\u226B\u0338", NotGreaterLess: "\u2279", NotGreaterSlantEqual: "\u2A7E\u0338", NotGreaterTilde: "\u2275", NotHumpDownHump: "\u224E\u0338", NotHumpEqual: "\u224F\u0338", notin: "\u2209", notindot: "\u22F5\u0338", notinE: "\u22F9\u0338", notinva: "\u2209", notinvb: "\u22F7", notinvc: "\u22F6", NotLeftTriangle: "\u22EA", NotLeftTriangleBar: "\u29CF\u0338", NotLeftTriangleEqual: "\u22EC", NotLess: "\u226E", NotLessEqual: "\u2270", NotLessGreater: "\u2278", NotLessLess: "\u226A\u0338", NotLessSlantEqual: "\u2A7D\u0338", NotLessTilde: "\u2274", NotNestedGreaterGreater: "\u2AA2\u0338", NotNestedLessLess: "\u2AA1\u0338", notni: "\u220C", notniva: "\u220C", notnivb: "\u22FE", notnivc: "\u22FD", NotPrecedes: "\u2280", NotPrecedesEqual: "\u2AAF\u0338", NotPrecedesSlantEqual: "\u22E0", NotReverseElement: "\u220C", NotRightTriangle: "\u22EB", NotRightTriangleBar: "\u29D0\u0338", NotRightTriangleEqual: "\u22ED", NotSquareSubset: "\u228F\u0338", NotSquareSubsetEqual: "\u22E2", NotSquareSuperset: "\u2290\u0338", NotSquareSupersetEqual: "\u22E3", NotSubset: "\u2282\u20D2", NotSubsetEqual: "\u2288", NotSucceeds: "\u2281", NotSucceedsEqual: "\u2AB0\u0338", NotSucceedsSlantEqual: "\u22E1", NotSucceedsTilde: "\u227F\u0338", NotSuperset: "\u2283\u20D2", NotSupersetEqual: "\u2289", NotTilde: "\u2241", NotTildeEqual: "\u2244", NotTildeFullEqual: "\u2247", NotTildeTilde: "\u2249", NotVerticalBar: "\u2224", npar: "\u2226", nparallel: "\u2226", nparsl: "\u2AFD\u20E5", npart: "\u2202\u0338", npolint: "\u2A14", npr: "\u2280", nprcue: "\u22E0", npre: "\u2AAF\u0338", nprec: "\u2280", npreceq: "\u2AAF\u0338", nrarr: "\u219B", nrArr: "\u21CF", nrarrc: "\u2933\u0338", nrarrw: "\u219D\u0338", nrightarrow: "\u219B", nRightarrow: "\u21CF", nrtri: "\u22EB", nrtrie: "\u22ED", nsc: "\u2281", nsccue: "\u22E1", nsce: "\u2AB0\u0338", nscr: "\uD835\uDCC3", Nscr: "\uD835\uDCA9", nshortmid: "\u2224", nshortparallel: "\u2226", nsim: "\u2241", nsime: "\u2244", nsimeq: "\u2244", nsmid: "\u2224", nspar: "\u2226", nsqsube: "\u22E2", nsqsupe: "\u22E3", nsub: "\u2284", nsube: "\u2288", nsubE: "\u2AC5\u0338", nsubset: "\u2282\u20D2", nsubseteq: "\u2288", nsubseteqq: "\u2AC5\u0338", nsucc: "\u2281", nsucceq: "\u2AB0\u0338", nsup: "\u2285", nsupe: "\u2289", nsupE: "\u2AC6\u0338", nsupset: "\u2283\u20D2", nsupseteq: "\u2289", nsupseteqq: "\u2AC6\u0338", ntgl: "\u2279", ntilde: "\xF1", Ntilde: "\xD1", ntlg: "\u2278", ntriangleleft: "\u22EA", ntrianglelefteq: "\u22EC", ntriangleright: "\u22EB", ntrianglerighteq: "\u22ED", nu: "\u03BD", Nu: "\u039D", num: "#", numero: "\u2116", numsp: "\u2007", nvap: "\u224D\u20D2", nvdash: "\u22AC", nvDash: "\u22AD", nVdash: "\u22AE", nVDash: "\u22AF", nvge: "\u2265\u20D2", nvgt: ">\u20D2", nvHarr: "\u2904", nvinfin: "\u29DE", nvlArr: "\u2902", nvle: "\u2264\u20D2", nvlt: "<\u20D2", nvltrie: "\u22B4\u20D2", nvrArr: "\u2903", nvrtrie: "\u22B5\u20D2", nvsim: "\u223C\u20D2", nwarhk: "\u2923", nwarr: "\u2196", nwArr: "\u21D6", nwarrow: "\u2196", nwnear: "\u2927", oacute: "\xF3", Oacute: "\xD3", oast: "\u229B", ocir: "\u229A", ocirc: "\xF4", Ocirc: "\xD4", ocy: "\u043E", Ocy: "\u041E", odash: "\u229D", odblac: "\u0151", Odblac: "\u0150", odiv: "\u2A38", odot: "\u2299", odsold: "\u29BC", oelig: "\u0153", OElig: "\u0152", ofcir: "\u29BF", ofr: "\uD835\uDD2C", Ofr: "\uD835\uDD12", ogon: "\u02DB", ograve: "\xF2", Ograve: "\xD2", ogt: "\u29C1", ohbar: "\u29B5", ohm: "\u03A9", oint: "\u222E", olarr: "\u21BA", olcir: "\u29BE", olcross: "\u29BB", oline: "\u203E", olt: "\u29C0", omacr: "\u014D", Omacr: "\u014C", omega: "\u03C9", Omega: "\u03A9", omicron: "\u03BF", Omicron: "\u039F", omid: "\u29B6", ominus: "\u2296", oopf: "\uD835\uDD60", Oopf: "\uD835\uDD46", opar: "\u29B7", OpenCurlyDoubleQuote: "\u201C", OpenCurlyQuote: "\u2018", operp: "\u29B9", oplus: "\u2295", or: "\u2228", Or: "\u2A54", orarr: "\u21BB", ord: "\u2A5D", order: "\u2134", orderof: "\u2134", ordf: "\xAA", ordm: "\xBA", origof: "\u22B6", oror: "\u2A56", orslope: "\u2A57", orv: "\u2A5B", oS: "\u24C8", oscr: "\u2134", Oscr: "\uD835\uDCAA", oslash: "\xF8", Oslash: "\xD8", osol: "\u2298", otilde: "\xF5", Otilde: "\xD5", otimes: "\u2297", Otimes: "\u2A37", otimesas: "\u2A36", ouml: "\xF6", Ouml: "\xD6", ovbar: "\u233D", OverBar: "\u203E", OverBrace: "\u23DE", OverBracket: "\u23B4", OverParenthesis: "\u23DC", par: "\u2225", para: "\xB6", parallel: "\u2225", parsim: "\u2AF3", parsl: "\u2AFD", part: "\u2202", PartialD: "\u2202", pcy: "\u043F", Pcy: "\u041F", percnt: "%", period: ".", permil: "\u2030", perp: "\u22A5", pertenk: "\u2031", pfr: "\uD835\uDD2D", Pfr: "\uD835\uDD13", phi: "\u03C6", Phi: "\u03A6", phiv: "\u03D5", phmmat: "\u2133", phone: "\u260E", pi: "\u03C0", Pi: "\u03A0", pitchfork: "\u22D4", piv: "\u03D6", planck: "\u210F", planckh: "\u210E", plankv: "\u210F", plus: "+", plusacir: "\u2A23", plusb: "\u229E", pluscir: "\u2A22", plusdo: "\u2214", plusdu: "\u2A25", pluse: "\u2A72", PlusMinus: "\xB1", plusmn: "\xB1", plussim: "\u2A26", plustwo: "\u2A27", pm: "\xB1", Poincareplane: "\u210C", pointint: "\u2A15", popf: "\uD835\uDD61", Popf: "\u2119", pound: "\xA3", pr: "\u227A", Pr: "\u2ABB", prap: "\u2AB7", prcue: "\u227C", pre: "\u2AAF", prE: "\u2AB3", prec: "\u227A", precapprox: "\u2AB7", preccurlyeq: "\u227C", Precedes: "\u227A", PrecedesEqual: "\u2AAF", PrecedesSlantEqual: "\u227C", PrecedesTilde: "\u227E", preceq: "\u2AAF", precnapprox: "\u2AB9", precneqq: "\u2AB5", precnsim: "\u22E8", precsim: "\u227E", prime: "\u2032", Prime: "\u2033", primes: "\u2119", prnap: "\u2AB9", prnE: "\u2AB5", prnsim: "\u22E8", prod: "\u220F", Product: "\u220F", profalar: "\u232E", profline: "\u2312", profsurf: "\u2313", prop: "\u221D", Proportion: "\u2237", Proportional: "\u221D", propto: "\u221D", prsim: "\u227E", prurel: "\u22B0", pscr: "\uD835\uDCC5", Pscr: "\uD835\uDCAB", psi: "\u03C8", Psi: "\u03A8", puncsp: "\u2008", qfr: "\uD835\uDD2E", Qfr: "\uD835\uDD14", qint: "\u2A0C", qopf: "\uD835\uDD62", Qopf: "\u211A", qprime: "\u2057", qscr: "\uD835\uDCC6", Qscr: "\uD835\uDCAC", quaternions: "\u210D", quatint: "\u2A16", quest: "?", questeq: "\u225F", quot: '"', QUOT: '"', rAarr: "\u21DB", race: "\u223D\u0331", racute: "\u0155", Racute: "\u0154", radic: "\u221A", raemptyv: "\u29B3", rang: "\u27E9", Rang: "\u27EB", rangd: "\u2992", range: "\u29A5", rangle: "\u27E9", raquo: "\xBB", rarr: "\u2192", rArr: "\u21D2", Rarr: "\u21A0", rarrap: "\u2975", rarrb: "\u21E5", rarrbfs: "\u2920", rarrc: "\u2933", rarrfs: "\u291E", rarrhk: "\u21AA", rarrlp: "\u21AC", rarrpl: "\u2945", rarrsim: "\u2974", rarrtl: "\u21A3", Rarrtl: "\u2916", rarrw: "\u219D", ratail: "\u291A", rAtail: "\u291C", ratio: "\u2236", rationals: "\u211A", rbarr: "\u290D", rBarr: "\u290F", RBarr: "\u2910", rbbrk: "\u2773", rbrace: "}", rbrack: "]", rbrke: "\u298C", rbrksld: "\u298E", rbrkslu: "\u2990", rcaron: "\u0159", Rcaron: "\u0158", rcedil: "\u0157", Rcedil: "\u0156", rceil: "\u2309", rcub: "}", rcy: "\u0440", Rcy: "\u0420", rdca: "\u2937", rdldhar: "\u2969", rdquo: "\u201D", rdquor: "\u201D", rdsh: "\u21B3", Re: "\u211C", real: "\u211C", realine: "\u211B", realpart: "\u211C", reals: "\u211D", rect: "\u25AD", reg: "\xAE", REG: "\xAE", ReverseElement: "\u220B", ReverseEquilibrium: "\u21CB", ReverseUpEquilibrium: "\u296F", rfisht: "\u297D", rfloor: "\u230B", rfr: "\uD835\uDD2F", Rfr: "\u211C", rHar: "\u2964", rhard: "\u21C1", rharu: "\u21C0", rharul: "\u296C", rho: "\u03C1", Rho: "\u03A1", rhov: "\u03F1", RightAngleBracket: "\u27E9", rightarrow: "\u2192", Rightarrow: "\u21D2", RightArrow: "\u2192", RightArrowBar: "\u21E5", RightArrowLeftArrow: "\u21C4", rightarrowtail: "\u21A3", RightCeiling: "\u2309", RightDoubleBracket: "\u27E7", RightDownTeeVector: "\u295D", RightDownVector: "\u21C2", RightDownVectorBar: "\u2955", RightFloor: "\u230B", rightharpoondown: "\u21C1", rightharpoonup: "\u21C0", rightleftarrows: "\u21C4", rightleftharpoons: "\u21CC", rightrightarrows: "\u21C9", rightsquigarrow: "\u219D", RightTee: "\u22A2", RightTeeArrow: "\u21A6", RightTeeVector: "\u295B", rightthreetimes: "\u22CC", RightTriangle: "\u22B3", RightTriangleBar: "\u29D0", RightTriangleEqual: "\u22B5", RightUpDownVector: "\u294F", RightUpTeeVector: "\u295C", RightUpVector: "\u21BE", RightUpVectorBar: "\u2954", RightVector: "\u21C0", RightVectorBar: "\u2953", ring: "\u02DA", risingdotseq: "\u2253", rlarr: "\u21C4", rlhar: "\u21CC", rlm: "\u200F", rmoust: "\u23B1", rmoustache: "\u23B1", rnmid: "\u2AEE", roang: "\u27ED", roarr: "\u21FE", robrk: "\u27E7", ropar: "\u2986", ropf: "\uD835\uDD63", Ropf: "\u211D", roplus: "\u2A2E", rotimes: "\u2A35", RoundImplies: "\u2970", rpar: ")", rpargt: "\u2994", rppolint: "\u2A12", rrarr: "\u21C9", Rrightarrow: "\u21DB", rsaquo: "\u203A", rscr: "\uD835\uDCC7", Rscr: "\u211B", rsh: "\u21B1", Rsh: "\u21B1", rsqb: "]", rsquo: "\u2019", rsquor: "\u2019", rthree: "\u22CC", rtimes: "\u22CA", rtri: "\u25B9", rtrie: "\u22B5", rtrif: "\u25B8", rtriltri: "\u29CE", RuleDelayed: "\u29F4", ruluhar: "\u2968", rx: "\u211E", sacute: "\u015B", Sacute: "\u015A", sbquo: "\u201A", sc: "\u227B", Sc: "\u2ABC", scap: "\u2AB8", scaron: "\u0161", Scaron: "\u0160", sccue: "\u227D", sce: "\u2AB0", scE: "\u2AB4", scedil: "\u015F", Scedil: "\u015E", scirc: "\u015D", Scirc: "\u015C", scnap: "\u2ABA", scnE: "\u2AB6", scnsim: "\u22E9", scpolint: "\u2A13", scsim: "\u227F", scy: "\u0441", Scy: "\u0421", sdot: "\u22C5", sdotb: "\u22A1", sdote: "\u2A66", searhk: "\u2925", searr: "\u2198", seArr: "\u21D8", searrow: "\u2198", sect: "\xA7", semi: ";", seswar: "\u2929", setminus: "\u2216", setmn: "\u2216", sext: "\u2736", sfr: "\uD835\uDD30", Sfr: "\uD835\uDD16", sfrown: "\u2322", sharp: "\u266F", shchcy: "\u0449", SHCHcy: "\u0429", shcy: "\u0448", SHcy: "\u0428", ShortDownArrow: "\u2193", ShortLeftArrow: "\u2190", shortmid: "\u2223", shortparallel: "\u2225", ShortRightArrow: "\u2192", ShortUpArrow: "\u2191", shy: "\xAD", sigma: "\u03C3", Sigma: "\u03A3", sigmaf: "\u03C2", sigmav: "\u03C2", sim: "\u223C", simdot: "\u2A6A", sime: "\u2243", simeq: "\u2243", simg: "\u2A9E", simgE: "\u2AA0", siml: "\u2A9D", simlE: "\u2A9F", simne: "\u2246", simplus: "\u2A24", simrarr: "\u2972", slarr: "\u2190", SmallCircle: "\u2218", smallsetminus: "\u2216", smashp: "\u2A33", smeparsl: "\u29E4", smid: "\u2223", smile: "\u2323", smt: "\u2AAA", smte: "\u2AAC", smtes: "\u2AAC\uFE00", softcy: "\u044C", SOFTcy: "\u042C", sol: "/", solb: "\u29C4", solbar: "\u233F", sopf: "\uD835\uDD64", Sopf: "\uD835\uDD4A", spades: "\u2660", spadesuit: "\u2660", spar: "\u2225", sqcap: "\u2293", sqcaps: "\u2293\uFE00", sqcup: "\u2294", sqcups: "\u2294\uFE00", Sqrt: "\u221A", sqsub: "\u228F", sqsube: "\u2291", sqsubset: "\u228F", sqsubseteq: "\u2291", sqsup: "\u2290", sqsupe: "\u2292", sqsupset: "\u2290", sqsupseteq: "\u2292", squ: "\u25A1", square: "\u25A1", Square: "\u25A1", SquareIntersection: "\u2293", SquareSubset: "\u228F", SquareSubsetEqual: "\u2291", SquareSuperset: "\u2290", SquareSupersetEqual: "\u2292", SquareUnion: "\u2294", squarf: "\u25AA", squf: "\u25AA", srarr: "\u2192", sscr: "\uD835\uDCC8", Sscr: "\uD835\uDCAE", ssetmn: "\u2216", ssmile: "\u2323", sstarf: "\u22C6", star: "\u2606", Star: "\u22C6", starf: "\u2605", straightepsilon: "\u03F5", straightphi: "\u03D5", strns: "\xAF", sub: "\u2282", Sub: "\u22D0", subdot: "\u2ABD", sube: "\u2286", subE: "\u2AC5", subedot: "\u2AC3", submult: "\u2AC1", subne: "\u228A", subnE: "\u2ACB", subplus: "\u2ABF", subrarr: "\u2979", subset: "\u2282", Subset: "\u22D0", subseteq: "\u2286", subseteqq: "\u2AC5", SubsetEqual: "\u2286", subsetneq: "\u228A", subsetneqq: "\u2ACB", subsim: "\u2AC7", subsub: "\u2AD5", subsup: "\u2AD3", succ: "\u227B", succapprox: "\u2AB8", succcurlyeq: "\u227D", Succeeds: "\u227B", SucceedsEqual: "\u2AB0", SucceedsSlantEqual: "\u227D", SucceedsTilde: "\u227F", succeq: "\u2AB0", succnapprox: "\u2ABA", succneqq: "\u2AB6", succnsim: "\u22E9", succsim: "\u227F", SuchThat: "\u220B", sum: "\u2211", Sum: "\u2211", sung: "\u266A", sup: "\u2283", Sup: "\u22D1", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", supdot: "\u2ABE", supdsub: "\u2AD8", supe: "\u2287", supE: "\u2AC6", supedot: "\u2AC4", Superset: "\u2283", SupersetEqual: "\u2287", suphsol: "\u27C9", suphsub: "\u2AD7", suplarr: "\u297B", supmult: "\u2AC2", supne: "\u228B", supnE: "\u2ACC", supplus: "\u2AC0", supset: "\u2283", Supset: "\u22D1", supseteq: "\u2287", supseteqq: "\u2AC6", supsetneq: "\u228B", supsetneqq: "\u2ACC", supsim: "\u2AC8", supsub: "\u2AD4", supsup: "\u2AD6", swarhk: "\u2926", swarr: "\u2199", swArr: "\u21D9", swarrow: "\u2199", swnwar: "\u292A", szlig: "\xDF", Tab: "\t", target: "\u2316", tau: "\u03C4", Tau: "\u03A4", tbrk: "\u23B4", tcaron: "\u0165", Tcaron: "\u0164", tcedil: "\u0163", Tcedil: "\u0162", tcy: "\u0442", Tcy: "\u0422", tdot: "\u20DB", telrec: "\u2315", tfr: "\uD835\uDD31", Tfr: "\uD835\uDD17", there4: "\u2234", therefore: "\u2234", Therefore: "\u2234", theta: "\u03B8", Theta: "\u0398", thetasym: "\u03D1", thetav: "\u03D1", thickapprox: "\u2248", thicksim: "\u223C", ThickSpace: "\u205F\u200A", thinsp: "\u2009", ThinSpace: "\u2009", thkap: "\u2248", thksim: "\u223C", thorn: "\xFE", THORN: "\xDE", tilde: "\u02DC", Tilde: "\u223C", TildeEqual: "\u2243", TildeFullEqual: "\u2245", TildeTilde: "\u2248", times: "\xD7", timesb: "\u22A0", timesbar: "\u2A31", timesd: "\u2A30", tint: "\u222D", toea: "\u2928", top: "\u22A4", topbot: "\u2336", topcir: "\u2AF1", topf: "\uD835\uDD65", Topf: "\uD835\uDD4B", topfork: "\u2ADA", tosa: "\u2929", tprime: "\u2034", trade: "\u2122", TRADE: "\u2122", triangle: "\u25B5", triangledown: "\u25BF", triangleleft: "\u25C3", trianglelefteq: "\u22B4", triangleq: "\u225C", triangleright: "\u25B9", trianglerighteq: "\u22B5", tridot: "\u25EC", trie: "\u225C", triminus: "\u2A3A", TripleDot: "\u20DB", triplus: "\u2A39", trisb: "\u29CD", tritime: "\u2A3B", trpezium: "\u23E2", tscr: "\uD835\uDCC9", Tscr: "\uD835\uDCAF", tscy: "\u0446", TScy: "\u0426", tshcy: "\u045B", TSHcy: "\u040B", tstrok: "\u0167", Tstrok: "\u0166", twixt: "\u226C", twoheadleftarrow: "\u219E", twoheadrightarrow: "\u21A0", uacute: "\xFA", Uacute: "\xDA", uarr: "\u2191", uArr: "\u21D1", Uarr: "\u219F", Uarrocir: "\u2949", ubrcy: "\u045E", Ubrcy: "\u040E", ubreve: "\u016D", Ubreve: "\u016C", ucirc: "\xFB", Ucirc: "\xDB", ucy: "\u0443", Ucy: "\u0423", udarr: "\u21C5", udblac: "\u0171", Udblac: "\u0170", udhar: "\u296E", ufisht: "\u297E", ufr: "\uD835\uDD32", Ufr: "\uD835\uDD18", ugrave: "\xF9", Ugrave: "\xD9", uHar: "\u2963", uharl: "\u21BF", uharr: "\u21BE", uhblk: "\u2580", ulcorn: "\u231C", ulcorner: "\u231C", ulcrop: "\u230F", ultri: "\u25F8", umacr: "\u016B", Umacr: "\u016A", uml: "\xA8", UnderBar: "_", UnderBrace: "\u23DF", UnderBracket: "\u23B5", UnderParenthesis: "\u23DD", Union: "\u22C3", UnionPlus: "\u228E", uogon: "\u0173", Uogon: "\u0172", uopf: "\uD835\uDD66", Uopf: "\uD835\uDD4C", uparrow: "\u2191", Uparrow: "\u21D1", UpArrow: "\u2191", UpArrowBar: "\u2912", UpArrowDownArrow: "\u21C5", updownarrow: "\u2195", Updownarrow: "\u21D5", UpDownArrow: "\u2195", UpEquilibrium: "\u296E", upharpoonleft: "\u21BF", upharpoonright: "\u21BE", uplus: "\u228E", UpperLeftArrow: "\u2196", UpperRightArrow: "\u2197", upsi: "\u03C5", Upsi: "\u03D2", upsih: "\u03D2", upsilon: "\u03C5", Upsilon: "\u03A5", UpTee: "\u22A5", UpTeeArrow: "\u21A5", upuparrows: "\u21C8", urcorn: "\u231D", urcorner: "\u231D", urcrop: "\u230E", uring: "\u016F", Uring: "\u016E", urtri: "\u25F9", uscr: "\uD835\uDCCA", Uscr: "\uD835\uDCB0", utdot: "\u22F0", utilde: "\u0169", Utilde: "\u0168", utri: "\u25B5", utrif: "\u25B4", uuarr: "\u21C8", uuml: "\xFC", Uuml: "\xDC", uwangle: "\u29A7", vangrt: "\u299C", varepsilon: "\u03F5", varkappa: "\u03F0", varnothing: "\u2205", varphi: "\u03D5", varpi: "\u03D6", varpropto: "\u221D", varr: "\u2195", vArr: "\u21D5", varrho: "\u03F1", varsigma: "\u03C2", varsubsetneq: "\u228A\uFE00", varsubsetneqq: "\u2ACB\uFE00", varsupsetneq: "\u228B\uFE00", varsupsetneqq: "\u2ACC\uFE00", vartheta: "\u03D1", vartriangleleft: "\u22B2", vartriangleright: "\u22B3", vBar: "\u2AE8", Vbar: "\u2AEB", vBarv: "\u2AE9", vcy: "\u0432", Vcy: "\u0412", vdash: "\u22A2", vDash: "\u22A8", Vdash: "\u22A9", VDash: "\u22AB", Vdashl: "\u2AE6", vee: "\u2228", Vee: "\u22C1", veebar: "\u22BB", veeeq: "\u225A", vellip: "\u22EE", verbar: "|", Verbar: "\u2016", vert: "|", Vert: "\u2016", VerticalBar: "\u2223", VerticalLine: "|", VerticalSeparator: "\u2758", VerticalTilde: "\u2240", VeryThinSpace: "\u200A", vfr: "\uD835\uDD33", Vfr: "\uD835\uDD19", vltri: "\u22B2", vnsub: "\u2282\u20D2", vnsup: "\u2283\u20D2", vopf: "\uD835\uDD67", Vopf: "\uD835\uDD4D", vprop: "\u221D", vrtri: "\u22B3", vscr: "\uD835\uDCCB", Vscr: "\uD835\uDCB1", vsubne: "\u228A\uFE00", vsubnE: "\u2ACB\uFE00", vsupne: "\u228B\uFE00", vsupnE: "\u2ACC\uFE00", Vvdash: "\u22AA", vzigzag: "\u299A", wcirc: "\u0175", Wcirc: "\u0174", wedbar: "\u2A5F", wedge: "\u2227", Wedge: "\u22C0", wedgeq: "\u2259", weierp: "\u2118", wfr: "\uD835\uDD34", Wfr: "\uD835\uDD1A", wopf: "\uD835\uDD68", Wopf: "\uD835\uDD4E", wp: "\u2118", wr: "\u2240", wreath: "\u2240", wscr: "\uD835\uDCCC", Wscr: "\uD835\uDCB2", xcap: "\u22C2", xcirc: "\u25EF", xcup: "\u22C3", xdtri: "\u25BD", xfr: "\uD835\uDD35", Xfr: "\uD835\uDD1B", xharr: "\u27F7", xhArr: "\u27FA", xi: "\u03BE", Xi: "\u039E", xlarr: "\u27F5", xlArr: "\u27F8", xmap: "\u27FC", xnis: "\u22FB", xodot: "\u2A00", xopf: "\uD835\uDD69", Xopf: "\uD835\uDD4F", xoplus: "\u2A01", xotime: "\u2A02", xrarr: "\u27F6", xrArr: "\u27F9", xscr: "\uD835\uDCCD", Xscr: "\uD835\uDCB3", xsqcup: "\u2A06", xuplus: "\u2A04", xutri: "\u25B3", xvee: "\u22C1", xwedge: "\u22C0", yacute: "\xFD", Yacute: "\xDD", yacy: "\u044F", YAcy: "\u042F", ycirc: "\u0177", Ycirc: "\u0176", ycy: "\u044B", Ycy: "\u042B", yen: "\xA5", yfr: "\uD835\uDD36", Yfr: "\uD835\uDD1C", yicy: "\u0457", YIcy: "\u0407", yopf: "\uD835\uDD6A", Yopf: "\uD835\uDD50", yscr: "\uD835\uDCCE", Yscr: "\uD835\uDCB4", yucy: "\u044E", YUcy: "\u042E", yuml: "\xFF", Yuml: "\u0178", zacute: "\u017A", Zacute: "\u0179", zcaron: "\u017E", Zcaron: "\u017D", zcy: "\u0437", Zcy: "\u0417", zdot: "\u017C", Zdot: "\u017B", zeetrf: "\u2128", ZeroWidthSpace: "\u200B", zeta: "\u03B6", Zeta: "\u0396", zfr: "\uD835\uDD37", Zfr: "\u2128", zhcy: "\u0436", ZHcy: "\u0416", zigrarr: "\u21DD", zopf: "\uD835\uDD6B", Zopf: "\u2124", zscr: "\uD835\uDCCF", Zscr: "\uD835\uDCB5", zwj: "\u200D", zwnj: "\u200C" };
    var decodeMapLegacy = { aacute: "\xE1", Aacute: "\xC1", acirc: "\xE2", Acirc: "\xC2", acute: "\xB4", aelig: "\xE6", AElig: "\xC6", agrave: "\xE0", Agrave: "\xC0", amp: "&", AMP: "&", aring: "\xE5", Aring: "\xC5", atilde: "\xE3", Atilde: "\xC3", auml: "\xE4", Auml: "\xC4", brvbar: "\xA6", ccedil: "\xE7", Ccedil: "\xC7", cedil: "\xB8", cent: "\xA2", copy: "\xA9", COPY: "\xA9", curren: "\xA4", deg: "\xB0", divide: "\xF7", eacute: "\xE9", Eacute: "\xC9", ecirc: "\xEA", Ecirc: "\xCA", egrave: "\xE8", Egrave: "\xC8", eth: "\xF0", ETH: "\xD0", euml: "\xEB", Euml: "\xCB", frac12: "\xBD", frac14: "\xBC", frac34: "\xBE", gt: ">", GT: ">", iacute: "\xED", Iacute: "\xCD", icirc: "\xEE", Icirc: "\xCE", iexcl: "\xA1", igrave: "\xEC", Igrave: "\xCC", iquest: "\xBF", iuml: "\xEF", Iuml: "\xCF", laquo: "\xAB", lt: "<", LT: "<", macr: "\xAF", micro: "\xB5", middot: "\xB7", nbsp: "\xA0", not: "\xAC", ntilde: "\xF1", Ntilde: "\xD1", oacute: "\xF3", Oacute: "\xD3", ocirc: "\xF4", Ocirc: "\xD4", ograve: "\xF2", Ograve: "\xD2", ordf: "\xAA", ordm: "\xBA", oslash: "\xF8", Oslash: "\xD8", otilde: "\xF5", Otilde: "\xD5", ouml: "\xF6", Ouml: "\xD6", para: "\xB6", plusmn: "\xB1", pound: "\xA3", quot: '"', QUOT: '"', raquo: "\xBB", reg: "\xAE", REG: "\xAE", sect: "\xA7", shy: "\xAD", sup1: "\xB9", sup2: "\xB2", sup3: "\xB3", szlig: "\xDF", thorn: "\xFE", THORN: "\xDE", times: "\xD7", uacute: "\xFA", Uacute: "\xDA", ucirc: "\xFB", Ucirc: "\xDB", ugrave: "\xF9", Ugrave: "\xD9", uml: "\xA8", uuml: "\xFC", Uuml: "\xDC", yacute: "\xFD", Yacute: "\xDD", yen: "\xA5", yuml: "\xFF" };
    var decodeMapNumeric = { "0": "\uFFFD", "128": "\u20AC", "130": "\u201A", "131": "\u0192", "132": "\u201E", "133": "\u2026", "134": "\u2020", "135": "\u2021", "136": "\u02C6", "137": "\u2030", "138": "\u0160", "139": "\u2039", "140": "\u0152", "142": "\u017D", "145": "\u2018", "146": "\u2019", "147": "\u201C", "148": "\u201D", "149": "\u2022", "150": "\u2013", "151": "\u2014", "152": "\u02DC", "153": "\u2122", "154": "\u0161", "155": "\u203A", "156": "\u0153", "158": "\u017E", "159": "\u0178" };
    var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65000, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
    var stringFromCharCode = String.fromCharCode;
    var object = {};
    var hasOwnProperty = object.hasOwnProperty;
    var has = function(object2, propertyName) {
      return hasOwnProperty.call(object2, propertyName);
    };
    var contains = function(array, value) {
      var index = -1;
      var length = array.length;
      while (++index < length) {
        if (array[index] == value) {
          return true;
        }
      }
      return false;
    };
    var merge = function(options, defaults) {
      if (!options) {
        return defaults;
      }
      var result = {};
      var key2;
      for (key2 in defaults) {
        result[key2] = has(options, key2) ? options[key2] : defaults[key2];
      }
      return result;
    };
    var codePointToSymbol = function(codePoint, strict) {
      var output = "";
      if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
        if (strict) {
          parseError("character reference outside the permissible Unicode range");
        }
        return "\uFFFD";
      }
      if (has(decodeMapNumeric, codePoint)) {
        if (strict) {
          parseError("disallowed character reference");
        }
        return decodeMapNumeric[codePoint];
      }
      if (strict && contains(invalidReferenceCodePoints, codePoint)) {
        parseError("disallowed character reference");
      }
      if (codePoint > 65535) {
        codePoint -= 65536;
        output += stringFromCharCode(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      output += stringFromCharCode(codePoint);
      return output;
    };
    var hexEscape = function(codePoint) {
      return "&#x" + codePoint.toString(16).toUpperCase() + ";";
    };
    var decEscape = function(codePoint) {
      return "&#" + codePoint + ";";
    };
    var parseError = function(message) {
      throw Error("Parse error: " + message);
    };
    var encode = function(string, options) {
      options = merge(options, encode.options);
      var strict = options.strict;
      if (strict && regexInvalidRawCodePoint.test(string)) {
        parseError("forbidden code point");
      }
      var encodeEverything = options.encodeEverything;
      var useNamedReferences = options.useNamedReferences;
      var allowUnsafeSymbols = options.allowUnsafeSymbols;
      var escapeCodePoint = options.decimal ? decEscape : hexEscape;
      var escapeBmpSymbol = function(symbol) {
        return escapeCodePoint(symbol.charCodeAt(0));
      };
      if (encodeEverything) {
        string = string.replace(regexAsciiWhitelist, function(symbol) {
          if (useNamedReferences && has(encodeMap, symbol)) {
            return "&" + encodeMap[symbol] + ";";
          }
          return escapeBmpSymbol(symbol);
        });
        if (useNamedReferences) {
          string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;").replace(/&#x66;&#x6A;/g, "&fjlig;");
        }
        if (useNamedReferences) {
          string = string.replace(regexEncodeNonAscii, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
      } else if (useNamedReferences) {
        if (!allowUnsafeSymbols) {
          string = string.replace(regexEscape, function(string2) {
            return "&" + encodeMap[string2] + ";";
          });
        }
        string = string.replace(/&gt;\u20D2/g, "&nvgt;").replace(/&lt;\u20D2/g, "&nvlt;");
        string = string.replace(regexEncodeNonAscii, function(string2) {
          return "&" + encodeMap[string2] + ";";
        });
      } else if (!allowUnsafeSymbols) {
        string = string.replace(regexEscape, escapeBmpSymbol);
      }
      return string.replace(regexAstralSymbols, function($0) {
        var high = $0.charCodeAt(0);
        var low = $0.charCodeAt(1);
        var codePoint = (high - 55296) * 1024 + low - 56320 + 65536;
        return escapeCodePoint(codePoint);
      }).replace(regexBmpWhitelist, escapeBmpSymbol);
    };
    encode.options = {
      allowUnsafeSymbols: false,
      encodeEverything: false,
      strict: false,
      useNamedReferences: false,
      decimal: false
    };
    var decode = function(html, options) {
      options = merge(options, decode.options);
      var strict = options.strict;
      if (strict && regexInvalidEntity.test(html)) {
        parseError("malformed character reference");
      }
      return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
        var codePoint;
        var semicolon;
        var decDigits;
        var hexDigits;
        var reference;
        var next;
        if ($1) {
          reference = $1;
          return decodeMap[reference];
        }
        if ($2) {
          reference = $2;
          next = $3;
          if (next && options.isAttributeValue) {
            if (strict && next == "=") {
              parseError("`&` did not start a character reference");
            }
            return $0;
          } else {
            if (strict) {
              parseError("named character reference was not terminated by a semicolon");
            }
            return decodeMapLegacy[reference] + (next || "");
          }
        }
        if ($4) {
          decDigits = $4;
          semicolon = $5;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(decDigits, 10);
          return codePointToSymbol(codePoint, strict);
        }
        if ($6) {
          hexDigits = $6;
          semicolon = $7;
          if (strict && !semicolon) {
            parseError("character reference was not terminated by a semicolon");
          }
          codePoint = parseInt(hexDigits, 16);
          return codePointToSymbol(codePoint, strict);
        }
        if (strict) {
          parseError("named character reference was not terminated by a semicolon");
        }
        return $0;
      });
    };
    decode.options = {
      isAttributeValue: false,
      strict: false
    };
    var escape = function(string) {
      return string.replace(regexEscape, function($0) {
        return escapeMap[$0];
      });
    };
    var he = {
      version: "1.2.0",
      encode,
      decode,
      escape,
      unescape: decode
    };
    if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
      define(function() {
        return he;
      });
    } else if (freeExports && !freeExports.nodeType) {
      if (freeModule) {
        freeModule.exports = he;
      } else {
        for (var key in he) {
          has(he, key) && (freeExports[key] = he[key]);
        }
      }
    } else {
      root.he = he;
    }
  })(exports2);
});

// node_modules/node-html-parser/dist/nodes/node.js
var require_node = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var he_1 = require_he();

  class Node {
    constructor(parentNode = null, range) {
      this.parentNode = parentNode;
      this.childNodes = [];
      Object.defineProperty(this, "range", {
        enumerable: false,
        writable: true,
        configurable: true,
        value: range !== null && range !== undefined ? range : [-1, -1]
      });
    }
    remove() {
      if (this.parentNode) {
        const children = this.parentNode.childNodes;
        this.parentNode.childNodes = children.filter((child) => {
          return this !== child;
        });
        this.parentNode = null;
      }
      return this;
    }
    get innerText() {
      return this.rawText;
    }
    get textContent() {
      return (0, he_1.decode)(this.rawText);
    }
    set textContent(val) {
      this.rawText = (0, he_1.encode)(val);
    }
  }
  exports2.default = Node;
});

// node_modules/node-html-parser/dist/nodes/type.js
var require_type = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var NodeType;
  (function(NodeType2) {
    NodeType2[NodeType2["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
    NodeType2[NodeType2["TEXT_NODE"] = 3] = "TEXT_NODE";
    NodeType2[NodeType2["COMMENT_NODE"] = 8] = "COMMENT_NODE";
  })(NodeType || (NodeType = {}));
  exports2.default = NodeType;
});

// node_modules/node-html-parser/dist/nodes/comment.js
var require_comment = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  var node_1 = __importDefault(require_node());
  var type_1 = __importDefault(require_type());

  class CommentNode extends node_1.default {
    clone() {
      return new CommentNode(this.rawText, null, undefined, this.rawTagName);
    }
    constructor(rawText, parentNode = null, range, rawTagName = "!--") {
      super(parentNode, range);
      this.rawText = rawText;
      this.rawTagName = rawTagName;
      this.nodeType = type_1.default.COMMENT_NODE;
    }
    get text() {
      return this.rawText;
    }
    toString() {
      return `<!--${this.rawText}-->`;
    }
  }
  exports2.default = CommentNode;
});

// node_modules/domelementtype/lib/index.js
var require_lib = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.Doctype = exports2.CDATA = exports2.Tag = exports2.Style = exports2.Script = exports2.Comment = exports2.Directive = exports2.Text = exports2.Root = exports2.isTag = exports2.ElementType = undefined;
  var ElementType;
  (function(ElementType2) {
    ElementType2["Root"] = "root";
    ElementType2["Text"] = "text";
    ElementType2["Directive"] = "directive";
    ElementType2["Comment"] = "comment";
    ElementType2["Script"] = "script";
    ElementType2["Style"] = "style";
    ElementType2["Tag"] = "tag";
    ElementType2["CDATA"] = "cdata";
    ElementType2["Doctype"] = "doctype";
  })(ElementType = exports2.ElementType || (exports2.ElementType = {}));
  function isTag(elem) {
    return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
  }
  exports2.isTag = isTag;
  exports2.Root = ElementType.Root;
  exports2.Text = ElementType.Text;
  exports2.Directive = ElementType.Directive;
  exports2.Comment = ElementType.Comment;
  exports2.Script = ElementType.Script;
  exports2.Style = ElementType.Style;
  exports2.Tag = ElementType.Tag;
  exports2.CDATA = ElementType.CDATA;
  exports2.Doctype = ElementType.Doctype;
});

// node_modules/domhandler/lib/node.js
var require_node2 = __commonJS((exports2) => {
  var __extends = exports2 && exports2.__extends || function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
    };
  }();
  var __assign = exports2 && exports2.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length;i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.cloneNode = exports2.hasChildren = exports2.isDocument = exports2.isDirective = exports2.isComment = exports2.isText = exports2.isCDATA = exports2.isTag = exports2.Element = exports2.Document = exports2.CDATA = exports2.NodeWithChildren = exports2.ProcessingInstruction = exports2.Comment = exports2.Text = exports2.DataNode = exports2.Node = undefined;
  var domelementtype_1 = require_lib();
  var Node = function() {
    function Node2() {
      this.parent = null;
      this.prev = null;
      this.next = null;
      this.startIndex = null;
      this.endIndex = null;
    }
    Object.defineProperty(Node2.prototype, "parentNode", {
      get: function() {
        return this.parent;
      },
      set: function(parent) {
        this.parent = parent;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "previousSibling", {
      get: function() {
        return this.prev;
      },
      set: function(prev) {
        this.prev = prev;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Node2.prototype, "nextSibling", {
      get: function() {
        return this.next;
      },
      set: function(next) {
        this.next = next;
      },
      enumerable: false,
      configurable: true
    });
    Node2.prototype.cloneNode = function(recursive) {
      if (recursive === undefined) {
        recursive = false;
      }
      return cloneNode(this, recursive);
    };
    return Node2;
  }();
  exports2.Node = Node;
  var DataNode = function(_super) {
    __extends(DataNode2, _super);
    function DataNode2(data) {
      var _this = _super.call(this) || this;
      _this.data = data;
      return _this;
    }
    Object.defineProperty(DataNode2.prototype, "nodeValue", {
      get: function() {
        return this.data;
      },
      set: function(data) {
        this.data = data;
      },
      enumerable: false,
      configurable: true
    });
    return DataNode2;
  }(Node);
  exports2.DataNode = DataNode;
  var Text = function(_super) {
    __extends(Text2, _super);
    function Text2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = domelementtype_1.ElementType.Text;
      return _this;
    }
    Object.defineProperty(Text2.prototype, "nodeType", {
      get: function() {
        return 3;
      },
      enumerable: false,
      configurable: true
    });
    return Text2;
  }(DataNode);
  exports2.Text = Text;
  var Comment = function(_super) {
    __extends(Comment2, _super);
    function Comment2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = domelementtype_1.ElementType.Comment;
      return _this;
    }
    Object.defineProperty(Comment2.prototype, "nodeType", {
      get: function() {
        return 8;
      },
      enumerable: false,
      configurable: true
    });
    return Comment2;
  }(DataNode);
  exports2.Comment = Comment;
  var ProcessingInstruction = function(_super) {
    __extends(ProcessingInstruction2, _super);
    function ProcessingInstruction2(name, data) {
      var _this = _super.call(this, data) || this;
      _this.name = name;
      _this.type = domelementtype_1.ElementType.Directive;
      return _this;
    }
    Object.defineProperty(ProcessingInstruction2.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: false,
      configurable: true
    });
    return ProcessingInstruction2;
  }(DataNode);
  exports2.ProcessingInstruction = ProcessingInstruction;
  var NodeWithChildren = function(_super) {
    __extends(NodeWithChildren2, _super);
    function NodeWithChildren2(children) {
      var _this = _super.call(this) || this;
      _this.children = children;
      return _this;
    }
    Object.defineProperty(NodeWithChildren2.prototype, "firstChild", {
      get: function() {
        var _a;
        return (_a = this.children[0]) !== null && _a !== undefined ? _a : null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(NodeWithChildren2.prototype, "lastChild", {
      get: function() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(NodeWithChildren2.prototype, "childNodes", {
      get: function() {
        return this.children;
      },
      set: function(children) {
        this.children = children;
      },
      enumerable: false,
      configurable: true
    });
    return NodeWithChildren2;
  }(Node);
  exports2.NodeWithChildren = NodeWithChildren;
  var CDATA = function(_super) {
    __extends(CDATA2, _super);
    function CDATA2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = domelementtype_1.ElementType.CDATA;
      return _this;
    }
    Object.defineProperty(CDATA2.prototype, "nodeType", {
      get: function() {
        return 4;
      },
      enumerable: false,
      configurable: true
    });
    return CDATA2;
  }(NodeWithChildren);
  exports2.CDATA = CDATA;
  var Document = function(_super) {
    __extends(Document2, _super);
    function Document2() {
      var _this = _super !== null && _super.apply(this, arguments) || this;
      _this.type = domelementtype_1.ElementType.Root;
      return _this;
    }
    Object.defineProperty(Document2.prototype, "nodeType", {
      get: function() {
        return 9;
      },
      enumerable: false,
      configurable: true
    });
    return Document2;
  }(NodeWithChildren);
  exports2.Document = Document;
  var Element = function(_super) {
    __extends(Element2, _super);
    function Element2(name, attribs, children, type) {
      if (children === undefined) {
        children = [];
      }
      if (type === undefined) {
        type = name === "script" ? domelementtype_1.ElementType.Script : name === "style" ? domelementtype_1.ElementType.Style : domelementtype_1.ElementType.Tag;
      }
      var _this = _super.call(this, children) || this;
      _this.name = name;
      _this.attribs = attribs;
      _this.type = type;
      return _this;
    }
    Object.defineProperty(Element2.prototype, "nodeType", {
      get: function() {
        return 1;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element2.prototype, "tagName", {
      get: function() {
        return this.name;
      },
      set: function(name) {
        this.name = name;
      },
      enumerable: false,
      configurable: true
    });
    Object.defineProperty(Element2.prototype, "attributes", {
      get: function() {
        var _this = this;
        return Object.keys(this.attribs).map(function(name) {
          var _a, _b;
          return {
            name,
            value: _this.attribs[name],
            namespace: (_a = _this["x-attribsNamespace"]) === null || _a === undefined ? undefined : _a[name],
            prefix: (_b = _this["x-attribsPrefix"]) === null || _b === undefined ? undefined : _b[name]
          };
        });
      },
      enumerable: false,
      configurable: true
    });
    return Element2;
  }(NodeWithChildren);
  exports2.Element = Element;
  function isTag(node) {
    return (0, domelementtype_1.isTag)(node);
  }
  exports2.isTag = isTag;
  function isCDATA(node) {
    return node.type === domelementtype_1.ElementType.CDATA;
  }
  exports2.isCDATA = isCDATA;
  function isText(node) {
    return node.type === domelementtype_1.ElementType.Text;
  }
  exports2.isText = isText;
  function isComment(node) {
    return node.type === domelementtype_1.ElementType.Comment;
  }
  exports2.isComment = isComment;
  function isDirective(node) {
    return node.type === domelementtype_1.ElementType.Directive;
  }
  exports2.isDirective = isDirective;
  function isDocument(node) {
    return node.type === domelementtype_1.ElementType.Root;
  }
  exports2.isDocument = isDocument;
  function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
  }
  exports2.hasChildren = hasChildren;
  function cloneNode(node, recursive) {
    if (recursive === undefined) {
      recursive = false;
    }
    var result;
    if (isText(node)) {
      result = new Text(node.data);
    } else if (isComment(node)) {
      result = new Comment(node.data);
    } else if (isTag(node)) {
      var children = recursive ? cloneChildren(node.children) : [];
      var clone_1 = new Element(node.name, __assign({}, node.attribs), children);
      children.forEach(function(child) {
        return child.parent = clone_1;
      });
      if (node.namespace != null) {
        clone_1.namespace = node.namespace;
      }
      if (node["x-attribsNamespace"]) {
        clone_1["x-attribsNamespace"] = __assign({}, node["x-attribsNamespace"]);
      }
      if (node["x-attribsPrefix"]) {
        clone_1["x-attribsPrefix"] = __assign({}, node["x-attribsPrefix"]);
      }
      result = clone_1;
    } else if (isCDATA(node)) {
      var children = recursive ? cloneChildren(node.children) : [];
      var clone_2 = new CDATA(children);
      children.forEach(function(child) {
        return child.parent = clone_2;
      });
      result = clone_2;
    } else if (isDocument(node)) {
      var children = recursive ? cloneChildren(node.children) : [];
      var clone_3 = new Document(children);
      children.forEach(function(child) {
        return child.parent = clone_3;
      });
      if (node["x-mode"]) {
        clone_3["x-mode"] = node["x-mode"];
      }
      result = clone_3;
    } else if (isDirective(node)) {
      var instruction = new ProcessingInstruction(node.name, node.data);
      if (node["x-name"] != null) {
        instruction["x-name"] = node["x-name"];
        instruction["x-publicId"] = node["x-publicId"];
        instruction["x-systemId"] = node["x-systemId"];
      }
      result = instruction;
    } else {
      throw new Error("Not implemented yet: ".concat(node.type));
    }
    result.startIndex = node.startIndex;
    result.endIndex = node.endIndex;
    if (node.sourceCodeLocation != null) {
      result.sourceCodeLocation = node.sourceCodeLocation;
    }
    return result;
  }
  exports2.cloneNode = cloneNode;
  function cloneChildren(childs) {
    var children = childs.map(function(child) {
      return cloneNode(child, true);
    });
    for (var i = 1;i < children.length; i++) {
      children[i].prev = children[i - 1];
      children[i - 1].next = children[i];
    }
    return children;
  }
});

// node_modules/domhandler/lib/index.js
var require_lib2 = __commonJS((exports2) => {
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
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.DomHandler = undefined;
  var domelementtype_1 = require_lib();
  var node_js_1 = require_node2();
  __exportStar(require_node2(), exports2);
  var defaultOpts = {
    withStartIndices: false,
    withEndIndices: false,
    xmlMode: false
  };
  var DomHandler = function() {
    function DomHandler2(callback, options, elementCB) {
      this.dom = [];
      this.root = new node_js_1.Document(this.dom);
      this.done = false;
      this.tagStack = [this.root];
      this.lastNode = null;
      this.parser = null;
      if (typeof options === "function") {
        elementCB = options;
        options = defaultOpts;
      }
      if (typeof callback === "object") {
        options = callback;
        callback = undefined;
      }
      this.callback = callback !== null && callback !== undefined ? callback : null;
      this.options = options !== null && options !== undefined ? options : defaultOpts;
      this.elementCB = elementCB !== null && elementCB !== undefined ? elementCB : null;
    }
    DomHandler2.prototype.onparserinit = function(parser) {
      this.parser = parser;
    };
    DomHandler2.prototype.onreset = function() {
      this.dom = [];
      this.root = new node_js_1.Document(this.dom);
      this.done = false;
      this.tagStack = [this.root];
      this.lastNode = null;
      this.parser = null;
    };
    DomHandler2.prototype.onend = function() {
      if (this.done)
        return;
      this.done = true;
      this.parser = null;
      this.handleCallback(null);
    };
    DomHandler2.prototype.onerror = function(error) {
      this.handleCallback(error);
    };
    DomHandler2.prototype.onclosetag = function() {
      this.lastNode = null;
      var elem = this.tagStack.pop();
      if (this.options.withEndIndices) {
        elem.endIndex = this.parser.endIndex;
      }
      if (this.elementCB)
        this.elementCB(elem);
    };
    DomHandler2.prototype.onopentag = function(name, attribs) {
      var type = this.options.xmlMode ? domelementtype_1.ElementType.Tag : undefined;
      var element = new node_js_1.Element(name, attribs, undefined, type);
      this.addNode(element);
      this.tagStack.push(element);
    };
    DomHandler2.prototype.ontext = function(data) {
      var lastNode = this.lastNode;
      if (lastNode && lastNode.type === domelementtype_1.ElementType.Text) {
        lastNode.data += data;
        if (this.options.withEndIndices) {
          lastNode.endIndex = this.parser.endIndex;
        }
      } else {
        var node = new node_js_1.Text(data);
        this.addNode(node);
        this.lastNode = node;
      }
    };
    DomHandler2.prototype.oncomment = function(data) {
      if (this.lastNode && this.lastNode.type === domelementtype_1.ElementType.Comment) {
        this.lastNode.data += data;
        return;
      }
      var node = new node_js_1.Comment(data);
      this.addNode(node);
      this.lastNode = node;
    };
    DomHandler2.prototype.oncommentend = function() {
      this.lastNode = null;
    };
    DomHandler2.prototype.oncdatastart = function() {
      var text = new node_js_1.Text("");
      var node = new node_js_1.CDATA([text]);
      this.addNode(node);
      text.parent = node;
      this.lastNode = text;
    };
    DomHandler2.prototype.oncdataend = function() {
      this.lastNode = null;
    };
    DomHandler2.prototype.onprocessinginstruction = function(name, data) {
      var node = new node_js_1.ProcessingInstruction(name, data);
      this.addNode(node);
    };
    DomHandler2.prototype.handleCallback = function(error) {
      if (typeof this.callback === "function") {
        this.callback(error, this.dom);
      } else if (error) {
        throw error;
      }
    };
    DomHandler2.prototype.addNode = function(node) {
      var parent = this.tagStack[this.tagStack.length - 1];
      var previousSibling = parent.children[parent.children.length - 1];
      if (this.options.withStartIndices) {
        node.startIndex = this.parser.startIndex;
      }
      if (this.options.withEndIndices) {
        node.endIndex = this.parser.endIndex;
      }
      parent.children.push(node);
      if (previousSibling) {
        node.prev = previousSibling;
        previousSibling.next = node;
      }
      node.parent = parent;
      this.lastNode = null;
    };
    return DomHandler2;
  }();
  exports2.DomHandler = DomHandler;
  exports2.default = DomHandler;
});

// node_modules/entities/lib/generated/decode-data-html.js
var require_decode_data_html = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.default = new Uint16Array("\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\x00\x00\x00\x00\x00\x00\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\uD835\uDD04rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\uD835\uDD38plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\uD835\uDC9Cign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\uD835\uDD05pf;\uC000\uD835\uDD39eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\uD835\uDC9Ep\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\uD835\uDD07\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\x00\x00\x00\u0342\u0354\x00\u0405f;\uC000\uD835\uDD3B\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\x00\x00\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\x00\x00\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\x00\u0446\x00\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\x00\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\uD835\uDC9Frok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\uD835\uDD08rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\x00\x00\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\uD835\uDD3Csilon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\uD835\uDD09lled\u0253\u0597\x00\x00\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\x00\u05BF\x00\x00\u05C4f;\uC000\uD835\uDD3DAll;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\uD835\uDD0A;\u62D9pf;\uC000\uD835\uDD3Eeater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\uD835\uDCA2;\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\x00\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\x00\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\uD835\uDD40a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\x00\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\uD835\uDD0Dpf;\uC000\uD835\uDD41\u01E3\u07C7\x00\u07CCr;\uC000\uD835\uDCA5rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\uD835\uDD0Epf;\uC000\uD835\uDD42cr;\uC000\uD835\uDCA6\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\x00\u08C3bleBracket;\u67E6n\u01D4\u08C8\x00\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\uD835\uDD0F\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\uD835\uDD43er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\uD835\uDD10nusPlus;\u6213pf;\uC000\uD835\uDD44c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\uD835\uDD11\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\uD835\uDCA9ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\uD835\uDD12rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\uD835\uDD46enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\uD835\uDCAAash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\uD835\uDD13i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\uD835\uDCAB;\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B\"\u4022r;\uC000\uD835\uDD14pf;\u611Acr;\uC000\uD835\uDCAC\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\x00\u1005bleBracket;\u67E7n\u01D4\u100A\x00\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\uD835\uDD16ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\uD835\uDD4A\u0272\u116D\x00\x00\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\uD835\uDCAEar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\uD835\uDD17\u0100ei\u127B\u1289\u01F2\u1280\x00\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\uD835\uDD4BipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\uD835\uDCAFrok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\x00\u132C\u1331\x00\x00\x00\x00\x00\u1338\u133D\u1377\u1385\x00\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\x00\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\uD835\uDD18rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\uD835\uDD4C\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\uD835\uDCB0ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\uD835\uDD19pf;\uC000\uD835\uDD4Dcr;\uC000\uD835\uDCB1dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\uD835\uDD1Apf;\uC000\uD835\uDD4Ecr;\uC000\uD835\uDCB2\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\uD835\uDD1B;\u439Epf;\uC000\uD835\uDD4Fcr;\uC000\uD835\uDCB3\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\uD835\uDD1Cpf;\uC000\uD835\uDD50cr;\uC000\uD835\uDCB4ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\x00\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\uD835\uDCB5\u0BE1\u1583\u158A\u1590\x00\u15B0\u15B6\u15BF\x00\x00\x00\x00\u15C6\u15DB\u15EB\u165F\u166D\x00\u1695\u169B\u16B2\u16B9\x00\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\uD835\uDD1Erave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\x00\x00\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\uD835\uDD52\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\uD835\uDCB6;\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\uD835\uDD1Fg\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\x00\x00\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\x00\u1833\u01B2\u182F\x00\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\uD835\uDD53\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\uD835\uDCB7mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\x00\u19E8\u1A11\u1A15\u1A32\x00\u1A37\u1A50\x00\x00\u1AB4\x00\x00\u1AC1\x00\x00\u1B21\u1B2E\u1B4D\u1B52\x00\u1BFD\x00\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\x00\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\uD835\uDD20\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\x00\x00\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\x00\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\x00\x00\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\x00\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\uD835\uDD54o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\uD835\uDCB8\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\x00\x00\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\x00\x00\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\uD835\uDD21ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\x00\x00\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\uD835\uDD55\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\x00\x00\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\uD835\uDCB9;\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\uD835\uDD22\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\uD835\uDD56\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\x00\x00\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\x00\u1F9E\x00\u1FA1\u1FA7\x00\x00\u1FC6\u1FCC\x00\u1FD3\x00\u1FE6\u1FEA\u2000\x00\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\x00\x00\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\uD835\uDD23lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\x00\u1FF3f;\uC000\uD835\uDD57\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\x00\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\x00\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\x00\u2036;\u6154;\u6156\u02B4\u203E\u2041\x00\x00\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\x00\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\uD835\uDCBB\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\uD835\uDD24\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\uD835\uDD58\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\x00\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\uD835\uDD25s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\uD835\uDD59bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\uD835\uDCBDas\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\x00\u22AA\x00\u22B8\u22C5\u22CE\x00\u22D5\u22F3\x00\x00\u22F8\u2322\u2367\u2362\u237F\x00\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\uD835\uDD26rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\uD835\uDD5Aa;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\uD835\uDCBEn\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\x00\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\uD835\uDD27ath;\u4237pf;\uC000\uD835\uDD5B\u01E3\u23EC\x00\u23F1r;\uC000\uD835\uDCBFrcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\uD835\uDD28reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\uD835\uDD5Ccr;\uC000\uD835\uDCC0\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\x00\u24AA\x00\u24B1\x00\x00\x00\x00\x00\u24B5\u24BA\x00\u24C6\u24C8\u24CD\x00\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\uD835\uDD29\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\uD835\uDD5Dus;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\uD835\uDCC1m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\uD835\uDD2Ao;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\uD835\uDD5E\u0100ct\u28F8\u28FDr;\uC000\uD835\uDCC2pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\x00\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\x00\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\uD835\uDD2B\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\uD835\uDD5F\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\uD835\uDCC3ort\u026D\u2B05\x00\x00\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\u2D2D\x00\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\x00\x00\u2D8D\u2DAB\x00\u2DC8\u2DCE\x00\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\uD835\uDD2C\u036F\u2D79\x00\x00\u2D7C\x00\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\uD835\uDD60\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\x00\u2E7D\x00\u2E80\u2E9D\x00\u2EA2\u2EB9\x00\x00\u2ECB\u0E9C\x00\u2F13\x00\x00\u2F2B\u2FBC\x00\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\x00\x00\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\uD835\uDD2D\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\uD835\uDD61nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\uD835\uDCC5;\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\uD835\uDD2Epf;\uC000\uD835\uDD62rime;\u6057cr;\uC000\uD835\uDCC6\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\uD835\uDD2F\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\uD835\uDD63us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\uD835\uDCC7\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\x00\u337A\u33A4\x00\x00\u33EC\u33F0\x00\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\x00\u3616\x00\x00\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\x00\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\uD835\uDD30\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\x00\x00\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\uD835\uDD64a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\uD835\uDCC8tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\x00\u367E\u36C2\x00\x00\x00\x00\x00\u36DB\u3703\x00\u3709\u376C\x00\x00\x00\u3787\u0272\u3656\x00\x00\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\uD835\uDD31\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\x00\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\uD835\uDD65rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\uD835\uDCC9;\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\x00\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\uD835\uDD32rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\x00\x00\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\uD835\uDD66\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\x00\x00\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\uD835\uDCCA\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\uD835\uDD33tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\uD835\uDD67ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\uD835\uDCCB\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\uD835\uDD34pf;\uC000\uD835\uDD68\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\uD835\uDCCC\u0AE3\u178E\u3A87\x00\u3A8B\x00\u3A90\u3A9B\x00\x00\u3A9D\u3AA8\u3AAB\u3AAF\x00\x00\u3AC3\u3ACE\x00\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\uD835\uDD35\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\uD835\uDD69im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\uD835\uDCCD\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\uD835\uDD36cy;\u4457pf;\uC000\uD835\uDD6Acr;\uC000\uD835\uDCCE\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\uD835\uDD37cy;\u4436grarr;\u61DDpf;\uC000\uD835\uDD6Bcr;\uC000\uD835\uDCCF\u0100jn\u3B85\u3B87;\u600Dj;\u600C".split("").map(function(c2) {
    return c2.charCodeAt(0);
  }));
});

// node_modules/entities/lib/generated/decode-data-xml.js
var require_decode_data_xml = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.default = new Uint16Array("\u0200aglq\t\x15\x18\x1B\u026D\x0F\x00\x00\x12p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(function(c2) {
    return c2.charCodeAt(0);
  }));
});

// node_modules/entities/lib/decode_codepoint.js
var require_decode_codepoint = __commonJS((exports2) => {
  var _a;
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.replaceCodePoint = exports2.fromCodePoint = undefined;
  var decodeMap = new Map([
    [0, 65533],
    [128, 8364],
    [130, 8218],
    [131, 402],
    [132, 8222],
    [133, 8230],
    [134, 8224],
    [135, 8225],
    [136, 710],
    [137, 8240],
    [138, 352],
    [139, 8249],
    [140, 338],
    [142, 381],
    [145, 8216],
    [146, 8217],
    [147, 8220],
    [148, 8221],
    [149, 8226],
    [150, 8211],
    [151, 8212],
    [152, 732],
    [153, 8482],
    [154, 353],
    [155, 8250],
    [156, 339],
    [158, 382],
    [159, 376]
  ]);
  exports2.fromCodePoint = (_a = String.fromCodePoint) !== null && _a !== undefined ? _a : function(codePoint) {
    var output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  };
  function replaceCodePoint(codePoint) {
    var _a2;
    if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
      return 65533;
    }
    return (_a2 = decodeMap.get(codePoint)) !== null && _a2 !== undefined ? _a2 : codePoint;
  }
  exports2.replaceCodePoint = replaceCodePoint;
  function decodeCodePoint(codePoint) {
    return (0, exports2.fromCodePoint)(replaceCodePoint(codePoint));
  }
  exports2.default = decodeCodePoint;
});

// node_modules/entities/lib/decode.js
var require_decode = __commonJS((exports2) => {
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.decodeXML = exports2.decodeHTMLStrict = exports2.decodeHTMLAttribute = exports2.decodeHTML = exports2.determineBranch = exports2.EntityDecoder = exports2.DecodingMode = exports2.BinTrieFlags = exports2.fromCodePoint = exports2.replaceCodePoint = exports2.decodeCodePoint = exports2.xmlDecodeTree = exports2.htmlDecodeTree = undefined;
  var decode_data_html_js_1 = __importDefault(require_decode_data_html());
  exports2.htmlDecodeTree = decode_data_html_js_1.default;
  var decode_data_xml_js_1 = __importDefault(require_decode_data_xml());
  exports2.xmlDecodeTree = decode_data_xml_js_1.default;
  var decode_codepoint_js_1 = __importStar(require_decode_codepoint());
  exports2.decodeCodePoint = decode_codepoint_js_1.default;
  var decode_codepoint_js_2 = require_decode_codepoint();
  Object.defineProperty(exports2, "replaceCodePoint", { enumerable: true, get: function() {
    return decode_codepoint_js_2.replaceCodePoint;
  } });
  Object.defineProperty(exports2, "fromCodePoint", { enumerable: true, get: function() {
    return decode_codepoint_js_2.fromCodePoint;
  } });
  var CharCodes;
  (function(CharCodes2) {
    CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
    CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
    CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
    CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
    CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
    CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
    CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
    CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
    CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
    CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
    CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
    CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
  })(CharCodes || (CharCodes = {}));
  var TO_LOWER_BIT = 32;
  var BinTrieFlags;
  (function(BinTrieFlags2) {
    BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
    BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
    BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
  })(BinTrieFlags = exports2.BinTrieFlags || (exports2.BinTrieFlags = {}));
  function isNumber(code) {
    return code >= CharCodes.ZERO && code <= CharCodes.NINE;
  }
  function isHexadecimalCharacter(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
  }
  function isAsciiAlphaNumeric(code) {
    return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
  }
  function isEntityInAttributeInvalidEnd(code) {
    return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
  }
  var EntityDecoderState;
  (function(EntityDecoderState2) {
    EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
    EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
    EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
    EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
    EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
  })(EntityDecoderState || (EntityDecoderState = {}));
  var DecodingMode;
  (function(DecodingMode2) {
    DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
    DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
    DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
  })(DecodingMode = exports2.DecodingMode || (exports2.DecodingMode = {}));
  var EntityDecoder = function() {
    function EntityDecoder2(decodeTree, emitCodePoint, errors) {
      this.decodeTree = decodeTree;
      this.emitCodePoint = emitCodePoint;
      this.errors = errors;
      this.state = EntityDecoderState.EntityStart;
      this.consumed = 1;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.decodeMode = DecodingMode.Strict;
    }
    EntityDecoder2.prototype.startEntity = function(decodeMode) {
      this.decodeMode = decodeMode;
      this.state = EntityDecoderState.EntityStart;
      this.result = 0;
      this.treeIndex = 0;
      this.excess = 1;
      this.consumed = 1;
    };
    EntityDecoder2.prototype.write = function(str, offset) {
      switch (this.state) {
        case EntityDecoderState.EntityStart: {
          if (str.charCodeAt(offset) === CharCodes.NUM) {
            this.state = EntityDecoderState.NumericStart;
            this.consumed += 1;
            return this.stateNumericStart(str, offset + 1);
          }
          this.state = EntityDecoderState.NamedEntity;
          return this.stateNamedEntity(str, offset);
        }
        case EntityDecoderState.NumericStart: {
          return this.stateNumericStart(str, offset);
        }
        case EntityDecoderState.NumericDecimal: {
          return this.stateNumericDecimal(str, offset);
        }
        case EntityDecoderState.NumericHex: {
          return this.stateNumericHex(str, offset);
        }
        case EntityDecoderState.NamedEntity: {
          return this.stateNamedEntity(str, offset);
        }
      }
    };
    EntityDecoder2.prototype.stateNumericStart = function(str, offset) {
      if (offset >= str.length) {
        return -1;
      }
      if ((str.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
        this.state = EntityDecoderState.NumericHex;
        this.consumed += 1;
        return this.stateNumericHex(str, offset + 1);
      }
      this.state = EntityDecoderState.NumericDecimal;
      return this.stateNumericDecimal(str, offset);
    };
    EntityDecoder2.prototype.addToNumericResult = function(str, start, end, base) {
      if (start !== end) {
        var digitCount = end - start;
        this.result = this.result * Math.pow(base, digitCount) + parseInt(str.substr(start, digitCount), base);
        this.consumed += digitCount;
      }
    };
    EntityDecoder2.prototype.stateNumericHex = function(str, offset) {
      var startIdx = offset;
      while (offset < str.length) {
        var char = str.charCodeAt(offset);
        if (isNumber(char) || isHexadecimalCharacter(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 16);
          return this.emitNumericEntity(char, 3);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 16);
      return -1;
    };
    EntityDecoder2.prototype.stateNumericDecimal = function(str, offset) {
      var startIdx = offset;
      while (offset < str.length) {
        var char = str.charCodeAt(offset);
        if (isNumber(char)) {
          offset += 1;
        } else {
          this.addToNumericResult(str, startIdx, offset, 10);
          return this.emitNumericEntity(char, 2);
        }
      }
      this.addToNumericResult(str, startIdx, offset, 10);
      return -1;
    };
    EntityDecoder2.prototype.emitNumericEntity = function(lastCp, expectedLength) {
      var _a;
      if (this.consumed <= expectedLength) {
        (_a = this.errors) === null || _a === undefined || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      if (lastCp === CharCodes.SEMI) {
        this.consumed += 1;
      } else if (this.decodeMode === DecodingMode.Strict) {
        return 0;
      }
      this.emitCodePoint((0, decode_codepoint_js_1.replaceCodePoint)(this.result), this.consumed);
      if (this.errors) {
        if (lastCp !== CharCodes.SEMI) {
          this.errors.missingSemicolonAfterCharacterReference();
        }
        this.errors.validateNumericCharacterReference(this.result);
      }
      return this.consumed;
    };
    EntityDecoder2.prototype.stateNamedEntity = function(str, offset) {
      var decodeTree = this.decodeTree;
      var current = decodeTree[this.treeIndex];
      var valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      for (;offset < str.length; offset++, this.excess++) {
        var char = str.charCodeAt(offset);
        this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
        if (this.treeIndex < 0) {
          return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
        }
        current = decodeTree[this.treeIndex];
        valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
        if (valueLength !== 0) {
          if (char === CharCodes.SEMI) {
            return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
          }
          if (this.decodeMode !== DecodingMode.Strict) {
            this.result = this.treeIndex;
            this.consumed += this.excess;
            this.excess = 0;
          }
        }
      }
      return -1;
    };
    EntityDecoder2.prototype.emitNotTerminatedNamedEntity = function() {
      var _a;
      var _b = this, result = _b.result, decodeTree = _b.decodeTree;
      var valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
      this.emitNamedEntityData(result, valueLength, this.consumed);
      (_a = this.errors) === null || _a === undefined || _a.missingSemicolonAfterCharacterReference();
      return this.consumed;
    };
    EntityDecoder2.prototype.emitNamedEntityData = function(result, valueLength, consumed) {
      var decodeTree = this.decodeTree;
      this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
      if (valueLength === 3) {
        this.emitCodePoint(decodeTree[result + 2], consumed);
      }
      return consumed;
    };
    EntityDecoder2.prototype.end = function() {
      var _a;
      switch (this.state) {
        case EntityDecoderState.NamedEntity: {
          return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
        }
        case EntityDecoderState.NumericDecimal: {
          return this.emitNumericEntity(0, 2);
        }
        case EntityDecoderState.NumericHex: {
          return this.emitNumericEntity(0, 3);
        }
        case EntityDecoderState.NumericStart: {
          (_a = this.errors) === null || _a === undefined || _a.absenceOfDigitsInNumericCharacterReference(this.consumed);
          return 0;
        }
        case EntityDecoderState.EntityStart: {
          return 0;
        }
      }
    };
    return EntityDecoder2;
  }();
  exports2.EntityDecoder = EntityDecoder;
  function getDecoder(decodeTree) {
    var ret = "";
    var decoder = new EntityDecoder(decodeTree, function(str) {
      return ret += (0, decode_codepoint_js_1.fromCodePoint)(str);
    });
    return function decodeWithTrie(str, decodeMode) {
      var lastIndex = 0;
      var offset = 0;
      while ((offset = str.indexOf("&", offset)) >= 0) {
        ret += str.slice(lastIndex, offset);
        decoder.startEntity(decodeMode);
        var len = decoder.write(str, offset + 1);
        if (len < 0) {
          lastIndex = offset + decoder.end();
          break;
        }
        lastIndex = offset + len;
        offset = len === 0 ? lastIndex + 1 : lastIndex;
      }
      var result = ret + str.slice(lastIndex);
      ret = "";
      return result;
    };
  }
  function determineBranch(decodeTree, current, nodeIdx, char) {
    var branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
    var jumpOffset = current & BinTrieFlags.JUMP_TABLE;
    if (branchCount === 0) {
      return jumpOffset !== 0 && char === jumpOffset ? nodeIdx : -1;
    }
    if (jumpOffset) {
      var value = char - jumpOffset;
      return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIdx + value] - 1;
    }
    var lo = nodeIdx;
    var hi = lo + branchCount - 1;
    while (lo <= hi) {
      var mid = lo + hi >>> 1;
      var midVal = decodeTree[mid];
      if (midVal < char) {
        lo = mid + 1;
      } else if (midVal > char) {
        hi = mid - 1;
      } else {
        return decodeTree[mid + branchCount];
      }
    }
    return -1;
  }
  exports2.determineBranch = determineBranch;
  var htmlDecoder = getDecoder(decode_data_html_js_1.default);
  var xmlDecoder = getDecoder(decode_data_xml_js_1.default);
  function decodeHTML(str, mode) {
    if (mode === undefined) {
      mode = DecodingMode.Legacy;
    }
    return htmlDecoder(str, mode);
  }
  exports2.decodeHTML = decodeHTML;
  function decodeHTMLAttribute(str) {
    return htmlDecoder(str, DecodingMode.Attribute);
  }
  exports2.decodeHTMLAttribute = decodeHTMLAttribute;
  function decodeHTMLStrict(str) {
    return htmlDecoder(str, DecodingMode.Strict);
  }
  exports2.decodeHTMLStrict = decodeHTMLStrict;
  function decodeXML(str) {
    return xmlDecoder(str, DecodingMode.Strict);
  }
  exports2.decodeXML = decodeXML;
});

// node_modules/entities/lib/generated/encode-html.js
var require_encode_html = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function restoreDiff(arr) {
    for (var i = 1;i < arr.length; i++) {
      arr[i][0] += arr[i - 1][0] + 1;
    }
    return arr;
  }
  exports2.default = new Map(/* @__PURE__ */ restoreDiff([[9, "&Tab;"], [0, "&NewLine;"], [22, "&excl;"], [0, "&quot;"], [0, "&num;"], [0, "&dollar;"], [0, "&percnt;"], [0, "&amp;"], [0, "&apos;"], [0, "&lpar;"], [0, "&rpar;"], [0, "&ast;"], [0, "&plus;"], [0, "&comma;"], [1, "&period;"], [0, "&sol;"], [10, "&colon;"], [0, "&semi;"], [0, { v: "&lt;", n: 8402, o: "&nvlt;" }], [0, { v: "&equals;", n: 8421, o: "&bne;" }], [0, { v: "&gt;", n: 8402, o: "&nvgt;" }], [0, "&quest;"], [0, "&commat;"], [26, "&lbrack;"], [0, "&bsol;"], [0, "&rbrack;"], [0, "&Hat;"], [0, "&lowbar;"], [0, "&DiacriticalGrave;"], [5, { n: 106, o: "&fjlig;" }], [20, "&lbrace;"], [0, "&verbar;"], [0, "&rbrace;"], [34, "&nbsp;"], [0, "&iexcl;"], [0, "&cent;"], [0, "&pound;"], [0, "&curren;"], [0, "&yen;"], [0, "&brvbar;"], [0, "&sect;"], [0, "&die;"], [0, "&copy;"], [0, "&ordf;"], [0, "&laquo;"], [0, "&not;"], [0, "&shy;"], [0, "&circledR;"], [0, "&macr;"], [0, "&deg;"], [0, "&PlusMinus;"], [0, "&sup2;"], [0, "&sup3;"], [0, "&acute;"], [0, "&micro;"], [0, "&para;"], [0, "&centerdot;"], [0, "&cedil;"], [0, "&sup1;"], [0, "&ordm;"], [0, "&raquo;"], [0, "&frac14;"], [0, "&frac12;"], [0, "&frac34;"], [0, "&iquest;"], [0, "&Agrave;"], [0, "&Aacute;"], [0, "&Acirc;"], [0, "&Atilde;"], [0, "&Auml;"], [0, "&angst;"], [0, "&AElig;"], [0, "&Ccedil;"], [0, "&Egrave;"], [0, "&Eacute;"], [0, "&Ecirc;"], [0, "&Euml;"], [0, "&Igrave;"], [0, "&Iacute;"], [0, "&Icirc;"], [0, "&Iuml;"], [0, "&ETH;"], [0, "&Ntilde;"], [0, "&Ograve;"], [0, "&Oacute;"], [0, "&Ocirc;"], [0, "&Otilde;"], [0, "&Ouml;"], [0, "&times;"], [0, "&Oslash;"], [0, "&Ugrave;"], [0, "&Uacute;"], [0, "&Ucirc;"], [0, "&Uuml;"], [0, "&Yacute;"], [0, "&THORN;"], [0, "&szlig;"], [0, "&agrave;"], [0, "&aacute;"], [0, "&acirc;"], [0, "&atilde;"], [0, "&auml;"], [0, "&aring;"], [0, "&aelig;"], [0, "&ccedil;"], [0, "&egrave;"], [0, "&eacute;"], [0, "&ecirc;"], [0, "&euml;"], [0, "&igrave;"], [0, "&iacute;"], [0, "&icirc;"], [0, "&iuml;"], [0, "&eth;"], [0, "&ntilde;"], [0, "&ograve;"], [0, "&oacute;"], [0, "&ocirc;"], [0, "&otilde;"], [0, "&ouml;"], [0, "&div;"], [0, "&oslash;"], [0, "&ugrave;"], [0, "&uacute;"], [0, "&ucirc;"], [0, "&uuml;"], [0, "&yacute;"], [0, "&thorn;"], [0, "&yuml;"], [0, "&Amacr;"], [0, "&amacr;"], [0, "&Abreve;"], [0, "&abreve;"], [0, "&Aogon;"], [0, "&aogon;"], [0, "&Cacute;"], [0, "&cacute;"], [0, "&Ccirc;"], [0, "&ccirc;"], [0, "&Cdot;"], [0, "&cdot;"], [0, "&Ccaron;"], [0, "&ccaron;"], [0, "&Dcaron;"], [0, "&dcaron;"], [0, "&Dstrok;"], [0, "&dstrok;"], [0, "&Emacr;"], [0, "&emacr;"], [2, "&Edot;"], [0, "&edot;"], [0, "&Eogon;"], [0, "&eogon;"], [0, "&Ecaron;"], [0, "&ecaron;"], [0, "&Gcirc;"], [0, "&gcirc;"], [0, "&Gbreve;"], [0, "&gbreve;"], [0, "&Gdot;"], [0, "&gdot;"], [0, "&Gcedil;"], [1, "&Hcirc;"], [0, "&hcirc;"], [0, "&Hstrok;"], [0, "&hstrok;"], [0, "&Itilde;"], [0, "&itilde;"], [0, "&Imacr;"], [0, "&imacr;"], [2, "&Iogon;"], [0, "&iogon;"], [0, "&Idot;"], [0, "&imath;"], [0, "&IJlig;"], [0, "&ijlig;"], [0, "&Jcirc;"], [0, "&jcirc;"], [0, "&Kcedil;"], [0, "&kcedil;"], [0, "&kgreen;"], [0, "&Lacute;"], [0, "&lacute;"], [0, "&Lcedil;"], [0, "&lcedil;"], [0, "&Lcaron;"], [0, "&lcaron;"], [0, "&Lmidot;"], [0, "&lmidot;"], [0, "&Lstrok;"], [0, "&lstrok;"], [0, "&Nacute;"], [0, "&nacute;"], [0, "&Ncedil;"], [0, "&ncedil;"], [0, "&Ncaron;"], [0, "&ncaron;"], [0, "&napos;"], [0, "&ENG;"], [0, "&eng;"], [0, "&Omacr;"], [0, "&omacr;"], [2, "&Odblac;"], [0, "&odblac;"], [0, "&OElig;"], [0, "&oelig;"], [0, "&Racute;"], [0, "&racute;"], [0, "&Rcedil;"], [0, "&rcedil;"], [0, "&Rcaron;"], [0, "&rcaron;"], [0, "&Sacute;"], [0, "&sacute;"], [0, "&Scirc;"], [0, "&scirc;"], [0, "&Scedil;"], [0, "&scedil;"], [0, "&Scaron;"], [0, "&scaron;"], [0, "&Tcedil;"], [0, "&tcedil;"], [0, "&Tcaron;"], [0, "&tcaron;"], [0, "&Tstrok;"], [0, "&tstrok;"], [0, "&Utilde;"], [0, "&utilde;"], [0, "&Umacr;"], [0, "&umacr;"], [0, "&Ubreve;"], [0, "&ubreve;"], [0, "&Uring;"], [0, "&uring;"], [0, "&Udblac;"], [0, "&udblac;"], [0, "&Uogon;"], [0, "&uogon;"], [0, "&Wcirc;"], [0, "&wcirc;"], [0, "&Ycirc;"], [0, "&ycirc;"], [0, "&Yuml;"], [0, "&Zacute;"], [0, "&zacute;"], [0, "&Zdot;"], [0, "&zdot;"], [0, "&Zcaron;"], [0, "&zcaron;"], [19, "&fnof;"], [34, "&imped;"], [63, "&gacute;"], [65, "&jmath;"], [142, "&circ;"], [0, "&caron;"], [16, "&breve;"], [0, "&DiacriticalDot;"], [0, "&ring;"], [0, "&ogon;"], [0, "&DiacriticalTilde;"], [0, "&dblac;"], [51, "&DownBreve;"], [127, "&Alpha;"], [0, "&Beta;"], [0, "&Gamma;"], [0, "&Delta;"], [0, "&Epsilon;"], [0, "&Zeta;"], [0, "&Eta;"], [0, "&Theta;"], [0, "&Iota;"], [0, "&Kappa;"], [0, "&Lambda;"], [0, "&Mu;"], [0, "&Nu;"], [0, "&Xi;"], [0, "&Omicron;"], [0, "&Pi;"], [0, "&Rho;"], [1, "&Sigma;"], [0, "&Tau;"], [0, "&Upsilon;"], [0, "&Phi;"], [0, "&Chi;"], [0, "&Psi;"], [0, "&ohm;"], [7, "&alpha;"], [0, "&beta;"], [0, "&gamma;"], [0, "&delta;"], [0, "&epsi;"], [0, "&zeta;"], [0, "&eta;"], [0, "&theta;"], [0, "&iota;"], [0, "&kappa;"], [0, "&lambda;"], [0, "&mu;"], [0, "&nu;"], [0, "&xi;"], [0, "&omicron;"], [0, "&pi;"], [0, "&rho;"], [0, "&sigmaf;"], [0, "&sigma;"], [0, "&tau;"], [0, "&upsi;"], [0, "&phi;"], [0, "&chi;"], [0, "&psi;"], [0, "&omega;"], [7, "&thetasym;"], [0, "&Upsi;"], [2, "&phiv;"], [0, "&piv;"], [5, "&Gammad;"], [0, "&digamma;"], [18, "&kappav;"], [0, "&rhov;"], [3, "&epsiv;"], [0, "&backepsilon;"], [10, "&IOcy;"], [0, "&DJcy;"], [0, "&GJcy;"], [0, "&Jukcy;"], [0, "&DScy;"], [0, "&Iukcy;"], [0, "&YIcy;"], [0, "&Jsercy;"], [0, "&LJcy;"], [0, "&NJcy;"], [0, "&TSHcy;"], [0, "&KJcy;"], [1, "&Ubrcy;"], [0, "&DZcy;"], [0, "&Acy;"], [0, "&Bcy;"], [0, "&Vcy;"], [0, "&Gcy;"], [0, "&Dcy;"], [0, "&IEcy;"], [0, "&ZHcy;"], [0, "&Zcy;"], [0, "&Icy;"], [0, "&Jcy;"], [0, "&Kcy;"], [0, "&Lcy;"], [0, "&Mcy;"], [0, "&Ncy;"], [0, "&Ocy;"], [0, "&Pcy;"], [0, "&Rcy;"], [0, "&Scy;"], [0, "&Tcy;"], [0, "&Ucy;"], [0, "&Fcy;"], [0, "&KHcy;"], [0, "&TScy;"], [0, "&CHcy;"], [0, "&SHcy;"], [0, "&SHCHcy;"], [0, "&HARDcy;"], [0, "&Ycy;"], [0, "&SOFTcy;"], [0, "&Ecy;"], [0, "&YUcy;"], [0, "&YAcy;"], [0, "&acy;"], [0, "&bcy;"], [0, "&vcy;"], [0, "&gcy;"], [0, "&dcy;"], [0, "&iecy;"], [0, "&zhcy;"], [0, "&zcy;"], [0, "&icy;"], [0, "&jcy;"], [0, "&kcy;"], [0, "&lcy;"], [0, "&mcy;"], [0, "&ncy;"], [0, "&ocy;"], [0, "&pcy;"], [0, "&rcy;"], [0, "&scy;"], [0, "&tcy;"], [0, "&ucy;"], [0, "&fcy;"], [0, "&khcy;"], [0, "&tscy;"], [0, "&chcy;"], [0, "&shcy;"], [0, "&shchcy;"], [0, "&hardcy;"], [0, "&ycy;"], [0, "&softcy;"], [0, "&ecy;"], [0, "&yucy;"], [0, "&yacy;"], [1, "&iocy;"], [0, "&djcy;"], [0, "&gjcy;"], [0, "&jukcy;"], [0, "&dscy;"], [0, "&iukcy;"], [0, "&yicy;"], [0, "&jsercy;"], [0, "&ljcy;"], [0, "&njcy;"], [0, "&tshcy;"], [0, "&kjcy;"], [1, "&ubrcy;"], [0, "&dzcy;"], [7074, "&ensp;"], [0, "&emsp;"], [0, "&emsp13;"], [0, "&emsp14;"], [1, "&numsp;"], [0, "&puncsp;"], [0, "&ThinSpace;"], [0, "&hairsp;"], [0, "&NegativeMediumSpace;"], [0, "&zwnj;"], [0, "&zwj;"], [0, "&lrm;"], [0, "&rlm;"], [0, "&dash;"], [2, "&ndash;"], [0, "&mdash;"], [0, "&horbar;"], [0, "&Verbar;"], [1, "&lsquo;"], [0, "&CloseCurlyQuote;"], [0, "&lsquor;"], [1, "&ldquo;"], [0, "&CloseCurlyDoubleQuote;"], [0, "&bdquo;"], [1, "&dagger;"], [0, "&Dagger;"], [0, "&bull;"], [2, "&nldr;"], [0, "&hellip;"], [9, "&permil;"], [0, "&pertenk;"], [0, "&prime;"], [0, "&Prime;"], [0, "&tprime;"], [0, "&backprime;"], [3, "&lsaquo;"], [0, "&rsaquo;"], [3, "&oline;"], [2, "&caret;"], [1, "&hybull;"], [0, "&frasl;"], [10, "&bsemi;"], [7, "&qprime;"], [7, { v: "&MediumSpace;", n: 8202, o: "&ThickSpace;" }], [0, "&NoBreak;"], [0, "&af;"], [0, "&InvisibleTimes;"], [0, "&ic;"], [72, "&euro;"], [46, "&tdot;"], [0, "&DotDot;"], [37, "&complexes;"], [2, "&incare;"], [4, "&gscr;"], [0, "&hamilt;"], [0, "&Hfr;"], [0, "&Hopf;"], [0, "&planckh;"], [0, "&hbar;"], [0, "&imagline;"], [0, "&Ifr;"], [0, "&lagran;"], [0, "&ell;"], [1, "&naturals;"], [0, "&numero;"], [0, "&copysr;"], [0, "&weierp;"], [0, "&Popf;"], [0, "&Qopf;"], [0, "&realine;"], [0, "&real;"], [0, "&reals;"], [0, "&rx;"], [3, "&trade;"], [1, "&integers;"], [2, "&mho;"], [0, "&zeetrf;"], [0, "&iiota;"], [2, "&bernou;"], [0, "&Cayleys;"], [1, "&escr;"], [0, "&Escr;"], [0, "&Fouriertrf;"], [1, "&Mellintrf;"], [0, "&order;"], [0, "&alefsym;"], [0, "&beth;"], [0, "&gimel;"], [0, "&daleth;"], [12, "&CapitalDifferentialD;"], [0, "&dd;"], [0, "&ee;"], [0, "&ii;"], [10, "&frac13;"], [0, "&frac23;"], [0, "&frac15;"], [0, "&frac25;"], [0, "&frac35;"], [0, "&frac45;"], [0, "&frac16;"], [0, "&frac56;"], [0, "&frac18;"], [0, "&frac38;"], [0, "&frac58;"], [0, "&frac78;"], [49, "&larr;"], [0, "&ShortUpArrow;"], [0, "&rarr;"], [0, "&darr;"], [0, "&harr;"], [0, "&updownarrow;"], [0, "&nwarr;"], [0, "&nearr;"], [0, "&LowerRightArrow;"], [0, "&LowerLeftArrow;"], [0, "&nlarr;"], [0, "&nrarr;"], [1, { v: "&rarrw;", n: 824, o: "&nrarrw;" }], [0, "&Larr;"], [0, "&Uarr;"], [0, "&Rarr;"], [0, "&Darr;"], [0, "&larrtl;"], [0, "&rarrtl;"], [0, "&LeftTeeArrow;"], [0, "&mapstoup;"], [0, "&map;"], [0, "&DownTeeArrow;"], [1, "&hookleftarrow;"], [0, "&hookrightarrow;"], [0, "&larrlp;"], [0, "&looparrowright;"], [0, "&harrw;"], [0, "&nharr;"], [1, "&lsh;"], [0, "&rsh;"], [0, "&ldsh;"], [0, "&rdsh;"], [1, "&crarr;"], [0, "&cularr;"], [0, "&curarr;"], [2, "&circlearrowleft;"], [0, "&circlearrowright;"], [0, "&leftharpoonup;"], [0, "&DownLeftVector;"], [0, "&RightUpVector;"], [0, "&LeftUpVector;"], [0, "&rharu;"], [0, "&DownRightVector;"], [0, "&dharr;"], [0, "&dharl;"], [0, "&RightArrowLeftArrow;"], [0, "&udarr;"], [0, "&LeftArrowRightArrow;"], [0, "&leftleftarrows;"], [0, "&upuparrows;"], [0, "&rightrightarrows;"], [0, "&ddarr;"], [0, "&leftrightharpoons;"], [0, "&Equilibrium;"], [0, "&nlArr;"], [0, "&nhArr;"], [0, "&nrArr;"], [0, "&DoubleLeftArrow;"], [0, "&DoubleUpArrow;"], [0, "&DoubleRightArrow;"], [0, "&dArr;"], [0, "&DoubleLeftRightArrow;"], [0, "&DoubleUpDownArrow;"], [0, "&nwArr;"], [0, "&neArr;"], [0, "&seArr;"], [0, "&swArr;"], [0, "&lAarr;"], [0, "&rAarr;"], [1, "&zigrarr;"], [6, "&larrb;"], [0, "&rarrb;"], [15, "&DownArrowUpArrow;"], [7, "&loarr;"], [0, "&roarr;"], [0, "&hoarr;"], [0, "&forall;"], [0, "&comp;"], [0, { v: "&part;", n: 824, o: "&npart;" }], [0, "&exist;"], [0, "&nexist;"], [0, "&empty;"], [1, "&Del;"], [0, "&Element;"], [0, "&NotElement;"], [1, "&ni;"], [0, "&notni;"], [2, "&prod;"], [0, "&coprod;"], [0, "&sum;"], [0, "&minus;"], [0, "&MinusPlus;"], [0, "&dotplus;"], [1, "&Backslash;"], [0, "&lowast;"], [0, "&compfn;"], [1, "&radic;"], [2, "&prop;"], [0, "&infin;"], [0, "&angrt;"], [0, { v: "&ang;", n: 8402, o: "&nang;" }], [0, "&angmsd;"], [0, "&angsph;"], [0, "&mid;"], [0, "&nmid;"], [0, "&DoubleVerticalBar;"], [0, "&NotDoubleVerticalBar;"], [0, "&and;"], [0, "&or;"], [0, { v: "&cap;", n: 65024, o: "&caps;" }], [0, { v: "&cup;", n: 65024, o: "&cups;" }], [0, "&int;"], [0, "&Int;"], [0, "&iiint;"], [0, "&conint;"], [0, "&Conint;"], [0, "&Cconint;"], [0, "&cwint;"], [0, "&ClockwiseContourIntegral;"], [0, "&awconint;"], [0, "&there4;"], [0, "&becaus;"], [0, "&ratio;"], [0, "&Colon;"], [0, "&dotminus;"], [1, "&mDDot;"], [0, "&homtht;"], [0, { v: "&sim;", n: 8402, o: "&nvsim;" }], [0, { v: "&backsim;", n: 817, o: "&race;" }], [0, { v: "&ac;", n: 819, o: "&acE;" }], [0, "&acd;"], [0, "&VerticalTilde;"], [0, "&NotTilde;"], [0, { v: "&eqsim;", n: 824, o: "&nesim;" }], [0, "&sime;"], [0, "&NotTildeEqual;"], [0, "&cong;"], [0, "&simne;"], [0, "&ncong;"], [0, "&ap;"], [0, "&nap;"], [0, "&ape;"], [0, { v: "&apid;", n: 824, o: "&napid;" }], [0, "&backcong;"], [0, { v: "&asympeq;", n: 8402, o: "&nvap;" }], [0, { v: "&bump;", n: 824, o: "&nbump;" }], [0, { v: "&bumpe;", n: 824, o: "&nbumpe;" }], [0, { v: "&doteq;", n: 824, o: "&nedot;" }], [0, "&doteqdot;"], [0, "&efDot;"], [0, "&erDot;"], [0, "&Assign;"], [0, "&ecolon;"], [0, "&ecir;"], [0, "&circeq;"], [1, "&wedgeq;"], [0, "&veeeq;"], [1, "&triangleq;"], [2, "&equest;"], [0, "&ne;"], [0, { v: "&Congruent;", n: 8421, o: "&bnequiv;" }], [0, "&nequiv;"], [1, { v: "&le;", n: 8402, o: "&nvle;" }], [0, { v: "&ge;", n: 8402, o: "&nvge;" }], [0, { v: "&lE;", n: 824, o: "&nlE;" }], [0, { v: "&gE;", n: 824, o: "&ngE;" }], [0, { v: "&lnE;", n: 65024, o: "&lvertneqq;" }], [0, { v: "&gnE;", n: 65024, o: "&gvertneqq;" }], [0, { v: "&ll;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nLtv;"], [7577, "&nLt;"]])) }], [0, { v: "&gg;", n: new Map(/* @__PURE__ */ restoreDiff([[824, "&nGtv;"], [7577, "&nGt;"]])) }], [0, "&between;"], [0, "&NotCupCap;"], [0, "&nless;"], [0, "&ngt;"], [0, "&nle;"], [0, "&nge;"], [0, "&lesssim;"], [0, "&GreaterTilde;"], [0, "&nlsim;"], [0, "&ngsim;"], [0, "&LessGreater;"], [0, "&gl;"], [0, "&NotLessGreater;"], [0, "&NotGreaterLess;"], [0, "&pr;"], [0, "&sc;"], [0, "&prcue;"], [0, "&sccue;"], [0, "&PrecedesTilde;"], [0, { v: "&scsim;", n: 824, o: "&NotSucceedsTilde;" }], [0, "&NotPrecedes;"], [0, "&NotSucceeds;"], [0, { v: "&sub;", n: 8402, o: "&NotSubset;" }], [0, { v: "&sup;", n: 8402, o: "&NotSuperset;" }], [0, "&nsub;"], [0, "&nsup;"], [0, "&sube;"], [0, "&supe;"], [0, "&NotSubsetEqual;"], [0, "&NotSupersetEqual;"], [0, { v: "&subne;", n: 65024, o: "&varsubsetneq;" }], [0, { v: "&supne;", n: 65024, o: "&varsupsetneq;" }], [1, "&cupdot;"], [0, "&UnionPlus;"], [0, { v: "&sqsub;", n: 824, o: "&NotSquareSubset;" }], [0, { v: "&sqsup;", n: 824, o: "&NotSquareSuperset;" }], [0, "&sqsube;"], [0, "&sqsupe;"], [0, { v: "&sqcap;", n: 65024, o: "&sqcaps;" }], [0, { v: "&sqcup;", n: 65024, o: "&sqcups;" }], [0, "&CirclePlus;"], [0, "&CircleMinus;"], [0, "&CircleTimes;"], [0, "&osol;"], [0, "&CircleDot;"], [0, "&circledcirc;"], [0, "&circledast;"], [1, "&circleddash;"], [0, "&boxplus;"], [0, "&boxminus;"], [0, "&boxtimes;"], [0, "&dotsquare;"], [0, "&RightTee;"], [0, "&dashv;"], [0, "&DownTee;"], [0, "&bot;"], [1, "&models;"], [0, "&DoubleRightTee;"], [0, "&Vdash;"], [0, "&Vvdash;"], [0, "&VDash;"], [0, "&nvdash;"], [0, "&nvDash;"], [0, "&nVdash;"], [0, "&nVDash;"], [0, "&prurel;"], [1, "&LeftTriangle;"], [0, "&RightTriangle;"], [0, { v: "&LeftTriangleEqual;", n: 8402, o: "&nvltrie;" }], [0, { v: "&RightTriangleEqual;", n: 8402, o: "&nvrtrie;" }], [0, "&origof;"], [0, "&imof;"], [0, "&multimap;"], [0, "&hercon;"], [0, "&intcal;"], [0, "&veebar;"], [1, "&barvee;"], [0, "&angrtvb;"], [0, "&lrtri;"], [0, "&bigwedge;"], [0, "&bigvee;"], [0, "&bigcap;"], [0, "&bigcup;"], [0, "&diam;"], [0, "&sdot;"], [0, "&sstarf;"], [0, "&divideontimes;"], [0, "&bowtie;"], [0, "&ltimes;"], [0, "&rtimes;"], [0, "&leftthreetimes;"], [0, "&rightthreetimes;"], [0, "&backsimeq;"], [0, "&curlyvee;"], [0, "&curlywedge;"], [0, "&Sub;"], [0, "&Sup;"], [0, "&Cap;"], [0, "&Cup;"], [0, "&fork;"], [0, "&epar;"], [0, "&lessdot;"], [0, "&gtdot;"], [0, { v: "&Ll;", n: 824, o: "&nLl;" }], [0, { v: "&Gg;", n: 824, o: "&nGg;" }], [0, { v: "&leg;", n: 65024, o: "&lesg;" }], [0, { v: "&gel;", n: 65024, o: "&gesl;" }], [2, "&cuepr;"], [0, "&cuesc;"], [0, "&NotPrecedesSlantEqual;"], [0, "&NotSucceedsSlantEqual;"], [0, "&NotSquareSubsetEqual;"], [0, "&NotSquareSupersetEqual;"], [2, "&lnsim;"], [0, "&gnsim;"], [0, "&precnsim;"], [0, "&scnsim;"], [0, "&nltri;"], [0, "&NotRightTriangle;"], [0, "&nltrie;"], [0, "&NotRightTriangleEqual;"], [0, "&vellip;"], [0, "&ctdot;"], [0, "&utdot;"], [0, "&dtdot;"], [0, "&disin;"], [0, "&isinsv;"], [0, "&isins;"], [0, { v: "&isindot;", n: 824, o: "&notindot;" }], [0, "&notinvc;"], [0, "&notinvb;"], [1, { v: "&isinE;", n: 824, o: "&notinE;" }], [0, "&nisd;"], [0, "&xnis;"], [0, "&nis;"], [0, "&notnivc;"], [0, "&notnivb;"], [6, "&barwed;"], [0, "&Barwed;"], [1, "&lceil;"], [0, "&rceil;"], [0, "&LeftFloor;"], [0, "&rfloor;"], [0, "&drcrop;"], [0, "&dlcrop;"], [0, "&urcrop;"], [0, "&ulcrop;"], [0, "&bnot;"], [1, "&profline;"], [0, "&profsurf;"], [1, "&telrec;"], [0, "&target;"], [5, "&ulcorn;"], [0, "&urcorn;"], [0, "&dlcorn;"], [0, "&drcorn;"], [2, "&frown;"], [0, "&smile;"], [9, "&cylcty;"], [0, "&profalar;"], [7, "&topbot;"], [6, "&ovbar;"], [1, "&solbar;"], [60, "&angzarr;"], [51, "&lmoustache;"], [0, "&rmoustache;"], [2, "&OverBracket;"], [0, "&bbrk;"], [0, "&bbrktbrk;"], [37, "&OverParenthesis;"], [0, "&UnderParenthesis;"], [0, "&OverBrace;"], [0, "&UnderBrace;"], [2, "&trpezium;"], [4, "&elinters;"], [59, "&blank;"], [164, "&circledS;"], [55, "&boxh;"], [1, "&boxv;"], [9, "&boxdr;"], [3, "&boxdl;"], [3, "&boxur;"], [3, "&boxul;"], [3, "&boxvr;"], [7, "&boxvl;"], [7, "&boxhd;"], [7, "&boxhu;"], [7, "&boxvh;"], [19, "&boxH;"], [0, "&boxV;"], [0, "&boxdR;"], [0, "&boxDr;"], [0, "&boxDR;"], [0, "&boxdL;"], [0, "&boxDl;"], [0, "&boxDL;"], [0, "&boxuR;"], [0, "&boxUr;"], [0, "&boxUR;"], [0, "&boxuL;"], [0, "&boxUl;"], [0, "&boxUL;"], [0, "&boxvR;"], [0, "&boxVr;"], [0, "&boxVR;"], [0, "&boxvL;"], [0, "&boxVl;"], [0, "&boxVL;"], [0, "&boxHd;"], [0, "&boxhD;"], [0, "&boxHD;"], [0, "&boxHu;"], [0, "&boxhU;"], [0, "&boxHU;"], [0, "&boxvH;"], [0, "&boxVh;"], [0, "&boxVH;"], [19, "&uhblk;"], [3, "&lhblk;"], [3, "&block;"], [8, "&blk14;"], [0, "&blk12;"], [0, "&blk34;"], [13, "&square;"], [8, "&blacksquare;"], [0, "&EmptyVerySmallSquare;"], [1, "&rect;"], [0, "&marker;"], [2, "&fltns;"], [1, "&bigtriangleup;"], [0, "&blacktriangle;"], [0, "&triangle;"], [2, "&blacktriangleright;"], [0, "&rtri;"], [3, "&bigtriangledown;"], [0, "&blacktriangledown;"], [0, "&dtri;"], [2, "&blacktriangleleft;"], [0, "&ltri;"], [6, "&loz;"], [0, "&cir;"], [32, "&tridot;"], [2, "&bigcirc;"], [8, "&ultri;"], [0, "&urtri;"], [0, "&lltri;"], [0, "&EmptySmallSquare;"], [0, "&FilledSmallSquare;"], [8, "&bigstar;"], [0, "&star;"], [7, "&phone;"], [49, "&female;"], [1, "&male;"], [29, "&spades;"], [2, "&clubs;"], [1, "&hearts;"], [0, "&diamondsuit;"], [3, "&sung;"], [2, "&flat;"], [0, "&natural;"], [0, "&sharp;"], [163, "&check;"], [3, "&cross;"], [8, "&malt;"], [21, "&sext;"], [33, "&VerticalSeparator;"], [25, "&lbbrk;"], [0, "&rbbrk;"], [84, "&bsolhsub;"], [0, "&suphsol;"], [28, "&LeftDoubleBracket;"], [0, "&RightDoubleBracket;"], [0, "&lang;"], [0, "&rang;"], [0, "&Lang;"], [0, "&Rang;"], [0, "&loang;"], [0, "&roang;"], [7, "&longleftarrow;"], [0, "&longrightarrow;"], [0, "&longleftrightarrow;"], [0, "&DoubleLongLeftArrow;"], [0, "&DoubleLongRightArrow;"], [0, "&DoubleLongLeftRightArrow;"], [1, "&longmapsto;"], [2, "&dzigrarr;"], [258, "&nvlArr;"], [0, "&nvrArr;"], [0, "&nvHarr;"], [0, "&Map;"], [6, "&lbarr;"], [0, "&bkarow;"], [0, "&lBarr;"], [0, "&dbkarow;"], [0, "&drbkarow;"], [0, "&DDotrahd;"], [0, "&UpArrowBar;"], [0, "&DownArrowBar;"], [2, "&Rarrtl;"], [2, "&latail;"], [0, "&ratail;"], [0, "&lAtail;"], [0, "&rAtail;"], [0, "&larrfs;"], [0, "&rarrfs;"], [0, "&larrbfs;"], [0, "&rarrbfs;"], [2, "&nwarhk;"], [0, "&nearhk;"], [0, "&hksearow;"], [0, "&hkswarow;"], [0, "&nwnear;"], [0, "&nesear;"], [0, "&seswar;"], [0, "&swnwar;"], [8, { v: "&rarrc;", n: 824, o: "&nrarrc;" }], [1, "&cudarrr;"], [0, "&ldca;"], [0, "&rdca;"], [0, "&cudarrl;"], [0, "&larrpl;"], [2, "&curarrm;"], [0, "&cularrp;"], [7, "&rarrpl;"], [2, "&harrcir;"], [0, "&Uarrocir;"], [0, "&lurdshar;"], [0, "&ldrushar;"], [2, "&LeftRightVector;"], [0, "&RightUpDownVector;"], [0, "&DownLeftRightVector;"], [0, "&LeftUpDownVector;"], [0, "&LeftVectorBar;"], [0, "&RightVectorBar;"], [0, "&RightUpVectorBar;"], [0, "&RightDownVectorBar;"], [0, "&DownLeftVectorBar;"], [0, "&DownRightVectorBar;"], [0, "&LeftUpVectorBar;"], [0, "&LeftDownVectorBar;"], [0, "&LeftTeeVector;"], [0, "&RightTeeVector;"], [0, "&RightUpTeeVector;"], [0, "&RightDownTeeVector;"], [0, "&DownLeftTeeVector;"], [0, "&DownRightTeeVector;"], [0, "&LeftUpTeeVector;"], [0, "&LeftDownTeeVector;"], [0, "&lHar;"], [0, "&uHar;"], [0, "&rHar;"], [0, "&dHar;"], [0, "&luruhar;"], [0, "&ldrdhar;"], [0, "&ruluhar;"], [0, "&rdldhar;"], [0, "&lharul;"], [0, "&llhard;"], [0, "&rharul;"], [0, "&lrhard;"], [0, "&udhar;"], [0, "&duhar;"], [0, "&RoundImplies;"], [0, "&erarr;"], [0, "&simrarr;"], [0, "&larrsim;"], [0, "&rarrsim;"], [0, "&rarrap;"], [0, "&ltlarr;"], [1, "&gtrarr;"], [0, "&subrarr;"], [1, "&suplarr;"], [0, "&lfisht;"], [0, "&rfisht;"], [0, "&ufisht;"], [0, "&dfisht;"], [5, "&lopar;"], [0, "&ropar;"], [4, "&lbrke;"], [0, "&rbrke;"], [0, "&lbrkslu;"], [0, "&rbrksld;"], [0, "&lbrksld;"], [0, "&rbrkslu;"], [0, "&langd;"], [0, "&rangd;"], [0, "&lparlt;"], [0, "&rpargt;"], [0, "&gtlPar;"], [0, "&ltrPar;"], [3, "&vzigzag;"], [1, "&vangrt;"], [0, "&angrtvbd;"], [6, "&ange;"], [0, "&range;"], [0, "&dwangle;"], [0, "&uwangle;"], [0, "&angmsdaa;"], [0, "&angmsdab;"], [0, "&angmsdac;"], [0, "&angmsdad;"], [0, "&angmsdae;"], [0, "&angmsdaf;"], [0, "&angmsdag;"], [0, "&angmsdah;"], [0, "&bemptyv;"], [0, "&demptyv;"], [0, "&cemptyv;"], [0, "&raemptyv;"], [0, "&laemptyv;"], [0, "&ohbar;"], [0, "&omid;"], [0, "&opar;"], [1, "&operp;"], [1, "&olcross;"], [0, "&odsold;"], [1, "&olcir;"], [0, "&ofcir;"], [0, "&olt;"], [0, "&ogt;"], [0, "&cirscir;"], [0, "&cirE;"], [0, "&solb;"], [0, "&bsolb;"], [3, "&boxbox;"], [3, "&trisb;"], [0, "&rtriltri;"], [0, { v: "&LeftTriangleBar;", n: 824, o: "&NotLeftTriangleBar;" }], [0, { v: "&RightTriangleBar;", n: 824, o: "&NotRightTriangleBar;" }], [11, "&iinfin;"], [0, "&infintie;"], [0, "&nvinfin;"], [4, "&eparsl;"], [0, "&smeparsl;"], [0, "&eqvparsl;"], [5, "&blacklozenge;"], [8, "&RuleDelayed;"], [1, "&dsol;"], [9, "&bigodot;"], [0, "&bigoplus;"], [0, "&bigotimes;"], [1, "&biguplus;"], [1, "&bigsqcup;"], [5, "&iiiint;"], [0, "&fpartint;"], [2, "&cirfnint;"], [0, "&awint;"], [0, "&rppolint;"], [0, "&scpolint;"], [0, "&npolint;"], [0, "&pointint;"], [0, "&quatint;"], [0, "&intlarhk;"], [10, "&pluscir;"], [0, "&plusacir;"], [0, "&simplus;"], [0, "&plusdu;"], [0, "&plussim;"], [0, "&plustwo;"], [1, "&mcomma;"], [0, "&minusdu;"], [2, "&loplus;"], [0, "&roplus;"], [0, "&Cross;"], [0, "&timesd;"], [0, "&timesbar;"], [1, "&smashp;"], [0, "&lotimes;"], [0, "&rotimes;"], [0, "&otimesas;"], [0, "&Otimes;"], [0, "&odiv;"], [0, "&triplus;"], [0, "&triminus;"], [0, "&tritime;"], [0, "&intprod;"], [2, "&amalg;"], [0, "&capdot;"], [1, "&ncup;"], [0, "&ncap;"], [0, "&capand;"], [0, "&cupor;"], [0, "&cupcap;"], [0, "&capcup;"], [0, "&cupbrcap;"], [0, "&capbrcup;"], [0, "&cupcup;"], [0, "&capcap;"], [0, "&ccups;"], [0, "&ccaps;"], [2, "&ccupssm;"], [2, "&And;"], [0, "&Or;"], [0, "&andand;"], [0, "&oror;"], [0, "&orslope;"], [0, "&andslope;"], [1, "&andv;"], [0, "&orv;"], [0, "&andd;"], [0, "&ord;"], [1, "&wedbar;"], [6, "&sdote;"], [3, "&simdot;"], [2, { v: "&congdot;", n: 824, o: "&ncongdot;" }], [0, "&easter;"], [0, "&apacir;"], [0, { v: "&apE;", n: 824, o: "&napE;" }], [0, "&eplus;"], [0, "&pluse;"], [0, "&Esim;"], [0, "&Colone;"], [0, "&Equal;"], [1, "&ddotseq;"], [0, "&equivDD;"], [0, "&ltcir;"], [0, "&gtcir;"], [0, "&ltquest;"], [0, "&gtquest;"], [0, { v: "&leqslant;", n: 824, o: "&nleqslant;" }], [0, { v: "&geqslant;", n: 824, o: "&ngeqslant;" }], [0, "&lesdot;"], [0, "&gesdot;"], [0, "&lesdoto;"], [0, "&gesdoto;"], [0, "&lesdotor;"], [0, "&gesdotol;"], [0, "&lap;"], [0, "&gap;"], [0, "&lne;"], [0, "&gne;"], [0, "&lnap;"], [0, "&gnap;"], [0, "&lEg;"], [0, "&gEl;"], [0, "&lsime;"], [0, "&gsime;"], [0, "&lsimg;"], [0, "&gsiml;"], [0, "&lgE;"], [0, "&glE;"], [0, "&lesges;"], [0, "&gesles;"], [0, "&els;"], [0, "&egs;"], [0, "&elsdot;"], [0, "&egsdot;"], [0, "&el;"], [0, "&eg;"], [2, "&siml;"], [0, "&simg;"], [0, "&simlE;"], [0, "&simgE;"], [0, { v: "&LessLess;", n: 824, o: "&NotNestedLessLess;" }], [0, { v: "&GreaterGreater;", n: 824, o: "&NotNestedGreaterGreater;" }], [1, "&glj;"], [0, "&gla;"], [0, "&ltcc;"], [0, "&gtcc;"], [0, "&lescc;"], [0, "&gescc;"], [0, "&smt;"], [0, "&lat;"], [0, { v: "&smte;", n: 65024, o: "&smtes;" }], [0, { v: "&late;", n: 65024, o: "&lates;" }], [0, "&bumpE;"], [0, { v: "&PrecedesEqual;", n: 824, o: "&NotPrecedesEqual;" }], [0, { v: "&sce;", n: 824, o: "&NotSucceedsEqual;" }], [2, "&prE;"], [0, "&scE;"], [0, "&precneqq;"], [0, "&scnE;"], [0, "&prap;"], [0, "&scap;"], [0, "&precnapprox;"], [0, "&scnap;"], [0, "&Pr;"], [0, "&Sc;"], [0, "&subdot;"], [0, "&supdot;"], [0, "&subplus;"], [0, "&supplus;"], [0, "&submult;"], [0, "&supmult;"], [0, "&subedot;"], [0, "&supedot;"], [0, { v: "&subE;", n: 824, o: "&nsubE;" }], [0, { v: "&supE;", n: 824, o: "&nsupE;" }], [0, "&subsim;"], [0, "&supsim;"], [2, { v: "&subnE;", n: 65024, o: "&varsubsetneqq;" }], [0, { v: "&supnE;", n: 65024, o: "&varsupsetneqq;" }], [2, "&csub;"], [0, "&csup;"], [0, "&csube;"], [0, "&csupe;"], [0, "&subsup;"], [0, "&supsub;"], [0, "&subsub;"], [0, "&supsup;"], [0, "&suphsub;"], [0, "&supdsub;"], [0, "&forkv;"], [0, "&topfork;"], [0, "&mlcp;"], [8, "&Dashv;"], [1, "&Vdashl;"], [0, "&Barv;"], [0, "&vBar;"], [0, "&vBarv;"], [1, "&Vbar;"], [0, "&Not;"], [0, "&bNot;"], [0, "&rnmid;"], [0, "&cirmid;"], [0, "&midcir;"], [0, "&topcir;"], [0, "&nhpar;"], [0, "&parsim;"], [9, { v: "&parsl;", n: 8421, o: "&nparsl;" }], [44343, { n: new Map(/* @__PURE__ */ restoreDiff([[56476, "&Ascr;"], [1, "&Cscr;"], [0, "&Dscr;"], [2, "&Gscr;"], [2, "&Jscr;"], [0, "&Kscr;"], [2, "&Nscr;"], [0, "&Oscr;"], [0, "&Pscr;"], [0, "&Qscr;"], [1, "&Sscr;"], [0, "&Tscr;"], [0, "&Uscr;"], [0, "&Vscr;"], [0, "&Wscr;"], [0, "&Xscr;"], [0, "&Yscr;"], [0, "&Zscr;"], [0, "&ascr;"], [0, "&bscr;"], [0, "&cscr;"], [0, "&dscr;"], [1, "&fscr;"], [1, "&hscr;"], [0, "&iscr;"], [0, "&jscr;"], [0, "&kscr;"], [0, "&lscr;"], [0, "&mscr;"], [0, "&nscr;"], [1, "&pscr;"], [0, "&qscr;"], [0, "&rscr;"], [0, "&sscr;"], [0, "&tscr;"], [0, "&uscr;"], [0, "&vscr;"], [0, "&wscr;"], [0, "&xscr;"], [0, "&yscr;"], [0, "&zscr;"], [52, "&Afr;"], [0, "&Bfr;"], [1, "&Dfr;"], [0, "&Efr;"], [0, "&Ffr;"], [0, "&Gfr;"], [2, "&Jfr;"], [0, "&Kfr;"], [0, "&Lfr;"], [0, "&Mfr;"], [0, "&Nfr;"], [0, "&Ofr;"], [0, "&Pfr;"], [0, "&Qfr;"], [1, "&Sfr;"], [0, "&Tfr;"], [0, "&Ufr;"], [0, "&Vfr;"], [0, "&Wfr;"], [0, "&Xfr;"], [0, "&Yfr;"], [1, "&afr;"], [0, "&bfr;"], [0, "&cfr;"], [0, "&dfr;"], [0, "&efr;"], [0, "&ffr;"], [0, "&gfr;"], [0, "&hfr;"], [0, "&ifr;"], [0, "&jfr;"], [0, "&kfr;"], [0, "&lfr;"], [0, "&mfr;"], [0, "&nfr;"], [0, "&ofr;"], [0, "&pfr;"], [0, "&qfr;"], [0, "&rfr;"], [0, "&sfr;"], [0, "&tfr;"], [0, "&ufr;"], [0, "&vfr;"], [0, "&wfr;"], [0, "&xfr;"], [0, "&yfr;"], [0, "&zfr;"], [0, "&Aopf;"], [0, "&Bopf;"], [1, "&Dopf;"], [0, "&Eopf;"], [0, "&Fopf;"], [0, "&Gopf;"], [1, "&Iopf;"], [0, "&Jopf;"], [0, "&Kopf;"], [0, "&Lopf;"], [0, "&Mopf;"], [1, "&Oopf;"], [3, "&Sopf;"], [0, "&Topf;"], [0, "&Uopf;"], [0, "&Vopf;"], [0, "&Wopf;"], [0, "&Xopf;"], [0, "&Yopf;"], [1, "&aopf;"], [0, "&bopf;"], [0, "&copf;"], [0, "&dopf;"], [0, "&eopf;"], [0, "&fopf;"], [0, "&gopf;"], [0, "&hopf;"], [0, "&iopf;"], [0, "&jopf;"], [0, "&kopf;"], [0, "&lopf;"], [0, "&mopf;"], [0, "&nopf;"], [0, "&oopf;"], [0, "&popf;"], [0, "&qopf;"], [0, "&ropf;"], [0, "&sopf;"], [0, "&topf;"], [0, "&uopf;"], [0, "&vopf;"], [0, "&wopf;"], [0, "&xopf;"], [0, "&yopf;"], [0, "&zopf;"]])) }], [8906, "&fflig;"], [0, "&filig;"], [0, "&fllig;"], [0, "&ffilig;"], [0, "&ffllig;"]]));
});

// node_modules/entities/lib/escape.js
var require_escape = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.escapeText = exports2.escapeAttribute = exports2.escapeUTF8 = exports2.escape = exports2.encodeXML = exports2.getCodePoint = exports2.xmlReplacer = undefined;
  exports2.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
  var xmlCodeMap = new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [39, "&apos;"],
    [60, "&lt;"],
    [62, "&gt;"]
  ]);
  exports2.getCodePoint = String.prototype.codePointAt != null ? function(str, index) {
    return str.codePointAt(index);
  } : function(c2, index) {
    return (c2.charCodeAt(index) & 64512) === 55296 ? (c2.charCodeAt(index) - 55296) * 1024 + c2.charCodeAt(index + 1) - 56320 + 65536 : c2.charCodeAt(index);
  };
  function encodeXML(str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = exports2.xmlReplacer.exec(str)) !== null) {
      var i = match.index;
      var char = str.charCodeAt(i);
      var next = xmlCodeMap.get(char);
      if (next !== undefined) {
        ret += str.substring(lastIdx, i) + next;
        lastIdx = i + 1;
      } else {
        ret += "".concat(str.substring(lastIdx, i), "&#x").concat((0, exports2.getCodePoint)(str, i).toString(16), ";");
        lastIdx = exports2.xmlReplacer.lastIndex += Number((char & 64512) === 55296);
      }
    }
    return ret + str.substr(lastIdx);
  }
  exports2.encodeXML = encodeXML;
  exports2.escape = encodeXML;
  function getEscaper(regex, map) {
    return function escape(data) {
      var match;
      var lastIdx = 0;
      var result = "";
      while (match = regex.exec(data)) {
        if (lastIdx !== match.index) {
          result += data.substring(lastIdx, match.index);
        }
        result += map.get(match[0].charCodeAt(0));
        lastIdx = match.index + 1;
      }
      return result + data.substring(lastIdx);
    };
  }
  exports2.escapeUTF8 = getEscaper(/[&<>'"]/g, xmlCodeMap);
  exports2.escapeAttribute = getEscaper(/["&\u00A0]/g, new Map([
    [34, "&quot;"],
    [38, "&amp;"],
    [160, "&nbsp;"]
  ]));
  exports2.escapeText = getEscaper(/[&<>\u00A0]/g, new Map([
    [38, "&amp;"],
    [60, "&lt;"],
    [62, "&gt;"],
    [160, "&nbsp;"]
  ]));
});

// node_modules/entities/lib/encode.js
var require_encode = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.encodeNonAsciiHTML = exports2.encodeHTML = undefined;
  var encode_html_js_1 = __importDefault(require_encode_html());
  var escape_js_1 = require_escape();
  var htmlReplacer = /[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g;
  function encodeHTML(data) {
    return encodeHTMLTrieRe(htmlReplacer, data);
  }
  exports2.encodeHTML = encodeHTML;
  function encodeNonAsciiHTML(data) {
    return encodeHTMLTrieRe(escape_js_1.xmlReplacer, data);
  }
  exports2.encodeNonAsciiHTML = encodeNonAsciiHTML;
  function encodeHTMLTrieRe(regExp, str) {
    var ret = "";
    var lastIdx = 0;
    var match;
    while ((match = regExp.exec(str)) !== null) {
      var i = match.index;
      ret += str.substring(lastIdx, i);
      var char = str.charCodeAt(i);
      var next = encode_html_js_1.default.get(char);
      if (typeof next === "object") {
        if (i + 1 < str.length) {
          var nextChar = str.charCodeAt(i + 1);
          var value = typeof next.n === "number" ? next.n === nextChar ? next.o : undefined : next.n.get(nextChar);
          if (value !== undefined) {
            ret += value;
            lastIdx = regExp.lastIndex += 1;
            continue;
          }
        }
        next = next.v;
      }
      if (next !== undefined) {
        ret += next;
        lastIdx = i + 1;
      } else {
        var cp = (0, escape_js_1.getCodePoint)(str, i);
        ret += "&#x".concat(cp.toString(16), ";");
        lastIdx = regExp.lastIndex += Number(cp !== char);
      }
    }
    return ret + str.substr(lastIdx);
  }
});

// node_modules/entities/lib/index.js
var require_lib3 = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.decodeXMLStrict = exports2.decodeHTML5Strict = exports2.decodeHTML4Strict = exports2.decodeHTML5 = exports2.decodeHTML4 = exports2.decodeHTMLAttribute = exports2.decodeHTMLStrict = exports2.decodeHTML = exports2.decodeXML = exports2.DecodingMode = exports2.EntityDecoder = exports2.encodeHTML5 = exports2.encodeHTML4 = exports2.encodeNonAsciiHTML = exports2.encodeHTML = exports2.escapeText = exports2.escapeAttribute = exports2.escapeUTF8 = exports2.escape = exports2.encodeXML = exports2.encode = exports2.decodeStrict = exports2.decode = exports2.EncodingMode = exports2.EntityLevel = undefined;
  var decode_js_1 = require_decode();
  var encode_js_1 = require_encode();
  var escape_js_1 = require_escape();
  var EntityLevel;
  (function(EntityLevel2) {
    EntityLevel2[EntityLevel2["XML"] = 0] = "XML";
    EntityLevel2[EntityLevel2["HTML"] = 1] = "HTML";
  })(EntityLevel = exports2.EntityLevel || (exports2.EntityLevel = {}));
  var EncodingMode;
  (function(EncodingMode2) {
    EncodingMode2[EncodingMode2["UTF8"] = 0] = "UTF8";
    EncodingMode2[EncodingMode2["ASCII"] = 1] = "ASCII";
    EncodingMode2[EncodingMode2["Extensive"] = 2] = "Extensive";
    EncodingMode2[EncodingMode2["Attribute"] = 3] = "Attribute";
    EncodingMode2[EncodingMode2["Text"] = 4] = "Text";
  })(EncodingMode = exports2.EncodingMode || (exports2.EncodingMode = {}));
  function decode(data, options) {
    if (options === undefined) {
      options = EntityLevel.XML;
    }
    var level = typeof options === "number" ? options : options.level;
    if (level === EntityLevel.HTML) {
      var mode = typeof options === "object" ? options.mode : undefined;
      return (0, decode_js_1.decodeHTML)(data, mode);
    }
    return (0, decode_js_1.decodeXML)(data);
  }
  exports2.decode = decode;
  function decodeStrict(data, options) {
    var _a;
    if (options === undefined) {
      options = EntityLevel.XML;
    }
    var opts = typeof options === "number" ? { level: options } : options;
    (_a = opts.mode) !== null && _a !== undefined || (opts.mode = decode_js_1.DecodingMode.Strict);
    return decode(data, opts);
  }
  exports2.decodeStrict = decodeStrict;
  function encode(data, options) {
    if (options === undefined) {
      options = EntityLevel.XML;
    }
    var opts = typeof options === "number" ? { level: options } : options;
    if (opts.mode === EncodingMode.UTF8)
      return (0, escape_js_1.escapeUTF8)(data);
    if (opts.mode === EncodingMode.Attribute)
      return (0, escape_js_1.escapeAttribute)(data);
    if (opts.mode === EncodingMode.Text)
      return (0, escape_js_1.escapeText)(data);
    if (opts.level === EntityLevel.HTML) {
      if (opts.mode === EncodingMode.ASCII) {
        return (0, encode_js_1.encodeNonAsciiHTML)(data);
      }
      return (0, encode_js_1.encodeHTML)(data);
    }
    return (0, escape_js_1.encodeXML)(data);
  }
  exports2.encode = encode;
  var escape_js_2 = require_escape();
  Object.defineProperty(exports2, "encodeXML", { enumerable: true, get: function() {
    return escape_js_2.encodeXML;
  } });
  Object.defineProperty(exports2, "escape", { enumerable: true, get: function() {
    return escape_js_2.escape;
  } });
  Object.defineProperty(exports2, "escapeUTF8", { enumerable: true, get: function() {
    return escape_js_2.escapeUTF8;
  } });
  Object.defineProperty(exports2, "escapeAttribute", { enumerable: true, get: function() {
    return escape_js_2.escapeAttribute;
  } });
  Object.defineProperty(exports2, "escapeText", { enumerable: true, get: function() {
    return escape_js_2.escapeText;
  } });
  var encode_js_2 = require_encode();
  Object.defineProperty(exports2, "encodeHTML", { enumerable: true, get: function() {
    return encode_js_2.encodeHTML;
  } });
  Object.defineProperty(exports2, "encodeNonAsciiHTML", { enumerable: true, get: function() {
    return encode_js_2.encodeNonAsciiHTML;
  } });
  Object.defineProperty(exports2, "encodeHTML4", { enumerable: true, get: function() {
    return encode_js_2.encodeHTML;
  } });
  Object.defineProperty(exports2, "encodeHTML5", { enumerable: true, get: function() {
    return encode_js_2.encodeHTML;
  } });
  var decode_js_2 = require_decode();
  Object.defineProperty(exports2, "EntityDecoder", { enumerable: true, get: function() {
    return decode_js_2.EntityDecoder;
  } });
  Object.defineProperty(exports2, "DecodingMode", { enumerable: true, get: function() {
    return decode_js_2.DecodingMode;
  } });
  Object.defineProperty(exports2, "decodeXML", { enumerable: true, get: function() {
    return decode_js_2.decodeXML;
  } });
  Object.defineProperty(exports2, "decodeHTML", { enumerable: true, get: function() {
    return decode_js_2.decodeHTML;
  } });
  Object.defineProperty(exports2, "decodeHTMLStrict", { enumerable: true, get: function() {
    return decode_js_2.decodeHTMLStrict;
  } });
  Object.defineProperty(exports2, "decodeHTMLAttribute", { enumerable: true, get: function() {
    return decode_js_2.decodeHTMLAttribute;
  } });
  Object.defineProperty(exports2, "decodeHTML4", { enumerable: true, get: function() {
    return decode_js_2.decodeHTML;
  } });
  Object.defineProperty(exports2, "decodeHTML5", { enumerable: true, get: function() {
    return decode_js_2.decodeHTML;
  } });
  Object.defineProperty(exports2, "decodeHTML4Strict", { enumerable: true, get: function() {
    return decode_js_2.decodeHTMLStrict;
  } });
  Object.defineProperty(exports2, "decodeHTML5Strict", { enumerable: true, get: function() {
    return decode_js_2.decodeHTMLStrict;
  } });
  Object.defineProperty(exports2, "decodeXMLStrict", { enumerable: true, get: function() {
    return decode_js_2.decodeXML;
  } });
});

// node_modules/dom-serializer/lib/foreignNames.js
var require_foreignNames = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.attributeNames = exports2.elementNames = undefined;
  exports2.elementNames = new Map([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "clipPath",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feDropShadow",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "foreignObject",
    "glyphRef",
    "linearGradient",
    "radialGradient",
    "textPath"
  ].map(function(val) {
    return [val.toLowerCase(), val];
  }));
  exports2.attributeNames = new Map([
    "definitionURL",
    "attributeName",
    "attributeType",
    "baseFrequency",
    "baseProfile",
    "calcMode",
    "clipPathUnits",
    "diffuseConstant",
    "edgeMode",
    "filterUnits",
    "glyphRef",
    "gradientTransform",
    "gradientUnits",
    "kernelMatrix",
    "kernelUnitLength",
    "keyPoints",
    "keySplines",
    "keyTimes",
    "lengthAdjust",
    "limitingConeAngle",
    "markerHeight",
    "markerUnits",
    "markerWidth",
    "maskContentUnits",
    "maskUnits",
    "numOctaves",
    "pathLength",
    "patternContentUnits",
    "patternTransform",
    "patternUnits",
    "pointsAtX",
    "pointsAtY",
    "pointsAtZ",
    "preserveAlpha",
    "preserveAspectRatio",
    "primitiveUnits",
    "refX",
    "refY",
    "repeatCount",
    "repeatDur",
    "requiredExtensions",
    "requiredFeatures",
    "specularConstant",
    "specularExponent",
    "spreadMethod",
    "startOffset",
    "stdDeviation",
    "stitchTiles",
    "surfaceScale",
    "systemLanguage",
    "tableValues",
    "targetX",
    "targetY",
    "textLength",
    "viewBox",
    "viewTarget",
    "xChannelSelector",
    "yChannelSelector",
    "zoomAndPan"
  ].map(function(val) {
    return [val.toLowerCase(), val];
  }));
});

// node_modules/dom-serializer/lib/index.js
var require_lib4 = __commonJS((exports2) => {
  var __assign = exports2 && exports2.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length;i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.render = undefined;
  var ElementType = __importStar(require_lib());
  var entities_1 = require_lib3();
  var foreignNames_js_1 = require_foreignNames();
  var unencodedElements = new Set([
    "style",
    "script",
    "xmp",
    "iframe",
    "noembed",
    "noframes",
    "plaintext",
    "noscript"
  ]);
  function replaceQuotes(value) {
    return value.replace(/"/g, "&quot;");
  }
  function formatAttributes(attributes, opts) {
    var _a;
    if (!attributes)
      return;
    var encode = ((_a = opts.encodeEntities) !== null && _a !== undefined ? _a : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? entities_1.encodeXML : entities_1.escapeAttribute;
    return Object.keys(attributes).map(function(key) {
      var _a2, _b;
      var value = (_a2 = attributes[key]) !== null && _a2 !== undefined ? _a2 : "";
      if (opts.xmlMode === "foreign") {
        key = (_b = foreignNames_js_1.attributeNames.get(key)) !== null && _b !== undefined ? _b : key;
      }
      if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
        return key;
      }
      return "".concat(key, '="').concat(encode(value), '"');
    }).join(" ");
  }
  var singleTag = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  function render(node, options) {
    if (options === undefined) {
      options = {};
    }
    var nodes = "length" in node ? node : [node];
    var output = "";
    for (var i = 0;i < nodes.length; i++) {
      output += renderNode(nodes[i], options);
    }
    return output;
  }
  exports2.render = render;
  exports2.default = render;
  function renderNode(node, options) {
    switch (node.type) {
      case ElementType.Root:
        return render(node.children, options);
      case ElementType.Doctype:
      case ElementType.Directive:
        return renderDirective(node);
      case ElementType.Comment:
        return renderComment(node);
      case ElementType.CDATA:
        return renderCdata(node);
      case ElementType.Script:
      case ElementType.Style:
      case ElementType.Tag:
        return renderTag(node, options);
      case ElementType.Text:
        return renderText(node, options);
    }
  }
  var foreignModeIntegrationPoints = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
  ]);
  var foreignElements = new Set(["svg", "math"]);
  function renderTag(elem, opts) {
    var _a;
    if (opts.xmlMode === "foreign") {
      elem.name = (_a = foreignNames_js_1.elementNames.get(elem.name)) !== null && _a !== undefined ? _a : elem.name;
      if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) {
        opts = __assign(__assign({}, opts), { xmlMode: false });
      }
    }
    if (!opts.xmlMode && foreignElements.has(elem.name)) {
      opts = __assign(__assign({}, opts), { xmlMode: "foreign" });
    }
    var tag = "<".concat(elem.name);
    var attribs = formatAttributes(elem.attribs, opts);
    if (attribs) {
      tag += " ".concat(attribs);
    }
    if (elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== false : opts.selfClosingTags && singleTag.has(elem.name))) {
      if (!opts.xmlMode)
        tag += " ";
      tag += "/>";
    } else {
      tag += ">";
      if (elem.children.length > 0) {
        tag += render(elem.children, opts);
      }
      if (opts.xmlMode || !singleTag.has(elem.name)) {
        tag += "</".concat(elem.name, ">");
      }
    }
    return tag;
  }
  function renderDirective(elem) {
    return "<".concat(elem.data, ">");
  }
  function renderText(elem, opts) {
    var _a;
    var data = elem.data || "";
    if (((_a = opts.encodeEntities) !== null && _a !== undefined ? _a : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) {
      data = opts.xmlMode || opts.encodeEntities !== "utf8" ? (0, entities_1.encodeXML)(data) : (0, entities_1.escapeText)(data);
    }
    return data;
  }
  function renderCdata(elem) {
    return "<![CDATA[".concat(elem.children[0].data, "]]>");
  }
  function renderComment(elem) {
    return "<!--".concat(elem.data, "-->");
  }
});

// node_modules/domutils/lib/stringify.js
var require_stringify = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.getOuterHTML = getOuterHTML;
  exports2.getInnerHTML = getInnerHTML;
  exports2.getText = getText;
  exports2.textContent = textContent;
  exports2.innerText = innerText;
  var domhandler_1 = require_lib2();
  var dom_serializer_1 = __importDefault(require_lib4());
  var domelementtype_1 = require_lib();
  function getOuterHTML(node, options) {
    return (0, dom_serializer_1.default)(node, options);
  }
  function getInnerHTML(node, options) {
    return (0, domhandler_1.hasChildren)(node) ? node.children.map(function(node2) {
      return getOuterHTML(node2, options);
    }).join("") : "";
  }
  function getText(node) {
    if (Array.isArray(node))
      return node.map(getText).join("");
    if ((0, domhandler_1.isTag)(node))
      return node.name === "br" ? `
` : getText(node.children);
    if ((0, domhandler_1.isCDATA)(node))
      return getText(node.children);
    if ((0, domhandler_1.isText)(node))
      return node.data;
    return "";
  }
  function textContent(node) {
    if (Array.isArray(node))
      return node.map(textContent).join("");
    if ((0, domhandler_1.hasChildren)(node) && !(0, domhandler_1.isComment)(node)) {
      return textContent(node.children);
    }
    if ((0, domhandler_1.isText)(node))
      return node.data;
    return "";
  }
  function innerText(node) {
    if (Array.isArray(node))
      return node.map(innerText).join("");
    if ((0, domhandler_1.hasChildren)(node) && (node.type === domelementtype_1.ElementType.Tag || (0, domhandler_1.isCDATA)(node))) {
      return innerText(node.children);
    }
    if ((0, domhandler_1.isText)(node))
      return node.data;
    return "";
  }
});

// node_modules/domutils/lib/traversal.js
var require_traversal = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.getChildren = getChildren;
  exports2.getParent = getParent;
  exports2.getSiblings = getSiblings;
  exports2.getAttributeValue = getAttributeValue;
  exports2.hasAttrib = hasAttrib;
  exports2.getName = getName;
  exports2.nextElementSibling = nextElementSibling;
  exports2.prevElementSibling = prevElementSibling;
  var domhandler_1 = require_lib2();
  function getChildren(elem) {
    return (0, domhandler_1.hasChildren)(elem) ? elem.children : [];
  }
  function getParent(elem) {
    return elem.parent || null;
  }
  function getSiblings(elem) {
    var _a, _b;
    var parent = getParent(elem);
    if (parent != null)
      return getChildren(parent);
    var siblings = [elem];
    var { prev, next } = elem;
    while (prev != null) {
      siblings.unshift(prev);
      _a = prev, prev = _a.prev;
    }
    while (next != null) {
      siblings.push(next);
      _b = next, next = _b.next;
    }
    return siblings;
  }
  function getAttributeValue(elem, name) {
    var _a;
    return (_a = elem.attribs) === null || _a === undefined ? undefined : _a[name];
  }
  function hasAttrib(elem, name) {
    return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
  }
  function getName(elem) {
    return elem.name;
  }
  function nextElementSibling(elem) {
    var _a;
    var next = elem.next;
    while (next !== null && !(0, domhandler_1.isTag)(next))
      _a = next, next = _a.next;
    return next;
  }
  function prevElementSibling(elem) {
    var _a;
    var prev = elem.prev;
    while (prev !== null && !(0, domhandler_1.isTag)(prev))
      _a = prev, prev = _a.prev;
    return prev;
  }
});

// node_modules/domutils/lib/manipulation.js
var require_manipulation = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.removeElement = removeElement;
  exports2.replaceElement = replaceElement;
  exports2.appendChild = appendChild;
  exports2.append = append;
  exports2.prependChild = prependChild;
  exports2.prepend = prepend;
  function removeElement(elem) {
    if (elem.prev)
      elem.prev.next = elem.next;
    if (elem.next)
      elem.next.prev = elem.prev;
    if (elem.parent) {
      var childs = elem.parent.children;
      var childsIndex = childs.lastIndexOf(elem);
      if (childsIndex >= 0) {
        childs.splice(childsIndex, 1);
      }
    }
    elem.next = null;
    elem.prev = null;
    elem.parent = null;
  }
  function replaceElement(elem, replacement) {
    var prev = replacement.prev = elem.prev;
    if (prev) {
      prev.next = replacement;
    }
    var next = replacement.next = elem.next;
    if (next) {
      next.prev = replacement;
    }
    var parent = replacement.parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs[childs.lastIndexOf(elem)] = replacement;
      elem.parent = null;
    }
  }
  function appendChild(parent, child) {
    removeElement(child);
    child.next = null;
    child.parent = parent;
    if (parent.children.push(child) > 1) {
      var sibling = parent.children[parent.children.length - 2];
      sibling.next = child;
      child.prev = sibling;
    } else {
      child.prev = null;
    }
  }
  function append(elem, next) {
    removeElement(next);
    var parent = elem.parent;
    var currNext = elem.next;
    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;
    if (currNext) {
      currNext.prev = next;
      if (parent) {
        var childs = parent.children;
        childs.splice(childs.lastIndexOf(currNext), 0, next);
      }
    } else if (parent) {
      parent.children.push(next);
    }
  }
  function prependChild(parent, child) {
    removeElement(child);
    child.parent = parent;
    child.prev = null;
    if (parent.children.unshift(child) !== 1) {
      var sibling = parent.children[1];
      sibling.prev = child;
      child.next = sibling;
    } else {
      child.next = null;
    }
  }
  function prepend(elem, prev) {
    removeElement(prev);
    var parent = elem.parent;
    if (parent) {
      var childs = parent.children;
      childs.splice(childs.indexOf(elem), 0, prev);
    }
    if (elem.prev) {
      elem.prev.next = prev;
    }
    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
  }
});

// node_modules/domutils/lib/querying.js
var require_querying = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.filter = filter;
  exports2.find = find;
  exports2.findOneChild = findOneChild;
  exports2.findOne = findOne;
  exports2.existsOne = existsOne;
  exports2.findAll = findAll;
  var domhandler_1 = require_lib2();
  function filter(test, node, recurse, limit) {
    if (recurse === undefined) {
      recurse = true;
    }
    if (limit === undefined) {
      limit = Infinity;
    }
    return find(test, Array.isArray(node) ? node : [node], recurse, limit);
  }
  function find(test, nodes, recurse, limit) {
    var result = [];
    var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
    var indexStack = [0];
    for (;; ) {
      if (indexStack[0] >= nodeStack[0].length) {
        if (indexStack.length === 1) {
          return result;
        }
        nodeStack.shift();
        indexStack.shift();
        continue;
      }
      var elem = nodeStack[0][indexStack[0]++];
      if (test(elem)) {
        result.push(elem);
        if (--limit <= 0)
          return result;
      }
      if (recurse && (0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
        indexStack.unshift(0);
        nodeStack.unshift(elem.children);
      }
    }
  }
  function findOneChild(test, nodes) {
    return nodes.find(test);
  }
  function findOne(test, nodes, recurse) {
    if (recurse === undefined) {
      recurse = true;
    }
    var searchedNodes = Array.isArray(nodes) ? nodes : [nodes];
    for (var i = 0;i < searchedNodes.length; i++) {
      var node = searchedNodes[i];
      if ((0, domhandler_1.isTag)(node) && test(node)) {
        return node;
      }
      if (recurse && (0, domhandler_1.hasChildren)(node) && node.children.length > 0) {
        return findOne(test, node.children, true);
      }
    }
    return null;
  }
  function existsOne(test, nodes) {
    return (Array.isArray(nodes) ? nodes : [nodes]).some(function(node) {
      return (0, domhandler_1.isTag)(node) && test(node) || (0, domhandler_1.hasChildren)(node) && existsOne(test, node.children);
    });
  }
  function findAll(test, nodes) {
    var result = [];
    var nodeStack = [Array.isArray(nodes) ? nodes : [nodes]];
    var indexStack = [0];
    for (;; ) {
      if (indexStack[0] >= nodeStack[0].length) {
        if (nodeStack.length === 1) {
          return result;
        }
        nodeStack.shift();
        indexStack.shift();
        continue;
      }
      var elem = nodeStack[0][indexStack[0]++];
      if ((0, domhandler_1.isTag)(elem) && test(elem))
        result.push(elem);
      if ((0, domhandler_1.hasChildren)(elem) && elem.children.length > 0) {
        indexStack.unshift(0);
        nodeStack.unshift(elem.children);
      }
    }
  }
});

// node_modules/domutils/lib/legacy.js
var require_legacy = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.testElement = testElement;
  exports2.getElements = getElements;
  exports2.getElementById = getElementById;
  exports2.getElementsByTagName = getElementsByTagName;
  exports2.getElementsByClassName = getElementsByClassName;
  exports2.getElementsByTagType = getElementsByTagType;
  var domhandler_1 = require_lib2();
  var querying_js_1 = require_querying();
  var Checks = {
    tag_name: function(name) {
      if (typeof name === "function") {
        return function(elem) {
          return (0, domhandler_1.isTag)(elem) && name(elem.name);
        };
      } else if (name === "*") {
        return domhandler_1.isTag;
      }
      return function(elem) {
        return (0, domhandler_1.isTag)(elem) && elem.name === name;
      };
    },
    tag_type: function(type) {
      if (typeof type === "function") {
        return function(elem) {
          return type(elem.type);
        };
      }
      return function(elem) {
        return elem.type === type;
      };
    },
    tag_contains: function(data) {
      if (typeof data === "function") {
        return function(elem) {
          return (0, domhandler_1.isText)(elem) && data(elem.data);
        };
      }
      return function(elem) {
        return (0, domhandler_1.isText)(elem) && elem.data === data;
      };
    }
  };
  function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
      return function(elem) {
        return (0, domhandler_1.isTag)(elem) && value(elem.attribs[attrib]);
      };
    }
    return function(elem) {
      return (0, domhandler_1.isTag)(elem) && elem.attribs[attrib] === value;
    };
  }
  function combineFuncs(a, b) {
    return function(elem) {
      return a(elem) || b(elem);
    };
  }
  function compileTest(options) {
    var funcs = Object.keys(options).map(function(key) {
      var value = options[key];
      return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
  }
  function testElement(options, node) {
    var test = compileTest(options);
    return test ? test(node) : true;
  }
  function getElements(options, nodes, recurse, limit) {
    if (limit === undefined) {
      limit = Infinity;
    }
    var test = compileTest(options);
    return test ? (0, querying_js_1.filter)(test, nodes, recurse, limit) : [];
  }
  function getElementById(id, nodes, recurse) {
    if (recurse === undefined) {
      recurse = true;
    }
    if (!Array.isArray(nodes))
      nodes = [nodes];
    return (0, querying_js_1.findOne)(getAttribCheck("id", id), nodes, recurse);
  }
  function getElementsByTagName(tagName, nodes, recurse, limit) {
    if (recurse === undefined) {
      recurse = true;
    }
    if (limit === undefined) {
      limit = Infinity;
    }
    return (0, querying_js_1.filter)(Checks["tag_name"](tagName), nodes, recurse, limit);
  }
  function getElementsByClassName(className, nodes, recurse, limit) {
    if (recurse === undefined) {
      recurse = true;
    }
    if (limit === undefined) {
      limit = Infinity;
    }
    return (0, querying_js_1.filter)(getAttribCheck("class", className), nodes, recurse, limit);
  }
  function getElementsByTagType(type, nodes, recurse, limit) {
    if (recurse === undefined) {
      recurse = true;
    }
    if (limit === undefined) {
      limit = Infinity;
    }
    return (0, querying_js_1.filter)(Checks["tag_type"](type), nodes, recurse, limit);
  }
});

// node_modules/domutils/lib/helpers.js
var require_helpers = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.DocumentPosition = undefined;
  exports2.removeSubsets = removeSubsets;
  exports2.compareDocumentPosition = compareDocumentPosition;
  exports2.uniqueSort = uniqueSort;
  var domhandler_1 = require_lib2();
  function removeSubsets(nodes) {
    var idx = nodes.length;
    while (--idx >= 0) {
      var node = nodes[idx];
      if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
        nodes.splice(idx, 1);
        continue;
      }
      for (var ancestor = node.parent;ancestor; ancestor = ancestor.parent) {
        if (nodes.includes(ancestor)) {
          nodes.splice(idx, 1);
          break;
        }
      }
    }
    return nodes;
  }
  var DocumentPosition;
  (function(DocumentPosition2) {
    DocumentPosition2[DocumentPosition2["DISCONNECTED"] = 1] = "DISCONNECTED";
    DocumentPosition2[DocumentPosition2["PRECEDING"] = 2] = "PRECEDING";
    DocumentPosition2[DocumentPosition2["FOLLOWING"] = 4] = "FOLLOWING";
    DocumentPosition2[DocumentPosition2["CONTAINS"] = 8] = "CONTAINS";
    DocumentPosition2[DocumentPosition2["CONTAINED_BY"] = 16] = "CONTAINED_BY";
  })(DocumentPosition || (exports2.DocumentPosition = DocumentPosition = {}));
  function compareDocumentPosition(nodeA, nodeB) {
    var aParents = [];
    var bParents = [];
    if (nodeA === nodeB) {
      return 0;
    }
    var current = (0, domhandler_1.hasChildren)(nodeA) ? nodeA : nodeA.parent;
    while (current) {
      aParents.unshift(current);
      current = current.parent;
    }
    current = (0, domhandler_1.hasChildren)(nodeB) ? nodeB : nodeB.parent;
    while (current) {
      bParents.unshift(current);
      current = current.parent;
    }
    var maxIdx = Math.min(aParents.length, bParents.length);
    var idx = 0;
    while (idx < maxIdx && aParents[idx] === bParents[idx]) {
      idx++;
    }
    if (idx === 0) {
      return DocumentPosition.DISCONNECTED;
    }
    var sharedParent = aParents[idx - 1];
    var siblings = sharedParent.children;
    var aSibling = aParents[idx];
    var bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
      if (sharedParent === nodeB) {
        return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
      }
      return DocumentPosition.FOLLOWING;
    }
    if (sharedParent === nodeA) {
      return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
    }
    return DocumentPosition.PRECEDING;
  }
  function uniqueSort(nodes) {
    nodes = nodes.filter(function(node, i, arr) {
      return !arr.includes(node, i + 1);
    });
    nodes.sort(function(a, b) {
      var relative = compareDocumentPosition(a, b);
      if (relative & DocumentPosition.PRECEDING) {
        return -1;
      } else if (relative & DocumentPosition.FOLLOWING) {
        return 1;
      }
      return 0;
    });
    return nodes;
  }
});

// node_modules/domutils/lib/feeds.js
var require_feeds = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.getFeed = getFeed;
  var stringify_js_1 = require_stringify();
  var legacy_js_1 = require_legacy();
  function getFeed(doc) {
    var feedRoot = getOneElement(isValidFeed, doc);
    return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
  }
  function getAtomFeed(feedRoot) {
    var _a;
    var childs = feedRoot.children;
    var feed = {
      type: "atom",
      items: (0, legacy_js_1.getElementsByTagName)("entry", childs).map(function(item) {
        var _a2;
        var children = item.children;
        var entry = { media: getMediaElements(children) };
        addConditionally(entry, "id", "id", children);
        addConditionally(entry, "title", "title", children);
        var href2 = (_a2 = getOneElement("link", children)) === null || _a2 === undefined ? undefined : _a2.attribs["href"];
        if (href2) {
          entry.link = href2;
        }
        var description = fetch2("summary", children) || fetch2("content", children);
        if (description) {
          entry.description = description;
        }
        var pubDate = fetch2("updated", children);
        if (pubDate) {
          entry.pubDate = new Date(pubDate);
        }
        return entry;
      })
    };
    addConditionally(feed, "id", "id", childs);
    addConditionally(feed, "title", "title", childs);
    var href = (_a = getOneElement("link", childs)) === null || _a === undefined ? undefined : _a.attribs["href"];
    if (href) {
      feed.link = href;
    }
    addConditionally(feed, "description", "subtitle", childs);
    var updated = fetch2("updated", childs);
    if (updated) {
      feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "email", childs, true);
    return feed;
  }
  function getRssFeed(feedRoot) {
    var _a, _b;
    var childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === undefined ? undefined : _a.children) !== null && _b !== undefined ? _b : [];
    var feed = {
      type: feedRoot.name.substr(0, 3),
      id: "",
      items: (0, legacy_js_1.getElementsByTagName)("item", feedRoot.children).map(function(item) {
        var children = item.children;
        var entry = { media: getMediaElements(children) };
        addConditionally(entry, "id", "guid", children);
        addConditionally(entry, "title", "title", children);
        addConditionally(entry, "link", "link", children);
        addConditionally(entry, "description", "description", children);
        var pubDate = fetch2("pubDate", children) || fetch2("dc:date", children);
        if (pubDate)
          entry.pubDate = new Date(pubDate);
        return entry;
      })
    };
    addConditionally(feed, "title", "title", childs);
    addConditionally(feed, "link", "link", childs);
    addConditionally(feed, "description", "description", childs);
    var updated = fetch2("lastBuildDate", childs);
    if (updated) {
      feed.updated = new Date(updated);
    }
    addConditionally(feed, "author", "managingEditor", childs, true);
    return feed;
  }
  var MEDIA_KEYS_STRING = ["url", "type", "lang"];
  var MEDIA_KEYS_INT = [
    "fileSize",
    "bitrate",
    "framerate",
    "samplingrate",
    "channels",
    "duration",
    "height",
    "width"
  ];
  function getMediaElements(where) {
    return (0, legacy_js_1.getElementsByTagName)("media:content", where).map(function(elem) {
      var attribs = elem.attribs;
      var media = {
        medium: attribs["medium"],
        isDefault: !!attribs["isDefault"]
      };
      for (var _i = 0, MEDIA_KEYS_STRING_1 = MEDIA_KEYS_STRING;_i < MEDIA_KEYS_STRING_1.length; _i++) {
        var attrib = MEDIA_KEYS_STRING_1[_i];
        if (attribs[attrib]) {
          media[attrib] = attribs[attrib];
        }
      }
      for (var _a = 0, MEDIA_KEYS_INT_1 = MEDIA_KEYS_INT;_a < MEDIA_KEYS_INT_1.length; _a++) {
        var attrib = MEDIA_KEYS_INT_1[_a];
        if (attribs[attrib]) {
          media[attrib] = parseInt(attribs[attrib], 10);
        }
      }
      if (attribs["expression"]) {
        media.expression = attribs["expression"];
      }
      return media;
    });
  }
  function getOneElement(tagName, node) {
    return (0, legacy_js_1.getElementsByTagName)(tagName, node, true, 1)[0];
  }
  function fetch2(tagName, where, recurse) {
    if (recurse === undefined) {
      recurse = false;
    }
    return (0, stringify_js_1.textContent)((0, legacy_js_1.getElementsByTagName)(tagName, where, recurse, 1)).trim();
  }
  function addConditionally(obj, prop, tagName, where, recurse) {
    if (recurse === undefined) {
      recurse = false;
    }
    var val = fetch2(tagName, where, recurse);
    if (val)
      obj[prop] = val;
  }
  function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
  }
});

// node_modules/domutils/lib/index.js
var require_lib5 = __commonJS((exports2) => {
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
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.hasChildren = exports2.isDocument = exports2.isComment = exports2.isText = exports2.isCDATA = exports2.isTag = undefined;
  __exportStar(require_stringify(), exports2);
  __exportStar(require_traversal(), exports2);
  __exportStar(require_manipulation(), exports2);
  __exportStar(require_querying(), exports2);
  __exportStar(require_legacy(), exports2);
  __exportStar(require_helpers(), exports2);
  __exportStar(require_feeds(), exports2);
  var domhandler_1 = require_lib2();
  Object.defineProperty(exports2, "isTag", { enumerable: true, get: function() {
    return domhandler_1.isTag;
  } });
  Object.defineProperty(exports2, "isCDATA", { enumerable: true, get: function() {
    return domhandler_1.isCDATA;
  } });
  Object.defineProperty(exports2, "isText", { enumerable: true, get: function() {
    return domhandler_1.isText;
  } });
  Object.defineProperty(exports2, "isComment", { enumerable: true, get: function() {
    return domhandler_1.isComment;
  } });
  Object.defineProperty(exports2, "isDocument", { enumerable: true, get: function() {
    return domhandler_1.isDocument;
  } });
  Object.defineProperty(exports2, "hasChildren", { enumerable: true, get: function() {
    return domhandler_1.hasChildren;
  } });
});

// node_modules/boolbase/index.js
var require_boolbase = __commonJS((exports2, module2) => {
  module2.exports = {
    trueFunc: function trueFunc() {
      return true;
    },
    falseFunc: function falseFunc() {
      return false;
    }
  };
});

// node_modules/css-what/lib/commonjs/types.js
var require_types = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.AttributeAction = exports2.IgnoreCaseMode = exports2.SelectorType = undefined;
  var SelectorType;
  (function(SelectorType2) {
    SelectorType2["Attribute"] = "attribute";
    SelectorType2["Pseudo"] = "pseudo";
    SelectorType2["PseudoElement"] = "pseudo-element";
    SelectorType2["Tag"] = "tag";
    SelectorType2["Universal"] = "universal";
    SelectorType2["Adjacent"] = "adjacent";
    SelectorType2["Child"] = "child";
    SelectorType2["Descendant"] = "descendant";
    SelectorType2["Parent"] = "parent";
    SelectorType2["Sibling"] = "sibling";
    SelectorType2["ColumnCombinator"] = "column-combinator";
  })(SelectorType = exports2.SelectorType || (exports2.SelectorType = {}));
  exports2.IgnoreCaseMode = {
    Unknown: null,
    QuirksMode: "quirks",
    IgnoreCase: true,
    CaseSensitive: false
  };
  var AttributeAction;
  (function(AttributeAction2) {
    AttributeAction2["Any"] = "any";
    AttributeAction2["Element"] = "element";
    AttributeAction2["End"] = "end";
    AttributeAction2["Equals"] = "equals";
    AttributeAction2["Exists"] = "exists";
    AttributeAction2["Hyphen"] = "hyphen";
    AttributeAction2["Not"] = "not";
    AttributeAction2["Start"] = "start";
  })(AttributeAction = exports2.AttributeAction || (exports2.AttributeAction = {}));
});

// node_modules/css-what/lib/commonjs/parse.js
var require_parse = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.parse = exports2.isTraversal = undefined;
  var types_1 = require_types();
  var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
  var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
  var actionTypes = new Map([
    [126, types_1.AttributeAction.Element],
    [94, types_1.AttributeAction.Start],
    [36, types_1.AttributeAction.End],
    [42, types_1.AttributeAction.Any],
    [33, types_1.AttributeAction.Not],
    [124, types_1.AttributeAction.Hyphen]
  ]);
  var unpackPseudos = new Set([
    "has",
    "not",
    "matches",
    "is",
    "where",
    "host",
    "host-context"
  ]);
  function isTraversal(selector) {
    switch (selector.type) {
      case types_1.SelectorType.Adjacent:
      case types_1.SelectorType.Child:
      case types_1.SelectorType.Descendant:
      case types_1.SelectorType.Parent:
      case types_1.SelectorType.Sibling:
      case types_1.SelectorType.ColumnCombinator:
        return true;
      default:
        return false;
    }
  }
  exports2.isTraversal = isTraversal;
  var stripQuotesFromPseudos = new Set(["contains", "icontains"]);
  function funescape(_, escaped, escapedWhitespace) {
    var high = parseInt(escaped, 16) - 65536;
    return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
  }
  function unescapeCSS(str) {
    return str.replace(reEscape, funescape);
  }
  function isQuote(c2) {
    return c2 === 39 || c2 === 34;
  }
  function isWhitespace(c2) {
    return c2 === 32 || c2 === 9 || c2 === 10 || c2 === 12 || c2 === 13;
  }
  function parse(selector) {
    var subselects = [];
    var endIndex = parseSelector(subselects, "".concat(selector), 0);
    if (endIndex < selector.length) {
      throw new Error("Unmatched selector: ".concat(selector.slice(endIndex)));
    }
    return subselects;
  }
  exports2.parse = parse;
  function parseSelector(subselects, selector, selectorIndex) {
    var tokens = [];
    function getName(offset) {
      var match = selector.slice(selectorIndex + offset).match(reName);
      if (!match) {
        throw new Error("Expected name, found ".concat(selector.slice(selectorIndex)));
      }
      var name = match[0];
      selectorIndex += offset + name.length;
      return unescapeCSS(name);
    }
    function stripWhitespace(offset) {
      selectorIndex += offset;
      while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) {
        selectorIndex++;
      }
    }
    function readValueWithParenthesis() {
      selectorIndex += 1;
      var start = selectorIndex;
      var counter = 1;
      for (;counter > 0 && selectorIndex < selector.length; selectorIndex++) {
        if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) {
          counter++;
        } else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) {
          counter--;
        }
      }
      if (counter) {
        throw new Error("Parenthesis not matched");
      }
      return unescapeCSS(selector.slice(start, selectorIndex - 1));
    }
    function isEscaped(pos) {
      var slashCount = 0;
      while (selector.charCodeAt(--pos) === 92)
        slashCount++;
      return (slashCount & 1) === 1;
    }
    function ensureNotTraversal() {
      if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) {
        throw new Error("Did not expect successive traversals.");
      }
    }
    function addTraversal(type) {
      if (tokens.length > 0 && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) {
        tokens[tokens.length - 1].type = type;
        return;
      }
      ensureNotTraversal();
      tokens.push({ type });
    }
    function addSpecialAttribute(name, action2) {
      tokens.push({
        type: types_1.SelectorType.Attribute,
        name,
        action: action2,
        value: getName(1),
        namespace: null,
        ignoreCase: "quirks"
      });
    }
    function finalizeSubselector() {
      if (tokens.length && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) {
        tokens.pop();
      }
      if (tokens.length === 0) {
        throw new Error("Empty sub-selector");
      }
      subselects.push(tokens);
    }
    stripWhitespace(0);
    if (selector.length === selectorIndex) {
      return selectorIndex;
    }
    loop:
      while (selectorIndex < selector.length) {
        var firstChar = selector.charCodeAt(selectorIndex);
        switch (firstChar) {
          case 32:
          case 9:
          case 10:
          case 12:
          case 13: {
            if (tokens.length === 0 || tokens[0].type !== types_1.SelectorType.Descendant) {
              ensureNotTraversal();
              tokens.push({ type: types_1.SelectorType.Descendant });
            }
            stripWhitespace(1);
            break;
          }
          case 62: {
            addTraversal(types_1.SelectorType.Child);
            stripWhitespace(1);
            break;
          }
          case 60: {
            addTraversal(types_1.SelectorType.Parent);
            stripWhitespace(1);
            break;
          }
          case 126: {
            addTraversal(types_1.SelectorType.Sibling);
            stripWhitespace(1);
            break;
          }
          case 43: {
            addTraversal(types_1.SelectorType.Adjacent);
            stripWhitespace(1);
            break;
          }
          case 46: {
            addSpecialAttribute("class", types_1.AttributeAction.Element);
            break;
          }
          case 35: {
            addSpecialAttribute("id", types_1.AttributeAction.Equals);
            break;
          }
          case 91: {
            stripWhitespace(1);
            var name_1 = undefined;
            var namespace = null;
            if (selector.charCodeAt(selectorIndex) === 124) {
              name_1 = getName(1);
            } else if (selector.startsWith("*|", selectorIndex)) {
              namespace = "*";
              name_1 = getName(2);
            } else {
              name_1 = getName(0);
              if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
                namespace = name_1;
                name_1 = getName(1);
              }
            }
            stripWhitespace(0);
            var action = types_1.AttributeAction.Exists;
            var possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
            if (possibleAction) {
              action = possibleAction;
              if (selector.charCodeAt(selectorIndex + 1) !== 61) {
                throw new Error("Expected `=`");
              }
              stripWhitespace(2);
            } else if (selector.charCodeAt(selectorIndex) === 61) {
              action = types_1.AttributeAction.Equals;
              stripWhitespace(1);
            }
            var value = "";
            var ignoreCase = null;
            if (action !== "exists") {
              if (isQuote(selector.charCodeAt(selectorIndex))) {
                var quote = selector.charCodeAt(selectorIndex);
                var sectionEnd = selectorIndex + 1;
                while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) {
                  sectionEnd += 1;
                }
                if (selector.charCodeAt(sectionEnd) !== quote) {
                  throw new Error("Attribute value didn't end");
                }
                value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
                selectorIndex = sectionEnd + 1;
              } else {
                var valueStart = selectorIndex;
                while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) {
                  selectorIndex += 1;
                }
                value = unescapeCSS(selector.slice(valueStart, selectorIndex));
              }
              stripWhitespace(0);
              var forceIgnore = selector.charCodeAt(selectorIndex) | 32;
              if (forceIgnore === 115) {
                ignoreCase = false;
                stripWhitespace(1);
              } else if (forceIgnore === 105) {
                ignoreCase = true;
                stripWhitespace(1);
              }
            }
            if (selector.charCodeAt(selectorIndex) !== 93) {
              throw new Error("Attribute selector didn't terminate");
            }
            selectorIndex += 1;
            var attributeSelector = {
              type: types_1.SelectorType.Attribute,
              name: name_1,
              action,
              value,
              namespace,
              ignoreCase
            };
            tokens.push(attributeSelector);
            break;
          }
          case 58: {
            if (selector.charCodeAt(selectorIndex + 1) === 58) {
              tokens.push({
                type: types_1.SelectorType.PseudoElement,
                name: getName(2).toLowerCase(),
                data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
              });
              continue;
            }
            var name_2 = getName(1).toLowerCase();
            var data = null;
            if (selector.charCodeAt(selectorIndex) === 40) {
              if (unpackPseudos.has(name_2)) {
                if (isQuote(selector.charCodeAt(selectorIndex + 1))) {
                  throw new Error("Pseudo-selector ".concat(name_2, " cannot be quoted"));
                }
                data = [];
                selectorIndex = parseSelector(data, selector, selectorIndex + 1);
                if (selector.charCodeAt(selectorIndex) !== 41) {
                  throw new Error("Missing closing parenthesis in :".concat(name_2, " (").concat(selector, ")"));
                }
                selectorIndex += 1;
              } else {
                data = readValueWithParenthesis();
                if (stripQuotesFromPseudos.has(name_2)) {
                  var quot = data.charCodeAt(0);
                  if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) {
                    data = data.slice(1, -1);
                  }
                }
                data = unescapeCSS(data);
              }
            }
            tokens.push({ type: types_1.SelectorType.Pseudo, name: name_2, data });
            break;
          }
          case 44: {
            finalizeSubselector();
            tokens = [];
            stripWhitespace(1);
            break;
          }
          default: {
            if (selector.startsWith("/*", selectorIndex)) {
              var endIndex = selector.indexOf("*/", selectorIndex + 2);
              if (endIndex < 0) {
                throw new Error("Comment was not terminated");
              }
              selectorIndex = endIndex + 2;
              if (tokens.length === 0) {
                stripWhitespace(0);
              }
              break;
            }
            var namespace = null;
            var name_3 = undefined;
            if (firstChar === 42) {
              selectorIndex += 1;
              name_3 = "*";
            } else if (firstChar === 124) {
              name_3 = "";
              if (selector.charCodeAt(selectorIndex + 1) === 124) {
                addTraversal(types_1.SelectorType.ColumnCombinator);
                stripWhitespace(2);
                break;
              }
            } else if (reName.test(selector.slice(selectorIndex))) {
              name_3 = getName(0);
            } else {
              break loop;
            }
            if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
              namespace = name_3;
              if (selector.charCodeAt(selectorIndex + 1) === 42) {
                name_3 = "*";
                selectorIndex += 2;
              } else {
                name_3 = getName(1);
              }
            }
            tokens.push(name_3 === "*" ? { type: types_1.SelectorType.Universal, namespace } : { type: types_1.SelectorType.Tag, name: name_3, namespace });
          }
        }
      }
    finalizeSubselector();
    return selectorIndex;
  }
});

// node_modules/css-what/lib/commonjs/stringify.js
var require_stringify2 = __commonJS((exports2) => {
  var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar;i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.stringify = undefined;
  var types_1 = require_types();
  var attribValChars = ["\\", '"'];
  var pseudoValChars = __spreadArray(__spreadArray([], attribValChars, true), ["(", ")"], false);
  var charsToEscapeInAttributeValue = new Set(attribValChars.map(function(c2) {
    return c2.charCodeAt(0);
  }));
  var charsToEscapeInPseudoValue = new Set(pseudoValChars.map(function(c2) {
    return c2.charCodeAt(0);
  }));
  var charsToEscapeInName = new Set(__spreadArray(__spreadArray([], pseudoValChars, true), [
    "~",
    "^",
    "$",
    "*",
    "+",
    "!",
    "|",
    ":",
    "[",
    "]",
    " ",
    "."
  ], false).map(function(c2) {
    return c2.charCodeAt(0);
  }));
  function stringify(selector) {
    return selector.map(function(token) {
      return token.map(stringifyToken).join("");
    }).join(", ");
  }
  exports2.stringify = stringify;
  function stringifyToken(token, index, arr) {
    switch (token.type) {
      case types_1.SelectorType.Child:
        return index === 0 ? "> " : " > ";
      case types_1.SelectorType.Parent:
        return index === 0 ? "< " : " < ";
      case types_1.SelectorType.Sibling:
        return index === 0 ? "~ " : " ~ ";
      case types_1.SelectorType.Adjacent:
        return index === 0 ? "+ " : " + ";
      case types_1.SelectorType.Descendant:
        return " ";
      case types_1.SelectorType.ColumnCombinator:
        return index === 0 ? "|| " : " || ";
      case types_1.SelectorType.Universal:
        return token.namespace === "*" && index + 1 < arr.length && "name" in arr[index + 1] ? "" : "".concat(getNamespace(token.namespace), "*");
      case types_1.SelectorType.Tag:
        return getNamespacedName(token);
      case types_1.SelectorType.PseudoElement:
        return "::".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(escapeName(token.data, charsToEscapeInPseudoValue), ")"));
      case types_1.SelectorType.Pseudo:
        return ":".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(typeof token.data === "string" ? escapeName(token.data, charsToEscapeInPseudoValue) : stringify(token.data), ")"));
      case types_1.SelectorType.Attribute: {
        if (token.name === "id" && token.action === types_1.AttributeAction.Equals && token.ignoreCase === "quirks" && !token.namespace) {
          return "#".concat(escapeName(token.value, charsToEscapeInName));
        }
        if (token.name === "class" && token.action === types_1.AttributeAction.Element && token.ignoreCase === "quirks" && !token.namespace) {
          return ".".concat(escapeName(token.value, charsToEscapeInName));
        }
        var name_1 = getNamespacedName(token);
        if (token.action === types_1.AttributeAction.Exists) {
          return "[".concat(name_1, "]");
        }
        return "[".concat(name_1).concat(getActionValue(token.action), '="').concat(escapeName(token.value, charsToEscapeInAttributeValue), '"').concat(token.ignoreCase === null ? "" : token.ignoreCase ? " i" : " s", "]");
      }
    }
  }
  function getActionValue(action) {
    switch (action) {
      case types_1.AttributeAction.Equals:
        return "";
      case types_1.AttributeAction.Element:
        return "~";
      case types_1.AttributeAction.Start:
        return "^";
      case types_1.AttributeAction.End:
        return "$";
      case types_1.AttributeAction.Any:
        return "*";
      case types_1.AttributeAction.Not:
        return "!";
      case types_1.AttributeAction.Hyphen:
        return "|";
      case types_1.AttributeAction.Exists:
        throw new Error("Shouldn't be here");
    }
  }
  function getNamespacedName(token) {
    return "".concat(getNamespace(token.namespace)).concat(escapeName(token.name, charsToEscapeInName));
  }
  function getNamespace(namespace) {
    return namespace !== null ? "".concat(namespace === "*" ? "*" : escapeName(namespace, charsToEscapeInName), "|") : "";
  }
  function escapeName(str, charsToEscape) {
    var lastIdx = 0;
    var ret = "";
    for (var i = 0;i < str.length; i++) {
      if (charsToEscape.has(str.charCodeAt(i))) {
        ret += "".concat(str.slice(lastIdx, i), "\\").concat(str.charAt(i));
        lastIdx = i + 1;
      }
    }
    return ret.length > 0 ? ret + str.slice(lastIdx) : str;
  }
});

// node_modules/css-what/lib/commonjs/index.js
var require_commonjs = __commonJS((exports2) => {
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
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.stringify = exports2.parse = exports2.isTraversal = undefined;
  __exportStar(require_types(), exports2);
  var parse_1 = require_parse();
  Object.defineProperty(exports2, "isTraversal", { enumerable: true, get: function() {
    return parse_1.isTraversal;
  } });
  Object.defineProperty(exports2, "parse", { enumerable: true, get: function() {
    return parse_1.parse;
  } });
  var stringify_1 = require_stringify2();
  Object.defineProperty(exports2, "stringify", { enumerable: true, get: function() {
    return stringify_1.stringify;
  } });
});

// node_modules/css-select/lib/sort.js
var require_sort = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.isTraversal = undefined;
  var css_what_1 = require_commonjs();
  var procedure = new Map([
    [css_what_1.SelectorType.Universal, 50],
    [css_what_1.SelectorType.Tag, 30],
    [css_what_1.SelectorType.Attribute, 1],
    [css_what_1.SelectorType.Pseudo, 0]
  ]);
  function isTraversal(token) {
    return !procedure.has(token.type);
  }
  exports2.isTraversal = isTraversal;
  var attributes = new Map([
    [css_what_1.AttributeAction.Exists, 10],
    [css_what_1.AttributeAction.Equals, 8],
    [css_what_1.AttributeAction.Not, 7],
    [css_what_1.AttributeAction.Start, 6],
    [css_what_1.AttributeAction.End, 6],
    [css_what_1.AttributeAction.Any, 5]
  ]);
  function sortByProcedure(arr) {
    var procs = arr.map(getProcedure);
    for (var i = 1;i < arr.length; i++) {
      var procNew = procs[i];
      if (procNew < 0)
        continue;
      for (var j = i - 1;j >= 0 && procNew < procs[j]; j--) {
        var token = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = token;
        procs[j + 1] = procs[j];
        procs[j] = procNew;
      }
    }
  }
  exports2.default = sortByProcedure;
  function getProcedure(token) {
    var _a, _b;
    var proc = (_a = procedure.get(token.type)) !== null && _a !== undefined ? _a : -1;
    if (token.type === css_what_1.SelectorType.Attribute) {
      proc = (_b = attributes.get(token.action)) !== null && _b !== undefined ? _b : 4;
      if (token.action === css_what_1.AttributeAction.Equals && token.name === "id") {
        proc = 9;
      }
      if (token.ignoreCase) {
        proc >>= 1;
      }
    } else if (token.type === css_what_1.SelectorType.Pseudo) {
      if (!token.data) {
        proc = 3;
      } else if (token.name === "has" || token.name === "contains") {
        proc = 0;
      } else if (Array.isArray(token.data)) {
        proc = Math.min.apply(Math, token.data.map(function(d) {
          return Math.min.apply(Math, d.map(getProcedure));
        }));
        if (proc < 0) {
          proc = 0;
        }
      } else {
        proc = 2;
      }
    }
    return proc;
  }
});

// node_modules/css-select/lib/attributes.js
var require_attributes = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.attributeRules = undefined;
  var boolbase_1 = __importDefault(require_boolbase());
  var reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
  function escapeRegex(value) {
    return value.replace(reChars, "\\$&");
  }
  var caseInsensitiveAttributes = new Set([
    "accept",
    "accept-charset",
    "align",
    "alink",
    "axis",
    "bgcolor",
    "charset",
    "checked",
    "clear",
    "codetype",
    "color",
    "compact",
    "declare",
    "defer",
    "dir",
    "direction",
    "disabled",
    "enctype",
    "face",
    "frame",
    "hreflang",
    "http-equiv",
    "lang",
    "language",
    "link",
    "media",
    "method",
    "multiple",
    "nohref",
    "noresize",
    "noshade",
    "nowrap",
    "readonly",
    "rel",
    "rev",
    "rules",
    "scope",
    "scrolling",
    "selected",
    "shape",
    "target",
    "text",
    "type",
    "valign",
    "valuetype",
    "vlink"
  ]);
  function shouldIgnoreCase(selector, options) {
    return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
  }
  exports2.attributeRules = {
    equals: function(next, data, options) {
      var adapter = options.adapter;
      var name = data.name;
      var value = data.value;
      if (shouldIgnoreCase(data, options)) {
        value = value.toLowerCase();
        return function(elem) {
          var attr = adapter.getAttributeValue(elem, name);
          return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
        };
      }
      return function(elem) {
        return adapter.getAttributeValue(elem, name) === value && next(elem);
      };
    },
    hyphen: function(next, data, options) {
      var adapter = options.adapter;
      var name = data.name;
      var value = data.value;
      var len = value.length;
      if (shouldIgnoreCase(data, options)) {
        value = value.toLowerCase();
        return function hyphenIC(elem) {
          var attr = adapter.getAttributeValue(elem, name);
          return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
        };
      }
      return function hyphen(elem) {
        var attr = adapter.getAttributeValue(elem, name);
        return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
      };
    },
    element: function(next, data, options) {
      var adapter = options.adapter;
      var { name, value } = data;
      if (/\s/.test(value)) {
        return boolbase_1.default.falseFunc;
      }
      var regex = new RegExp("(?:^|\\s)".concat(escapeRegex(value), "(?:$|\\s)"), shouldIgnoreCase(data, options) ? "i" : "");
      return function element(elem) {
        var attr = adapter.getAttributeValue(elem, name);
        return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
      };
    },
    exists: function(next, _a, _b) {
      var name = _a.name;
      var adapter = _b.adapter;
      return function(elem) {
        return adapter.hasAttrib(elem, name) && next(elem);
      };
    },
    start: function(next, data, options) {
      var adapter = options.adapter;
      var name = data.name;
      var value = data.value;
      var len = value.length;
      if (len === 0) {
        return boolbase_1.default.falseFunc;
      }
      if (shouldIgnoreCase(data, options)) {
        value = value.toLowerCase();
        return function(elem) {
          var attr = adapter.getAttributeValue(elem, name);
          return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
        };
      }
      return function(elem) {
        var _a;
        return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === undefined ? undefined : _a.startsWith(value)) && next(elem);
      };
    },
    end: function(next, data, options) {
      var adapter = options.adapter;
      var name = data.name;
      var value = data.value;
      var len = -value.length;
      if (len === 0) {
        return boolbase_1.default.falseFunc;
      }
      if (shouldIgnoreCase(data, options)) {
        value = value.toLowerCase();
        return function(elem) {
          var _a;
          return ((_a = adapter.getAttributeValue(elem, name)) === null || _a === undefined ? undefined : _a.substr(len).toLowerCase()) === value && next(elem);
        };
      }
      return function(elem) {
        var _a;
        return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === undefined ? undefined : _a.endsWith(value)) && next(elem);
      };
    },
    any: function(next, data, options) {
      var adapter = options.adapter;
      var { name, value } = data;
      if (value === "") {
        return boolbase_1.default.falseFunc;
      }
      if (shouldIgnoreCase(data, options)) {
        var regex_1 = new RegExp(escapeRegex(value), "i");
        return function anyIC(elem) {
          var attr = adapter.getAttributeValue(elem, name);
          return attr != null && attr.length >= value.length && regex_1.test(attr) && next(elem);
        };
      }
      return function(elem) {
        var _a;
        return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === undefined ? undefined : _a.includes(value)) && next(elem);
      };
    },
    not: function(next, data, options) {
      var adapter = options.adapter;
      var name = data.name;
      var value = data.value;
      if (value === "") {
        return function(elem) {
          return !!adapter.getAttributeValue(elem, name) && next(elem);
        };
      } else if (shouldIgnoreCase(data, options)) {
        value = value.toLowerCase();
        return function(elem) {
          var attr = adapter.getAttributeValue(elem, name);
          return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
        };
      }
      return function(elem) {
        return adapter.getAttributeValue(elem, name) !== value && next(elem);
      };
    }
  };
});

// node_modules/nth-check/lib/parse.js
var require_parse2 = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.parse = undefined;
  var whitespace = new Set([9, 10, 12, 13, 32]);
  var ZERO = 48;
  var NINE = 57;
  function parse(formula) {
    formula = formula.trim().toLowerCase();
    if (formula === "even") {
      return [2, 0];
    } else if (formula === "odd") {
      return [2, 1];
    }
    var idx = 0;
    var a = 0;
    var sign = readSign();
    var number = readNumber();
    if (idx < formula.length && formula.charAt(idx) === "n") {
      idx++;
      a = sign * (number !== null && number !== undefined ? number : 1);
      skipWhitespace();
      if (idx < formula.length) {
        sign = readSign();
        skipWhitespace();
        number = readNumber();
      } else {
        sign = number = 0;
      }
    }
    if (number === null || idx < formula.length) {
      throw new Error("n-th rule couldn't be parsed ('".concat(formula, "')"));
    }
    return [a, sign * number];
    function readSign() {
      if (formula.charAt(idx) === "-") {
        idx++;
        return -1;
      }
      if (formula.charAt(idx) === "+") {
        idx++;
      }
      return 1;
    }
    function readNumber() {
      var start = idx;
      var value = 0;
      while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
        value = value * 10 + (formula.charCodeAt(idx) - ZERO);
        idx++;
      }
      return idx === start ? null : value;
    }
    function skipWhitespace() {
      while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) {
        idx++;
      }
    }
  }
  exports2.parse = parse;
});

// node_modules/nth-check/lib/compile.js
var require_compile = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.generate = exports2.compile = undefined;
  var boolbase_1 = __importDefault(require_boolbase());
  function compile(parsed) {
    var a = parsed[0];
    var b = parsed[1] - 1;
    if (b < 0 && a <= 0)
      return boolbase_1.default.falseFunc;
    if (a === -1)
      return function(index) {
        return index <= b;
      };
    if (a === 0)
      return function(index) {
        return index === b;
      };
    if (a === 1)
      return b < 0 ? boolbase_1.default.trueFunc : function(index) {
        return index >= b;
      };
    var absA = Math.abs(a);
    var bMod = (b % absA + absA) % absA;
    return a > 1 ? function(index) {
      return index >= b && index % absA === bMod;
    } : function(index) {
      return index <= b && index % absA === bMod;
    };
  }
  exports2.compile = compile;
  function generate(parsed) {
    var a = parsed[0];
    var b = parsed[1] - 1;
    var n = 0;
    if (a < 0) {
      var aPos_1 = -a;
      var minValue_1 = (b % aPos_1 + aPos_1) % aPos_1;
      return function() {
        var val = minValue_1 + aPos_1 * n++;
        return val > b ? null : val;
      };
    }
    if (a === 0)
      return b < 0 ? function() {
        return null;
      } : function() {
        return n++ === 0 ? b : null;
      };
    if (b < 0) {
      b += a * Math.ceil(-b / a);
    }
    return function() {
      return a * n++ + b;
    };
  }
  exports2.generate = generate;
});

// node_modules/nth-check/lib/index.js
var require_lib6 = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.sequence = exports2.generate = exports2.compile = exports2.parse = undefined;
  var parse_js_1 = require_parse2();
  Object.defineProperty(exports2, "parse", { enumerable: true, get: function() {
    return parse_js_1.parse;
  } });
  var compile_js_1 = require_compile();
  Object.defineProperty(exports2, "compile", { enumerable: true, get: function() {
    return compile_js_1.compile;
  } });
  Object.defineProperty(exports2, "generate", { enumerable: true, get: function() {
    return compile_js_1.generate;
  } });
  function nthCheck(formula) {
    return (0, compile_js_1.compile)((0, parse_js_1.parse)(formula));
  }
  exports2.default = nthCheck;
  function sequence(formula) {
    return (0, compile_js_1.generate)((0, parse_js_1.parse)(formula));
  }
  exports2.sequence = sequence;
});

// node_modules/css-select/lib/pseudo-selectors/filters.js
var require_filters = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.filters = undefined;
  var nth_check_1 = __importDefault(require_lib6());
  var boolbase_1 = __importDefault(require_boolbase());
  function getChildFunc(next, adapter) {
    return function(elem) {
      var parent = adapter.getParent(elem);
      return parent != null && adapter.isTag(parent) && next(elem);
    };
  }
  exports2.filters = {
    contains: function(next, text, _a) {
      var adapter = _a.adapter;
      return function contains(elem) {
        return next(elem) && adapter.getText(elem).includes(text);
      };
    },
    icontains: function(next, text, _a) {
      var adapter = _a.adapter;
      var itext = text.toLowerCase();
      return function icontains(elem) {
        return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
      };
    },
    "nth-child": function(next, rule, _a) {
      var { adapter, equals } = _a;
      var func = (0, nth_check_1.default)(rule);
      if (func === boolbase_1.default.falseFunc)
        return boolbase_1.default.falseFunc;
      if (func === boolbase_1.default.trueFunc)
        return getChildFunc(next, adapter);
      return function nthChild(elem) {
        var siblings = adapter.getSiblings(elem);
        var pos = 0;
        for (var i = 0;i < siblings.length; i++) {
          if (equals(elem, siblings[i]))
            break;
          if (adapter.isTag(siblings[i])) {
            pos++;
          }
        }
        return func(pos) && next(elem);
      };
    },
    "nth-last-child": function(next, rule, _a) {
      var { adapter, equals } = _a;
      var func = (0, nth_check_1.default)(rule);
      if (func === boolbase_1.default.falseFunc)
        return boolbase_1.default.falseFunc;
      if (func === boolbase_1.default.trueFunc)
        return getChildFunc(next, adapter);
      return function nthLastChild(elem) {
        var siblings = adapter.getSiblings(elem);
        var pos = 0;
        for (var i = siblings.length - 1;i >= 0; i--) {
          if (equals(elem, siblings[i]))
            break;
          if (adapter.isTag(siblings[i])) {
            pos++;
          }
        }
        return func(pos) && next(elem);
      };
    },
    "nth-of-type": function(next, rule, _a) {
      var { adapter, equals } = _a;
      var func = (0, nth_check_1.default)(rule);
      if (func === boolbase_1.default.falseFunc)
        return boolbase_1.default.falseFunc;
      if (func === boolbase_1.default.trueFunc)
        return getChildFunc(next, adapter);
      return function nthOfType(elem) {
        var siblings = adapter.getSiblings(elem);
        var pos = 0;
        for (var i = 0;i < siblings.length; i++) {
          var currentSibling = siblings[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
            pos++;
          }
        }
        return func(pos) && next(elem);
      };
    },
    "nth-last-of-type": function(next, rule, _a) {
      var { adapter, equals } = _a;
      var func = (0, nth_check_1.default)(rule);
      if (func === boolbase_1.default.falseFunc)
        return boolbase_1.default.falseFunc;
      if (func === boolbase_1.default.trueFunc)
        return getChildFunc(next, adapter);
      return function nthLastOfType(elem) {
        var siblings = adapter.getSiblings(elem);
        var pos = 0;
        for (var i = siblings.length - 1;i >= 0; i--) {
          var currentSibling = siblings[i];
          if (equals(elem, currentSibling))
            break;
          if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) {
            pos++;
          }
        }
        return func(pos) && next(elem);
      };
    },
    root: function(next, _rule, _a) {
      var adapter = _a.adapter;
      return function(elem) {
        var parent = adapter.getParent(elem);
        return (parent == null || !adapter.isTag(parent)) && next(elem);
      };
    },
    scope: function(next, rule, options, context) {
      var equals = options.equals;
      if (!context || context.length === 0) {
        return exports2.filters["root"](next, rule, options);
      }
      if (context.length === 1) {
        return function(elem) {
          return equals(context[0], elem) && next(elem);
        };
      }
      return function(elem) {
        return context.includes(elem) && next(elem);
      };
    },
    hover: dynamicStatePseudo("isHovered"),
    visited: dynamicStatePseudo("isVisited"),
    active: dynamicStatePseudo("isActive")
  };
  function dynamicStatePseudo(name) {
    return function dynamicPseudo(next, _rule, _a) {
      var adapter = _a.adapter;
      var func = adapter[name];
      if (typeof func !== "function") {
        return boolbase_1.default.falseFunc;
      }
      return function active(elem) {
        return func(elem) && next(elem);
      };
    };
  }
});

// node_modules/css-select/lib/pseudo-selectors/pseudos.js
var require_pseudos = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.verifyPseudoArgs = exports2.pseudos = undefined;
  exports2.pseudos = {
    empty: function(elem, _a) {
      var adapter = _a.adapter;
      return !adapter.getChildren(elem).some(function(elem2) {
        return adapter.isTag(elem2) || adapter.getText(elem2) !== "";
      });
    },
    "first-child": function(elem, _a) {
      var { adapter, equals } = _a;
      if (adapter.prevElementSibling) {
        return adapter.prevElementSibling(elem) == null;
      }
      var firstChild = adapter.getSiblings(elem).find(function(elem2) {
        return adapter.isTag(elem2);
      });
      return firstChild != null && equals(elem, firstChild);
    },
    "last-child": function(elem, _a) {
      var { adapter, equals } = _a;
      var siblings = adapter.getSiblings(elem);
      for (var i = siblings.length - 1;i >= 0; i--) {
        if (equals(elem, siblings[i]))
          return true;
        if (adapter.isTag(siblings[i]))
          break;
      }
      return false;
    },
    "first-of-type": function(elem, _a) {
      var { adapter, equals } = _a;
      var siblings = adapter.getSiblings(elem);
      var elemName = adapter.getName(elem);
      for (var i = 0;i < siblings.length; i++) {
        var currentSibling = siblings[i];
        if (equals(elem, currentSibling))
          return true;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
          break;
        }
      }
      return false;
    },
    "last-of-type": function(elem, _a) {
      var { adapter, equals } = _a;
      var siblings = adapter.getSiblings(elem);
      var elemName = adapter.getName(elem);
      for (var i = siblings.length - 1;i >= 0; i--) {
        var currentSibling = siblings[i];
        if (equals(elem, currentSibling))
          return true;
        if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) {
          break;
        }
      }
      return false;
    },
    "only-of-type": function(elem, _a) {
      var { adapter, equals } = _a;
      var elemName = adapter.getName(elem);
      return adapter.getSiblings(elem).every(function(sibling) {
        return equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName;
      });
    },
    "only-child": function(elem, _a) {
      var { adapter, equals } = _a;
      return adapter.getSiblings(elem).every(function(sibling) {
        return equals(elem, sibling) || !adapter.isTag(sibling);
      });
    }
  };
  function verifyPseudoArgs(func, name, subselect, argIndex) {
    if (subselect === null) {
      if (func.length > argIndex) {
        throw new Error("Pseudo-class :".concat(name, " requires an argument"));
      }
    } else if (func.length === argIndex) {
      throw new Error("Pseudo-class :".concat(name, " doesn't have any arguments"));
    }
  }
  exports2.verifyPseudoArgs = verifyPseudoArgs;
});

// node_modules/css-select/lib/pseudo-selectors/aliases.js
var require_aliases = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.aliases = undefined;
  exports2.aliases = {
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
    enabled: ":not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
  };
});

// node_modules/css-select/lib/pseudo-selectors/subselects.js
var require_subselects = __commonJS((exports2) => {
  var __spreadArray = exports2 && exports2.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar;i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.subselects = exports2.getNextSiblings = exports2.ensureIsTag = exports2.PLACEHOLDER_ELEMENT = undefined;
  var boolbase_1 = __importDefault(require_boolbase());
  var sort_js_1 = require_sort();
  exports2.PLACEHOLDER_ELEMENT = {};
  function ensureIsTag(next, adapter) {
    if (next === boolbase_1.default.falseFunc)
      return boolbase_1.default.falseFunc;
    return function(elem) {
      return adapter.isTag(elem) && next(elem);
    };
  }
  exports2.ensureIsTag = ensureIsTag;
  function getNextSiblings(elem, adapter) {
    var siblings = adapter.getSiblings(elem);
    if (siblings.length <= 1)
      return [];
    var elemIndex = siblings.indexOf(elem);
    if (elemIndex < 0 || elemIndex === siblings.length - 1)
      return [];
    return siblings.slice(elemIndex + 1).filter(adapter.isTag);
  }
  exports2.getNextSiblings = getNextSiblings;
  function copyOptions(options) {
    return {
      xmlMode: !!options.xmlMode,
      lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
      lowerCaseTags: !!options.lowerCaseTags,
      quirksMode: !!options.quirksMode,
      cacheResults: !!options.cacheResults,
      pseudos: options.pseudos,
      adapter: options.adapter,
      equals: options.equals
    };
  }
  var is = function(next, token, options, context, compileToken) {
    var func = compileToken(token, copyOptions(options), context);
    return func === boolbase_1.default.trueFunc ? next : func === boolbase_1.default.falseFunc ? boolbase_1.default.falseFunc : function(elem) {
      return func(elem) && next(elem);
    };
  };
  exports2.subselects = {
    is,
    matches: is,
    where: is,
    not: function(next, token, options, context, compileToken) {
      var func = compileToken(token, copyOptions(options), context);
      return func === boolbase_1.default.falseFunc ? next : func === boolbase_1.default.trueFunc ? boolbase_1.default.falseFunc : function(elem) {
        return !func(elem) && next(elem);
      };
    },
    has: function(next, subselect, options, _context, compileToken) {
      var adapter = options.adapter;
      var opts = copyOptions(options);
      opts.relativeSelector = true;
      var context = subselect.some(function(s) {
        return s.some(sort_js_1.isTraversal);
      }) ? [exports2.PLACEHOLDER_ELEMENT] : undefined;
      var compiled = compileToken(subselect, opts, context);
      if (compiled === boolbase_1.default.falseFunc)
        return boolbase_1.default.falseFunc;
      var hasElement = ensureIsTag(compiled, adapter);
      if (context && compiled !== boolbase_1.default.trueFunc) {
        var _a = compiled.shouldTestNextSiblings, shouldTestNextSiblings_1 = _a === undefined ? false : _a;
        return function(elem) {
          if (!next(elem))
            return false;
          context[0] = elem;
          var childs = adapter.getChildren(elem);
          var nextElements = shouldTestNextSiblings_1 ? __spreadArray(__spreadArray([], childs, true), getNextSiblings(elem, adapter), true) : childs;
          return adapter.existsOne(hasElement, nextElements);
        };
      }
      return function(elem) {
        return next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
      };
    }
  };
});

// node_modules/css-select/lib/pseudo-selectors/index.js
var require_pseudo_selectors = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.compilePseudoSelector = exports2.aliases = exports2.pseudos = exports2.filters = undefined;
  var css_what_1 = require_commonjs();
  var filters_js_1 = require_filters();
  Object.defineProperty(exports2, "filters", { enumerable: true, get: function() {
    return filters_js_1.filters;
  } });
  var pseudos_js_1 = require_pseudos();
  Object.defineProperty(exports2, "pseudos", { enumerable: true, get: function() {
    return pseudos_js_1.pseudos;
  } });
  var aliases_js_1 = require_aliases();
  Object.defineProperty(exports2, "aliases", { enumerable: true, get: function() {
    return aliases_js_1.aliases;
  } });
  var subselects_js_1 = require_subselects();
  function compilePseudoSelector(next, selector, options, context, compileToken) {
    var _a;
    var { name, data } = selector;
    if (Array.isArray(data)) {
      if (!(name in subselects_js_1.subselects)) {
        throw new Error("Unknown pseudo-class :".concat(name, "(").concat(data, ")"));
      }
      return subselects_js_1.subselects[name](next, data, options, context, compileToken);
    }
    var userPseudo = (_a = options.pseudos) === null || _a === undefined ? undefined : _a[name];
    var stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases_js_1.aliases[name];
    if (typeof stringPseudo === "string") {
      if (data != null) {
        throw new Error("Pseudo ".concat(name, " doesn't have any arguments"));
      }
      var alias = (0, css_what_1.parse)(stringPseudo);
      return subselects_js_1.subselects["is"](next, alias, options, context, compileToken);
    }
    if (typeof userPseudo === "function") {
      (0, pseudos_js_1.verifyPseudoArgs)(userPseudo, name, data, 1);
      return function(elem) {
        return userPseudo(elem, data) && next(elem);
      };
    }
    if (name in filters_js_1.filters) {
      return filters_js_1.filters[name](next, data, options, context);
    }
    if (name in pseudos_js_1.pseudos) {
      var pseudo_1 = pseudos_js_1.pseudos[name];
      (0, pseudos_js_1.verifyPseudoArgs)(pseudo_1, name, data, 2);
      return function(elem) {
        return pseudo_1(elem, options, data) && next(elem);
      };
    }
    throw new Error("Unknown pseudo-class :".concat(name));
  }
  exports2.compilePseudoSelector = compilePseudoSelector;
});

// node_modules/css-select/lib/general.js
var require_general = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.compileGeneralSelector = undefined;
  var attributes_js_1 = require_attributes();
  var index_js_1 = require_pseudo_selectors();
  var css_what_1 = require_commonjs();
  function getElementParent(node, adapter) {
    var parent = adapter.getParent(node);
    if (parent && adapter.isTag(parent)) {
      return parent;
    }
    return null;
  }
  function compileGeneralSelector(next, selector, options, context, compileToken) {
    var { adapter, equals } = options;
    switch (selector.type) {
      case css_what_1.SelectorType.PseudoElement: {
        throw new Error("Pseudo-elements are not supported by css-select");
      }
      case css_what_1.SelectorType.ColumnCombinator: {
        throw new Error("Column combinators are not yet supported by css-select");
      }
      case css_what_1.SelectorType.Attribute: {
        if (selector.namespace != null) {
          throw new Error("Namespaced attributes are not yet supported by css-select");
        }
        if (!options.xmlMode || options.lowerCaseAttributeNames) {
          selector.name = selector.name.toLowerCase();
        }
        return attributes_js_1.attributeRules[selector.action](next, selector, options);
      }
      case css_what_1.SelectorType.Pseudo: {
        return (0, index_js_1.compilePseudoSelector)(next, selector, options, context, compileToken);
      }
      case css_what_1.SelectorType.Tag: {
        if (selector.namespace != null) {
          throw new Error("Namespaced tag names are not yet supported by css-select");
        }
        var name_1 = selector.name;
        if (!options.xmlMode || options.lowerCaseTags) {
          name_1 = name_1.toLowerCase();
        }
        return function tag(elem) {
          return adapter.getName(elem) === name_1 && next(elem);
        };
      }
      case css_what_1.SelectorType.Descendant: {
        if (options.cacheResults === false || typeof WeakSet === "undefined") {
          return function descendant(elem) {
            var current = elem;
            while (current = getElementParent(current, adapter)) {
              if (next(current)) {
                return true;
              }
            }
            return false;
          };
        }
        var isFalseCache_1 = new WeakSet;
        return function cachedDescendant(elem) {
          var current = elem;
          while (current = getElementParent(current, adapter)) {
            if (!isFalseCache_1.has(current)) {
              if (adapter.isTag(current) && next(current)) {
                return true;
              }
              isFalseCache_1.add(current);
            }
          }
          return false;
        };
      }
      case "_flexibleDescendant": {
        return function flexibleDescendant(elem) {
          var current = elem;
          do {
            if (next(current))
              return true;
          } while (current = getElementParent(current, adapter));
          return false;
        };
      }
      case css_what_1.SelectorType.Parent: {
        return function parent(elem) {
          return adapter.getChildren(elem).some(function(elem2) {
            return adapter.isTag(elem2) && next(elem2);
          });
        };
      }
      case css_what_1.SelectorType.Child: {
        return function child(elem) {
          var parent = adapter.getParent(elem);
          return parent != null && adapter.isTag(parent) && next(parent);
        };
      }
      case css_what_1.SelectorType.Sibling: {
        return function sibling(elem) {
          var siblings = adapter.getSiblings(elem);
          for (var i = 0;i < siblings.length; i++) {
            var currentSibling = siblings[i];
            if (equals(elem, currentSibling))
              break;
            if (adapter.isTag(currentSibling) && next(currentSibling)) {
              return true;
            }
          }
          return false;
        };
      }
      case css_what_1.SelectorType.Adjacent: {
        if (adapter.prevElementSibling) {
          return function adjacent(elem) {
            var previous = adapter.prevElementSibling(elem);
            return previous != null && next(previous);
          };
        }
        return function adjacent(elem) {
          var siblings = adapter.getSiblings(elem);
          var lastElement;
          for (var i = 0;i < siblings.length; i++) {
            var currentSibling = siblings[i];
            if (equals(elem, currentSibling))
              break;
            if (adapter.isTag(currentSibling)) {
              lastElement = currentSibling;
            }
          }
          return !!lastElement && next(lastElement);
        };
      }
      case css_what_1.SelectorType.Universal: {
        if (selector.namespace != null && selector.namespace !== "*") {
          throw new Error("Namespaced universal selectors are not yet supported by css-select");
        }
        return next;
      }
    }
  }
  exports2.compileGeneralSelector = compileGeneralSelector;
});

// node_modules/css-select/lib/compile.js
var require_compile2 = __commonJS((exports2) => {
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.compileToken = exports2.compileUnsafe = exports2.compile = undefined;
  var css_what_1 = require_commonjs();
  var boolbase_1 = __importDefault(require_boolbase());
  var sort_js_1 = __importStar(require_sort());
  var general_js_1 = require_general();
  var subselects_js_1 = require_subselects();
  function compile(selector, options, context) {
    var next = compileUnsafe(selector, options, context);
    return (0, subselects_js_1.ensureIsTag)(next, options.adapter);
  }
  exports2.compile = compile;
  function compileUnsafe(selector, options, context) {
    var token = typeof selector === "string" ? (0, css_what_1.parse)(selector) : selector;
    return compileToken(token, options, context);
  }
  exports2.compileUnsafe = compileUnsafe;
  function includesScopePseudo(t) {
    return t.type === css_what_1.SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some(function(data) {
      return data.some(includesScopePseudo);
    }));
  }
  var DESCENDANT_TOKEN = { type: css_what_1.SelectorType.Descendant };
  var FLEXIBLE_DESCENDANT_TOKEN = {
    type: "_flexibleDescendant"
  };
  var SCOPE_TOKEN = {
    type: css_what_1.SelectorType.Pseudo,
    name: "scope",
    data: null
  };
  function absolutize(token, _a, context) {
    var adapter = _a.adapter;
    var hasContext = !!(context === null || context === undefined ? undefined : context.every(function(e) {
      var parent = adapter.isTag(e) && adapter.getParent(e);
      return e === subselects_js_1.PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
    }));
    for (var _i = 0, token_1 = token;_i < token_1.length; _i++) {
      var t = token_1[_i];
      if (t.length > 0 && (0, sort_js_1.isTraversal)(t[0]) && t[0].type !== css_what_1.SelectorType.Descendant) {
      } else if (hasContext && !t.some(includesScopePseudo)) {
        t.unshift(DESCENDANT_TOKEN);
      } else {
        continue;
      }
      t.unshift(SCOPE_TOKEN);
    }
  }
  function compileToken(token, options, context) {
    var _a;
    token.forEach(sort_js_1.default);
    context = (_a = options.context) !== null && _a !== undefined ? _a : context;
    var isArrayContext = Array.isArray(context);
    var finalContext = context && (Array.isArray(context) ? context : [context]);
    if (options.relativeSelector !== false) {
      absolutize(token, options, finalContext);
    } else if (token.some(function(t) {
      return t.length > 0 && (0, sort_js_1.isTraversal)(t[0]);
    })) {
      throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    }
    var shouldTestNextSiblings = false;
    var query = token.map(function(rules) {
      if (rules.length >= 2) {
        var first = rules[0], second = rules[1];
        if (first.type !== css_what_1.SelectorType.Pseudo || first.name !== "scope") {
        } else if (isArrayContext && second.type === css_what_1.SelectorType.Descendant) {
          rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
        } else if (second.type === css_what_1.SelectorType.Adjacent || second.type === css_what_1.SelectorType.Sibling) {
          shouldTestNextSiblings = true;
        }
      }
      return compileRules(rules, options, finalContext);
    }).reduce(reduceRules, boolbase_1.default.falseFunc);
    query.shouldTestNextSiblings = shouldTestNextSiblings;
    return query;
  }
  exports2.compileToken = compileToken;
  function compileRules(rules, options, context) {
    var _a;
    return rules.reduce(function(previous, rule) {
      return previous === boolbase_1.default.falseFunc ? boolbase_1.default.falseFunc : (0, general_js_1.compileGeneralSelector)(previous, rule, options, context, compileToken);
    }, (_a = options.rootFunc) !== null && _a !== undefined ? _a : boolbase_1.default.trueFunc);
  }
  function reduceRules(a, b) {
    if (b === boolbase_1.default.falseFunc || a === boolbase_1.default.trueFunc) {
      return a;
    }
    if (a === boolbase_1.default.falseFunc || b === boolbase_1.default.trueFunc) {
      return b;
    }
    return function combine(elem) {
      return a(elem) || b(elem);
    };
  }
});

// node_modules/css-select/lib/index.js
var require_lib7 = __commonJS((exports2) => {
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
  var __setModuleDefault = exports2 && exports2.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.aliases = exports2.pseudos = exports2.filters = exports2.is = exports2.selectOne = exports2.selectAll = exports2.prepareContext = exports2._compileToken = exports2._compileUnsafe = exports2.compile = undefined;
  var DomUtils = __importStar(require_lib5());
  var boolbase_1 = __importDefault(require_boolbase());
  var compile_js_1 = require_compile2();
  var subselects_js_1 = require_subselects();
  var defaultEquals = function(a, b) {
    return a === b;
  };
  var defaultOptions = {
    adapter: DomUtils,
    equals: defaultEquals
  };
  function convertOptionFormats(options) {
    var _a, _b, _c, _d;
    var opts = options !== null && options !== undefined ? options : defaultOptions;
    (_a = opts.adapter) !== null && _a !== undefined || (opts.adapter = DomUtils);
    (_b = opts.equals) !== null && _b !== undefined || (opts.equals = (_d = (_c = opts.adapter) === null || _c === undefined ? undefined : _c.equals) !== null && _d !== undefined ? _d : defaultEquals);
    return opts;
  }
  function wrapCompile(func) {
    return function addAdapter(selector, options, context) {
      var opts = convertOptionFormats(options);
      return func(selector, opts, context);
    };
  }
  exports2.compile = wrapCompile(compile_js_1.compile);
  exports2._compileUnsafe = wrapCompile(compile_js_1.compileUnsafe);
  exports2._compileToken = wrapCompile(compile_js_1.compileToken);
  function getSelectorFunc(searchFunc) {
    return function select(query, elements, options) {
      var opts = convertOptionFormats(options);
      if (typeof query !== "function") {
        query = (0, compile_js_1.compileUnsafe)(query, opts, elements);
      }
      var filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
      return searchFunc(query, filteredElements, opts);
    };
  }
  function prepareContext(elems, adapter, shouldTestNextSiblings) {
    if (shouldTestNextSiblings === undefined) {
      shouldTestNextSiblings = false;
    }
    if (shouldTestNextSiblings) {
      elems = appendNextSiblings(elems, adapter);
    }
    return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
  }
  exports2.prepareContext = prepareContext;
  function appendNextSiblings(elem, adapter) {
    var elems = Array.isArray(elem) ? elem.slice(0) : [elem];
    var elemsLength = elems.length;
    for (var i = 0;i < elemsLength; i++) {
      var nextSiblings = (0, subselects_js_1.getNextSiblings)(elems[i], adapter);
      elems.push.apply(elems, nextSiblings);
    }
    return elems;
  }
  exports2.selectAll = getSelectorFunc(function(query, elems, options) {
    return query === boolbase_1.default.falseFunc || !elems || elems.length === 0 ? [] : options.adapter.findAll(query, elems);
  });
  exports2.selectOne = getSelectorFunc(function(query, elems, options) {
    return query === boolbase_1.default.falseFunc || !elems || elems.length === 0 ? null : options.adapter.findOne(query, elems);
  });
  function is(elem, query, options) {
    var opts = convertOptionFormats(options);
    return (typeof query === "function" ? query : (0, compile_js_1.compile)(query, opts))(elem);
  }
  exports2.is = is;
  exports2.default = exports2.selectAll;
  var index_js_1 = require_pseudo_selectors();
  Object.defineProperty(exports2, "filters", { enumerable: true, get: function() {
    return index_js_1.filters;
  } });
  Object.defineProperty(exports2, "pseudos", { enumerable: true, get: function() {
    return index_js_1.pseudos;
  } });
  Object.defineProperty(exports2, "aliases", { enumerable: true, get: function() {
    return index_js_1.aliases;
  } });
});

// node_modules/node-html-parser/dist/back.js
var require_back = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  function arr_back(arr) {
    return arr[arr.length - 1];
  }
  exports2.default = arr_back;
});

// node_modules/node-html-parser/dist/matcher.js
var require_matcher2 = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  var type_1 = __importDefault(require_type());
  function isTag(node) {
    return node && node.nodeType === type_1.default.ELEMENT_NODE;
  }
  function getAttributeValue(elem, name) {
    return isTag(elem) ? elem.getAttribute(name) : undefined;
  }
  function getName(elem) {
    return (elem && elem.rawTagName || "").toLowerCase();
  }
  function getChildren(node) {
    return node && node.childNodes;
  }
  function getParent(node) {
    return node ? node.parentNode : null;
  }
  function getText(node) {
    return node.text;
  }
  function removeSubsets(nodes) {
    let idx = nodes.length;
    let node;
    let ancestor;
    let replace;
    while (--idx > -1) {
      node = ancestor = nodes[idx];
      nodes[idx] = null;
      replace = true;
      while (ancestor) {
        if (nodes.indexOf(ancestor) > -1) {
          replace = false;
          nodes.splice(idx, 1);
          break;
        }
        ancestor = getParent(ancestor);
      }
      if (replace) {
        nodes[idx] = node;
      }
    }
    return nodes;
  }
  function existsOne(test, elems) {
    return elems.some((elem) => {
      return isTag(elem) ? test(elem) || existsOne(test, getChildren(elem)) : false;
    });
  }
  function getSiblings(node) {
    const parent = getParent(node);
    return parent ? getChildren(parent) : [];
  }
  function hasAttrib(elem, name) {
    return getAttributeValue(elem, name) !== undefined;
  }
  function findOne(test, elems) {
    let elem = null;
    for (let i = 0, l = elems === null || elems === undefined ? undefined : elems.length;i < l && !elem; i++) {
      const el = elems[i];
      if (test(el)) {
        elem = el;
      } else {
        const childs = getChildren(el);
        if (childs && childs.length > 0) {
          elem = findOne(test, childs);
        }
      }
    }
    return elem;
  }
  function findAll(test, nodes) {
    let result = [];
    for (let i = 0, j = nodes.length;i < j; i++) {
      if (!isTag(nodes[i]))
        continue;
      if (test(nodes[i]))
        result.push(nodes[i]);
      const childs = getChildren(nodes[i]);
      if (childs)
        result = result.concat(findAll(test, childs));
    }
    return result;
  }
  exports2.default = {
    isTag,
    getAttributeValue,
    getName,
    getChildren,
    getParent,
    getText,
    removeSubsets,
    existsOne,
    getSiblings,
    hasAttrib,
    findOne,
    findAll
  };
});

// node_modules/node-html-parser/dist/void-tag.js
var require_void_tag = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });

  class VoidTag {
    constructor(addClosingSlash = false, tags) {
      this.addClosingSlash = addClosingSlash;
      if (Array.isArray(tags)) {
        this.voidTags = tags.reduce((set, tag) => {
          return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
        }, new Set);
      } else {
        this.voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"].reduce((set, tag) => {
          return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
        }, new Set);
      }
    }
    formatNode(tag, attrs, innerHTML) {
      const addClosingSlash = this.addClosingSlash;
      const closingSpace = addClosingSlash && attrs && !attrs.endsWith(" ") ? " " : "";
      const closingSlash = addClosingSlash ? `${closingSpace}/` : "";
      return this.isVoidElement(tag.toLowerCase()) ? `<${tag}${attrs}${closingSlash}>` : `<${tag}${attrs}>${innerHTML}</${tag}>`;
    }
    isVoidElement(tag) {
      return this.voidTags.has(tag);
    }
  }
  exports2.default = VoidTag;
});

// node_modules/node-html-parser/dist/nodes/text.js
var require_text = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  var he_1 = require_he();
  var node_1 = __importDefault(require_node());
  var type_1 = __importDefault(require_type());

  class TextNode extends node_1.default {
    clone() {
      return new TextNode(this._rawText, null);
    }
    constructor(rawText, parentNode = null, range) {
      super(parentNode, range);
      this.nodeType = type_1.default.TEXT_NODE;
      this.rawTagName = "";
      this._rawText = rawText;
    }
    get rawText() {
      return this._rawText;
    }
    set rawText(text) {
      this._rawText = text;
      this._trimmedRawText = undefined;
      this._trimmedText = undefined;
    }
    get trimmedRawText() {
      if (this._trimmedRawText !== undefined)
        return this._trimmedRawText;
      this._trimmedRawText = trimText(this.rawText);
      return this._trimmedRawText;
    }
    get trimmedText() {
      if (this._trimmedText !== undefined)
        return this._trimmedText;
      this._trimmedText = trimText(this.text);
      return this._trimmedText;
    }
    get text() {
      return (0, he_1.decode)(this.rawText);
    }
    get isWhitespace() {
      return /^(\s|&nbsp;)*$/.test(this.rawText);
    }
    toString() {
      return this.rawText;
    }
  }
  exports2.default = TextNode;
  function trimText(text) {
    let i = 0;
    let startPos;
    let endPos;
    while (i >= 0 && i < text.length) {
      if (/\S/.test(text[i])) {
        if (startPos === undefined) {
          startPos = i;
          i = text.length;
        } else {
          endPos = i;
          i = undefined;
        }
      }
      if (startPos === undefined)
        i++;
      else
        i--;
    }
    if (startPos === undefined)
      startPos = 0;
    if (endPos === undefined)
      endPos = text.length - 1;
    const hasLeadingSpace = startPos > 0 && /[^\S\r\n]/.test(text[startPos - 1]);
    const hasTrailingSpace = endPos < text.length - 1 && /[^\S\r\n]/.test(text[endPos + 1]);
    return (hasLeadingSpace ? " " : "") + text.slice(startPos, endPos + 1) + (hasTrailingSpace ? " " : "");
  }
});

// node_modules/node-html-parser/dist/nodes/html.js
var require_html = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.parse = exports2.base_parse = undefined;
  var css_select_1 = require_lib7();
  var he_1 = __importDefault(require_he());
  var back_1 = __importDefault(require_back());
  var matcher_1 = __importDefault(require_matcher2());
  var void_tag_1 = __importDefault(require_void_tag());
  var comment_1 = __importDefault(require_comment());
  var node_1 = __importDefault(require_node());
  var text_1 = __importDefault(require_text());
  var type_1 = __importDefault(require_type());
  function decode(val) {
    return JSON.parse(JSON.stringify(he_1.default.decode(val)));
  }
  var Htags = ["h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup"];
  var Dtags = ["details", "dialog", "dd", "div", "dt"];
  var Ftags = ["fieldset", "figcaption", "figure", "footer", "form"];
  var tableTags = ["table", "td", "tr"];
  var htmlTags = ["address", "article", "aside", "blockquote", "br", "hr", "li", "main", "nav", "ol", "p", "pre", "section", "ul"];
  var kBlockElements = new Set;
  function addToKBlockElement(...args) {
    const addToSet = (array) => {
      for (let index = 0;index < array.length; index++) {
        const element = array[index];
        kBlockElements.add(element);
        kBlockElements.add(element.toUpperCase());
      }
    };
    for (const arg of args)
      addToSet(arg);
  }
  addToKBlockElement(Htags, Dtags, Ftags, tableTags, htmlTags);

  class DOMTokenList {
    _validate(c2) {
      if (/\s/.test(c2)) {
        throw new Error(`DOMException in DOMTokenList.add: The token '${c2}' contains HTML space characters, which are not valid in tokens.`);
      }
    }
    constructor(valuesInit = [], afterUpdate = () => null) {
      this._set = new Set(valuesInit);
      this._afterUpdate = afterUpdate;
    }
    add(c2) {
      this._validate(c2);
      this._set.add(c2);
      this._afterUpdate(this);
    }
    replace(c1, c2) {
      this._validate(c2);
      this._set.delete(c1);
      this._set.add(c2);
      this._afterUpdate(this);
    }
    remove(c2) {
      this._set.delete(c2) && this._afterUpdate(this);
    }
    toggle(c2) {
      this._validate(c2);
      if (this._set.has(c2))
        this._set.delete(c2);
      else
        this._set.add(c2);
      this._afterUpdate(this);
    }
    contains(c2) {
      return this._set.has(c2);
    }
    get length() {
      return this._set.size;
    }
    values() {
      return this._set.values();
    }
    get value() {
      return Array.from(this._set.values());
    }
    toString() {
      return Array.from(this._set.values()).join(" ");
    }
  }

  class HTMLElement extends node_1.default {
    quoteAttribute(attr) {
      if (attr == null) {
        return "null";
      }
      return JSON.stringify(attr.replace(/"/g, "&quot;")).replace(/\\t/g, "\t").replace(/\\n/g, `
`).replace(/\\r/g, "\r").replace(/\\/g, "");
    }
    constructor(tagName, keyAttrs, rawAttrs = "", parentNode = null, range, voidTag = new void_tag_1.default, _parseOptions = {}) {
      super(parentNode, range);
      this.rawAttrs = rawAttrs;
      this.voidTag = voidTag;
      this.nodeType = type_1.default.ELEMENT_NODE;
      this.rawTagName = tagName;
      this.rawAttrs = rawAttrs || "";
      this.id = keyAttrs.id || "";
      this.childNodes = [];
      this._parseOptions = _parseOptions;
      this.classList = new DOMTokenList(keyAttrs.class ? keyAttrs.class.split(/\s+/) : [], (classList) => this.setAttribute("class", classList.toString()));
      if (keyAttrs.id) {
        if (!rawAttrs) {
          this.rawAttrs = `id="${keyAttrs.id}"`;
        }
      }
      if (keyAttrs.class) {
        if (!rawAttrs) {
          const cls = `class="${this.classList.toString()}"`;
          if (this.rawAttrs) {
            this.rawAttrs += ` ${cls}`;
          } else {
            this.rawAttrs = cls;
          }
        }
      }
    }
    removeChild(node) {
      this.childNodes = this.childNodes.filter((child) => {
        return child !== node;
      });
      return this;
    }
    exchangeChild(oldNode, newNode) {
      const children = this.childNodes;
      this.childNodes = children.map((child) => {
        if (child === oldNode) {
          return newNode;
        }
        return child;
      });
      return this;
    }
    get tagName() {
      return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
    }
    set tagName(newname) {
      this.rawTagName = newname.toLowerCase();
    }
    get localName() {
      return this.rawTagName.toLowerCase();
    }
    get isVoidElement() {
      return this.voidTag.isVoidElement(this.localName);
    }
    get rawText() {
      if (/^br$/i.test(this.rawTagName)) {
        return `
`;
      }
      return this.childNodes.reduce((pre, cur) => {
        return pre += cur.rawText;
      }, "");
    }
    get textContent() {
      return decode(this.rawText);
    }
    set textContent(val) {
      const content = [new text_1.default(val, this)];
      this.childNodes = content;
    }
    get text() {
      return decode(this.rawText);
    }
    get structuredText() {
      let currentBlock = [];
      const blocks = [currentBlock];
      function dfs(node) {
        if (node.nodeType === type_1.default.ELEMENT_NODE) {
          if (kBlockElements.has(node.rawTagName)) {
            if (currentBlock.length > 0) {
              blocks.push(currentBlock = []);
            }
            node.childNodes.forEach(dfs);
            if (currentBlock.length > 0) {
              blocks.push(currentBlock = []);
            }
          } else {
            node.childNodes.forEach(dfs);
          }
        } else if (node.nodeType === type_1.default.TEXT_NODE) {
          if (node.isWhitespace) {
            currentBlock.prependWhitespace = true;
          } else {
            let text = node.trimmedText;
            if (currentBlock.prependWhitespace) {
              text = ` ${text}`;
              currentBlock.prependWhitespace = false;
            }
            currentBlock.push(text);
          }
        }
      }
      dfs(this);
      return blocks.map((block) => {
        return block.join("").replace(/\s{2,}/g, " ");
      }).join(`
`).replace(/\s+$/, "");
    }
    toString() {
      const tag = this.rawTagName;
      if (tag) {
        const attrs = this.rawAttrs ? ` ${this.rawAttrs}` : "";
        return this.voidTag.formatNode(tag, attrs, this.innerHTML);
      }
      return this.innerHTML;
    }
    get innerHTML() {
      return this.childNodes.map((child) => {
        return child.toString();
      }).join("");
    }
    set innerHTML(content) {
      const r = parse(content, this._parseOptions);
      const nodes = r.childNodes.length ? r.childNodes : [new text_1.default(content, this)];
      resetParent(nodes, this);
      resetParent(this.childNodes, null);
      this.childNodes = nodes;
    }
    set_content(content, options = {}) {
      if (content instanceof node_1.default) {
        content = [content];
      } else if (typeof content == "string") {
        options = Object.assign(Object.assign({}, this._parseOptions), options);
        const r = parse(content, options);
        content = r.childNodes.length ? r.childNodes : [new text_1.default(r.innerHTML, this)];
      }
      resetParent(this.childNodes, null);
      resetParent(content, this);
      this.childNodes = content;
      return this;
    }
    replaceWith(...nodes) {
      const parent = this.parentNode;
      const content = nodes.map((node) => {
        if (node instanceof node_1.default) {
          return [node];
        } else if (typeof node == "string") {
          const r = parse(node, this._parseOptions);
          return r.childNodes.length ? r.childNodes : [new text_1.default(node, this)];
        }
        return [];
      }).flat();
      const idx = parent.childNodes.findIndex((child) => {
        return child === this;
      });
      resetParent([this], null);
      parent.childNodes = [...parent.childNodes.slice(0, idx), ...resetParent(content, parent), ...parent.childNodes.slice(idx + 1)];
      return this;
    }
    get outerHTML() {
      return this.toString();
    }
    trimRight(pattern) {
      for (let i = 0;i < this.childNodes.length; i++) {
        const childNode = this.childNodes[i];
        if (childNode.nodeType === type_1.default.ELEMENT_NODE) {
          childNode.trimRight(pattern);
        } else {
          const index = childNode.rawText.search(pattern);
          if (index > -1) {
            childNode.rawText = childNode.rawText.substr(0, index);
            this.childNodes.length = i + 1;
          }
        }
      }
      return this;
    }
    get structure() {
      const res = [];
      let indention = 0;
      function write(str) {
        res.push("  ".repeat(indention) + str);
      }
      function dfs(node) {
        const idStr = node.id ? `#${node.id}` : "";
        const classStr = node.classList.length ? `.${node.classList.value.join(".")}` : "";
        write(`${node.rawTagName}${idStr}${classStr}`);
        indention++;
        node.childNodes.forEach((childNode) => {
          if (childNode.nodeType === type_1.default.ELEMENT_NODE) {
            dfs(childNode);
          } else if (childNode.nodeType === type_1.default.TEXT_NODE) {
            if (!childNode.isWhitespace) {
              write("#text");
            }
          }
        });
        indention--;
      }
      dfs(this);
      return res.join(`
`);
    }
    removeWhitespace() {
      let o = 0;
      this.childNodes.forEach((node) => {
        if (node.nodeType === type_1.default.TEXT_NODE) {
          if (node.isWhitespace) {
            return;
          }
          node.rawText = node.trimmedRawText;
        } else if (node.nodeType === type_1.default.ELEMENT_NODE) {
          node.removeWhitespace();
        }
        this.childNodes[o++] = node;
      });
      this.childNodes.length = o;
      const attrs = Object.keys(this.rawAttributes).map((key) => {
        const val = this.rawAttributes[key];
        return `${key}=${JSON.stringify(val)}`;
      }).join(" ");
      this.rawAttrs = attrs;
      delete this._rawAttrs;
      return this;
    }
    querySelectorAll(selector) {
      return (0, css_select_1.selectAll)(selector, this, {
        xmlMode: true,
        adapter: matcher_1.default
      });
    }
    querySelector(selector) {
      return (0, css_select_1.selectOne)(selector, this, {
        xmlMode: true,
        adapter: matcher_1.default
      });
    }
    getElementsByTagName(tagName) {
      const upperCasedTagName = tagName.toUpperCase();
      const re = [];
      const stack = [];
      let currentNodeReference = this;
      let index = 0;
      while (index !== undefined) {
        let child;
        do {
          child = currentNodeReference.childNodes[index++];
        } while (index < currentNodeReference.childNodes.length && child === undefined);
        if (child === undefined) {
          currentNodeReference = currentNodeReference.parentNode;
          index = stack.pop();
          continue;
        }
        if (child.nodeType === type_1.default.ELEMENT_NODE) {
          if (tagName === "*" || child.tagName === upperCasedTagName)
            re.push(child);
          if (child.childNodes.length > 0) {
            stack.push(index);
            currentNodeReference = child;
            index = 0;
          }
        }
      }
      return re;
    }
    getElementById(id) {
      const stack = [];
      let currentNodeReference = this;
      let index = 0;
      while (index !== undefined) {
        let child;
        do {
          child = currentNodeReference.childNodes[index++];
        } while (index < currentNodeReference.childNodes.length && child === undefined);
        if (child === undefined) {
          currentNodeReference = currentNodeReference.parentNode;
          index = stack.pop();
          continue;
        }
        if (child.nodeType === type_1.default.ELEMENT_NODE) {
          if (child.id === id) {
            return child;
          }
          if (child.childNodes.length > 0) {
            stack.push(index);
            currentNodeReference = child;
            index = 0;
          }
        }
      }
      return null;
    }
    closest(selector) {
      const mapChild = new Map;
      let el = this;
      let old = null;
      function findOne(test, elems) {
        let elem = null;
        for (let i = 0, l = elems.length;i < l && !elem; i++) {
          const el2 = elems[i];
          if (test(el2)) {
            elem = el2;
          } else {
            const child = mapChild.get(el2);
            if (child) {
              elem = findOne(test, [child]);
            }
          }
        }
        return elem;
      }
      while (el) {
        mapChild.set(el, old);
        old = el;
        el = el.parentNode;
      }
      el = this;
      while (el) {
        const e = (0, css_select_1.selectOne)(selector, el, {
          xmlMode: true,
          adapter: Object.assign(Object.assign({}, matcher_1.default), {
            getChildren(node) {
              const child = mapChild.get(node);
              return child && [child];
            },
            getSiblings(node) {
              return [node];
            },
            findOne,
            findAll() {
              return [];
            }
          })
        });
        if (e) {
          return e;
        }
        el = el.parentNode;
      }
      return null;
    }
    appendChild(node) {
      this.append(node);
      return node;
    }
    get attrs() {
      if (this._attrs) {
        return this._attrs;
      }
      this._attrs = {};
      const attrs = this.rawAttributes;
      for (const key in attrs) {
        const val = attrs[key] || "";
        this._attrs[key.toLowerCase()] = decode(val);
      }
      return this._attrs;
    }
    get attributes() {
      const ret_attrs = {};
      const attrs = this.rawAttributes;
      for (const key in attrs) {
        const val = attrs[key] || "";
        ret_attrs[key] = decode(val);
      }
      return ret_attrs;
    }
    get rawAttributes() {
      if (this._rawAttrs) {
        return this._rawAttrs;
      }
      const attrs = {};
      if (this.rawAttrs) {
        const re = /([a-zA-Z()[\]#@$.?:][a-zA-Z0-9-._:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
        let match;
        while (match = re.exec(this.rawAttrs)) {
          const key = match[1];
          let val = match[2] || null;
          if (val && (val[0] === `'` || val[0] === `"`))
            val = val.slice(1, val.length - 1);
          attrs[key] = attrs[key] || val;
        }
      }
      this._rawAttrs = attrs;
      return attrs;
    }
    removeAttribute(key) {
      const attrs = this.rawAttributes;
      delete attrs[key];
      if (this._attrs) {
        delete this._attrs[key];
      }
      this.rawAttrs = Object.keys(attrs).map((name) => {
        const val = this.quoteAttribute(attrs[name]);
        if (val === "null" || val === '""')
          return name;
        return `${name}=${val}`;
      }).join(" ");
      if (key === "id") {
        this.id = "";
      }
      return this;
    }
    hasAttribute(key) {
      return key.toLowerCase() in this.attrs;
    }
    getAttribute(key) {
      return this.attrs[key.toLowerCase()];
    }
    setAttribute(key, value) {
      if (arguments.length < 2) {
        throw new Error("Failed to execute 'setAttribute' on 'Element'");
      }
      const k2 = key.toLowerCase();
      const attrs = this.rawAttributes;
      for (const k in attrs) {
        if (k.toLowerCase() === k2) {
          key = k;
          break;
        }
      }
      attrs[key] = String(value);
      if (this._attrs) {
        this._attrs[k2] = decode(attrs[key]);
      }
      this.rawAttrs = Object.keys(attrs).map((name) => {
        const val = this.quoteAttribute(attrs[name]);
        if (val === "null" || val === '""')
          return name;
        return `${name}=${val}`;
      }).join(" ");
      if (key === "id") {
        this.id = value;
      }
      return this;
    }
    setAttributes(attributes) {
      if (this._attrs) {
        delete this._attrs;
      }
      if (this._rawAttrs) {
        delete this._rawAttrs;
      }
      this.rawAttrs = Object.keys(attributes).map((name) => {
        const val = attributes[name];
        if (val === "null" || val === '""')
          return name;
        return `${name}=${this.quoteAttribute(String(val))}`;
      }).join(" ");
      return this;
    }
    insertAdjacentHTML(where, html) {
      if (arguments.length < 2) {
        throw new Error("2 arguments required");
      }
      const p = parse(html, this._parseOptions);
      if (where === "afterend") {
        this.after(...p.childNodes);
      } else if (where === "afterbegin") {
        this.prepend(...p.childNodes);
      } else if (where === "beforeend") {
        this.append(...p.childNodes);
      } else if (where === "beforebegin") {
        this.before(...p.childNodes);
      } else {
        throw new Error(`The value provided ('${where}') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'`);
      }
      return this;
    }
    prepend(...insertable) {
      const nodes = resolveInsertable(insertable);
      resetParent(nodes, this);
      this.childNodes.unshift(...nodes);
    }
    append(...insertable) {
      const nodes = resolveInsertable(insertable);
      resetParent(nodes, this);
      this.childNodes.push(...nodes);
    }
    before(...insertable) {
      const nodes = resolveInsertable(insertable);
      const siblings = this.parentNode.childNodes;
      resetParent(nodes, this.parentNode);
      siblings.splice(siblings.indexOf(this), 0, ...nodes);
    }
    after(...insertable) {
      const nodes = resolveInsertable(insertable);
      const siblings = this.parentNode.childNodes;
      resetParent(nodes, this.parentNode);
      siblings.splice(siblings.indexOf(this) + 1, 0, ...nodes);
    }
    get nextSibling() {
      if (this.parentNode) {
        const children = this.parentNode.childNodes;
        let i = 0;
        while (i < children.length) {
          const child = children[i++];
          if (this === child)
            return children[i] || null;
        }
        return null;
      }
    }
    get nextElementSibling() {
      if (this.parentNode) {
        const children = this.parentNode.childNodes;
        let i = 0;
        let find = false;
        while (i < children.length) {
          const child = children[i++];
          if (find) {
            if (child instanceof HTMLElement) {
              return child || null;
            }
          } else if (this === child) {
            find = true;
          }
        }
        return null;
      }
    }
    get previousSibling() {
      if (this.parentNode) {
        const children = this.parentNode.childNodes;
        let i = children.length;
        while (i > 0) {
          const child = children[--i];
          if (this === child)
            return children[i - 1] || null;
        }
        return null;
      }
    }
    get previousElementSibling() {
      if (this.parentNode) {
        const children = this.parentNode.childNodes;
        let i = children.length;
        let find = false;
        while (i > 0) {
          const child = children[--i];
          if (find) {
            if (child instanceof HTMLElement) {
              return child || null;
            }
          } else if (this === child) {
            find = true;
          }
        }
        return null;
      }
    }
    get children() {
      const children = [];
      for (const childNode of this.childNodes) {
        if (childNode instanceof HTMLElement) {
          children.push(childNode);
        }
      }
      return children;
    }
    get firstChild() {
      return this.childNodes[0];
    }
    get firstElementChild() {
      return this.children[0];
    }
    get lastChild() {
      return (0, back_1.default)(this.childNodes);
    }
    get lastElementChild() {
      return this.children[this.children.length - 1];
    }
    get childElementCount() {
      return this.children.length;
    }
    get classNames() {
      return this.classList.toString();
    }
    clone() {
      return parse(this.toString(), this._parseOptions).firstChild;
    }
  }
  exports2.default = HTMLElement;
  var kMarkupPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z@\xB7\xC0-\xD6\xD8-\xF6\u00F8-\u03A1\u03A3-\u03D9\u03DB-\u03EF\u03F7-\u03FF\u0400-\u04FF\u0500-\u052F\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1E9B\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64-\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\x37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/gu;
  var kAttributePattern = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi;
  var kElementsClosedByOpening = {
    li: { li: true, LI: true },
    LI: { li: true, LI: true },
    p: { p: true, div: true, P: true, DIV: true },
    P: { p: true, div: true, P: true, DIV: true },
    b: { div: true, DIV: true },
    B: { div: true, DIV: true },
    td: { td: true, th: true, TD: true, TH: true },
    TD: { td: true, th: true, TD: true, TH: true },
    th: { td: true, th: true, TD: true, TH: true },
    TH: { td: true, th: true, TD: true, TH: true },
    h1: { h1: true, H1: true },
    H1: { h1: true, H1: true },
    h2: { h2: true, H2: true },
    H2: { h2: true, H2: true },
    h3: { h3: true, H3: true },
    H3: { h3: true, H3: true },
    h4: { h4: true, H4: true },
    H4: { h4: true, H4: true },
    h5: { h5: true, H5: true },
    H5: { h5: true, H5: true },
    h6: { h6: true, H6: true },
    H6: { h6: true, H6: true }
  };
  var kElementsClosedByClosing = {
    li: { ul: true, ol: true, UL: true, OL: true },
    LI: { ul: true, ol: true, UL: true, OL: true },
    a: { div: true, DIV: true },
    A: { div: true, DIV: true },
    b: { div: true, DIV: true },
    B: { div: true, DIV: true },
    i: { div: true, DIV: true },
    I: { div: true, DIV: true },
    p: { div: true, DIV: true },
    P: { div: true, DIV: true },
    td: { tr: true, table: true, TR: true, TABLE: true },
    TD: { tr: true, table: true, TR: true, TABLE: true },
    th: { tr: true, table: true, TR: true, TABLE: true },
    TH: { tr: true, table: true, TR: true, TABLE: true }
  };
  var frameflag = "documentfragmentcontainer";
  function base_parse(data, options = {}) {
    var _a, _b;
    const voidTag = new void_tag_1.default((_a = options === null || options === undefined ? undefined : options.voidTag) === null || _a === undefined ? undefined : _a.closingSlash, (_b = options === null || options === undefined ? undefined : options.voidTag) === null || _b === undefined ? undefined : _b.tags);
    const elements = options.blockTextElements || {
      script: true,
      noscript: true,
      style: true,
      pre: true
    };
    const element_names = Object.keys(elements);
    const kBlockTextElements = element_names.map((it) => new RegExp(`^${it}$`, "i"));
    const kIgnoreElements = element_names.filter((it) => Boolean(elements[it])).map((it) => new RegExp(`^${it}$`, "i"));
    function element_should_be_ignore(tag) {
      return kIgnoreElements.some((it) => it.test(tag));
    }
    function is_block_text_element(tag) {
      return kBlockTextElements.some((it) => it.test(tag));
    }
    const createRange = (startPos, endPos) => [startPos - frameFlagOffset, endPos - frameFlagOffset];
    const root = new HTMLElement(null, {}, "", null, [0, data.length], voidTag, options);
    let currentParent = root;
    const stack = [root];
    let lastTextPos = -1;
    let noNestedTagIndex = undefined;
    let match;
    data = `<${frameflag}>${data}</${frameflag}>`;
    const { lowerCaseTagName, fixNestedATags } = options;
    const dataEndPos = data.length - (frameflag.length + 2);
    const frameFlagOffset = frameflag.length + 2;
    while (match = kMarkupPattern.exec(data)) {
      let { 0: matchText, 1: leadingSlash, 2: tagName, 3: attributes, 4: closingSlash } = match;
      const matchLength = matchText.length;
      const tagStartPos = kMarkupPattern.lastIndex - matchLength;
      const tagEndPos = kMarkupPattern.lastIndex;
      if (lastTextPos > -1) {
        if (lastTextPos + matchLength < tagEndPos) {
          const text = data.substring(lastTextPos, tagStartPos);
          currentParent.appendChild(new text_1.default(text, currentParent, createRange(lastTextPos, tagStartPos)));
        }
      }
      lastTextPos = kMarkupPattern.lastIndex;
      if (tagName === frameflag)
        continue;
      if (matchText[1] === "!") {
        if (options.comment) {
          const text = data.substring(tagStartPos + 4, tagEndPos - 3);
          currentParent.appendChild(new comment_1.default(text, currentParent, createRange(tagStartPos, tagEndPos)));
        }
        continue;
      }
      if (lowerCaseTagName)
        tagName = tagName.toLowerCase();
      if (!leadingSlash) {
        const attrs = {};
        for (let attMatch;attMatch = kAttributePattern.exec(attributes); ) {
          const { 1: key, 2: val } = attMatch;
          const isQuoted = val[0] === `'` || val[0] === `"`;
          attrs[key.toLowerCase()] = isQuoted ? val.slice(1, val.length - 1) : val;
        }
        const parentTagName = currentParent.rawTagName;
        if (!closingSlash && kElementsClosedByOpening[parentTagName]) {
          if (kElementsClosedByOpening[parentTagName][tagName]) {
            stack.pop();
            currentParent = (0, back_1.default)(stack);
          }
        }
        if (fixNestedATags && (tagName === "a" || tagName === "A")) {
          if (noNestedTagIndex !== undefined) {
            stack.splice(noNestedTagIndex);
            currentParent = (0, back_1.default)(stack);
          }
          noNestedTagIndex = stack.length;
        }
        const tagEndPos2 = kMarkupPattern.lastIndex;
        const tagStartPos2 = tagEndPos2 - matchLength;
        currentParent = currentParent.appendChild(new HTMLElement(tagName, attrs, attributes.slice(1), null, createRange(tagStartPos2, tagEndPos2), voidTag, options));
        stack.push(currentParent);
        if (is_block_text_element(tagName)) {
          const closeMarkup = `</${tagName}>`;
          const closeIndex = lowerCaseTagName ? data.toLocaleLowerCase().indexOf(closeMarkup, kMarkupPattern.lastIndex) : data.indexOf(closeMarkup, kMarkupPattern.lastIndex);
          const textEndPos = closeIndex === -1 ? dataEndPos : closeIndex;
          if (element_should_be_ignore(tagName)) {
            const text = data.substring(tagEndPos2, textEndPos);
            if (text.length > 0 && /\S/.test(text)) {
              currentParent.appendChild(new text_1.default(text, currentParent, createRange(tagEndPos2, textEndPos)));
            }
          }
          if (closeIndex === -1) {
            lastTextPos = kMarkupPattern.lastIndex = data.length + 1;
          } else {
            lastTextPos = kMarkupPattern.lastIndex = closeIndex + closeMarkup.length;
            leadingSlash = "/";
          }
        }
      }
      if (leadingSlash || closingSlash || voidTag.isVoidElement(tagName)) {
        while (true) {
          if (noNestedTagIndex != null && (tagName === "a" || tagName === "A"))
            noNestedTagIndex = undefined;
          if (currentParent.rawTagName === tagName) {
            currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
            stack.pop();
            currentParent = (0, back_1.default)(stack);
            break;
          } else {
            const parentTagName = currentParent.tagName;
            if (kElementsClosedByClosing[parentTagName]) {
              if (kElementsClosedByClosing[parentTagName][tagName]) {
                stack.pop();
                currentParent = (0, back_1.default)(stack);
                continue;
              }
            }
            break;
          }
        }
      }
    }
    return stack;
  }
  exports2.base_parse = base_parse;
  function parse(data, options = {}) {
    const stack = base_parse(data, options);
    const [root] = stack;
    while (stack.length > 1) {
      const last = stack.pop();
      const oneBefore = (0, back_1.default)(stack);
      if (last.parentNode && last.parentNode.parentNode) {
        if (last.parentNode === oneBefore && last.tagName === oneBefore.tagName) {
          if (options.parseNoneClosedTags !== true) {
            oneBefore.removeChild(last);
            last.childNodes.forEach((child) => {
              oneBefore.parentNode.appendChild(child);
            });
            stack.pop();
          }
        } else {
          if (options.parseNoneClosedTags !== true) {
            oneBefore.removeChild(last);
            last.childNodes.forEach((child) => {
              oneBefore.appendChild(child);
            });
          }
        }
      } else {
      }
    }
    return root;
  }
  exports2.parse = parse;
  function resolveInsertable(insertable) {
    return insertable.map((val) => {
      if (typeof val === "string") {
        return new text_1.default(val);
      }
      val.remove();
      return val;
    });
  }
  function resetParent(nodes, parent) {
    return nodes.map((node) => {
      node.parentNode = parent;
      return node;
    });
  }
});

// node_modules/node-html-parser/dist/parse.js
var require_parse3 = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.default = undefined;
  var html_1 = require_html();
  Object.defineProperty(exports2, "default", { enumerable: true, get: function() {
    return html_1.parse;
  } });
});

// node_modules/node-html-parser/dist/valid.js
var require_valid = __commonJS((exports2) => {
  Object.defineProperty(exports2, "__esModule", { value: true });
  var html_1 = require_html();
  function valid(data, options = {}) {
    const stack = (0, html_1.base_parse)(data, options);
    return Boolean(stack.length === 1);
  }
  exports2.default = valid;
});

// node_modules/node-html-parser/dist/index.js
var require_dist = __commonJS((exports2) => {
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
  Object.defineProperty(exports2, "__esModule", { value: true });
  exports2.NodeType = exports2.TextNode = exports2.Node = exports2.valid = exports2.CommentNode = exports2.HTMLElement = exports2.parse = undefined;
  var comment_1 = __importDefault(require_comment());
  exports2.CommentNode = comment_1.default;
  var html_1 = __importDefault(require_html());
  exports2.HTMLElement = html_1.default;
  var node_1 = __importDefault(require_node());
  exports2.Node = node_1.default;
  var text_1 = __importDefault(require_text());
  exports2.TextNode = text_1.default;
  var type_1 = __importDefault(require_type());
  exports2.NodeType = type_1.default;
  var parse_1 = __importDefault(require_parse3());
  var valid_1 = __importDefault(require_valid());
  exports2.valid = valid_1.default;
  function parse(data, options = {}) {
    return (0, parse_1.default)(data, options);
  }
  exports2.default = parse;
  exports2.parse = parse;
  parse.parse = parse_1.default;
  parse.HTMLElement = html_1.default;
  parse.CommentNode = comment_1.default;
  parse.valid = valid_1.default;
  parse.Node = node_1.default;
  parse.TextNode = text_1.default;
  parse.NodeType = type_1.default;
});

// internal/main/init.ts
var exports_init = {};
__export(exports_init, {
  init: () => init3
});
module.exports = __toCommonJS(exports_init);
init_color();

// internal/utils/fs.ts
var import_fs = require("fs");
var import_fs_jetpack = __toESM(require_main());
var import_path = require("path");
var internal = Symbol("internal");
var fs = {
  exists(path) {
    try {
      const s = import_fs.statSync(this.path(path));
      return s.isDirectory() || s.isFile();
    } catch (e) {
    }
    return false;
  },
  path(path) {
    const all_prefix = this[internal].prefix;
    const prefix_key = Object.keys(all_prefix).find((e) => path.startsWith(e));
    const prefix_path = all_prefix[prefix_key];
    if (prefix_key && prefix_path) {
      return import_path.join(prefix_path, path.substring(prefix_key.length + 1));
    }
    return path;
  },
  async copy(from, to) {
    const from_dir = this.path(from);
    const to_path = this.path(to);
    const is_dir = import_fs.statSync(from_dir).isDirectory();
    if (is_dir && !this.exists(to)) {
      import_fs.mkdirSync(to_path, { recursive: true });
    } else {
      const to_dir = import_path.dirname(to_path);
      if (!fs.exists(to_dir)) {
        import_fs.mkdirSync(to_dir, { recursive: true });
      }
    }
    return await import_fs_jetpack.copyAsync(from_dir, to_path, { overwrite: true });
  },
  async modify(arg) {
    const as = arg.as || arg.path.endsWith(".json") ? "json" : "string";
    const content = await this.read(arg.path, as);
    const result = await arg.save(content);
    return await this.write(arg.path, result);
  },
  async read(path, as) {
    const file = Bun.file(this.path(path));
    if (as === "json") {
      return await file.json();
    }
    return await file.text();
  },
  async write(path, data, opt) {
    if (typeof data === "object" && opt?.mode !== "raw") {
      await import_fs_jetpack.writeAsync(this.path(path), JSON.stringify(data, null, 2));
    }
    await import_fs_jetpack.writeAsync(this.path(path), data);
  },
  init(paths) {
    this[internal].prefix.site = paths.site;
    this[internal].prefix.upload = paths.upload;
    this[internal].prefix.public = paths.public;
    this[internal].prefix.internal = import_path.join(process.cwd(), "internal");
  },
  [internal]: {
    prefix: {
      site: "",
      public: "",
      upload: "",
      internal: ""
    }
  }
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
    const self2 = this;
    return new Proxy({}, {
      get(_, property) {
        return self2.get(property);
      },
      set(_, property, value) {
        self2.set(property, value);
        return true;
      },
      has(_, property) {
        return self2.has(property);
      },
      deleteProperty(_, property) {
        self2.delete(property);
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
var import_fs_jetpack2 = __toESM(require_main());

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
var import_path2 = require("path");
init_dist();

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
  const internal2 = {
    indexPath: "",
    rescan_timeout: null,
    router: createRouter()
  };
  const static_file = {
    scanning: false,
    paths: new Set,
    root: path,
    async rescan(arg) {
    },
    exists(rpath, arg) {
      let pathname = rpath;
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      return findRoute(internal2.router, undefined, pathname);
    },
    serve: (ctx, arg) => {
      let pathname = ctx.url.pathname || "";
      if (arg?.prefix && pathname) {
        pathname = pathname.substring(arg.prefix.length);
      }
      const found = findRoute(internal2.router, undefined, pathname);
      if (found) {
        const { fullpath, mime } = found.data;
        if (import_fs_jetpack2.exists(fullpath)) {
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
        const { headers, content } = cachedResponse(ctx, internal2.indexPath, "text/html", store);
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
    if (path && await import_fs_jetpack2.existsAsync(path)) {
      if (static_file.paths.size > 0) {
        store.gz.delete([...static_file.paths]);
        store.zstd.delete([...static_file.paths]);
      }
      for await (const file of glob.scan(path)) {
        if (file === opt?.index)
          internal2.indexPath = import_path2.join(path, file);
        static_file.paths.add(import_path2.join(path, file));
        let type = src_default.getType(file);
        if (file.endsWith(".ts")) {
          type = "application/javascript";
        }
        addRoute(internal2.router, undefined, `/${file}`, {
          mime: type,
          path: file,
          fullpath: import_path2.join(path, file)
        });
      }
    }
    static_file.scanning = false;
  };
  await scan();
  static_file.rescan = (arg) => {
    return new Promise((resolve2) => {
      clearTimeout(internal2.rescan_timeout);
      internal2.rescan_timeout = setTimeout(async () => {
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

// internal/db/ensure-prisma.ts
var import_fs_jetpack3 = __toESM(require_main());
init_color();
init_log();
var ensurePrismaReady = async (config) => {
  if (config.orm !== "prisma") {
    dbLog("Warning: Current DB ORM is not prisma, but forced to use prisma");
    return;
  }
  const $ = Bun.$;
  const db = config;
  if (db.orm === "prisma") {
    const cwd = fs.path(`site:app/db`);
    const url = new URL(db.url);
    const host = `[${c.blue}${url.hostname}${c.esc}]`;
    const db_type = `[${c.red}${url.protocol.slice(0, -1).toUpperCase()}${c.esc}]`;
    process.env.DATABASE_URL = db.url;
    if (!fs.exists("site:app/db")) {
      dbLog(`Preparing PrismaDB ${db_type} on ${host} ${url.pathname}`);
      await import_fs_jetpack3.removeAsync(cwd);
      await import_fs_jetpack3.dirAsync(cwd);
      await $`bun init .`.cwd(cwd).quiet();
      await $`bun add prisma`.cwd(cwd).quiet();
      await $`bun prisma init`.cwd(cwd).quiet();
      dbLog(`PrismaDB created at ${cwd}`);
      await fs.write(`site:app/db/.env`, `DATABASE_URL=${db.url}`);
      await $`bun prisma db pull`.cwd(cwd).quiet().env({ DATABASE_URL: db.url });
      dbLog(`PrismaDB instrospected (db pull)`);
      await $`bun prisma generate`.cwd(cwd).quiet().env({ DATABASE_URL: db.url });
      dbLog(`PrismaDB ready`);
      await fs.write(`site:app/db/index.ts`, `import { PrismaClient } from "@prisma/client/extension";
export const db = new PrismaClient();
`);
    } else {
      await $`bun prisma generate`.cwd(cwd).quiet();
      dbLog(`PrismaDB Ready: ${db_type} on ${host} ${url.pathname}`);
    }
  }
};

// internal/db/init-db.ts
var initDB = async (db) => {
  if (db.orm === "prisma") {
    if (db.url) {
      try {
        await ensurePrismaReady(db);
      } catch (e) {
        if (e && e.stderr instanceof Buffer) {
          console.error(new TextDecoder().decode(e.stderr));
        } else {
          console.error(e);
        }
      }
    }
  }
};

// internal/main/handler/http-handler.ts
var import_path5 = require("path");
init_route_api();

// internal/main/handler/route-index.ts
var import_fs3 = require("fs");
var import_node_html_parser = __toESM(require_dist());
var import_path4 = require("path");
var default_route = {
  _head: [],
  _cached: false,
  handle(site_id, pathname) {
    if (!this._cached && prasi.mode === "vm" || prasi.dev) {
      this._cached = true;
      const _cache = import_fs3.readFileSync(import_path4.join(prasi.static.nova, "index.html"), {
        encoding: "utf-8"
      });
      const html = import_node_html_parser.parse(_cache);
      this._head = [
        ...html.querySelectorAll("script").map((e) => {
          return e.toString();
        }),
        ...html.querySelectorAll("link").map((e) => {
          return e.toString();
        })
      ];
    }
    const base_path = prasi.mode === "vm" ? `/prod/${site_id}` : ``;
    const current = {
      page_id: undefined,
      params: undefined
    };
    const found = prasi.content.route(pathname);
    if (found) {
      current.page_id = found.data.page_id;
      current.params = found.params;
    }
    return `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  ${this._head.join(`
`)}
</head>

<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script>
    window._prasi = { 
      basepath: "${base_path}/", 
      site_id: "${site_id}",${current.page_id ? `
      page_id: "${current.page_id}",` : ""}${typeof current.params === "object" ? `
      params: ${JSON.stringify(current.params)},` : ""}
    }
  </script>
</body>

</html>`;
  }
};
var route_index = globalThis.route_index = default_route;

// internal/main/handler/http-handler.ts
var zstd2 = __toESM(require_index_node());
var encoder = new TextEncoder;
var createHttpHandler = async (prasi2, mode) => {
  await zstd2.init();
  const handle = async function(req, opt) {
    const result = {
      body: null,
      headers: undefined,
      status: 200
    };
    const url = this.url;
    let is_file = false;
    if (url.pathname.startsWith("/nova")) {
      const nova_file = import_path5.join(prasi2.static.nova, url.pathname.substring(6));
      if (nova_file) {
        result.body = Bun.file(nova_file);
        is_file = true;
      }
    } else {
      const frontend_file = prasi2.static.frontend.exists(url.pathname);
      if (frontend_file) {
        result.body = Bun.file(frontend_file.data.fullpath);
        is_file = true;
      } else {
        const public_file = prasi2.static.public.exists(url.pathname);
        if (public_file) {
          result.body = Bun.file(public_file.data.fullpath);
          is_file = true;
        } else {
          const api = await route_api.handle(this.url, req, prasi2);
          if (api) {
            result.body = api.body;
            result.headers = api.headers;
            result.status = api.status;
          }
        }
      }
    }
    if (typeof result.body === "object" && result.body && !is_file) {
      result.body = JSON.stringify(result.body);
      head(result, "content-type", "application/json");
    }
    if (result.body === null) {
      result.body = route_index.handle(prasi2.site_id, url.pathname);
      head(result, "content-type", "text/html");
    }
    if (!head(result, "content-type") && typeof url.pathname === "string") {
      const ext = url.pathname.split(".").pop() || "";
      if (ext.length >= 2 && ext.length <= 4) {
        const type = src_default.getType(url.pathname);
        if (type)
          head(result, "content-type", type);
      }
    }
    if (opt?.rewrite) {
      result.body = opt.rewrite(result);
    }
    const accept = req.headers.get("accept-encoding");
    if (accept && !head(result, "content-encoding")) {
      let compression = "";
      if (accept.includes("zstd")) {
        compression = "zstd";
      } else if (accept.includes("gzip")) {
        compression = "gzip";
      }
      if (compression) {
        let should_compress = true;
        if (is_file) {
          const file = result.body;
          if (file.size === 0) {
            should_compress = false;
          }
        } else if (!result.body) {
          should_compress = false;
        }
        if (should_compress) {
          await compress3({
            result,
            is_file,
            compression
          });
        }
      }
    }
    return new Response(result.body, {
      headers: result.headers,
      status: result.status
    });
  };
  const index = {
    head: [],
    body: [],
    render: () => ""
  };
  const compress3 = async ({
    result,
    is_file,
    compression
  }) => {
    if (compression === "gzip") {
      head(result, "content-encoding", "gzip");
      if (is_file) {
        const file = result.body;
        head(result, "content-type", file.type);
        result.body = Bun.gzipSync(await file.arrayBuffer());
      } else {
        result.body = Bun.gzipSync(result.body);
      }
    } else if (compression = "zstd") {
      head(result, "content-encoding", "zstd");
      if (is_file) {
        const file = result.body;
        head(result, "content-type", file.type);
        result.body = zstd2.compress(new Uint8Array(await file.arrayBuffer()), 10);
      } else {
        result.body = zstd2.compress(encoder.encode(result.body), 10);
      }
    }
  };
  const handler = async (req) => {
    const server = prasi2.server;
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
        url: { pathname: url.pathname, raw: url }
      });
    }
    return new Response("Page Not Found", { status: 404 });
  };
  return handler;
};
var head = (result, name, set_value) => {
  if (!result.headers) {
    if (typeof set_value === "string") {
      result.headers = { [name]: set_value };
    }
    return set_value || "";
  }
  if (result.headers instanceof Headers) {
    if (typeof set_value === "string") {
      result.headers.set(name, set_value);
    }
    return result.headers.get(name);
  }
  if (typeof set_value === "string") {
    result.headers[name] = set_value;
  }
  return result.headers[name];
};

// internal/main/handler/ws-handler.ts
var createWsHandler = () => {
  return { message(ws, message) {
  } };
};

// internal/main/init.ts
var init3 = async ({
  site_id,
  server,
  mode,
  prasi: init_prasi,
  action,
  content,
  dev,
  db
}) => {
  prasi.mode = mode;
  prasi.content = content;
  const backend_path = init_prasi.paths.dir.backend;
  const frontend_dir = init_prasi.paths.dir.frontend;
  if (!frontend_dir) {
    console.error(`dir.build is empty, please check prasi.json!`);
    return;
  }
  if (mode === "server") {
  } else {
    fs.init({
      site: init_prasi.paths.dir.backend,
      upload: init_prasi.paths.dir.upload,
      public: init_prasi.paths.dir.public
    });
  }
  await initDB(db);
  const { route_api: api_route } = await Promise.resolve().then(() => (init_route_api(), exports_route_api));
  await api_route.init();
  prasi.static = {
    frontend: await staticFile(frontend_dir),
    public: await staticFile(init_prasi.paths.dir.public),
    nova: init_prasi.paths.dir.nova
  };
  prasi.site_id = site_id;
  prasi.dev = dev;
  if (mode === "ipc") {
    if (action === "init")
      return;
  } else {
    delete require.cache[backend_path];
    const module2 = require(backend_path);
    prasi.server = module2.server;
  }
  process.chdir(backend_path);
  prasi.ext = {};
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
  console.log(`${c.magenta}[SITE]${c.esc} ${site_id} ${action === "reload" ? "Reloaded" : "Started"}.`);
  if (prasi.server?.init) {
    await prasi.server.init({ port: server_instance.port });
  }
  prasi.handler = {
    http: await createHttpHandler(prasi, mode === "ipc" ? "dev" : "prod"),
    ws: createWsHandler()
  };
};
})
