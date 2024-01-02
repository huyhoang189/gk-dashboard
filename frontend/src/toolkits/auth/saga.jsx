import { call, put, all, takeEvery } from "redux-saga/effects";
import authSlice from "./slice";
import { login } from "../../services/users";
import { getToken, clearToken, insertToken } from "../../utils/local-storage";
// import jwt_decode from "jwt-decode";
export const getAuth = (state) => state.Auth;

function* _checkAuthentication() {
  try {
    const user = getToken();
    if (user) {
      yield put(authSlice.actions.loginSuccess(user));
      insertToken(user);
    } else {
      window.location.pathname = "./login";
    }
  } catch (error) {
    yield put(
      authSlice.actions.loginError({ error: "Đăng nhập lại hệ thống!" })
    );
  }
}

function* _login({ payload }) {
  try {
    let data, status;
    ({ data, status } = yield call(login, payload));
    if (status === 200 || status === 201) {
      yield put(authSlice.actions.loginSuccess(data.metadata.data));
      insertToken(data.metadata.data);
      window.location.pathname = "./";
    }
  } catch (error) {
    //console.log(error);
    yield put(
      authSlice.actions.loginError({
        error: "Tài khoản hoặc mật khẩu không chính xác!",
      })
    );
  }
}

function* _logout() {
  try {
    yield clearToken();
    // window.location.href = './dang-nhap'
    yield put(authSlice.actions.checkAuthentication());
  } catch (error) {
    //console.log(error);
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(
      authSlice.actions.checkAuthentication().type,
      _checkAuthentication
    ),
    yield takeEvery(authSlice.actions.login().type, _login),
    yield takeEvery(authSlice.actions.logout().type, _logout),
  ]);
}
