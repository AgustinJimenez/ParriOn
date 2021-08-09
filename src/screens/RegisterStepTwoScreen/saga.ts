import { call, put } from 'redux-saga/effects'
import { REGISTER_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { registerApiRoute, addressesApiRoute } from '../../api/routes'
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
  var { data, error, message, response } = yield call(request, {
    url: registerApiRoute,
    params: {
      email,
      name: firstNames,
      last_name: lastNames,
      password,
      password_confirmation: password,
      cellphone: phone,
      birthdate: birthDate,
      avatar: null,
    },
    method: 'POST',
    // debug: true,
  })
  yield put(setDatasetToReducerAction(false, 'register_is_loading'))

  if (error) {
    let msg = ''
    if (!!response?.['data']?.['errors'])
      msg = Object.keys(response?.['data']?.['errors'] || [])
        .map((key) => response?.['data']?.['errors']?.[key]?.[0])
        .join(',')
    else msg = message
    yield showToast(!!msg ? msg : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  var { data, error, message, response } = yield call(request, {
    url: addressesApiRoute,
    params: {
      user_id: data?.user?.id,
      address_1: principalAddress,
      address_2: secondaryAddress,
      house_number: houseNumber,
      latitude: location.latitude,
      longitude: location.longitude,
      reference: otherReferences,
    },
    method: 'POST',
    // debug: true,
  })

  if (error) {
    let msg = ''
    if (!!response?.['data']?.['errors'])
      msg = Object.keys(response?.['data']?.['errors'] || [])
        .map((key) => response?.['data']?.['errors']?.[key]?.[0])
        .join(',')
    else msg = message
    yield showToast(!!msg ? msg : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  yield showToast('El registro se realizo exitosamente', {
    type: 'success',
  })
  yield put(setDatasetToReducerAction(email, 'login_email'))
  RootNavigation.dispatch(
    CommonActions.reset({ index: 0, routes: [{ name: LoginScreenRouteName }] })
  )
}

export function* registerSaga() {
  yield takeLatest(REGISTER_SAGA, register)
}
