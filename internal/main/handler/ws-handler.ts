import type { WebSocketHandler } from "bun";

export const createWsHandler = (): WebSocketHandler<{ url: URL }> => {
  return { message(ws, message) {} };
};
