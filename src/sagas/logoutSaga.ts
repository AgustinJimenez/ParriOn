import { put, takeLatest } from 'redux-saga/effects'
import { LOGOUT_SAGA } from '../actions/types'
import { setDatasetToReducerAction } from '../redux/actions'

function* logout() {
  yield put(setDatasetToReducerAction(null, 'auth_token'))
}

export default function* logoutSaga() {
  yield takeLatest(LOGOUT_SAGA, logout)
}
