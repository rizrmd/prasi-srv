import mp from "@surfy/multipart-parser";
import { dirAsync, existsAsync } from "fs-jetpack";
import { dirname, format, parse } from "path";
import { apiContext, type ApiResponse } from "utils/api-context";
import { fs } from "utils/fs";

export const _ = {
  url: "/_upload",
  raw: true,
  async api(body: any): ApiResponse {
    const { req } = apiContext(this);
    const raw = await req.arrayBuffer();
    const parts = mp(Buffer.from(raw)) as Record<
      string,
      { fileName: string; mime: string; type: string; buffer: Buffer }
    >;

    const result: string[] = [];
    for (const [_, part] of Object.entries(parts)) {
      result.push(await saveFile(req, part.fileName, part.buffer));
    }

    return new Response(JSON.stringify(result), {
      headers: { "content-type": "application/json" },
    });
  },
};

const saveFile = async (
  req: Request & {
    params: any;
    query_parameters: any;
  },
  fname: string,
  part: any
) => {
  const d = new Date();
  let to: string = req.query_parameters["to"] || "";
  if (!to) {
    to = `/upload/${d.getFullYear()}-${d.getMonth()}/${d.getDate()}/${d.getTime()}-${fname}`;
  } else {
    to = to
      .split("/")
      .map((e) => e.replace(/\.\./gi, ""))
      .filter((e) => !!e)
      .join("/");

    to = to.endsWith("/") ? to + fname : to + "/" + fname;
  }
  to = to.toLowerCase();
  const pto = parse(to);
  pto.name = pto.name.replace(/[\W_]+/gi, "-");
  to = format(pto);

  if (await existsAsync(dirname(to))) {
    dirAsync(dirname(to));
  }

  while (await Bun.file(fs.path(`upload:files/${to}`)).exists()) {
    const p = parse(to);
    const arr = p.name.split("-");
    if (arr.length > 1) {
      if (parseInt(arr[arr.length - 1])) {
        arr[arr.length - 1] = parseInt(arr[arr.length - 1]) + 1 + "";
      } else {
        arr.push("1");
      }
    } else {
      arr.push("1");
    }
    p.name = arr.filter((e) => e).join("-");
    p.base = `${p.name}${p.ext}`;

    to = format(p);
  }
  await Bun.write(fs.path(`upload:files/${to}`), part);
  return to;
};
