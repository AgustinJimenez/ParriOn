import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: scale(2),
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.support(),
    alignSelf: 'center',
    width: '95%',
    borderRadius: scale(0.3),
    marginVertical: scale(0.15),
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  title: {
    fontSize: scale(0.8),
    fontWeight: '900',
  },
  itemImage: {
    width: scale(3),
    height: scale(2),
    backgroundColor: colors.white(),
    margin: scale(0.2),
    padding: scale(0.1),
    borderRadius: scale(0.3),
  },
  rightContainer: {
    flex: 1,
    paddingLeft: scale(0.2),
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  subtitleTxt: {
    fontWeight: '600',
    fontSize: scale(0.45),
    paddingRight: scale(0.1),
    marginTop: -scale(0.06),
    alignSelf: 'flex-start',
  },
  subtitleArrow: {
    alignSelf: 'flex-start',
    fontSize: scale(0.5),
  },
})
export default styles
