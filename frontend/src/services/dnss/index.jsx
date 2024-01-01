import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/dnss`,
    method: "GET",
    data: payload,
  });
};

export const create = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/dnss`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/dnss`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/dnss/${payload.ip}`,
    method: "DELETE",
  });
};
