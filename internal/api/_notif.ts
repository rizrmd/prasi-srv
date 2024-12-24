import { Database } from "bun:sqlite";
import admin from "firebase-admin";
import { listAsync } from "fs-jetpack";
import { apiContext } from "utils/api-context";

import { dir } from "utils/dir";
import { prasi } from "../prasi-var";

export const _ = {
  url: "/_notif/:action/:token",
  async api(
    action: string,
    data:
      | { type: "register"; token: string; id: string }
      | { type: "send"; id: string; body: string; title: string; data?: any }
  ) {
    const { req } = apiContext(this);

    if (action === "list") {
      return await listAsync(dir("public"));
    }

    if (!prasi.firebaseInit) {
      prasi.firebaseInit = true;

      try {
        prasi.firebase = admin.initializeApp({
          credential: admin.credential.cert(dir("public/firebase-admin.json")),
        });
        prasi.notif = {
          db: new Database(dir(`${prasi.datadir}/notif.sqlite`)),
        };

        prasi.notif.db.exec(`
          CREATE TABLE IF NOT EXISTS notif (
            token TEXT PRIMARY KEY,
            id TEXT NOT NULL
          );
        `);
      } catch (e) {
        console.error(e);
      }
    }

    if (prasi.firebase) {
      switch (action) {
        case "register":
          {
            if (data && data.type === "register" && data.id) {
              if (data.token) {
                const q = prasi.notif.db.query(
                  `SELECT * FROM notif WHERE token = '${data.token}'`
                );
                const result = q.all();
                if (result.length > 0) {
                  prasi.notif.db.exec(
                    `UPDATE notif SET id = '${data.id}' WHERE token = '${data.token}'`
                  );
                } else {
                  prasi.notif.db.exec(
                    `INSERT INTO notif VALUES ('${data.token}', '${data.id}')`
                  );
                }

                return { result: "OK" };
              } else {
                return { error: "missing token" };
              }
            }
          }
          break;
        case "send":
          {
            if (data && data.type === "send") {
              const q = prasi.notif.db.query<{ token: string }, any>(
                `SELECT * FROM notif WHERE id = '${data.id}'`
              );
              let result = q.all();
              for (const c of result) {
                try {
                  await prasi.firebase.messaging().send({
                    notification: { body: data.body, title: data.title },
                    data: data.data,
                    token: c.token,
                  });
                } catch (e) {
                  console.error(e);
                  result = result.filter((v) => v.token !== c.token);
                }
              }

              return { result: "OK", totalDevice: result.length };
            }
          }
          break;
      }
    }

    return { error: "missing ./firebase-admin.json" };
  },
};
