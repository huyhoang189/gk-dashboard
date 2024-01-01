import { all } from "redux-saga/effects";
import blacklistSaga from "./blacklists/saga";
import whitelistSaga from "./whitelists/saga";
export default function* rootSaga() {
  yield all([blacklistSaga(), whitelistSaga()]);
}
