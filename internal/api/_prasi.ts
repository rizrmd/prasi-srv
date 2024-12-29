import { apiContext, type ApiResponse } from "utils/api-context";

export const _ = {
  url: "/_prasi/**",
  async api(): ApiResponse {
    const { req } = apiContext(this);

    return {
      body: { head: "asd" },
      headers: {},
    };
  },
};
