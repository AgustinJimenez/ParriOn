import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  container: {
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
  loader: {
    paddingVertical: scale(0.3),
  },
  noDataTxt: {
    paddingVertical: scale(0.4),
    fontSize: scale(0.5),
    color: colors.white(),
    alignSelf: 'center',
  },
})
export default styles
