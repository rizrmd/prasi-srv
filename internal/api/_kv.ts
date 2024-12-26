import { apiContext } from "utils/api-context";
import { BunSqliteKeyValue } from "bun-sqlite-key-value";
import { fs } from "utils/fs";
import { prasi } from "main/prasi-var";

export const _ = {
  url: "/_kv",
  raw: true,
  async api(mode: "get" | "set" | "del", key: string, value?: any) {
    const { req } = apiContext(this);

    if (!prasi.ext.kv) {
      prasi.ext.kv = new BunSqliteKeyValue(
        fs.path(`site:config/sqlite/kv-data.sqlite`)
      );
    }
    const kv = prasi.ext.kv;

    try {
      const parts = (await req.json()) as [string, string, any];
      switch (parts[0]) {
        case "set": {
          if (typeof parts[1] === "string") {
            kv.set(parts[1], parts[2]);

            return new Response(JSON.stringify({ status: "ok" }), {
              headers: { "content-type": "application/json" },
            });
          }

          return new Response(
            JSON.stringify({ status: "failed", reason: "no key or body" }),
            {
              headers: { "content-type": "application/json" },
            }
          );
        }
        case "get": {
          if (parts[2]) {
            kv.set(parts[1], parts[2]);
          }

          return new Response(JSON.stringify(kv.get(parts[1]) || null), {
            headers: { "content-type": "application/json" },
          });
        }
        case "del": {
          if (parts[1]) {
            kv.delete(parts[1]);

            return new Response(JSON.stringify({ status: "ok" }), {
              headers: { "content-type": "application/json" },
            });
          }
        }
      }
    } catch (e) {}

    return new Response(JSON.stringify({ status: "failed" }), {
      headers: { "content-type": "application/json" },
    });
  },
};
