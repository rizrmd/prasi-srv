import { join } from "path";
import { defineApiBase } from "./api/api-base";

export const internal_prasi_api = defineApiBase({
  path: join(__dirname, "..", "..", "..", "internal/api"),
});
