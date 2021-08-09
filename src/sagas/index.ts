import { all } from 'redux-saga/effects'
import changeLanguageSagas from './changeLanguageSagas'
import updateNetworkStatusSagas from './updateNetworkStatusSagas'
import checkNetworkStatusSaga from './checkNetworkStatusSaga'
import logoutSaga from './logoutSaga'

import { loginSagas } from '../screens/LoginScreen/saga'
import { registerSaga } from '../screens/RegisterStepTwoScreen/saga'
import { editProfileSagas } from '../screens/EditProfileScreen/saga'
import { categoriesSaga } from '../screens/CategoriesScreen/saga'
import { homeScreenSaga } from '../screens/HomeScreen/saga'
import { productsScreenSaga } from '../screens/ProductsScreen/saga'
import {
  profileSagas,
  updateProfilePhotoSaga,
} from '../screens/ProfileScreen/saga'

export default function* rootSaga() {
  yield all([
    logoutSaga(),
    checkNetworkStatusSaga(),
    updateNetworkStatusSagas(),
    loginSagas(),
    changeLanguageSagas(),
    registerSaga(),
    editProfileSagas(),
    categoriesSaga(),
    homeScreenSaga(),
    productsScreenSaga(),
    profileSagas(),
    updateProfilePhotoSaga(),
  ])
}
