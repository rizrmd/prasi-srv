import { g } from "utils/global";

export const prasiContent = () => {
  return g.mode === "site" ? g.prasi : null;
};
