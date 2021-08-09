import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { productsScreenSagaAction } from '../../actions'
import MainContainer from '../../components/MainContainer'
import ProductCard from '../../components/ProductCard'
import { ProductInterface } from '../../interfaces'
import { datasetSelector } from '../../redux/selectors'
import styles from './styles'
import ProductSelectionPanel from '../../components/ProductSelectionPanel'
import { CATEGORIES_TYPES } from '../../constants'

const ProductsScreen = ({ route }: any) => {
  const dispatch = useDispatch()
  const { item, type } = route.params
  let products: ProductInterface[] = useSelector((state) =>
    datasetSelector(state, 'products', { list_type: 'array' })
  )
  const products_screen_is_loading = useSelector((state) =>
    datasetSelector(state, 'products_screen_is_loading')
  )
  products = products.filter((product) => {
    let allow = false
    switch (type) {
      case CATEGORIES_TYPES.BRANDS:
        allow = product?.brand_id === item.id
        break

      case CATEGORIES_TYPES.CATEGORIES:
        allow = product?.category_id === item.id
        break

      default:
        break
    }
    return allow
  })
  const fetchDatas = React.useCallback(() => {
    dispatch(productsScreenSagaAction({ type }))
  }, [dispatch, productsScreenSagaAction])

  React.useEffect(() => {
    fetchDatas()
  }, [])
  // console.log('ProductsScreen ===> ', { item, type, products })
  return (
    <MainContainer
      hasGoBackButton
      hasShoppingCart
      hasTopFlameLogo
      title={item.name}
    >
      <View style={styles.container}>
        {(() => {
          // console.log('here ===> ', { products_screen_is_loading, products })
          if (!products_screen_is_loading && !products?.length)
            return <Text style={styles.noDataTxt}>No hay datos</Text>
          else if (products_screen_is_loading && !products?.length)
            return <ActivityIndicator style={styles.loader} size="large" />
          else if (products?.length)
            return products.map((product: ProductInterface, key: number) => {
              return (
                <ProductCard
                  key={key}
                  id={product?.id}
                  containerStyle={styles.item}
                  onPress={() => {}}
                />
              )
            })
        })()}
      </View>
      <ProductSelectionPanel />
    </MainContainer>
  )
}
export default ProductsScreen
