import { notification } from "antd";
import axios from "axios";
import { getToken } from "../utils/local-storage";

const jwtInterceoptor = axios.create({
  baseURL: import.meta.env.VITE_BASE_BE_URL,
  //timeout: 30000,
});

jwtInterceoptor.interceptors.request.use((config) => {
  // //console.log(process.env)
  let tokensData = getToken()?.token;
  config.headers.Authorization = `Bearer ${tokensData}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      notification.warning({
        message: "Cảnh báo",
        description: "Tài khoản đã hết hạn. Hãy đăng nhập lại",
        duration: 3000,
      });
      setTimeout(function () {
        //your code to be executed after 1 second
        window.location.href = "/dang-nhap";
      }, 1000);
      return;
    } else {
      return Promise.reject(error);
    }
  }
);

const _makeRequest = (createRequest) => async (args) => {
  const _headers = args.headers ? args.headers : {};
  const body = args.body ? args.body : {};
  const defaultHeaders = {};
  args = {
    ...args,
    headers: {
      ...defaultHeaders,
      ..._headers,
      "Access-Control-Allow-Origin": "*",
    },
    body,
  };
  try {
    const { data, status } = await createRequest(args);
    return { data, status };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export default (options = {}) => {
  const instance = axios.create({
    baseURL: options?.baseURL
      ? options?.baseURL
      : import.meta.env.VITE_BASE_BE_URL,
  });

  return {
    makeRequest: _makeRequest(jwtInterceoptor),
    makeRequestUnauthorized: _makeRequest(instance),
  };
};
