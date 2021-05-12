import { call, put } from 'redux-saga/effects'
import { CATEGORIES_SCREEN_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import { brandsApiRoute, categoriesApiRoute } from '../../api/routes'
import {
  setDatasetListToObjectReducerAction,
  setDatasetToReducerAction,
} from '../../redux/actions'
import request from '../../sagas/request'
import { CATEGORIES_TYPES } from '../../constants'

function* categoriesScreen({ payload: { type } }: any) {
  yield put(setDatasetToReducerAction(true, 'categories_are_loading'))
  var data, error, message
  if (type === CATEGORIES_TYPES.CATEGORIES) {
    var { data, error, message } = yield call(request, {
      url: categoriesApiRoute,
      //   debug: true,
    })
  } else if (type === CATEGORIES_TYPES.BRANDS) {
    var { data, error, message } = yield call(request, {
      url: brandsApiRoute,
      //   debug: true,
    })
  }
  yield put(setDatasetToReducerAction(false, 'categories_are_loading'))

  if (error) {
    yield showToast(!!message ? message : 'Ocurrio un error inesperado', {
      type: 'danger',
    })
    return
  }

  if (type === CATEGORIES_TYPES.CATEGORIES) {
    yield put(setDatasetListToObjectReducerAction(data.categories, type))
  } else if (type === CATEGORIES_TYPES.BRANDS) {
    yield put(setDatasetListToObjectReducerAction(data.brands, type))
  }
}

export function* categoriesSaga() {
  yield takeLatest(CATEGORIES_SCREEN_SAGA, categoriesScreen)
}
