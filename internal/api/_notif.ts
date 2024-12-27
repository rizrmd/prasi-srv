import { Database } from "bun:sqlite";
import admin from "firebase-admin";
import { listAsync } from "fs-jetpack";
import { prasi } from "main/prasi-var";
import { apiContext, type ApiResponse } from "utils/api-context";
import { fs } from "utils/fs";

export const _ = {
  url: "/_notif/:action/:token",
  async api(
    action: string,
    data:
      | { type: "register"; token: string; id: string }
      | { type: "send"; id: string; body: string; title: string; data?: any }
  ): ApiResponse {
    const { req } = apiContext(this);

    if (action === "list") {
      return {
        body: await listAsync(fs.path("public")),
        headers: { "content-type": "application/json" },
      };
    }

    if (!prasi.ext.firebase?.init) {
      prasi.ext.firebase = { init: true, app: null };

      try {
        prasi.ext.firebase.app = admin.initializeApp({
          credential: admin.credential.cert(
            fs.path("site:config/firebase-admin.json")
          ),
        });
        prasi.ext.notif = {
          db: new Database(fs.path(`site:config/sqlite/notif.sqlite`)),
        };

        prasi.ext.notif.db.exec(`
          CREATE TABLE IF NOT EXISTS notif (
            token TEXT PRIMARY KEY,
            id TEXT NOT NULL
          );
        `);
      } catch (e) {
        console.error(e);
      }
    }

    if (prasi.ext.firebase && prasi.ext.notif && prasi.ext.firebase.app) {
      switch (action) {
        case "register":
          {
            if (data && data.type === "register" && data.id) {
              if (data.token) {
                const q = prasi.ext.notif.db.query(
                  `SELECT * FROM notif WHERE token = '${data.token}'`
                );
                const result = q.all();
                if (result.length > 0) {
                  prasi.ext.notif.db.exec(
                    `UPDATE notif SET id = '${data.id}' WHERE token = '${data.token}'`
                  );
                } else {
                  prasi.ext.notif.db.exec(
                    `INSERT INTO notif VALUES ('${data.token}', '${data.id}')`
                  );
                }

                return {
                  body: { result: "OK" },
                  headers: { "content-type": "application/json" },
                };
              } else {
                return {
                  body: { error: "missing token" },
                  headers: { "content-type": "application/json" },
                };
              }
            }
          }
          break;
        case "send":
          {
            if (data && data.type === "send") {
              const q = prasi.ext.notif.db.query<{ token: string }, any>(
                `SELECT * FROM notif WHERE id = '${data.id}'`
              );
              let result = q.all();
              for (const c of result) {
                try {
                  await prasi.ext.firebase.app.messaging().send({
                    notification: { body: data.body, title: data.title },
                    data: data.data,
                    token: c.token,
                  });
                } catch (e) {
                  console.error(e);
                  result = result.filter((v) => v.token !== c.token);
                }
              }

              return {
                body: { result: "OK", totalDevice: result.length },
                headers: { "content-type": "application/json" },
              };
            }
          }
          break;
      }
    }

    return {
      body: { error: "missing ./firebase-admin.json" },
      headers: { "content-type": "application/json" },
    };
  },
};
