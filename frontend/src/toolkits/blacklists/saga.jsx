import { call, put, all, takeEvery } from "redux-saga/effects";
import blacklistSlice from "./slice";
import { getAll, create, deleteItem } from "../../services/blacklists";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(
        blacklistSlice.actions.getBlacklistsSuccess(data.metadata.data)
      );
    } else {
      yield put(blacklistSlice.actions.getBlacklistsError([]));
    }
  } catch (error) {
    yield put(blacklistSlice.actions.getBlacklistsError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;
    console.log(actionName, item);

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { ip: item.ip }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? blacklistSlice.actions.handleBlacklistSuccess(data)
        : blacklistSlice.actions.handleBlacklistError([])
    );

    if (isSuccess) {
      yield put(blacklistSlice.actions.getBlacklists(payload));
    }
  } catch (error) {
    yield put(blacklistSlice.actions.handleBlacklistError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(blacklistSlice.actions.getBlacklists().type, _getAll),
    yield takeEvery(blacklistSlice.actions.handleBlacklist().type, _handleItem),
  ]);
}
