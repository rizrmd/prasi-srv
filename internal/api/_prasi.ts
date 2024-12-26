import { apiContext } from "utils/api-context";

export const _ = {
  url: "/_prasi/**",
  async api() {
    const { req, res } = apiContext(this);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
  },
};
