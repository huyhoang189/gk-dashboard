import { call, put, all, takeEvery } from "redux-saga/effects";
import dnsSlice from "./slice";
import { getAll, create, deleteItem } from "../../services/dnss";
import { ACTION_NAME } from "../../commons/constants";

function* _getAll({ payload }) {
  try {
    const { data, status } = yield call(getAll, {
      payload,
    });
    if (status === 200 || status === 201) {
      //   console.log(data);
      yield put(dnsSlice.actions.getDnssSuccess(data.metadata.data));
    } else {
      yield put(dnsSlice.actions.getDnssError([]));
    }
  } catch (error) {
    yield put(dnsSlice.actions.getDnssError([]));
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
      ({ data, status } = yield call(deleteItem, { ip: item.ip }));
    }

    const isSuccess = status === 200 || status === 201;

    yield put(
      isSuccess
        ? dnsSlice.actions.handleDnsSuccess(data)
        : dnsSlice.actions.handleDnsError([])
    );

    if (isSuccess) {
      yield put(dnsSlice.actions.getDnss(payload));
    }
  } catch (error) {
    yield put(dnsSlice.actions.handleDnsError());
  }
}

export default function* saga() {
  yield all([
    yield takeEvery(dnsSlice.actions.getDnss().type, _getAll),
    yield takeEvery(dnsSlice.actions.handleDns().type, _handleItem),
  ]);
}
