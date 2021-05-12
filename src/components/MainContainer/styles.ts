import { Platform, StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

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
  },
  avatarContainer: { position: 'absolute', left: scale(0.3) },
  avatar: {
    width: scale(),
    height: scale(),
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.1, android: 0.5 })),
  },
  goBackIconContainer: {
    position: 'absolute',
    top: scale(Platform.select({ ios: 1.1, android: 0.5 })),
    paddingHorizontal: scale(0.1),
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
    marginTop: scale(2),
  },
})
export default styles
