import {
  UPDATE_NETWORK_STATUS_SAGAS,
  SET_ON_DATASET_REDUCER,
  CHECK_NETWORK_SAGA,
  LOGOUT_SAGA,
  LOGIN_SAGA,
  REGISTER_SAGA,
  EDIT_PROFILE_SAGA,
  CATEGORIES_SCREEN_SAGA,
  HOME_SCREEN_SAGA,
  PRODUCTS_SCREEN_SAGA,
} from './types'

export const updatNetworkStatusAction = (network: any) => ({
  type: UPDATE_NETWORK_STATUS_SAGAS,
  network,
})
export const checkNetworkStatusAction = () => ({
  type: CHECK_NETWORK_SAGA,
})
export const setNetworkStatusAction = (network: any) => ({
  type: SET_ON_DATASET_REDUCER,
  dataset_name: 'network',
  data: network,
})
export const logoutAction = () => ({
  type: LOGOUT_SAGA,
})
export const setLangReducer = (lang_id: string) => ({
  type: SET_ON_DATASET_REDUCER,
  dataset_name: 'lang',
  data: lang_id,
})
export const logAction = (email: string, password: string) => ({
  type: LOGIN_SAGA,
  email,
  password,
})

export const registerAction = ({
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
}: any) => ({
  type: REGISTER_SAGA,
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
})

export const editProfileAction = ({
  firstNames,
  lastNames,
  birthDate,
  password,
  principalAddress,
  secondaryAddress,
  houseNumber,
  otherReferences,
}: any) => ({
  type: EDIT_PROFILE_SAGA,
  firstNames,
  lastNames,
  birthDate,
  password,
  principalAddress,
  secondaryAddress,
  houseNumber,
  otherReferences,
})

export const homeScreenSagaAction = () => ({
  type: HOME_SCREEN_SAGA,
})

export const categoriesScreenSagaAction = ({ type }: any) => ({
  type: CATEGORIES_SCREEN_SAGA,
  payload: { type },
})

export const productsScreenSagaAction = () => ({
  type: PRODUCTS_SCREEN_SAGA,
})
