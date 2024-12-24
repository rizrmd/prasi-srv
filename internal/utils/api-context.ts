import mime from "mime";
import { binaryExtensions } from "./binary-ext";

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
    res: {
      ...ctx.res,
      send: (body) => {
        ctx.res = createResponse(body, { res: ctx.res });
      },
      sendStatus: (code: number) => {
        ctx.res._status = code;
      },
      setHeader: (key: string, value: string) => {
        ctx.res.headers.append(key, value);
      },
    } as Response & {
      send: (body?: string | object) => void;
      setHeader: (key: string, value: string) => void;
      sendStatus: (code: number) => void;
    },
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