import { css } from "goober";
import dayjs from "dayjs";
import type { ReactElement } from "react";

export const initFrontend = (app: { layout: ReactElement }) => {
  const w = window as any;
  w.css = css;
  w.dayjs = dayjs;
  w.prasi_root = app.layout;
};
