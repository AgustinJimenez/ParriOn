import { call, put /* , call  */, select } from 'redux-saga/effects'
import { EDIT_PROFILE_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import {
  addressesApiRoute,
  changePasswordApiRoute,
  profileApiRoute,
} from '../../api/routes'
// import request from './request'
import { setDatasetToReducerAction } from '../../redux/actions'
import sleep from '../../utils/sleep'
import * as RootNavigation from '../../app/NavigationProvider/service'
import request from '../../sagas/request'
import { CommonActions } from '@react-navigation/routers'
import { ProfileScreenRouteName } from '../screensRoutes'
import { datasetSelector } from '../../redux/selectors'

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
  const user: any = yield select((state) => datasetSelector(state, 'user'))

  var { data, error, message, response } = yield call(request, {
    url: profileApiRoute,
    method: 'POST',
    params: {
      name: firstNames,
      last_name: lastNames,
      birthdate: birthDate,
      avatar: null, //user.avatar,
      cellphone: user.cellphone,
    },
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
    yield put(setDatasetToReducerAction(false, 'edit_profile_is_submiting'))
    return
  }

  var { data, error, message, response } = yield call(request, {
    url: addressesApiRoute,
    method: 'POST',
    params: {
      user_id: user?.id,
      address_1: principalAddress,
      address_2: secondaryAddress,
      house_number: houseNumber,
      latitude: user?.addresses?.[0]?.latitude,
      longitude: user?.addresses?.[0]?.longitude,
      reference: otherReferences,
    },
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
    yield put(setDatasetToReducerAction(false, 'edit_profile_is_submiting'))
    return
  }

  if (!!password) {
    var { data, error, message, response } = yield call(request, {
      url: changePasswordApiRoute,
      method: 'POST',
      params: {
        password,
        password_confirmation: password,
      },
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
      yield put(setDatasetToReducerAction(false, 'edit_profile_is_submiting'))
      return
    }
  }

  var { data, error, message } = yield call(request, {
    url: profileApiRoute,
    // debug: true,
  })
  if (!error && !!data) yield put(setDatasetToReducerAction(data, 'user'))
  yield put(setDatasetToReducerAction(false, 'edit_profile_is_submiting'))
  yield showToast('El perfil se actualizo correctamente', {
    type: 'success',
  })
  RootNavigation.dispatch(CommonActions.goBack())
}

export function* editProfileSagas() {
  yield takeLatest(EDIT_PROFILE_SAGA, editProfile)
}
