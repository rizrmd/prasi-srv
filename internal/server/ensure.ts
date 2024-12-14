import { $ } from "bun";
import { fs } from "utils/fs";

export const ensureServerReady = async (is_dev: boolean) => {
  if (!fs.exists("site:app/package.json")) {
    await fs.write(`site:app/package.json`, {
      name: "prasi-app",
      workspaces: ["db"],
      dependencies: { db: "workspace:*" },
    });
  }
  await $`bun i`.cwd(fs.path("site:app")).quiet().nothrow();

  if (is_dev) {
    const rebuild = async () => {
      try {
        await $`bun build --watch --target bun --entry ${fs.path(
          "internal:server/server.ts"
        )} --outdir ${fs.path("site:app")} --sourcemap=linked`.quiet();
      } catch (e) {
        rebuild();
      }
    };
    rebuild();
  } else {
    await Bun.build({
      target: "bun",
      entrypoints: [fs.path(`internal:server/server.ts`)],
      outdir: fs.path("site:app"),
      sourcemap: "linked",
    });
  }
};
