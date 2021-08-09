import { Platform, StyleSheet } from 'react-native'
import globalStyles, { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  listTitle: {
    color: 'white',
    fontSize: scale(0.9),
    letterSpacing: 3,
    marginTop: scale(0.4),
    paddingLeft: scale(0.2),
    fontFamily: 'Reckoner',
  },
  listLoader: {
    paddingVertical: scale(0.5),
  },
  topFlameIconContainer: {
    alignSelf: 'center',
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.7, android: 0.5 })),
    right: 0,
    left: 0,
    ...globalStyles.elevationLow,
  },
  topFlameIcon: {
    alignSelf: 'center',
    width: scale(3),
    height: scale(3),
  },
  bigTopFlameIcon: {
    width: scale(3),
    height: scale(3),
    alignSelf: 'center',
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.7, android: 0.5 })),
    zIndex: -99,
    ...globalStyles.elevationLow,
  },
})

export default styles
