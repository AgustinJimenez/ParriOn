import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { colors, scale } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector, productSelectedSelector } from '../../redux/selectors'
import Product from '../../models/Product'
import { ShoppingCartScreenRouteName } from '../../screens/screensRoutes'
import { setDatasetToReducerAction } from '../../redux/actions'
import numberFormat from '../../utils/numberFormat'

const AddProductButton = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const selected_product: Product = useSelector((state) =>
    productSelectedSelector(state)
  )

  const selected_product_quantity: any = useSelector((state) =>
    datasetSelector(state, 'selected_product_quantity')
  )
  const shopping_cart: any = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )

  const alreadyOnCart = React.useMemo(() => {
    return !!shopping_cart?.[selected_product?.id]
  }, [shopping_cart, selected_product])

  const updateShoppingCartProduct = React.useCallback(() => {
    let updatedShoppingCart = shopping_cart
    updatedShoppingCart[selected_product.id] = {
      quantity: selected_product_quantity,
    }

    dispatch(setDatasetToReducerAction(null, 'selected_product_id'))
    setTimeout(
      () =>
        dispatch(
          setDatasetToReducerAction(updatedShoppingCart, 'shopping_cart')
        ),
      500
    )

    navigation.navigate(ShoppingCartScreenRouteName)
  }, [
    shopping_cart,
    navigation,
    ShoppingCartScreenRouteName,
    selected_product_quantity,
  ])

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
      onPress={updateShoppingCartProduct}
    >
      <Text
        style={{
          color: colors.support(),
          fontSize: scale(0.55),
          paddingRight: scale(0.6),
        }}
      >
        {alreadyOnCart ? 'Editar cantidad' : 'Agregar al carrito'}
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
            color: colors.support(),
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        >
          {numberFormat(selected_product_quantity * selected_product.price)} Gs.
        </Text>
      </View>
    </TouchableOpacity>
  )
}
export default AddProductButton
