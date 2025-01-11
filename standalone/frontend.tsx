import type { ReactElement } from "react";

export const initFrontend = (app: { layout: ReactElement }) => {
  const w = window as any;
  w.prasi_root = app.layout;
};
