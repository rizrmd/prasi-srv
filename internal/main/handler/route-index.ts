import { readFileSync } from "fs";
import { prasi } from "main/prasi-var";
import { join } from "path";
import { parse } from "node-html-parser";

export const route_index = {
  _cache: "",
  _head: [] as string[],
  handle(site_id: string, opt: { page_id?: string; params?: any }) {
    if (!this._cache) {
      this._cache = readFileSync(join(prasi.static.nova, "index.html"), {
        encoding: "utf-8",
      });
      const html = parse(this._cache);
      this._head = [
        ...html.querySelectorAll("script").map((e) => {
          if (prasi.mode === "vm") {
            e.setAttribute("src", `/prod/${site_id}${e.getAttribute("src")}`);
          }
          return e.toString();
        }),
        ...html.querySelectorAll("link").map((e) => {
          if (prasi.mode === "vm") {
            e.setAttribute("href", `/prod/${site_id}${e.getAttribute("href")}`);
          }

          return e.toString();
        }),
      ];
    }
    const base_path = prasi.mode === "vm" ? `/prod/${site_id}` : ``;
    const current = { page_id: undefined, params: undefined };

    return `\
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  ${this._head.join("\n")}
</head>

<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script>
    window._prasi = { 
      basepath: "${base_path}/", 
      site_id: "${site_id}",${
      current.page_id ? `\n      page_id: "${current.page_id}",` : ""
    }${
      typeof current.params === "object"
        ? `\n      params: ${JSON.stringify(current.params)},`
        : ""
    }
    }
  </script>
</body>

</html>`;
  },
};
