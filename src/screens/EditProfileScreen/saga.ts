import { call, put /* , call  */ } from 'redux-saga/effects'
import { EDIT_PROFILE_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { loginApiRoute, profileApiRoute } from '../../api/routes'
// import request from './request'
import { setDatasetToReducerAction } from '../../redux/actions'
import sleep from '../../utils/sleep'
import * as RootNavigation from '../../app/NavigationProvider/service'
import request from '../../sagas/request'

export function* editProfile({
  firstNames,
  lastNames,
  birthDate,
  password,
  principalAddress,
  secondaryAddress,
  houseNumber,
  otherReferences,
}: any) {
  yield put(setDatasetToReducerAction(true, 'edit_profile_is_submiting'))
  /* 
  var { data, error, message } = yield call(request, {
    url: profileApiRoute,
    method: 'POST',
    params: { 
      firstNames,
      lastNames,
      birthDate,
      password,
      principalAddress,
      secondaryAddress,
      houseNumber,
      otherReferences,
    },
    // debug: true,
  })  
  */
  /* 
  if (error && !!message) {
    yield showToast(message, { type: 'danger' })
    return
  }

  if (!error && !!data['access_token']) {
    yield put(setDatasetToReducer(data['access_token'], 'auth_token'))
    var { data, error, message } = yield call(request, {
      url: profileApiRoute,
      // debug: true,
    })
    if (!error && !!data) yield put(setDatasetToReducer(data, 'user'))
  } */
  yield put(setDatasetToReducerAction(false, 'edit_profile_is_submiting'))
}

export function* editProfileSagas() {
  yield takeLatest(EDIT_PROFILE_SAGA, editProfile)
}
