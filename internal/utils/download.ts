import { dirAsync } from "fs-jetpack";
import { dirname } from "path";

export const downloadFile = async (
  url: string,
  filePath: string,
  progress?: (rec: number, total: number) => void
) => {
  try {
    const _url = new URL(url);
    if (_url.hostname === "localhost") {
      _url.hostname = "127.0.0.1";
    }
    const res = await fetch(_url as any);
    if (res.body) {
      await dirAsync(dirname(filePath));
      const file = Bun.file(filePath);

      const writer = file.writer();
      const reader = res.body.getReader();

      // Step 3: read the data
      let receivedLength = 0; // received that many bytes at the moment
      let chunks = []; // array of received binary chunks (comprises the body)
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          writer.end();
          break;
        }

        chunks.push(value);
        writer.write(value);
        receivedLength += value.length;

        if (progress) {
          progress(
            receivedLength,
            parseInt(res.headers.get("content-length") || "0")
          );
        }
      }
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
