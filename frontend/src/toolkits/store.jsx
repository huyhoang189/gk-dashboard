import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

import appSlice from "./app/slice";
import blacklistSlice from "./blacklists/slice";
import whitelistSlice from "./whitelists/slice";
import challengeSlice from "./challenges/slice";
import successSlice from "./successs/slice";
import configSlice from "./configs/slice";
import thresholdSlice from "./thresholds/slice";
import emailSlice from "./emails/slice";
import dnsSlice from "./dnss/slice";
import databaseSlice from "./databases/slice";
import historySlice from "./histories/slice";
import backupSlice from "./backups/slice";
import roleSlice from "./roles/slice";
import userSlice from "./users/slice";
import authSlice from "./auth/slice";
import departmentSlice from "./departments/slice";

const sagaMiddleware = createSagaMiddleware();
const middleware = [
  ...getDefaultMiddleware({ thunk: false, serializableCheck: false }),
  sagaMiddleware,
];

export const store = configureStore({
  reducer: {
    apps: appSlice.reducer,
    blacklists: blacklistSlice.reducer,
    whitelists: whitelistSlice.reducer,
    challenges: challengeSlice.reducer,
    successs: successSlice.reducer,
    configs: configSlice.reducer,
    thresholds: thresholdSlice.reducer,
    emails: emailSlice.reducer,
    dnss: dnsSlice.reducer,
    databases: databaseSlice.reducer,
    histories: historySlice.reducer,
    backups: backupSlice.reducer,
    roles: roleSlice.reducer,
    users: userSlice.reducer,
    auths: authSlice.reducer,
    departments: departmentSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);
