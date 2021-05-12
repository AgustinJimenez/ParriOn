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

const ProductCard = ({
  id = 0,
  title = '',
  subtitle = '',
  price = 0,
  image_url = '',
  onPress = () => {},
  containerStyle = {},
}) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const selected_product_id: number | null = useSelector((state) =>
    datasetSelector(state, 'selected_product_id')
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

  // console.log('ProductCard ===> ', { selected_product_id })

  return (
    <TouchableOpacity
      onPress={productWasPressed}
      style={[styles.container, containerStyle]}
    >
      <Image
        source={{ uri: image_url || undefined }}
        defaultSource={ImageFlame}
        resizeMode={!!image_url ? 'cover' : 'contain'}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.price}>{numberDotSeparator(price)} el Kg</Text>
      <View style={styles.addCart}>
        <Text style={styles.addCartText}>Agregar al carrito</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard
