import type { PrasiHttpHandler } from "typings/server";

export const createHttpHandler = () => {
  const handler: PrasiHttpHandler = async () => {
    return new Response("wuwu");
  };
  return handler;
};
