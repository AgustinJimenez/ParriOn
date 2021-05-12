import { call, put /* , call  */ } from 'redux-saga/effects'
import { LOGIN_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { loginApiRoute, profileApiRoute } from '../../api/routes'
// import request from './request'
import { setDatasetToReducerAction } from '../../redux/actions'
import sleep from '../../utils/sleep'
import * as RootNavigation from '../../app/NavigationProvider/service'
import request from '../../sagas/request'

export function* login({ email = '', password = '' }) {
  yield put(setDatasetToReducerAction(true, 'login_is_loading'))
  var { data, error, message } = yield call(request, {
    url: loginApiRoute,
    params: { email, password },
    method: 'POST',
    // debug: true,
  })
  if (error && !!message) {
    yield showToast(message, { type: 'danger' })
    return
  }

  if (!error && !!data['access_token']) {
    yield put(setDatasetToReducerAction(data['access_token'], 'auth_token'))
    var { data, error, message } = yield call(request, {
      url: profileApiRoute,
      // debug: true,
    })
    if (!error && !!data) yield put(setDatasetToReducerAction(data, 'user'))
  }
  yield put(setDatasetToReducerAction(false, 'login_is_loading'))
}

export function* loginSagas() {
  yield takeLatest(LOGIN_SAGA, login)
}
