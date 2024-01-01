import { call, put, all, takeEvery } from "redux-saga/effects";
import whitelistSlice from "./slice";
import { getAll, create, deleteItem } from "../../services/whitelists";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(
        whitelistSlice.actions.getWhitelistsSuccess(data.metadata.data)
      );
    } else {
      yield put(whitelistSlice.actions.getWhitelistsError([]));
    }
  } catch (error) {
    yield put(whitelistSlice.actions.getWhitelistsError([]));
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
        ? whitelistSlice.actions.handleWhitelistSuccess(data)
        : whitelistSlice.actions.handleWhitelistError([])
    );

    if (isSuccess) {
      yield put(whitelistSlice.actions.getWhitelists(payload));
    }
  } catch (error) {
    yield put(whitelistSlice.actions.handleWhitelistError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(whitelistSlice.actions.getWhitelists().type, _getAll),
    yield takeEvery(whitelistSlice.actions.handleWhitelist().type, _handleItem),
  ]);
}
