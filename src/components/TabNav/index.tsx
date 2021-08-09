import React from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native'
import ImageHome from '../../assets/images/home.png'
import ImageMenu from '../../assets/images/menu.png'
import ImageConfig from '../../assets/images/config.png'
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import capitalize from '../../utils/capitalize'
import { CommonActions } from '@react-navigation/native'
import {
  CategoriesScreenRouteName,
  HomeScreenRouteName,
  ProfileScreenRouteName,
} from '../../screens/screensRoutes'
import styles from './styles'
import { CATEGORIES_TYPES } from '../../constants'

const TabNav = ({
  navigation,
  state,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const { routes, index } = state
  const tab = routes?.[index]?.['state']
  let route: any = null
  if (!!tab) route = tab?.['routes']?.[tab?.index]
  else route = routes[index]

  const { t } = useTranslation()
  return (
    <View style={styles.nav}>
      {[
        {
          disabled: route.name === HomeScreenRouteName,
          image: ImageHome,
          text: capitalize(t('home')),
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: HomeScreenRouteName }],
              })
            )
          },
        },
        {
          image: ImageMenu,
          text: capitalize(t('categories')),
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: HomeScreenRouteName },
                  {
                    name: CategoriesScreenRouteName,
                    params: {
                      type: CATEGORIES_TYPES.CATEGORIES,
                    },
                  },
                ],
              })
            )
          },
        },
        {
          image: ImageConfig,
          text: capitalize(t('account')),
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: HomeScreenRouteName },
                  { name: ProfileScreenRouteName },
                ],
              })
            )
          },
        },
      ].map(({ image, text, onPress, disabled }, key) => (
        <TouchableOpacity
          style={styles.button}
          key={key}
          onPress={onPress}
          disabled={disabled}
        >
          <Image
            source={image}
            resizeMode="contain"
            style={styles.button_icon}
          />
          <Text style={styles.button_text}>{text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}
export default TabNav
