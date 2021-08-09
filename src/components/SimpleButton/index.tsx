import React from 'react'
import { TouchableOpacity, ActivityIndicator } from 'react-native'
import styles from './styles'

const SimpleButton = ({
  loading,
  onPress,
  children,
  style = {},
  disabled = false,
  dark = false,
  loadingStyles = {},
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        !!disabled ? styles.disabled : {},
        !!dark ? styles.dark : {},
        style,
      ]}
    >
      {!!loading ? (
        <ActivityIndicator style={loadingStyles} color="white" />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
export default SimpleButton
