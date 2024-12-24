import type { PrasiHttpHandler, PrasiServer } from "typings/server";

export const createHttpHandler: () => PrasiHttpHandler = () => {
  return async () => {
    return new Response("wuwu");
  };
};
