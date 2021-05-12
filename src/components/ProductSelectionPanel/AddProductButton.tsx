import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { colors, scale } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { datasetSelector, productSelectedSelector } from '../../redux/selectors'
import Product from '../../models/Product'
import { SummaryScreenRouteName } from '../../screens/screensRoutes'

const AddProductButton = () => {
  const navigation = useNavigation()
  const selected_product: Product = useSelector((state) =>
    productSelectedSelector(state)
  )
  const shopping_cart: any = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )
  const addProductToShoppingCart = React.useCallback(() => {
    navigation.navigate(SummaryScreenRouteName)
  }, [shopping_cart, navigation, SummaryScreenRouteName])

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary(),
        flexDirection: 'row',
        paddingHorizontal: scale(0.5),
        paddingVertical: scale(0.5),
        borderRadius: scale(0.3),
        marginVertical: scale(0.4),
      }}
      onPress={addProductToShoppingCart}
    >
      <Text
        style={{
          color: colors.secondary(),
          fontSize: scale(0.55),
          paddingRight: scale(0.6),
        }}
      >
        Agregar al carrito
      </Text>
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: scale(0.3),
          paddingVertical: scale(0.1),
          borderRadius: scale(0.15),
        }}
      >
        <Text
          style={{
            fontSize: scale(0.45),
            color: colors.secondary(),
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        >
          {selected_product.price_formated} Gs.
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default AddProductButton
