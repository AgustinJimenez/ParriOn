import React from 'react'
import { Text, FlatList, View, Image, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MainContainer from '../../components/MainContainer'
import ImageActivaElAsado from '../../assets/images/activa_el_asado.png'
import { homeScreenSagaAction, logoutAction } from '../../actions'
import { scale } from '../../theme'
import ImageFlame from '../../assets/images/flame.png'
import { useTranslation } from 'react-i18next'
import capitalize from '../../utils/capitalize'
import ProductCard from '../../components/ProductCard'
import { datasetSelector } from '../../redux/selectors'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import SearchSuggestions from './SearchSuggestions'
import SearchProductsInput from './SearchProductsInput'
import { ProductInterface } from '../../interfaces'
import ProductSelectionPanel from '../../components/ProductSelectionPanel'

const HomeScreen = ({}) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const logout = () => dispatch(logoutAction())

  const products: ProductInterface[] = useSelector((state) =>
    datasetSelector(state, 'products', { list_format: true })
  )
  const selected_product_id = useSelector((state) =>
    datasetSelector(state, 'selected_product_id')
  )
  const selected_product: any = useSelector((state) =>
    datasetSelector(state, 'products', { id: selected_product_id })
  )

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(homeScreenSagaAction())
    })

    return unsubscribe
  }, [navigation, homeScreenSagaAction, dispatch])

  return (
    <MainContainer hasAvatar hasShoppingCart hasTopFlameLogo={false}>
      <Image
        source={ImageFlame}
        resizeMode="contain"
        style={{
          height: scale(3),
          alignSelf: 'center',
          position: 'absolute',
          top: scale(Platform.select({ ios: 0.5, android: 0.5 })),
        }}
      />
      <Image
        source={ImageActivaElAsado}
        resizeMode="contain"
        style={{
          width: scale(8),
          height: scale(2.5),
          alignSelf: 'center',
          marginTop: scale(1.7),
          marginBottom: -scale(0.3),
        }}
      />
      <View style={{ paddingHorizontal: scale(0.3) }}>
        <SearchProductsInput />
        <SearchSuggestions />
        <Text style={styles.listTitle}>
          {capitalize(t('for_the_ideal_barbecue'), { firstOnly: true })}
        </Text>
        <FlatList
          data={products}
          keyExtractor={(product: ProductInterface) => `${product.id}`}
          renderItem={({
            item: { id, name, description, price, images },
            index,
          }: any) => {
            return (
              <ProductCard
                id={id}
                key={index}
                title={name}
                subtitle={description}
                price={price}
                image_url={images?.[0]?.['url']}
              />
            )
          }}
          horizontal
        />
        <Text style={[styles.listTitle, { marginTop: scale(0.6) }]}>
          {capitalize(t('so_that_nothing_is_missing'), { firstOnly: true })}
        </Text>
        <FlatList
          data={products}
          keyExtractor={(product: ProductInterface) => `${product.id}`}
          renderItem={({
            item: { id, name, description, price, images },
            key,
            separators,
          }: any) => (
            <ProductCard
              id={id}
              key={key}
              title={name}
              subtitle={description}
              price={price}
              image_url={images?.[0]?.['url']}
            />
          )}
          horizontal
        />
      </View>
      <ProductSelectionPanel />
    </MainContainer>
  )
}
export default HomeScreen
