export type PrasiContent = {
  prepare: (site_id: string) => void | Promise<void>;
  page_urls: () => Promise<Record<string, string>>;
  pages: (page_ids: string[]) => Promise<IPage[]>;
  comps: (comp_ids: string[]) => Promise<IComp[]>;
  layouts: () => Promise<ILayout[]>;
  file: (
    url: string,
    options?: {
      accept: ("gzip" | "br" | "zstd")[];
    }
  ) => Promise<{ body: any; compression: "none" | "gzip" | "br" | "zstd" }>;
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
