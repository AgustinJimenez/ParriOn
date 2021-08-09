import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import MainContainer from '../../components/MainContainer'
import styles from './styles'
import ShoppingCartProductList from './ShoppingCartProductList'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import Product from '../../models/Product'
import { Icon } from 'native-base'
import { scale } from '../../theme'
import numberFormat from '../../utils/numberFormat'
import { PayScreenRouteName } from '../screensRoutes'
import { useNavigation } from '@react-navigation/core'

const FinishShoppingButton = ({ data }: any) => {
  const navigation = useNavigation()
  let total = 0
  data.map((product_item: any) => {
    total += product_item.quantity * product_item.price
  })
  const goToPayScreen = React.useCallback(() => {
    navigation.navigate(PayScreenRouteName)
  }, [])
  return (
    <TouchableOpacity style={styles.finishShoppingBtn} onPress={goToPayScreen}>
      <Text style={styles.finishShoppingTxt}>Finalizar pedido</Text>
      <View style={styles.finishShoppingTotalPriceTxtContainer}>
        <View style={styles.finishShoppingTotalPriceTxtSubContainer}>
          <Text style={styles.finishShoppingTotalPriceTxt}>
            {numberFormat(total)} Gs.
          </Text>
        </View>
      </View>
      <Icon
        type="AntDesign"
        name="arrowright"
        style={styles.finishShoppingArrowIcon}
      />
    </TouchableOpacity>
  )
}

const ShoppingCartScreen = ({}) => {
  const { t } = useTranslation()
  const shopping_cart: any = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )
  const shopping_cart_products_ids: string[] = Object.keys(shopping_cart)
  const products: Product[] = useSelector((state) =>
    datasetSelector(state, 'products', { id: shopping_cart_products_ids })
  )
  const shoppingCartData = products.map((product: Product) => {
    product = new Product(product)
    return {
      name: product.name,
      image: product.image_url,
      id: product.id,
      price: product.price,
      quantity: shopping_cart[product.id]['quantity'],
      weight_controlled_product: product.weight_controlled_product,
    }
  })
  // console.log('PRODUCTS ===> ', { products })

  return (
    <View style={{ flex: 1 }}>
      <MainContainer hasGoBackButton hasTopFlameLogo title={t('your_cart')}>
        <View style={styles.productsInCartContainer}>
          {!!products.length && (
            <>
              <Text style={styles.productsInCartContainerTxt}>Tenes</Text>
              <Text
                style={[
                  styles.productsInCartContainerTxt,
                  styles.productsInCartContainerColorTxt,
                ]}
              >
                {products.length} producto{products.length > 1 ? `s` : ''}
              </Text>
              <Text style={styles.productsInCartContainerTxt}>en tu</Text>
              <Text style={styles.productsInCartContainerTxt}>carrito</Text>
            </>
          )}
          {!products.length && (
            <Text
              style={[styles.productsInCartContainerTxt, styles.noProductsTxt]}
            >
              No hay productos en el carrito
            </Text>
          )}
        </View>
        <ShoppingCartProductList data={shoppingCartData} />
      </MainContainer>
      {!!products?.length && <FinishShoppingButton data={shoppingCartData} />}
    </View>
  )
}
export default ShoppingCartScreen
