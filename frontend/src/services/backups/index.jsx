import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/backups`,
    method: "GET",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/backups`,
    method: "PUT",
    data: payload,
  });
};
