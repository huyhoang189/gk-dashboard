import { call, put, all, takeEvery } from "redux-saga/effects";
import emailHeaderSlice from "./slice";
import { getAll, update } from "../../services/email-headers";
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
        emailHeaderSlice.actions.getEmailHeadersSuccess(data.metadata.data)
      );
    } else {
      yield put(emailHeaderSlice.actions.getEmailHeadersError([]));
    }
  } catch (error) {
    yield put(emailHeaderSlice.actions.getEmailHeadersError([]));
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
        ? emailHeaderSlice.actions.handleEmailHeaderSuccess(data)
        : emailHeaderSlice.actions.handleEmailHeaderError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(emailHeaderSlice.actions.getEmailHeaders(payload));
    }
  } catch (error) {
    yield put(emailHeaderSlice.actions.handleEmailHeaderError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(emailHeaderSlice.actions.getEmailHeaders().type, _getAll),
    yield takeEvery(
      emailHeaderSlice.actions.handleEmailHeader().type,
      _handleItem
    ),
  ]);
}
