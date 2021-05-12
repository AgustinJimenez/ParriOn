import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { productsApiRoute } from '../../api/routes'
import {
  setDatasetListToObjectReducerAction,
  setDatasetToReducerAction,
} from '../../redux/actions'
import request from '../../sagas/request'
import { HOME_SCREEN_SAGA } from '../../actions/types'

function* homeScreen() {
  /* 
  yield put(setDatasetToReducerAction(true, 'home_loading'))
  var { data, error, message } = yield call(request, {
    url: productsApiRoute,
    debug: true,
  })
  yield put(setDatasetToReducerAction(false, 'home_loading'))

  if (error) {
    yield showToast(!!message ? message : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  yield put(setDatasetListToObjectReducerAction(data.products, 'products'))
 */
}

export function* homeScreenSaga() {
  yield takeLatest(HOME_SCREEN_SAGA, homeScreen)
}
