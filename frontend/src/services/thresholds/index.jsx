import createAPIServices from "../../commons/base-api";

const api = createAPIServices();

export const getAll = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/thresholds`,
    method: "GET",
    data: payload,
  });
};

export const update = (payload) => {
  return api.makeRequestUnauthorized({
    url: `/thresholds`,
    method: "PUT",
    data: payload,
  });
};
