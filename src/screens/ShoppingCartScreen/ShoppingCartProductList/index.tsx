import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { Icon } from 'native-base'
import ImageFlame from '../../../assets/images/flame.png'
import ImageIconClose from '../../../assets/images/icon-close.png'
import styles from './styles'
import numberFormat from '../../../utils/numberFormat'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../../redux/selectors'
import {
  setDatasetToReducerAction,
  setMultipleDatasetsToReducer,
} from '../../../redux/actions'
import { useNavigation } from '@react-navigation/core'

const DeleteButton = ({ item }: any) => {
  const dispatch = useDispatch()
  const shopping_cart: any = useSelector((state) =>
    datasetSelector(state, 'shopping_cart')
  )
  const onDeleteItem = React.useCallback(() => {
    let newShoppingCart = shopping_cart
    delete newShoppingCart[item.id]
    dispatch(setDatasetToReducerAction(newShoppingCart, 'shopping_cart'))
  }, [shopping_cart])
  return (
    <View style={styles.rightContainer}>
      <TouchableOpacity
        style={styles.deleteIconContainer}
        onPress={onDeleteItem}
      >
        <Image source={ImageIconClose} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  )
}
const ItemEditQuantity = ({ onPress }: any) => {
  return (
    <TouchableOpacity style={styles.editQuantityContainer} onPress={onPress}>
      <Icon type="Feather" name="edit" style={styles.editQuantityIcon} />
      <Text style={styles.editQuantityTxt}>Editar cantidad</Text>
    </TouchableOpacity>
  )
}
const ItemTotalPrice = ({ item }: any) => {
  const total = item.quantity * item.price
  return (
    <View style={styles.totalPriceContainer}>
      <Text style={styles.totalPriceTxt}>Total:</Text>
      <Text style={styles.totalPriceQuantity}>{numberFormat(total)}</Text>
      <Text style={styles.totalPriceQuantity}> Gs</Text>
    </View>
  )
}
const ItemTitle = ({ value }: any) => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{value}</Text>
    </View>
  )
}
const Item = ({ item, onPress }: any) => {
  // console.log('ITEM ===> ', { item })
  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.image }}
        defaultSource={ImageFlame}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.midContainer}>
        <ItemTitle value={item.name} />
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTxt}>
            {item.quantity}
            {item.weight_controlled_product ? 'kg' : 'un'}. x{' '}
            {numberFormat(item.price)} Gs.
          </Text>
          <ItemEditQuantity onPress={onPress} />
          <ItemTotalPrice item={item} />
        </View>
      </View>
      <DeleteButton item={item} />
    </View>
  )
}

const ShoppingCartProductList = ({
  data = [],
  subtitle = '',
  style = {},
  onPress = (item: any, index: number) => {},
}: any) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const selectProduct = React.useCallback(
    (id: number | null, quantity: number = 1) => {
      dispatch(
        setMultipleDatasetsToReducer([
          setDatasetToReducerAction(id, 'selected_product_id'),
          setDatasetToReducerAction(quantity, 'selected_product_quantity'),
          setDatasetToReducerAction('edit', 'selected_product_operation_type'),
        ])
      )
    },
    [dispatch, setDatasetToReducerAction]
  )

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      selectProduct(null)
    })
    navigation.addListener('blur', () => {
      selectProduct(null)
    })
    return unsubscribe
  }, [navigation, selectProduct])

  return (
    <View style={[styles.contentContainerStyle, style]}>
      {data.map((item: any, key: number) => (
        <Item
          key={key}
          subtitle={subtitle}
          item={item}
          index={key}
          onPress={() => selectProduct(item.id, item.quantity)}
        />
      ))}
    </View>
  )
}
export default ShoppingCartProductList
