import { prasi } from "main/prasi-var";

export const route_index = {
  handle: (site_id: string, opt: { page_id?: string; params?: any }) => {
    return {
      head: [] as string[],
      body: [] as string[],
      render() {
        const base_path = prasi.mode === "vm" ? `/prod/${site_id}` : ``;

        return `\
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
      content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <link rel="stylesheet" href="${base_path}/index.css">
    <link rel="stylesheet" href="${base_path}/main.css">
  ${this.head.join("\n")}
  </head>
  
  <body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
    ${this.body.join("\n")}
    <div id="root"></div>
    <script>
      window._prasi = { 
        basepath: "${base_path}/", 
        site_id: "${site_id}",${
          opt.page_id ? `\n      page_id: "${opt.page_id}",` : ""
        }${
          typeof opt.params === "object"
            ? `\n      params: ${JSON.stringify(opt.params)},`
            : ""
        }
      }
    </script>
    <script src="/main.js" type="module"></script>
  </body>
  </html>`;
      },
    };
  },
};
