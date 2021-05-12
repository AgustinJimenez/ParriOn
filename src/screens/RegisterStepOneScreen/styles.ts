import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  nextStepContainer: {
    bottom: 0,
  },
  nextStepSubContainer: { flexDirection: 'row' },
  nextStepTxt: {
    flex: 0.8,
    paddingRight: '10%',
    paddingLeft: '5%',
    fontSize: scale(0.5),
  },
  nextStepArrowIcon: {
    flex: 0.2,
    textAlign: 'center',
  },
  alreadyRegisteredContainer: {
    flexDirection: 'row',
    paddingVertical: scale(0.3),
    justifyContent: 'center',
  },
  alreadyRegisteredTxtOne: {
    fontWeight: '400',
    color: colors.secondary(),
  },
  alreadyRegisteredTxtTwo: {
    fontWeight: '700',
    color: colors.secondary(),
    borderBottomColor: colors.secondary(),
    borderBottomWidth: 2,
  },
  bottomItems: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
})
export default styles
