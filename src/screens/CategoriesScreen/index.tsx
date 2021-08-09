import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesScreenSagaAction } from '../../actions'
import ListItems from '../../components/ListItems'
import MainContainer from '../../components/MainContainer'
import { CATEGORIES_TYPES } from '../../constants'
import { datasetSelector } from '../../redux/selectors'
import { colors, scale } from '../../theme'
import { ProductsScreenRouteName } from '../screensRoutes'

const styles = StyleSheet.create({
  listItem: {
    marginTop: scale(0.4),
  },
  loader: {
    paddingVertical: scale(0.3),
  },
  noDataTxt: {
    paddingVertical: scale(0.4),
    fontSize: scale(0.5),
    color: colors.white(),
    alignSelf: 'center',
  },
})

const CategoriesScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const brands_show_only_list = useSelector((state) =>
    datasetSelector(state, 'brands_show_only_list')
  )
  const categories_show_only_list = useSelector((state) =>
    datasetSelector(state, 'categories_show_only_list')
  )
  const promotions_show_only_list = useSelector((state) =>
    datasetSelector(state, 'promotions_show_only_list')
  )
  const brands = useSelector((state) =>
    datasetSelector(state, 'brands', {
      list_type: 'array',
      id: brands_show_only_list,
    })
  )
  const categories = useSelector((state) =>
    datasetSelector(state, 'categories', {
      list_type: 'array',
      id: categories_show_only_list,
    })
  )
  const promotions = useSelector((state) =>
    datasetSelector(state, 'promotions', {
      list_type: 'array',
      id: promotions_show_only_list,
    })
  )
  const categories_are_loading = useSelector((state) =>
    datasetSelector(state, 'categories_are_loading')
  )
  const { type } = route.params

  const dataList: [] = React.useMemo(() => {
    let data = []
    switch (type) {
      case CATEGORIES_TYPES.BRANDS:
        data = brands
        break

      case CATEGORIES_TYPES.CATEGORIES:
        data = categories
        break

      case CATEGORIES_TYPES.PROMOTIONS:
        data = promotions
        break

      default:
        break
    }
    return data
  }, [type, categories, brands, promotions])

  const fetchDatas = React.useCallback(() => {
    dispatch(categoriesScreenSagaAction({ type }))
  }, [type, dispatch, categoriesScreenSagaAction])

  React.useEffect(() => {
    fetchDatas()
  }, [fetchDatas])

  const selectCategory = React.useCallback(
    (item) => {
      navigation.navigate(ProductsScreenRouteName, { item, type })
    },
    [navigation, type]
  )

  return (
    <MainContainer
      hasGoBackButton
      hasShoppingCart
      title={t(type)}
      refreshing={categories_are_loading}
      onRefresh={fetchDatas}
    >
      {(() => {
        if (!categories_are_loading && !dataList?.length)
          return <Text style={styles.noDataTxt}>No hay datos</Text>
        else if (categories_are_loading && !dataList?.length)
          return <ActivityIndicator style={styles.loader} size="large" />
        else if (dataList?.length)
          return (
            <ListItems
              style={styles.listItem}
              data={dataList
                .sort((a, b) => a['order'] - b['order'])
                .map(({ name, images, id, order }: any) => ({
                  id,
                  order,
                  name,
                  image: images?.[0],
                }))}
              subtitle={t('show_products')}
              onPress={(item: any) => selectCategory(item)}
            />
          )
      })()}
    </MainContainer>
  )
}
export default CategoriesScreen
