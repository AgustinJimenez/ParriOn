import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: scale(4.2),
    borderRadius: scale(0.4),
    overflow: 'hidden',
    marginRight: scale(0.3),
  },
  image: {
    width: '100%',
    height: scale(2.7),
  },
  title: { textAlign: 'center', fontWeight: '900', fontSize: scale(0.4) },
  subtitle: {
    textAlign: 'center',
    color: 'gray',
    paddingBottom: scale(0.1),
    fontSize: scale(0.35),
  },
  price: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: colors.brandThird(),
    fontWeight: '900',
    fontSize: scale(0.37),
    paddingVertical: scale(0.1),
  },
  addCart: {
    backgroundColor: colors.secondary(),
    justifyContent: 'center',
    paddingVertical: scale(0.2),
    fontSize: scale(0.3),
  },
  addCartText: { textAlign: 'center', color: 'black' },
})

export default styles
