import { TOKEN_VERIFY } from "../commons/constants";

const getToken = () => {
  try {
    const tokens = JSON.parse(localStorage.getItem(TOKEN_VERIFY));
    return tokens;
  } catch (e) {
    return null;
  }
};

const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_VERIFY);
  } catch (e) {
    return false;
  }
};

const insertToken = (payload) => {
  localStorage.setItem(TOKEN_VERIFY, JSON.stringify(payload));
};

export { getToken, clearToken, insertToken };
