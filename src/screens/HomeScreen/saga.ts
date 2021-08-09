import { call, put } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { productsApiRoute } from '../../api/routes'
import {
  setDatasetListToReducer,
  setDatasetToReducerAction,
  setMultipleDatasetsToReducer,
} from '../../redux/actions'
import request from '../../sagas/request'
import { HOME_SCREEN_SAGA } from '../../actions/types'

function* homeScreen() {
  yield put(setDatasetToReducerAction(true, 'home_screen_is_loading'))
  var { data, error, message } = yield call(request, {
    url: productsApiRoute,
    // debug: true,
  })
  yield put(setDatasetToReducerAction(false, 'home_screen_is_loading'))
  if (error) {
    yield showToast(!!message ? message : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }
  yield put(
    setMultipleDatasetsToReducer([
      setDatasetListToReducer(data.products, 'products'),
      setDatasetToReducerAction(
        data.products
          .map(({ id }: any) => id)
          .filter(({ highlighted }: any) => highlighted),
        'home_first_line_of_products_ids'
      ),
      setDatasetToReducerAction(
        data.products
          .map(({ id }: any) => id)
          .filter(({ highlighted }: any) => highlighted),
        'home_second_line_of_products_ids'
      ),
    ])
  )
}

export function* homeScreenSaga() {
  yield takeLatest(HOME_SCREEN_SAGA, homeScreen)
}
