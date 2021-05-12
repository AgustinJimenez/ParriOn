import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary(),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: scale(0.4),
    borderRadius: scale(0.2),
    width: '80%',
  },
  dark: {
    backgroundColor: colors.dark(),
  },
  disabled: {
    backgroundColor: colors.gray(),
  },
})

export default styles
