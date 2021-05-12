import { call, put } from 'redux-saga/effects'
import { REGISTER_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { registerApiRoute } from '../../api/routes'
import { setDatasetToReducerAction } from '../../redux/actions'
import * as RootNavigation from '../../app/NavigationProvider/service'
import request from '../../sagas/request'
import { LoginScreenRouteName } from '../screensRoutes'
import { CommonActions } from '@react-navigation/routers'

export function* register({
  email,
  firstNames,
  password,
  lastNames,
  phone,
  birthDate,
  principalAddress,
  secondaryAddress,
  houseNumber,
  otherReferences,
  location,
}: any) {
  yield put(setDatasetToReducerAction(true, 'register_is_loading'))
  var { data, error, message } = yield call(request, {
    url: registerApiRoute,
    params: {
      email,
      name: firstNames,
      password,
      password_confirmation: password,
      lastNames,
      phone,
      birthDate,
      principalAddress,
      secondaryAddress,
      houseNumber,
      otherReferences,
      location,
    },
    method: 'POST',
    // debug: true,
  })
  yield put(setDatasetToReducerAction(false, 'register_is_loading'))

  if (error) {
    yield showToast(!!message ? message : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  yield showToast('El registro se realizo exitosamente', {
    type: 'success',
  })

  RootNavigation.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name: LoginScreenRouteName }] })
  )
}

export function* registerSaga() {
  yield takeLatest(REGISTER_SAGA, register)
}
