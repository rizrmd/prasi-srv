import { prasi } from "./prasi";

export const init = (opt: { root_dir: string; script_path: string }) => {
  prasi.dir.root = opt.root_dir;
};
