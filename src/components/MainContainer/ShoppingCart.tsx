import React from 'react'
import { Image, TouchableOpacity, Platform } from 'react-native'
import ImageShoppingCart from '../../assets/images/shopping-cart.png'
import ImageShoppingCartDot from '../../assets/images/shopping-cart-dot.png'
import { scale } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { ShoppingCartScreenRouteName } from '../../screens/screensRoutes'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

const ShoppingCart = ({ style = {}, onPress = () => {} }) => {
  const width = !!style['width'] ? style['width'] : scale(0.9)
  const navigation = useNavigation()
  const shopping_cart: any = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )
  const goToShoppingCartScreen = React.useCallback(() => {
    navigation.navigate(ShoppingCartScreenRouteName)
  }, [navigation])

  const hasNotifications = React.useMemo(() => {
    return !!Object.keys(shopping_cart)?.length
  }, [shopping_cart])
  return (
    <TouchableOpacity
      style={[
        {
          width,
          height: width,
          position: 'absolute',
          right: scale(0.1),
          top: Platform.OS === 'ios' ? scale(1.2) : scale(0.5),
        },
        style /* , { backgroundColor: 'red' } */,
      ]}
      onPress={goToShoppingCartScreen}
    >
      <Image
        source={ImageShoppingCart}
        resizeMode="contain"
        style={{ width, height: width }}
      />
      {hasNotifications && (
        <Image
          source={ImageShoppingCartDot}
          resizeMode="contain"
          style={{
            position: 'absolute',
            right: 0,
            width: scale(),
            height: scale(),
          }}
        />
      )}
    </TouchableOpacity>
  )
}

export default ShoppingCart
