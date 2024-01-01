import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/emails`,
    method: "GET",
    data: payload,
  });
};

export const create = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/emails`,
    method: "POST",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/emails/${payload.email}`,
    method: "DELETE",
  });
};
