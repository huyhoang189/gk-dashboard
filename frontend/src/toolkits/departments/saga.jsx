import { call, put, all, takeEvery } from "redux-saga/effects";
import departmentSlice from "./slice";
import { getAll, create, deleteItem, update } from "../../services/departments";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(
        departmentSlice.actions.getDepartmentsSuccess(data.metadata.data)
      );
    } else {
      yield put(departmentSlice.actions.getDepartmentsError([]));
    }
  } catch (error) {
    yield put(departmentSlice.actions.getDepartmentsError([]));
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
      ({ data, status } = yield call(deleteItem, { id: item.id }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? departmentSlice.actions.handleDepartmentSuccess(data)
        : departmentSlice.actions.handleDepartmentError([])
    );

    if (isSuccess) {
      yield put(departmentSlice.actions.getDepartments(payload));
    }
  } catch (error) {
    yield put(departmentSlice.actions.handleDepartmentError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(departmentSlice.actions.getDepartments().type, _getAll),
    yield takeEvery(
      departmentSlice.actions.handleDepartment().type,
      _handleItem
    ),
  ]);
}
