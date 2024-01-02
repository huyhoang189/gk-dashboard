import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/users`,
    method: "GET",
    data: payload,
  });
};

export const login = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/users/login`,
    method: "POST",
    data: payload,
  });
};

export const create = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/users`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/users`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/users/${payload.id}`,
    method: "DELETE",
  });
};
