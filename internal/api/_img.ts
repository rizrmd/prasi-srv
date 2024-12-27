import { dirAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { dirname, parse } from "path";
import sharp from "sharp";
import { apiContext, type ApiResponse } from "utils/api-context";
import { fs } from "utils/fs";

const modified = {} as Record<string, number>;

export const _ = {
  url: "/_img/**",
  async api(): ApiResponse {
    const { req } = apiContext(this);
    let res = new Response("NOT FOUND", { status: 404 });

    const w = parseInt(req.query_parameters.w);
    const h = parseInt(req.query_parameters.h);
    const fit = req.query_parameters.fit;
    let force = typeof req.query_parameters.force === "string";

    let rpath = decodeURIComponent(req.params._);
    rpath = rpath
      .split("/")
      .map((e) => e.replace(/\.\./gi, ""))
      .filter((e) => !!e)
      .join("/");

    try {
      const filepath = fs.path(`upload:files/${rpath}`);
      const st = await stat(filepath);
      if (st.isFile()) {
        if (
          !modified[filepath] ||
          (modified[filepath] && modified[filepath] !== st.mtimeMs)
        ) {
          modified[filepath] = st.mtimeMs;
          force = true;
        }

        if (!w && !h) {
          const file = Bun.file(filepath);
          return new Response(file);
        } else {
          const original = Bun.file(filepath);

          const p = parse(filepath);
          if (p.ext === ".svg") {
            return new Response(original);
          }

          let path = `${w ? `w-${w}` : ""}${h ? `h-${h}` : ``}${
            fit ? `-${fit}` : ""
          }`;
          let file_name = fs.path(
            `upload:files/upload/thumb/${path}/${rpath}.webp`
          );
          let file = Bun.file(file_name);
          if (!(await file.exists())) {
            await dirAsync(dirname(file_name));
            force = true;
          }

          if (force) {
            const img = sharp(await original.arrayBuffer());
            const arg: any = { fit: fit || "inside" };
            if (w) {
              arg.width = w;
            }
            if (h) {
              arg.height = h;
            }
            let out = img.resize(arg).webp({ quality: 75 });
            out = out.webp();

            await Bun.write(file_name, new Uint8Array(await out.toBuffer()));
            file = Bun.file(file_name);
          }

          return new Response(file);
        }
      }
    } catch (e: any) {
      return new Response("ERROR:" + e.message, { status: 404 });
    }

    return res;
  },
};
