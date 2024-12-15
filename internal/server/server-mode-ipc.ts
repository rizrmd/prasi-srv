export const startServerWithIPC = () => {
  return Bun.serve({
    fetch(request, server) {},
    websocket: { message(ws, message) {} },
  });
};
