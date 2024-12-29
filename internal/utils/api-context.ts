import mime from "mime";
import { binaryExtensions } from "./binary-ext";
import type { PrasiGlobal } from "main/prasi-var";
export type ApiResponse = Promise<void | {
  body: any;
  headers: any;
  status?: number;
}>;
const parseQueryParams = (ctx: any) => {
  const pageHref = ctx.req.url;
  const searchParams = new URLSearchParams(
    pageHref.substring(pageHref.indexOf("?"))
  );
  const result: any = {};
  searchParams.forEach((v, k) => {
    result[k] = v;
  });

  return result as any;
};

export const apiContext = (ctx: any) => {
  ctx.req.params = ctx.params;

  if (ctx.params["_0"]) {
    ctx.params["_"] = ctx.params["_0"];
    delete ctx.params["_0"];
  }

  ctx.req.query_parameters = parseQueryParams(ctx);

  return {
    req: ctx.req as Request & { params: any; query_parameters: any },
    params: ctx.params as Record<string, any>,
    url: ctx.url as URL,
    prasi: ctx.prasi as PrasiGlobal,
  };
};

(BigInt.prototype as any).toJSON = function (): string {
  return `BigInt::` + this.toString();
};

export const createResponse = (
  body: any,
  opt?: {
    headers?: any;
    res?: any;
    rewrite?: (arg: {
      body: Bun.BodyInit;
      headers: Headers | any;
    }) => Bun.BodyInit;
  }
) => {
  const status =
    typeof opt?.res?._status === "number" ? opt?.res?._status : undefined;

  const content_type = opt?.headers?.["content-type"];
  const is_binary = binaryExtensions.includes(
    mime.getExtension(content_type) || ""
  );
  const headers = { ...(opt?.headers || {}) } as Record<string, string>;

  let pre_content = body;
  if (opt?.rewrite) {
    pre_content = opt.rewrite({ body: pre_content, headers });
  }

  let content: any =
    typeof pre_content === "string" || is_binary
      ? pre_content
      : JSON.stringify(pre_content);

  let res = new Response(
    content,
    status
      ? {
          status,
        }
      : undefined
  );

  for (const [k, v] of Object.entries(headers)) {
    res.headers.append(k, v);
  }
  const cur = opt?.res as Response;
  if (cur) {
    cur.headers.forEach((value, key) => {
      res.headers.append(key, value);
    });
  }

  if (typeof body === "object" && !res.headers.has("content-type")) {
    res.headers.append("content-type", "application/json");
  }

  res.headers.append(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );

  res.headers.append("X-Content-Type-Options", "nosniff");

  return res;
};
