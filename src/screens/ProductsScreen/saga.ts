import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { productsApiRoute } from '../../api/routes'
import { setDatasetToReducerAction } from '../../redux/actions'
import request from '../../sagas/request'
import { PRODUCTS_SCREEN_SAGA } from '../../actions/types'

function* productsScreen() {
  yield put(setDatasetToReducerAction(true, 'products_screen_is_loading'))
  var { data, error, message } = yield call(request, {
    url: productsApiRoute,
    debug: true,
  })
  yield put(setDatasetToReducerAction(false, 'products_screen_is_loading'))

  if (error) {
    yield showToast(!!message ? message : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  //   yield put(setDatasetListToObjectReducerAction(data.products, 'products'))
}

export function* productsScreenSaga() {
  yield takeLatest(PRODUCTS_SCREEN_SAGA, productsScreen)
}
