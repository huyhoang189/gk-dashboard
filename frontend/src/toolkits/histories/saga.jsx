import { call, put, all, takeEvery } from "redux-saga/effects";
import historySlice from "./slice";
import { getAll } from "../../services/histories";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(historySlice.actions.getHistoriesSuccess(data.metadata));
    } else {
      yield put(historySlice.actions.getHistoriesError([]));
    }
  } catch (history) {
    yield put(historySlice.actions.getHistoriesError([]));
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(historySlice.actions.getHistories().type, _getAll),
  ]);
}
