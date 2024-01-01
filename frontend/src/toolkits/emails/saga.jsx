import { call, put, all, takeEvery } from "redux-saga/effects";
import emailSlice from "./slice";
import { getAll, create, deleteItem } from "../../services/emails";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(emailSlice.actions.getEmailsSuccess(data.metadata.data));
    } else {
      yield put(emailSlice.actions.getEmailsError([]));
    }
  } catch (error) {
    yield put(emailSlice.actions.getEmailsError([]));
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
      ({ data, status } = yield call(deleteItem, { email: item.email }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? emailSlice.actions.handleEmailSuccess(data)
        : emailSlice.actions.handleEmailError([])
    );

    if (isSuccess) {
      yield put(emailSlice.actions.getEmails(payload));
    }
  } catch (error) {
    yield put(emailSlice.actions.handleEmailError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(emailSlice.actions.getEmails().type, _getAll),
    yield takeEvery(emailSlice.actions.handleEmail().type, _handleItem),
  ]);
}
