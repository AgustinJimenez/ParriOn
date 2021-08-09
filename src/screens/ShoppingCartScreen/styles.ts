import { StyleSheet } from 'react-native'
import globalStyles, { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  productsInCartContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(0.4),
    paddingVertical: scale(0.2),
    flexWrap: 'wrap',
  },
  productsInCartContainerTxt: {
    color: colors.white(),
    fontSize: scale(0.8),
    fontWeight: '700',
  },
  noProductsTxt: {
    textAlign: 'center',
  },
  productsInCartContainerColorTxt: {
    color: colors.warning(),
    paddingHorizontal: scale(0.15),
  },
  finishShoppingBtn: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    width: '95%',
    bottom: scale(2.5),
    backgroundColor: colors.support(),
    flexDirection: 'row',
    padding: scale(0.3),
    alignItems: 'center',
    borderRadius: scale(0.2),
    ...globalStyles.elevationLow,
  },
  finishShoppingTxt: {
    flex: 0.5,
    fontSize: scale(0.5),
  },
  finishShoppingTotalPriceTxtContainer: {
    flex: 0.4,
  },
  finishShoppingTotalPriceTxtSubContainer: {
    width: '90%',
    height: '100%',
    alignSelf: 'center',
    backgroundColor: colors.dark(0.1),
    justifyContent: 'center',
    borderRadius: scale(0.1),
  },
  finishShoppingTotalPriceTxt: {
    textAlign: 'center',
    fontSize: scale(0.4),
  },
  finishShoppingArrowIcon: {
    flex: 0.1,
  },
})
export default styles
