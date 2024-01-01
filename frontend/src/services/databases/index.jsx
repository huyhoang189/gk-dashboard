import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/databases`,
    method: "GET",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/databases`,
    method: "PUT",
    data: payload,
  });
};
