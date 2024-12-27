import { gunzipSync } from "bun";
import { unpack } from "msgpackr";
import { apiContext, type ApiResponse } from "utils/api-context";
import { execQuery } from "utils/query";

const g = global as any;
export const _ = {
  url: "/_dbs/*",
  raw: true,
  async api(): ApiResponse {
    const ctx = apiContext(this);
    const { req } = ctx;
    if (typeof g.db !== "undefined") {
      if (req.params._ === "check") {
        return {
          body: { mode: "encrypted" },
          headers: { "content-type": "application/json" },
        };
      }

      try {
        const body = unpack(gunzipSync(await req.arrayBuffer()));

        try {
          const result = await execQuery(body, g.db);
          return result;
        } catch (e: any) {}
      } catch (e) {}
    }

    return {
      body: { status: "unauthorized" },
      headers: { "content-type": "application/json" },
      status: 500,
    };
  },
};
