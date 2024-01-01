import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/successs?keyword=${payload?.keyword || ""}&pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}&properties=${
      JSON.stringify(payload?.properties) || "[]"
    }`,
    method: "GET",
  });
};
