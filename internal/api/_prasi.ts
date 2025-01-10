import { apiContext, type ApiResponse } from "utils/api-context";

export const _ = {
  url: "/_prasi/**",
  async api(): ApiResponse {
    const { url, prasi, req } = apiContext(this);
    const action = url.pathname.split("/").slice(2).shift() || "";

    const params = req.params;
    switch (action) {
      case "route":
        return json(await prasi.content.all_routes());
      case "pages":
        return json(await prasi.content.pages(params.ids));
      case "comps":
        return json(await prasi.content.comps(params.ids));

      case "load.js":
    }
    
    if (action === "route") {
      return json(await prasi.content.all_routes());
    }

    return {
      body: { action },
      headers: {},
    };
  },
};

const json = (body: any) => {
  return { body, headers: { "content-type": "application/json" } };
};
