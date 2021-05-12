import { StyleSheet } from 'react-native'
import CommonStyles, { colors } from '../../theme'

export default StyleSheet.create({
  labelPadder: {
    ...CommonStyles.padVertical5,
  },
  closeIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: 30,
    overflow: 'hidden',
    paddingLeft: 15,
    paddingBottom: 15,
  },
  colorPrimary: {
    color: colors.primary(),
  },
  exitIcon: {
    color: colors.cardDefaultBg(),
    textAlignVertical: 'center',
  },
})
