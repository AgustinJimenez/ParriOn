import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesScreenSagaAction } from '../../actions'
import ListItems from '../../components/ListItems'
import MainContainer from '../../components/MainContainer'
import datasetReducer from '../../redux/datasetReducer'
import { CATEGORIES_TYPES } from '../../constants'
import { datasetSelector } from '../../redux/selectors'
import { scale } from '../../theme'
import { ProductsScreenRouteName } from '../screensRoutes'

const styles = StyleSheet.create({
  listItem: {
    marginTop: scale(0.4),
  },
})

const CategoriesScreen = ({ route, navigation }: any) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const brands = useSelector((state) =>
    datasetSelector(state, 'brands', { list_format: true })
  )
  const categories = useSelector((state) =>
    datasetSelector(state, 'categories', { list_format: true })
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

      default:
        break
    }
    return data
  }, [type, categories, brands])

  const fetchDatas = React.useCallback(() => {
    dispatch(categoriesScreenSagaAction({ type }))
  }, [type, dispatch, categoriesScreenSagaAction])

  React.useEffect(() => {
    fetchDatas()
  }, [])

  return (
    <MainContainer
      hasGoBackButton
      hasShoppingCart
      title={t(type)}
      refreshing={categories_are_loading}
      onRefresh={fetchDatas}
    >
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
        onPress={(item: any) =>
          navigation.navigate(ProductsScreenRouteName, { item, type })
        }
      />
    </MainContainer>
  )
}
export default CategoriesScreen
