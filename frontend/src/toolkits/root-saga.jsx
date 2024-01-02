import { all } from "redux-saga/effects";
import blacklistSaga from "./blacklists/saga";
import whitelistSaga from "./whitelists/saga";
import challengeSaga from "./challenges/saga";
import successSaga from "./successs/saga";
import configSaga from "./configs/saga";
import thresholdSaga from "./thresholds/saga";
import emailSaga from "./emails/saga";
import dnsSaga from "./dnss/saga";
import databaseSaga from "./databases/saga";
import historySaga from "./histories/saga";
import backupSaga from "./backups/saga";
import roleSaga from "./roles/saga";
import userSaga from "./users/saga";
import authSaga from "./auth/saga";
import departmentSaga from "./departments/saga";
export default function* rootSaga() {
  yield all([
    blacklistSaga(),
    whitelistSaga(),
    challengeSaga(),
    successSaga(),
    configSaga(),
    thresholdSaga(),
    emailSaga(),
    dnsSaga(),
    databaseSaga(),
    historySaga(),
    backupSaga(),
    roleSaga(),
    userSaga(),
    authSaga(),
    departmentSaga(),
  ]);
}
