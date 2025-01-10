import { prasiBuildFrontEnd } from "./frontend";

export const initBuild = async () => {
  const frontend = await prasiBuildFrontEnd({
    entrydir: "frontend",
    entrypoint: ["index.tsx", "internal.tsx"],
    outdir: "dist/frontend",
  });
};
