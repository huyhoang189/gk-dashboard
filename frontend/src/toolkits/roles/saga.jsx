import { call, put, all, takeEvery } from "redux-saga/effects";
import roleSlice from "./slice";
import { getAll, create, deleteItem, update } from "../../services/roles";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(roleSlice.actions.getRolesSuccess(data.metadata.data));
    } else {
      yield put(roleSlice.actions.getRolesError([]));
    }
  } catch (error) {
    yield put(roleSlice.actions.getRolesError([]));
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
      ({ data, status } = yield call(deleteItem, { id: item.role }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? roleSlice.actions.handleRoleSuccess(data)
        : roleSlice.actions.handleRoleError([])
    );

    if (isSuccess) {
      yield put(roleSlice.actions.getRoles(payload));
    }
  } catch (error) {
    yield put(roleSlice.actions.handleRoleError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(roleSlice.actions.getRoles().type, _getAll),
    yield takeEvery(roleSlice.actions.handleRole().type, _handleItem),
  ]);
}
