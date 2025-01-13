import { join } from "path";
import { defineApiBase } from "./api/api-base";

export const standalone_api = defineApiBase({
  path: join(process.cwd(), "backend", "api"),
});
