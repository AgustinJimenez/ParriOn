import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import ImageArrowDown from '../../assets/images/arrow-down.png'
import { Icon } from 'native-base'
import { colors, scale } from '../../theme'
import { datasetSelector, productSelectedSelector } from '../../redux/selectors'
import { useDispatch, useSelector } from 'react-redux'
import Select from '../utils/Select'
import { useTranslation } from 'react-i18next'
import Product from '../../models/Product'
import { setDatasetToReducerAction } from '../../redux/actions'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(0.2),
  },
  plusIconContainer: {
    backgroundColor: colors.white(0.3),
    paddingHorizontal: scale(0.4),
    paddingVertical: scale(0.3),
    borderRadius: scale(0.15),
  },
  plusIcon: { fontSize: scale(0.5) },
  countContainer: {
    backgroundColor: 'white',
    paddingHorizontal: scale(0.5),
    paddingVertical: scale(0.2),
    borderRadius: scale(0.15),
  },
  count: { fontWeight: '700', fontSize: scale(0.7) },
  minusIconContainer: {
    backgroundColor: colors.white(0.3),
    paddingHorizontal: scale(0.4),
    paddingVertical: scale(0.3),
    borderRadius: scale(0.15),
  },
  minusIcon: { fontSize: scale(0.5) },
  select: {
    width: scale(4),
    height: scale(),
    backgroundColor: colors.white(0.3),
    borderRadius: scale(0.2),
    marginTop: scale(0.3),
    marginBottom: scale(0.3),
  },
  selectIconContainer: {
    flex: 0.4,
    backgroundColor: 'white',
    borderRadius: scale(0.17),
  },
  selectIcon: {
    width: scale(0.6),
    alignSelf: 'center',
  },
})

const ProductCountSelection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const selected_product_quantity = useSelector((state) =>
    datasetSelector(state, 'selected_product_quantity')
  )
  const selected_product: Product = useSelector((state) =>
    productSelectedSelector(state)
  )

  const updateProductCount = React.useCallback(
    (number: number) => {
      if (number <= 0) number = 1
      else if (number > selected_product.critical_stock)
        number = selected_product.critical_stock
      dispatch(
        setDatasetToReducerAction(Math.abs(number), 'selected_product_quantity')
      )
    },
    [setDatasetToReducerAction, selected_product]
  )

  if (!selected_product.weight_controlled_product)
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.minusIconContainer}
          onPress={() => updateProductCount(selected_product_quantity - 1)}
        >
          <Icon type="AntDesign" name="minus" style={styles.minusIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.countContainer}>
          <Text style={styles.count}>{selected_product_quantity}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateProductCount(selected_product_quantity + 1)}
          style={styles.plusIconContainer}
        >
          <Icon type="AntDesign" name="plus" style={styles.plusIcon} />
        </TouchableOpacity>
      </View>
    )

  return (
    <Select
      style={styles.select}
      onValueChange={(value: any) => {
        updateProductCount(value)
      }}
      placeholder={t('select')}
      selectedValue={selected_product_quantity}
      items={[...Array(100).keys()]
        .filter(
          (value) => value <= selected_product.critical_stock && value > 0
        )
        .map((value) => ({ label: `${value} kgs`, value }))}
      iosIcon={
        <View style={styles.selectIconContainer}>
          <Image
            source={ImageArrowDown}
            style={styles.selectIcon}
            resizeMode="contain"
          />
        </View>
      }
    />
  )
}

export default ProductCountSelection
