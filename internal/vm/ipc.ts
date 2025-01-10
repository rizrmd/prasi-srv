import imported from "./init";

process.on("message", async (arg: any) => {
  const init_arg = {
    ...arg,
    server: (prasi_srv: any) => {},
    content: new Proxy(
      {},
      {
        get(target, p, receiver) {
          return () => {
            console.log(p);
          };
        },
      }
    ),
  };

  await imported.init(init_arg);
  if (arg.action === "init") {
    process.send?.("ok");
  }
});
