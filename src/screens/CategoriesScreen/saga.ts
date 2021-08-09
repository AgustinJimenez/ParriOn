import { call, put, select } from 'redux-saga/effects'
import { CATEGORIES_SCREEN_SAGA } from '../../actions/types'
import { takeLatest } from 'redux-saga/effects'
import showToast from '../../utils/showToast'
import {
  brandsApiRoute,
  brandsSearchApiRoute,
  categoriesApiRoute,
  categoriesSearchApiRoute,
} from '../../api/routes'
import {
  setDatasetListToObjectReducerAction,
  setDatasetListToReducer,
  setDatasetToReducerAction,
} from '../../redux/actions'
import request from '../../sagas/request'
import { CATEGORIES_TYPES } from '../../constants'
import { datasetSelector } from '../../redux/selectors'

function* categoriesScreen({ payload: { type, text } }: any) {
  const searched_product = yield select((state) =>
    datasetSelector(state, 'searched_product', { default_value: '' })
  )
  yield put(setDatasetToReducerAction(true, 'categories_are_loading'))
  var data, error, message
  if (type === CATEGORIES_TYPES.CATEGORIES) {
    var { data, error, message } = yield call(request, {
      url: categoriesSearchApiRoute,
      params: {
        text: searched_product,
      },
      // debug: true,
    })
  } else if (type === CATEGORIES_TYPES.BRANDS) {
    var { data, error, message } = yield call(request, {
      url: brandsSearchApiRoute,
      params: {
        text: searched_product,
      },
      // debug: true,
    })
  } else if (type === CATEGORIES_TYPES.PROMOTIONS) {
    var { data, error, message } = yield call(request, {
      url: brandsSearchApiRoute,
      params: {
        text: searched_product,
      },
      // debug: true,
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
    yield put(setDatasetListToReducer(data.categories, type))
    yield put(
      setDatasetToReducerAction(
        data.categories.map(({ id }: any) => id),
        `${type}_show_only_list`
      )
    )
  } else if (type === CATEGORIES_TYPES.BRANDS) {
    yield put(setDatasetListToReducer(data.brands, type))
    yield put(
      setDatasetToReducerAction(
        data.brands.map(({ id }: any) => id),
        `${type}_show_only_list`
      )
    )
  } else if (type === CATEGORIES_TYPES.PROMOTIONS) {
    yield put(setDatasetListToReducer(data?.promotions || [], type))
    yield put(
      setDatasetToReducerAction(
        data?.promotions?.map?.(({ id }: any) => id),
        `${type}_show_only_list`
      )
    )
  }
}

export function* categoriesSaga() {
  yield takeLatest(CATEGORIES_SCREEN_SAGA, categoriesScreen)
}
