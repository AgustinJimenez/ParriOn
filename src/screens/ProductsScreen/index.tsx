import React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { productsScreenSagaAction } from '../../actions'
import MainContainer from '../../components/MainContainer'
import ProductCard from '../../components/ProductCard'
import { ProductInterface } from '../../interfaces'
import { datasetSelector } from '../../redux/selectors'
import styles from './styles'
import ProductSelectionPanel from '../../components/ProductSelectionPanel'

const ProductsScreen = ({ route }: any) => {
  const dispatch = useDispatch()
  const { item, type } = route.params
  const products: ProductInterface[] = useSelector((state) =>
    datasetSelector(state, 'products', { list_format: true })
  )
  const fetchDatas = React.useCallback(() => {
    dispatch(productsScreenSagaAction())
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
        {products.map((product: ProductInterface, key: number) => {
          return (
            <ProductCard
              key={key}
              id={product?.id}
              title={product.name}
              subtitle={product.description}
              price={product.price}
              image_url={product['images']?.[0]?.['url']}
              containerStyle={styles.item}
              onPress={() => {}}
            />
          )
        })}
      </View>
      <ProductSelectionPanel />
    </MainContainer>
  )
}
export default ProductsScreen
