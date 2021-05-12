import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    paddingBottom: scale(0.6),
    paddingTop: scale(0.4),
    backgroundColor: colors.black(0.8),
  },
  button: { flex: 1, alignItems: 'center' },
  button_text: { color: 'white', fontWeight: '400', marginTop: scale(0.1) },
  button_icon: { width: scale(0.7), height: scale(0.7) },
})

export default styles
