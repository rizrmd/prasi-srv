import type { ApiResponse } from "utils/api-context";

export const _ = {
  url: "/_zip",
  raw: true,
  async api(): ApiResponse {
    // await $`rm bundle*`.nothrow().quiet().cwd(`${prasi.datadir}`);
    // await copyAsync(
    //   dir(`pkgs/empty_bundle.sqlite`),
    //   dir(`${prasi.datadir}/bundle.sqlite`)
    // );
    // const db = new Database(dir(`${prasi.datadir}/bundle.sqlite`));
    // const ts = prasi.deploy.config.deploy.ts;
    // const add = ({
    //   path,
    //   type,
    //   content,
    // }: {
    //   path: string;
    //   type: string;
    //   content: string | Buffer;
    // }) => {
    //   if (path) {
    //     const query = db.query(
    //       "INSERT INTO files (path, type, content) VALUES ($path, $type, $content)"
    //     );
    //     query.run({
    //       $path: path.startsWith(prasi.datadir)
    //         ? path.substring(`${prasi.datadir}/bundle`.length)
    //         : path,
    //       $type: type,
    //       $content: content,
    //     });
    //   }
    // };
    // add({ path: "version", type: "", content: deploy.config.deploy.ts + "" });
    // add({ path: "site_id", type: "", content: deploy.config.site_id + "" });
    // add({
    //   path: "base_url",
    //   type: "",
    //   content: prasi.deploy.content?.site?.config?.api_url || "",
    // });
    // const gz = prasi.deploy.content;
    // if (gz) {
    //   let layout = null as null | SinglePage;
    //   for (const l of gz.layouts) {
    //     if (!layout) layout = l;
    //     if (l.is_default_layout) layout = l;
    //   }
    //   let api_url = (gz.site as any)?.config?.api_url;
    //   add({
    //     path: "route",
    //     type: "",
    //     content: JSON.stringify({
    //       site: {
    //         ...gz.site,
    //         api_url,
    //       },
    //       urls: gz.pages.map((e) => {
    //         return { id: e.id, url: e.url };
    //       }),
    //       layout: {
    //         id: layout?.id,
    //         root: layout?.content_tree,
    //       },
    //     }),
    //   });
    //   add({
    //     path: "load-js",
    //     type: "",
    //     content: await getContent("load.js.prod", `"${api_url}"`),
    //   });
    // }
    // for (const [directory, files] of Object.entries(
    //   prasi.deploy.content || {}
    // )) {
    //   if (directory !== "code" && directory !== "site") {
    //     for (const comp of Object.values(files) as any) {
    //       let filepath = `${prasi.datadir}/bundle/${directory}/${comp.id}.json`;
    //       add({
    //         path: filepath,
    //         type: mime.getType(filepath) || "text/plain",
    //         content: JSON.stringify(comp),
    //       });
    //     }
    //   } else if (directory === "site") {
    //     const filepath = `${prasi.datadir}/bundle/${directory}.json`;
    //     add({
    //       path: filepath,
    //       type: mime.getType(filepath) || "text/plain",
    //       content: JSON.stringify(files),
    //     });
    //   } else {
    //     for (const [filename, content] of Object.entries(files)) {
    //       let filepath = `${prasi.datadir}/bundle/${directory}/${filename}`;
    //       if (content instanceof Buffer || typeof content === "string") {
    //         add({
    //           path: filepath,
    //           type: mime.getType(filepath) || "text/plain",
    //           content,
    //         });
    //       } else {
    //         for (const [k, v] of Object.entries(content || {})) {
    //           filepath = `${prasi.datadir}/bundle/${directory}/${filename}/${k}`;
    //           if (v instanceof Buffer || typeof v === "string") {
    //             add({
    //               path: filepath,
    //               type: mime.getType(filepath) || "text/plain",
    //               content: v,
    //             });
    //           } else {
    //             add({
    //               path: filepath,
    //               type: mime.getType(filepath) || "text/plain",
    //               content: JSON.stringify(v),
    //             });
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
    // await $`zip "bundle-${ts}.zip" bundle.sqlite`
    //   .nothrow()
    //   .quiet()
    //   .cwd(`${prasi.datadir}`);
    // return new Response(Bun.file(`${prasi.datadir}/bundle-${ts}.zip`));
  },
};
