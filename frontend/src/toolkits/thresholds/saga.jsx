import { call, put, all, takeEvery } from "redux-saga/effects";
import thresholdSlice from "./slice";
import { getAll, update } from "../../services/thresholds";
import { ACTION_NAME } from "../../commons/constants";
import { notification } from "antd";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(
        thresholdSlice.actions.getThresholdsSuccess(data.metadata.data)
      );
    } else {
      yield put(thresholdSlice.actions.getThresholdsError([]));
    }
  } catch (error) {
    yield put(thresholdSlice.actions.getThresholdsError([]));
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
        ? thresholdSlice.actions.handleThresholdSuccess(data)
        : thresholdSlice.actions.handleThresholdError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(thresholdSlice.actions.getThresholds(payload));
    }
  } catch (error) {
    yield put(thresholdSlice.actions.handleThresholdError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(thresholdSlice.actions.getThresholds().type, _getAll),
    yield takeEvery(thresholdSlice.actions.handleThreshold().type, _handleItem),
  ]);
}
