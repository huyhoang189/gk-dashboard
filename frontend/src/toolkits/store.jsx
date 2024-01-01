import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-saga";

import appSlice from "./app/slice";
import blacklistSlice from "./blacklists/slice";
import whitelistSlice from "./whitelists/slice";

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
  },
  middleware,
});

sagaMiddleware.run(rootSaga);
