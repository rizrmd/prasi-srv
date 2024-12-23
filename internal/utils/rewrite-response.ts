export const rewriteResponse = (
  body: Bun.BodyInit,
  arg: {
    headers?: any;
    status?: number;
    opt?: {
      rewrite?: (arg: {
        body: Bun.BodyInit;
        headers: Headers | any;
      }) => Bun.BodyInit;
    };
  }
) => {
  const headers =
    arg.headers instanceof Headers ? arg.headers : new Headers(arg.headers);

  if (arg.opt?.rewrite) {
    return new Response(arg.opt.rewrite({ body: body, headers }) as any, {
      headers,
      status: arg.status,
    });
  }

  return new Response(body as any, { headers, status: arg.status });
};
