import { statSync, watch, writeFileSync } from "fs";
import { prasi } from "main/prasi-var";
import { join } from "path";

export const watchApi = () => {
  const base_dir = join(process.cwd(), "backend", "api");
  let timeout: NodeJS.Timer;
  watch(base_dir, { recursive: true }, (event, filename) => {
    if (filename && filename.endsWith(".ts")) {
      const file_path = join(base_dir, filename);
      const stats = statSync(file_path);
      if (stats.size === 0) {
        const new_file_content = `import { apiContext } from "system/api";

export const _ = {
  url: "",
  async api() {
    const { db } = apiContext(this);

    return {}
  }
}

/**
To fix, please generate export default using apiClient as reference.
Replace api arguments to use sampleData arguments. Please query using db and prisma schema. Always export const _, Do not export default.


[--- PASTE apiClient HERE ---]


**/
`;
        writeFileSync(file_path, new_file_content);
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        prasi.handler.api?.rescan();
      }, 300);
    }
  });
};
