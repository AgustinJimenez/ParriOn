import { StyleSheet } from 'react-native'
import { colors, scale } from '../../../theme'
import { globalStyles } from '../../../theme'

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
    padding: scale(0.36),
    height: scale(4),
  },
  titleContainer: {},
  title: {
    fontSize: scale(0.5),
    fontWeight: '900',
  },
  itemImage: {
    width: scale(3.5),
    height: '100%',
    backgroundColor: colors.white(),
    marginRight: scale(0.2),
    borderRadius: scale(0.3),
  },
  midContainer: {
    flex: 1,
    paddingLeft: scale(0.2),
  },
  rightContainer: {},
  deleteIconContainer: {},
  deleteIcon: {
    // backgroundColor: colors.midRed(),
    width: scale(0.5),
    height: scale(0.5),
  },
  subtitleContainer: {
    flex: 1,
  },
  subtitleTxt: {
    fontWeight: '400',
    fontSize: scale(0.45),
    paddingRight: scale(0.1),
    paddingTop: scale(0.15),
    alignSelf: 'flex-start',
  },
  subtitleArrow: {
    alignSelf: 'flex-start',
    fontSize: scale(0.5),
  },
  editQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(0.2),
    paddingBottom: scale(0.3),
  },
  editQuantityIcon: {
    color: colors.white(),
    fontSize: scale(0.5),
    paddingRight: scale(0.15),
    ...globalStyles.elevationLow,
  },
  editQuantityTxt: {
    color: colors.white(),
    fontSize: scale(0.4),
    fontWeight: '400',
    ...globalStyles.elevationLow,
  },
  totalPriceContainer: {
    backgroundColor: colors.white(),
    flexDirection: 'row',
    paddingLeft: scale(0.15),
    paddingVertical: scale(0.1),
    borderRadius: scale(0.15),
  },
  totalPriceTxt: {
    fontWeight: '400',
    paddingRight: scale(0.1),
    fontSize: scale(0.5),
  },
  totalPriceQuantity: {
    fontWeight: '900',
    fontSize: scale(0.5),
  },
})
export default styles
