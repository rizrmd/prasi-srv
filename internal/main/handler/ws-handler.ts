import type { PrasiWsHandler } from "typings/server";

export const createWsHandler = () => {
  return { message(ws, message) {} } as PrasiWsHandler;
};
