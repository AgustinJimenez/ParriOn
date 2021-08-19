import { Platform, StyleSheet } from 'react-native'
import { colors, scale, globalStyles } from '../../theme'

const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: {
    flex: 1,
    backgroundColor: colors.primary(),
  },
  topFlameIcon: {
    width: scale(1.5),
    height: scale(1.5),
    alignSelf: 'center',
    position: 'absolute',
    top: scale(Platform.select({ ios: 1, android: 0.5 })),
    ...{
      ...Platform.select({ ios: globalStyles.elevationLow, android: null }),
    },
  },
  avatarContainer: {
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.1, android: 0.4 })),
    left: scale(0.2),
    width: scale(),
    height: scale(),
    borderRadius: scale(),
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: scale() / 2,
    position: 'absolute',
  },
  goBackIconContainer: {
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.1, android: 0.5 })),
    paddingHorizontal: scale(0.1),
    ...globalStyles.elevationLow,
  },
  goBackIcon: {
    color: 'white',
    fontSize: scale(0.9),
  },
  title: {
    color: 'white',
    fontFamily: 'Reckoner',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: scale(1.4),
    marginTop: scale(2.4),
  },
})
export default styles
