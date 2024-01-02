import { call, put, all, takeEvery } from "redux-saga/effects";
import userSlice from "./slice";
import { getAll, create, deleteItem, update } from "../../services/users";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(userSlice.actions.getUsersSuccess(data.metadata.data));
    } else {
      yield put(userSlice.actions.getUsersError([]));
    }
  } catch (error) {
    yield put(userSlice.actions.getUsersError([]));
  }
}

function* _handleItem({ payload }) {
  try {
    const { actionName, item } = payload;
    let data, status;
    console.log(actionName, item);

    if (actionName === ACTION_NAME.CREATE) {
      ({ data, status } = yield call(create, item));
    } else if (actionName === ACTION_NAME.UPDATE) {
      ({ data, status } = yield call(update, item));
    } else if (actionName === ACTION_NAME.DELETE) {
      ({ data, status } = yield call(deleteItem, { id: item.user_id }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? userSlice.actions.handleUserSuccess(data)
        : userSlice.actions.handleUserError([])
    );

    if (isSuccess) {
      yield put(userSlice.actions.getUsers(payload));
    }
  } catch (error) {
    yield put(userSlice.actions.handleUserError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(userSlice.actions.getUsers().type, _getAll),
    yield takeEvery(userSlice.actions.handleUser().type, _handleItem),
  ]);
}
