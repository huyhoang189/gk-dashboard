import { call, put, all, takeEvery } from "redux-saga/effects";
import challengeSlice from "./slice";
import { getAll } from "../../services/challenges";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, payload);
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(challengeSlice.actions.getChallengesSuccess(data.metadata));
    } else {
      yield put(challengeSlice.actions.getChallengesError([]));
    }
  } catch (error) {
    yield put(challengeSlice.actions.getChallengesError([]));
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(challengeSlice.actions.getChallenges().type, _getAll),
  ]);
}
