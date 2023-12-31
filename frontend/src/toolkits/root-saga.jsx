import { all } from "redux-saga/effects";
import blacklistSaga from "./blacklists/saga";
export default function* rootSaga() {
  yield all([blacklistSaga()]);
}
