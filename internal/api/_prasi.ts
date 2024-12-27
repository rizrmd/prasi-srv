import { apiContext } from "utils/api-context";

export const _ = {
  url: "/_prasi/**",
  async api() {
    const { req } = apiContext(this);
  },
};
