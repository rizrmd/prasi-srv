import { c } from "./color";

export const siteLog = (msg: string) => {
  console.log(`${c.magenta}[SITE]${c.esc} ${msg}`);
};

export const dbLog = (msg: string) => {
  console.log(`${c.cyan}[ DB ]${c.esc} ${msg}`);
};
