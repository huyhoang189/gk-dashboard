import { call, put, all, takeEvery } from "redux-saga/effects";
import configSlice from "./slice";
import { getAll, update } from "../../services/configs";
import { ACTION_NAME } from "../../commons/constants";
import { notification } from "antd";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(configSlice.actions.getConfigsSuccess(data.metadata.data));
    } else {
      yield put(configSlice.actions.getConfigsError([]));
    }
  } catch (error) {
    yield put(configSlice.actions.getConfigsError([]));
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
        ? configSlice.actions.handleConfigSuccess(data)
        : configSlice.actions.handleConfigError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(configSlice.actions.getConfigs(payload));
    }
  } catch (error) {
    yield put(configSlice.actions.handleConfigError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(configSlice.actions.getConfigs().type, _getAll),
    yield takeEvery(configSlice.actions.handleConfig().type, _handleItem),
  ]);
}
