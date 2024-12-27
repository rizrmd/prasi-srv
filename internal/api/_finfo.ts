import mime from "mime";
import { apiContext, type ApiResponse } from "utils/api-context";
import { fs } from "utils/fs";

export const _ = {
  url: "/_finfo/**",
  async api(): ApiResponse {
    const { req } = apiContext(this);
    let rpath = decodeURIComponent(req.params._);
    rpath = rpath
      .split("/")
      .map((e) => e.replace(/\.\./gi, ""))
      .filter((e) => !!e)
      .join("/");

    let res = new Response("NOT FOUND", { status: 404 });

    const path = fs.path(`upload:${rpath}`);
    const file = Bun.file(path);

    if (await file.exists()) {
      const arr = (path.split("/").pop() || "").split("-");
      const ctype = mime.getType(path);
      const ext = mime.getExtension(ctype || "");
      const fname = arr.join("-") + "." + ext;

      res = new Response(
        JSON.stringify({
          filename: fname,
          fullpath: path,
          size: formatFileSize(file.size),
          mime: ctype,
          ext,
        }),
        {
          headers: { "content-type": "application/json" },
        }
      );
    } else {
      res = new Response("null", {
        headers: { "content-type": "application/json" },
      });
    }

    return res;
  },
};

function formatFileSize(bytes: number) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
