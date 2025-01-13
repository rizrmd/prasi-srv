import { removeAsync } from "fs-jetpack";
import { join } from "path";
import { prasiBuildFrontEnd } from "./frontend";
import { existsSync, readdirSync } from "fs";
import { prasi } from "main/prasi-var";

export const initBuild = async () => {
  await removeAsync(join(process.cwd(), "dist/frontend"));
  const frontend = await prasiBuildFrontEnd({
    entrydir: "frontend",
    entrypoint: ["index.tsx", "internal.tsx"],
    outdir: "dist/frontend",
    onBuild(arg) {
      if (arg.status === "failed") {
        console.log(arg.log);
      } else {
        const index = prasi.index_html;
        if (index) {
          const dir = join(process.cwd(), "dist/frontend");
          if (existsSync(dir)) {
            const files = readdirSync(dir);
            const css_file = files.find(
              (e) => e.startsWith("index") && e.endsWith(".css")
            );
            if (css_file && index.head) {
              index.cached = false;
              index.head = [`<link href="/${css_file}" rel="stylesheet" />`];
            }
          }
          if (prasi.static?.frontend) {
            prasi.static.frontend.rescan();
          }
        }
      }
    },
  });

  const tailwind = Bun.spawn({
    cmd: `bun tailwind -i app/index.css -w -o app/index.build.css`.split(" "),
    cwd: join(process.cwd(), "frontend"),
    stdin: "inherit",
    stderr: "ignore",
    stdout: "ignore",
  });
};
