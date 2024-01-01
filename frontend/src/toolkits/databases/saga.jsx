import { call, put, all, takeEvery } from "redux-saga/effects";
import databaseSlice from "./slice";
import { getAll, update } from "../../services/databases";
import { ACTION_NAME } from "../../commons/constants";
import { notification } from "antd";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(databaseSlice.actions.getDatabasesSuccess(data.metadata.data));
    } else {
      yield put(databaseSlice.actions.getDatabasesError([]));
    }
  } catch (error) {
    yield put(databaseSlice.actions.getDatabasesError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;

    if (actionName === ACTION_NAME.UPDATE) {
      ({ data, status } = yield call(update, item));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? databaseSlice.actions.handleDatabaseSuccess(data)
        : databaseSlice.actions.handleDatabaseError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(databaseSlice.actions.getDatabases(payload));
    }
  } catch (error) {
    yield put(databaseSlice.actions.handleDatabaseError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(databaseSlice.actions.getDatabases().type, _getAll),
    yield takeEvery(databaseSlice.actions.handleDatabase().type, _handleItem),
  ]);
}
