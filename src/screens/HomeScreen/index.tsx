import React from 'react'
import {
  Text,
  FlatList,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  Platform,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MainContainer from '../../components/MainContainer'
import ImageActivaElAsado from '../../assets/images/activa_el_asado.png'
import { homeScreenSagaAction } from '../../actions'
import { colors, scale } from '../../theme'
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
import { setDatasetToReducerAction } from '../../redux/actions'
import ImageFlame from '../../assets/images/flame.png'

const HomeScreen = ({}) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const home_screen_is_loading: any = useSelector((state) =>
    datasetSelector(state, 'home_screen_is_loading')
  )
  const home_first_line_of_products_ids: [] = useSelector((state) =>
    datasetSelector(state, 'home_first_line_of_products_ids')
  )
  const first_line_of_products: ProductInterface[] = useSelector((state) =>
    datasetSelector(state, 'products', {
      list_type: 'array',
      id: home_first_line_of_products_ids,
    })
  )
  const home_second_line_of_products_ids: [] = useSelector((state) =>
    datasetSelector(state, 'home_second_line_of_products_ids')
  )
  const second_line_of_products: ProductInterface[] = useSelector((state) =>
    datasetSelector(state, 'products', {
      list_type: 'array',
      id: home_second_line_of_products_ids,
    })
  )

  const fetchScreenDatas = React.useCallback(() => {
    dispatch(homeScreenSagaAction())
  }, [dispatch, homeScreenSagaAction])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchScreenDatas()
    })

    return unsubscribe
  }, [navigation, homeScreenSagaAction, dispatch, fetchScreenDatas])

  React.useEffect(() => {
    dispatch(setDatasetToReducerAction('', 'searched_product'))
  }, [])

  return (
    <MainContainer
      hasAvatar
      hasShoppingCart
      hasTopFlameLogo={false}
      onRefresh={fetchScreenDatas}
      refreshing={home_screen_is_loading}
    >
      <View
        style={{
          top: scale(Platform.select({ ios: -1, android: -0.5 })),
        }}
      >
        <Image
          source={ImageFlame}
          resizeMode="contain"
          style={{
            width: scale(3),
            height: scale(3),
            alignSelf: 'center',
            top: scale(Platform.select({ ios: 1.7, android: 1.75 })),
          }}
        />
        <Image
          source={ImageActivaElAsado}
          resizeMode="contain"
          style={{
            width: scale(8),
            height: scale(2.5),
            alignSelf: 'center',
          }}
        />
      </View>
      <View style={{ paddingHorizontal: scale(0.3) }}>
        <SearchProductsInput />
        <SearchSuggestions />
        <Text style={styles.listTitle}>
          {capitalize(t('for_the_ideal_barbecue'), { firstOnly: true })}
        </Text>
        {!second_line_of_products?.length && home_screen_is_loading && (
          <ActivityIndicator style={styles.listLoader} size="large" />
        )}

        <FlatList
          data={first_line_of_products}
          refreshControl={
            <RefreshControl
              refreshing={
                !first_line_of_products?.length && home_screen_is_loading
              }
              tintColor={colors.warning()}
            />
          }
          keyExtractor={(product: ProductInterface) => `${product.id}`}
          renderItem={({ item: { id }, index }: any) => {
            return <ProductCard key={index} id={id} />
          }}
          horizontal
        />

        <Text style={[styles.listTitle, { marginTop: scale(0.6) }]}>
          {capitalize(t('so_that_nothing_is_missing'), { firstOnly: true })}
        </Text>
        {!first_line_of_products?.length && home_screen_is_loading && (
          <ActivityIndicator style={styles.listLoader} size="large" />
        )}

        <FlatList
          data={second_line_of_products}
          refreshControl={
            <RefreshControl
              refreshing={
                !first_line_of_products?.length && home_screen_is_loading
              }
              tintColor={colors.warning()}
            />
          }
          keyExtractor={(product: ProductInterface) => `${product.id}`}
          renderItem={({ item: { id }, key, separators }: any) => (
            <ProductCard id={id} key={key} />
          )}
          horizontal
        />
      </View>
      <ProductSelectionPanel />
    </MainContainer>
  )
}
export default HomeScreen
