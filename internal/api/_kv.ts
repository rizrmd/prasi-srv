import { BunSqliteKeyValue } from "pkgs/utils/kv";
import { apiContext } from "utils/api-context";
import { dir } from "utils/dir";
import { prasi } from "../prasi";

export const _ = {
  url: "/_kv",
  raw: true,
  async api(mode: "get" | "set" | "del", key: string, value?: any) {
    const { req } = apiContext(this);

    if (!prasi.kv) {
      prasi.kv = new BunSqliteKeyValue(dir(`${prasi.datadir}/db-kv.sqlite`));
    }

    try {
      const parts = (await req.json()) as [string, string, any];
      switch (parts[0]) {
        case "set": {
          if (typeof parts[1] === "string") {
            prasi.kv.set(parts[1], parts[2]);

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
            prasi.kv.set(parts[1], parts[2]);
          }

          return new Response(JSON.stringify(prasi.kv.get(parts[1]) || null), {
            headers: { "content-type": "application/json" },
          });
        }
        case "del": {
          if (parts[1]) {
            prasi.kv.delete(parts[1]);

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
