import type { ServerCtx } from "utils/server-ctx";

export type PrasiContent = {
  prepare: (site_id: string) => void | Promise<void>;
  init: () => Promise<void>;
  started: () => Promise<void>;
  route: (ctx: ServerCtx) => Promise<Response | void>;
};

export type ILayout = {
  id: string;
  name: string;
  url: string;
  content_tree: any;
  is_default_layout: boolean;
};

export type IPage = {
  id: string;
  name: string;
  url: string;
  content_tree: any;
};

export type IComp = {
  id: string;
  content_tree: any;
};

export type ISiteInfo = {
  id: string;
  name: string;
  config?: {
    api_url: string;
  };
  responsive: string;
  domain: string;
};
