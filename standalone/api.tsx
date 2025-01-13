import { db } from "backend/db";
export const apiContext = (ctx: any) => {
  return { req: ctx.req as Request, db };
};
