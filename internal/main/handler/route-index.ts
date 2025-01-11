import { readFileSync } from "fs";
import { prasi } from "main/prasi-var";
import { parse } from "node-html-parser";
import { join } from "path";

const default_route = {
  _head: [] as string[],
  _cached: false,
  handle(site_id: string, pathname: string) {
    if (!this._cached || prasi.dev) {
      this._cached = true;
      const _cache = readFileSync(join(prasi.static.nova, "index.html"), {
        encoding: "utf-8",
      });
      const html = parse(_cache);
      this._head = [
        ...html.querySelectorAll("script").map((e) => {
          return e.toString();
        }),
        ...html
          .querySelectorAll("link")
          .map((e) => {
            if (e.getAttribute("rel") === "stylesheet") {
              if (prasi.index_html?.exclude_default_css === true) {
                return "";
              }
            }
            return e.toString();
          })
          .filter((e) => e),
      ];
    }

    const base_path = prasi.mode === "ipc" ? `/prod/${site_id}` : ``;
    const current = {
      page_id: undefined as undefined | string,
      params: undefined as any,
    };

    const found = prasi.content?.route?.(pathname);
    if (found) {
      current.page_id = found.data.page_id;
      current.params = found.params;
    }
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

export const route_index = ((globalThis as any).route_index = default_route);
