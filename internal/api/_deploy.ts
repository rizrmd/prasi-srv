import { apiContext, type ApiResponse } from "utils/api-context";
import { type SiteConfig } from "utils/deploy-config";

export const _ = {
  url: "/_deploy",
  async api(
    action: (
      | { type: "check" }
      | { type: "db-update"; url: string; orm: SiteConfig["db"]["orm"] }
      | { type: "db-pull" }
      | { type: "db-gen" }
      | { type: "db-ver" }
      | { type: "db-sync"; url: string }
      | { type: "restart" }
      | { type: "domain-add"; domain: string }
      | { type: "domain-del"; domain: string }
      | { type: "deploy-del"; ts: string }
      | { type: "deploy"; load_from?: string }
      | { type: "deploy-status" }
      | { type: "redeploy"; ts: string }
    ) & {
      id_site: string;
    }
  ): ApiResponse {
    const { req } = apiContext(this);
    // const deploy = _config.current?.deploy!;
    // const config = _config.current!;

    // if (typeof req.query_parameters["export"] !== "undefined") {
    //   return new Response(
    //     Bun.file(fs.path(`site:deploy/current/${deploy.current}.gz`))
    //   );
    // }

    // switch (action.type) {
    //   case "check":
    //     const deploys = readdirSync(fs.path("site:deploy/history"));

    //     return {
    //       now: Date.now(),
    //       current: deploy.current,
    //       deploys: deploys
    //         .filter((e) => e.endsWith(".gz"))
    //         .map((e) => parseInt(e.replace(".gz", ""))),
    //       db: {
    //         url: config.db.url,
    //         orm: config.db.orm,
    //       },
    //     };
    //   case "db-ver": {
    //     return (await fs.read(`site:app/db/version`, "string")) || "";
    //   }
    //   case "db-sync": {
    //     const res = await fetch(action.url);
    //     const text = await res.text();
    //     if (text) {
    //       await Bun.write(fs.path("site:app/db/prisma/schema.prisma"), text);
    //       await Bun.write(
    //         fs.path(`site:app/db/version`),
    //         Date.now().toString()
    //       );
    //     }
    //     return "ok";
    //   }
    //   case "db-update":
    //     if (action.url) {
    //       config.db.url = action.url;
    //       config.db.orm = action.orm;
    //       const env = genEnv({
    //         ...parseEnv(await Bun.file(fs.path("site:app/db/.env")).text()),
    //         DATABASE_URL: action.url,
    //       });
    //       await Bun.write(fs.path("site:app/db/.env"), env);
    //     }
    //     return "ok";
    //   case "db-gen":
    //     {
    //       await $`bun prisma generate`.cwd(fs.path("site:app/db"));

    //       res.send("ok");
    //       setTimeout(() => {
    //         // restartServer();
    //       }, 300);
    //     }
    //     break;
    //   case "db-pull":
    //     {
    //       let env = await readAsync(fs.path("site:app/db/.env"));
    //       if (env) {
    //         const ENV = parseEnv(env);
    //         if (typeof ENV.DATABASE_URL === "string") {
    //           const type = ENV.DATABASE_URL.split("://").shift();
    //           if (type) {
    //             await writeAsync(
    //               fs.path("site:app/db/prisma/schema.prisma"),
    //               `\
    // generator client {
    //   provider = "prisma-client-js"
    // }

    // datasource db {
    //   provider = "${type}"
    //   url      = env("DATABASE_URL")
    // }`
    //             );

    //             try {
    //               await Bun.write(
    //                 fs.path("site:app/db/.env"),
    //                 `DATABASE_URL=${ENV.DATABASE_URL}`
    //               );
    //               await $`bun install`.cwd(fs.path("site:app/db"));
    //               await $`bun prisma db pull --force`.cwd(
    //                 fs.path("site:app/db")
    //               );
    //               await $`bun prisma generate`.cwd(fs.path("site:app/db"));
    //               await Bun.write(
    //                 fs.path(`site:app/db/version`),
    //                 Date.now().toString()
    //               );
    //             } catch (e) {
    //               console.error(e);
    //             }
    //             res.send("ok");
    //             setTimeout(() => {
    //               // restartServer();
    //             }, 300);
    //           }
    //         }
    //       }
    //     }
    //     break;
    //   case "restart":
    //     {
    //       res.send("ok");
    //       setTimeout(() => {
    //         // restartServer();
    //       }, 300);
    //     }
    //     break;
    //   case "deploy-del":
    //     {
    //       await removeAsync(fs.path(`site:deploy/history/${action.ts}.gz`));
    //       const deploys = readdirSync(fs.path(`site:deploy/history`));

    //       return {
    //         now: Date.now(),
    //         current: deploy.current,
    //         deploys: deploys
    //           .filter((e) => e.endsWith(".gz"))
    //           .map((e) => parseInt(e.replace(".gz", ""))),
    //       };
    //     }
    //     break;
    //   case "deploy-status":
    //     break;
    //   case "deploy":
    //     {
    //       await _config.set("site_id", action.id_site);

    //       return {
    //         now: Date.now(),
    //         current: deploy.current,
    //         deploys: config.deploy.history,
    //       };
    //     }
    //     break;
    //   case "redeploy":
    //     {
    //       // deploy.config.deploy.ts = action.ts;
    //       // await deploy.saveConfig();
    //       // await deploy.load(action.ts);
    //       // const deploys = fs.readdirSync(dir(`/app/web/deploy`));
    //       // return {
    //       //   now: Date.now(),
    //       //   current: parseInt(deploy.config.deploy.ts),
    //       //   deploys: deploys
    //       //     .filter((e) => e.endsWith(".gz"))
    //       //     .map((e) => parseInt(e.replace(".gz", ""))),
    //       // };
    //     }
    //     break;
    // }
  },
};

export const downloadFile = async (
  url: string,
  filePath: string,
  progress?: (rec: number, total: number) => void
) => {
  try {
    const _url = new URL(url);
    if (_url.hostname === "localhost") {
      _url.hostname = "127.0.0.1";
    }
    // g.log.info(`Downloading ${url} to ${filePath}`);
    const res = await fetch(_url as any);
    if (res.body) {
      const file = Bun.file(filePath);

      const writer = file.writer();
      const reader = res.body.getReader();

      // Step 3: read the data
      let receivedLength = 0; // received that many bytes at the moment
      let chunks = []; // array of received binary chunks (comprises the body)
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          writer.end();
          break;
        }

        chunks.push(value);
        writer.write(value);
        receivedLength += value.length;

        if (progress) {
          progress(
            receivedLength,
            parseInt(res.headers.get("content-length") || "0")
          );
        }
      }
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
