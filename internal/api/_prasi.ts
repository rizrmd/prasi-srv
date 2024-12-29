import { apiContext, type ApiResponse } from "utils/api-context";

export const _ = {
  url: "/_prasi/**",
  async api(): ApiResponse {
    const { url, prasi } = apiContext(this);
    const action = url.pathname.split("/").slice(2).shift() || "";

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
