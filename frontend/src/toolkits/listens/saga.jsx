import { call, put, all, takeEvery } from "redux-saga/effects";
import listenSlice from "./slice";
import { getAll, create, deleteItem, update } from "../../services/listens";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(listenSlice.actions.getListensSuccess(data.metadata));
    } else {
      yield put(listenSlice.actions.getListensError([]));
    }
  } catch (error) {
    yield put(listenSlice.actions.getListensError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;
    // console.log(actionName, item);

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.UPDATE) {
      ({ data, status } = yield call(update, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { id: item.id }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? listenSlice.actions.handleListenSuccess(data)
        : listenSlice.actions.handleListenError([])
    );

    if (isSuccess) {
      yield put(listenSlice.actions.getListens(payload));
    }
  } catch (error) {
    yield put(listenSlice.actions.handleListenError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(listenSlice.actions.getListens().type, _getAll),
    yield takeEvery(listenSlice.actions.handleListen().type, _handleItem),
  ]);
}
