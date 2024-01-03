import { call, put, all, takeEvery } from "redux-saga/effects";
import sessionSlice from "./slice";
import { getAll, update } from "../../services/sessions";
import { ACTION_NAME } from "../../commons/constants";
import { notification } from "antd";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(sessionSlice.actions.getSessionsSuccess(data.metadata.data));
    } else {
      yield put(sessionSlice.actions.getSessionsError([]));
    }
  } catch (error) {
    yield put(sessionSlice.actions.getSessionsError([]));
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
        ? sessionSlice.actions.handleSessionSuccess(data)
        : sessionSlice.actions.handleSessionError([])
    );

    if (isSuccess) {
      notification.success({
        message: "THÀNH CÔNG",
        description: "Cập nhật cấu hình thành công!",
      });
      yield put(sessionSlice.actions.getSessions(payload));
    }
  } catch (error) {
    yield put(sessionSlice.actions.handleSessionError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(sessionSlice.actions.getSessions().type, _getAll),
    yield takeEvery(sessionSlice.actions.handleSession().type, _handleItem),
  ]);
}
