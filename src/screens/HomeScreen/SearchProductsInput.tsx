import React from 'react'
import { Icon, Input, Item } from 'native-base'
import globalStyles from '../../theme'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetToReducerAction } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'

const SearchProductsInput = ({}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const search_products_input_ref: React.MutableRefObject<any> = React.useRef()
  const setSearchedProduct = React.useCallback((searched_product: string) => {
    dispatch(setDatasetToReducerAction(searched_product, 'searched_product'))
  }, [])
  const searched_product = useSelector((state) =>
    datasetSelector(state, 'searched_product')
  )

  return (
    <Item regular style={globalStyles.inputContainer}>
      <Input
        ref={search_products_input_ref}
        placeholder={t('search_products')}
        placeholderTextColor="white"
        style={[globalStyles.input]}
        returnKeyType="done"
        value={searched_product}
        onChangeText={setSearchedProduct}
        // onSubmitEditing={() => inputPassword?.current?._root?.focus()}
      />
      <Icon type="Feather" name="search" style={{ color: 'white' }} />
    </Item>
  )
}
export default SearchProductsInput
