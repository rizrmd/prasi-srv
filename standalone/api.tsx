type ApiStatus = "init" | "loading" | "done" | "error";

export const apiClient = <T extends any[], R extends any>(bind: {
  url: string;
  sampleData: (...args: T) => R;
}) => {
  const { url, sampleData } = bind;
  return {
    call: async (...args: T) => {
      return sampleData(...args);
    },
  };
};

export const apiResult = <T extends any[], R extends any>(
  api: {
    call: (...args: T) => Promise<R>;
  },
  opt?: {
    onResult?: (result: {
      status: "error" | "done";
      error: string;
      value?: R;
    }) => void;
  }
) => {
  const result = {
    _bind: null,
    status: "init",
    error: "",
    result: null as R,
    async call(...args: T) {
      const [key, local] = (this as any)._bind as [
        string,
        { set: (fn: (data: any) => void) => void }
      ];

      local.set((data) => {
        data[key].error = "";
        data[key].status = "loading";
      });

      try {
        const result = await api.call(...args);

        local.set((data) => {
          data[key].status = "done";
          data[key].result = result;
        });

        if (opt?.onResult) {
          opt.onResult({ value: result, status: "done", error: "" });
        }

        return result;
      } catch (err: any) {
        local.set((data) => {
          data[key].status = "error";
          data[key].error = err?.message || "Error";
        });

        if (opt?.onResult) {
          opt.onResult({ error: err?.message || "Error", status: "error" });
        }
      }
    },
  } as {
    error: string;
    status: ApiStatus;
    result: Awaited<R>;
    call: (typeof api)["call"];
  };

  return result;
};
