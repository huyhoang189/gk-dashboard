import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/roles`,
    method: "GET",
    data: payload,
  });
};

export const create = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/roles`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/roles`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/roles/${payload.email}`,
    method: "DELETE",
  });
};
