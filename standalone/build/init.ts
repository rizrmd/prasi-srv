import { spawn } from "utils/spawn";
import { prasiBuildFrontEnd } from "./frontend";
import { join } from "path";
import { writeFileSync } from "fs";
import { removeAsync } from "fs-jetpack";

export const initBuild = async () => {
  await removeAsync(join(process.cwd(), "dist/frontend"));
  const frontend = await prasiBuildFrontEnd({
    entrydir: "frontend",
    entrypoint: ["index.tsx", "internal.tsx"],
    outdir: "dist/frontend",
    onBuild(arg) {
      if (arg.status === "failed") {
        console.log(arg.log);
      }
    },
  });

  const tailwind = spawn({
    cmd: `bun tailwind -w -m`,
    cwd: join(process.cwd(), "frontend"),
    onMessage(arg) {
      if (arg.from === "stdout") {
        writeFileSync(
          join(process.cwd(), "frontend", "app/index.build.css"),
          arg.raw
        );
      }
    },
  });
};
