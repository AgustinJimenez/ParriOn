import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  BottomTabBarOptions,
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
//SCREENS start
import AuthLoadingScreen from '../../screens/AuthLoadingScreen'
import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import SuccessScreen from '../../screens/SummaryScreen'
import SummaryScreen from '../../screens/SummaryScreen'
import ProfileScreen from '../../screens/ProfileScreen'
/* 
import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
*/
//SCREENS end
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import RegisterStepOneScreen from '../../screens/RegisterStepOneScreen'
import RegisterStepTwoScreen from '../../screens/RegisterStepTwoScreen'
import EditProfileScreen from '../../screens/EditProfileScreen'
import TabNav from '../../components/TabNav'
import CategoriesScreen from '../../screens/CategoriesScreen'
import {
  LoginScreenRouteName,
  HomeScreenRouteName,
  ProfileScreenRouteName,
  RegisterStepOneRouteName,
  RegisterStepTwoRouteName,
  SummaryScreenRouteName,
  EditProfileScreenRouteName,
  CategoriesScreenRouteName,
  ProductsScreenRouteName,
  ShoppingCartScreenRouteName,
  PayScreenRouteName,
} from '../../screens/screensRoutes'
import ProductsScreen from '../../screens/ProductsScreen'
import ShoppingCartScreen from '../../screens/ShoppingCartScreen'
import PayScreen from '../../screens/PayScreen'

//const Drawer = createDrawerNavigator()
const AuthStack = createStackNavigator()
const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name={LoginScreenRouteName} component={LoginScreen} />
    <AuthStack.Screen
      name={RegisterStepOneRouteName}
      component={RegisterStepOneScreen}
    />
    <AuthStack.Screen
      name={RegisterStepTwoRouteName}
      component={RegisterStepTwoScreen}
    />
  </AuthStack.Navigator>
)

const HomeStack = createStackNavigator()
const HomeStackScreens = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name={HomeScreenRouteName} component={HomeScreen} />
    <HomeStack.Screen name={SummaryScreenRouteName} component={SummaryScreen} />
    <HomeStack.Screen name={ProfileScreenRouteName} component={ProfileScreen} />
    <HomeStack.Screen
      name={EditProfileScreenRouteName}
      component={EditProfileScreen}
    />
    <HomeStack.Screen
      name={CategoriesScreenRouteName}
      component={CategoriesScreen}
    />
    <HomeStack.Screen
      name={ProductsScreenRouteName}
      component={ProductsScreen}
    />
    <HomeStack.Screen
      name={ShoppingCartScreenRouteName}
      component={ShoppingCartScreen}
    />
    <HomeStack.Screen name={PayScreenRouteName} component={PayScreen} />
  </HomeStack.Navigator>
)

const Tab = createBottomTabNavigator()
const NavigationProvider = () => {
  let auth_token = useSelector((state) => datasetSelector(state, 'auth_token'))
  if (!auth_token) return <AuthStackScreen />

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'transparent',
      }}
      tabBar={(props: BottomTabBarProps<BottomTabBarOptions>) => (
        <TabNav {...props} />
      )}
    >
      <Tab.Screen name="Home" component={HomeStackScreens} />
    </Tab.Navigator>
  )
}

export default NavigationProvider
