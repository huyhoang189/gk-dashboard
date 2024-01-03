import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/listens?keyword=${payload?.keyword || ""}&pageSize=${
      payload?.pageSize || 10
    }&pageNumber=${payload?.pageNumber || 1}`,
    method: "GET",
  });
};

export const create = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/listens`,
    method: "POST",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/listens`,
    method: "PUT",
    data: payload,
  });
};

export const deleteItem = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/listens/${payload.id}`,
    method: "DELETE",
  });
};
