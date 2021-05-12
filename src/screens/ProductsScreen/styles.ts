import { StyleSheet } from 'react-native'
import { scale } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: scale(0.6),
  },
  item: {
    width: '46%',
    marginBottom: scale(0.4),
    marginRight: 0,
  },
})
export default styles
