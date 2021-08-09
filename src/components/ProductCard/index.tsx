import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setDatasetToReducerAction } from '../../redux/actions'
import { datasetSelector } from '../../redux/selectors'
import { colors, scale } from '../../theme'
import numberDotSeparator from '../../utils/numberDotSeparator'
import ImageFlame from '../../assets/images/flame.png'
import styles from './styles'
import Product from '../../models/Product'

const ProductCard = ({ id = 0, onPress = () => {}, containerStyle = {} }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const product = new Product(
    useSelector((state) => datasetSelector(state, 'products', { id }))
  )

  const selectProduct = React.useCallback(
    (id: number | null) => {
      dispatch(setDatasetToReducerAction(id, 'selected_product_id'))
    },
    [dispatch, setDatasetToReducerAction]
  )

  const productWasPressed = React.useCallback(() => {
    selectProduct(id)
  }, [selectProduct, id])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      selectProduct(null)
    })
    navigation.addListener('blur', () => {
      selectProduct(null)
    })

    return unsubscribe
  }, [navigation, selectProduct])

  // console.log('ProductCard ===> ', { product, image_url: product.image_url })

  return (
    <TouchableOpacity
      onPress={productWasPressed}
      style={[styles.container, containerStyle]}
    >
      <Image
        source={{
          uri: product?.image_url,
        }}
        defaultSource={ImageFlame}
        resizeMode={!!product?.image_url ? 'cover' : 'contain'}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.subtitle}>{product.description}</Text>
      <Text style={styles.price}>
        {numberDotSeparator(product.price)}{' '}
        {product.weight_controlled_product ? 'el kg' : 'la unidad'}
      </Text>
      <View style={styles.addCart}>
        <Text style={styles.addCartText}>Agregar al carrito</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
