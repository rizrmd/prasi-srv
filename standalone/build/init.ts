import { removeAsync } from "fs-jetpack";
import { join } from "path";
import { prasiBuildFrontEnd } from "./frontend";

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

  const tailwind = Bun.spawn({
    cmd: `bun tailwind -i app/index.css -w -m -o app/index.build.css`.split(
      " "
    ),
    cwd: join(process.cwd(), "frontend"),
    stdin: "inherit",
    stderr: "ignore",
    stdout: "ignore",
  });
};
