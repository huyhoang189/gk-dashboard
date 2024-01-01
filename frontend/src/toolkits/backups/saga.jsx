import { call, put, all, takeEvery } from "redux-saga/effects";
import backupSlice from "./slice";
import { getAll, update } from "../../services/backups";
import { ACTION_NAME } from "../../commons/constants";
import { notification } from "antd";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(backupSlice.actions.getBackupsSuccess(data.metadata.data));
    } else {
      yield put(backupSlice.actions.getBackupsError([]));
    }
  } catch (error) {
    yield put(backupSlice.actions.getBackupsError([]));
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
        ? backupSlice.actions.handleBackupSuccess(data)
        : backupSlice.actions.handleBackupError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(backupSlice.actions.getBackups(payload));
    }
  } catch (error) {
    yield put(backupSlice.actions.handleBackupError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(backupSlice.actions.getBackups().type, _getAll),
    yield takeEvery(backupSlice.actions.handleBackup().type, _handleItem),
  ]);
}
