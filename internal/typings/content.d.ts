import type { ServerCtx } from "typings/server";

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
