import { Icon } from 'native-base'
import React from 'react'
import ImageFlame from '../../assets/images/flame.png'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import styles from './styles'

const Item = ({ item, index, subtitle, onPress }: any) => {
  return (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => onPress(item, index)}
    >
      <Image
        source={item.image}
        defaultSource={ImageFlame}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.rightContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitleTxt}>{subtitle}</Text>
          <Icon
            type="AntDesign"
            name="arrowright"
            style={styles.subtitleArrow}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const ListItems = ({
  data = [],
  subtitle = '',
  style = {},
  onPress = (item: any, index: number) => {},
}: any) => {
  return (
    <View style={[styles.contentContainerStyle, style]}>
      {data.map((item: any, key: number) => (
        <Item
          key={key}
          subtitle={subtitle}
          onPress={onPress}
          item={item}
          index={key}
        />
      ))}
    </View>
  )
}
export default ListItems
