import { g } from "utils/global";

export const PrasiContent = () => {
  return g.mode === "site" ? g.content : null;
};
