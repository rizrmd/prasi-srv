import { Script } from "node:vm";
import { join } from "path";
export const vm = async (ctx: any) => {
  const source = await Bun.file(join(__dirname, "init.js")).text();
  const script = new Script(source);
  const cjs = script.runInContext(ctx);
  cjs(ctx.module.exports, require, ctx.module);
  return ctx.module.exports.init;
};
