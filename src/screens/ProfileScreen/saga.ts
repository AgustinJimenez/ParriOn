import { call, put, select } from 'redux-saga/effects'
import {
  PROFILE_SCREEN_SAGA,
  UPDATE_PROFILE_PHOTO_SAGA,
} from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import { profileApiRoute } from '../../api/routes'
import { setDatasetToReducerAction } from '../../redux/actions'
import request from '../../sagas/request'
import { datasetSelector } from '../../redux/selectors'
import { UserInterface } from '../../interfaces'
import showToast from '../../utils/showToast'
import { profileScreenSagaAction } from '../../actions'

function* profile() {
  yield put(setDatasetToReducerAction(false, 'profile_photo_is_loading'))
  var { data, error, message } = yield call(request, {
    url: profileApiRoute,
    // debug: true,
  })
  if (!error && !!data) yield put(setDatasetToReducerAction(data, 'user'))
}

export function* profileSagas() {
  yield takeLatest(PROFILE_SCREEN_SAGA, profile)
}

function* updateProfilePhoto({ base64 }: any) {
  yield put(setDatasetToReducerAction(true, 'profile_photo_is_loading'))
  const user: UserInterface = yield select((state) =>
    datasetSelector(state, 'user')
  )
  var { data, error, message, response } = yield call(request, {
    url: profileApiRoute,
    method: 'POST',
    data: {
      name: user.name,
      last_name: user.last_name,
      birthdate: user.birthdate,
      avatar: base64,
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
  } else yield put(profileScreenSagaAction())

  yield showToast('Foto de perfil actualizada correctamente', {
    type: 'success',
  })
  yield put(setDatasetToReducerAction(false, 'profile_photo_is_loading'))
}
export function* updateProfilePhotoSaga() {
  yield takeLatest(UPDATE_PROFILE_PHOTO_SAGA, updateProfilePhoto)
}
