import { call, put, all, takeEvery } from "redux-saga/effects";
import successSlice from "./slice";
import { getAll } from "../../services/successs";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(successSlice.actions.getSuccesssSuccess(data.metadata));
    } else {
      yield put(successSlice.actions.getSuccesssError([]));
    }
  } catch (error) {
    yield put(successSlice.actions.getSuccesssError([]));
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(successSlice.actions.getSuccesss().type, _getAll),
  ]);
}
