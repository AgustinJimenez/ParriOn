import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import { useTranslation } from 'react-i18next'
import {
  setDatasetToReducerAction,
  setMultipleDatasetsToReducer,
} from '../../redux/actions'
import { datasetSelector, productSelectedSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import { colors, scale } from '../../theme'
import capitalize from '../../utils/capitalize'
import AddProductButton from './AddProductButton'
import ProductCountSelection from './ProductCountSelection'
import ImageFlame from '../../assets/images/flame.png'
import Product from '../../models/Product'

const ProductSelectionPanel = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const selected_product_id: number | 0 = useSelector((state) =>
    datasetSelector(state, 'selected_product_id')
  )
  const panelIsOpen = React.useMemo(() => {
    return !!selected_product_id
  }, [selected_product_id])
  let product_count_modal_is_visible = useSelector((state) =>
    datasetSelector(state, 'product_count_modal_is_visible')
  )
  const selected_product: Product = useSelector((state) =>
    productSelectedSelector(state)
  )
  const selectProductById = React.useCallback(
    (selected_product_id: number | null, quantity = 1) => {
      dispatch(
        setMultipleDatasetsToReducer([
          setDatasetToReducerAction(selected_product_id, 'selected_product_id'),
          setDatasetToReducerAction(quantity, 'selected_product_quantity'),
        ])
      )
    },
    [dispatch, setDatasetToReducerAction]
  )
  const shopping_cart = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )
  const selected_product_quantity = useSelector((state) =>
    datasetSelector(state, 'selected_product_quantity')
  )

  const productWasSelected = React.useCallback(() => {
    let updated_shopping_cart = shopping_cart
    updated_shopping_cart[selected_product_id] = {
      quantity: selected_product_quantity,
    }
    dispatch(setDatasetToReducerAction(updated_shopping_cart, 'shopping_cart'))
  }, [selected_product_id, shopping_cart, selected_product_quantity, dispatch])

  return (
    <Modal
      isVisible={panelIsOpen}
      onBackdropPress={() => selectProductById(null)}
      animationInTiming={500}
      animationOutTiming={500}
      swipeDirection={!product_count_modal_is_visible ? 'down' : undefined}
      onSwipeComplete={() =>
        !product_count_modal_is_visible && selectProductById(null)
      }
      backdropColor="transparent"
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <View
        style={{
          backgroundColor: colors.support(),
          paddingTop: scale(0.4),
          alignItems: 'center',
          marginTop: scale(1.4),
          borderTopEndRadius: scale(0.6),
          borderTopStartRadius: scale(0.6),
        }}
      >
        <TouchableOpacity
          onPress={productWasSelected}
          style={{
            width: '91%',
            borderRadius: scale(0.4),
            backgroundColor: colors.white(),
            overflow: 'hidden',
          }}
        >
          <Image
            source={{ uri: selected_product.image_url }}
            defaultSource={ImageFlame}
            style={{ height: scale(5), width: '100%' }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={{ fontWeight: '700', fontSize: scale(0.7) }}>
          {selected_product?.name}
        </Text>
        <Text style={{ fontWeight: '700', fontSize: scale(0.35) }}>
          {selected_product.weight_controlled_product
            ? capitalize(t('available_cuts'), { firstOnly: true })
            : 'Seleccioná cuantas unidades'}
        </Text>
        <ProductCountSelection />
        <AddProductButton />
      </View>
    </Modal>
  )
}

export default ProductSelectionPanel
