export const ipcSend = (
  msg: { type: "init" } | { type: "ready"; port: number }
) => {
  process?.send?.(msg);
};
