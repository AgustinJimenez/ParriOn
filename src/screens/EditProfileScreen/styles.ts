import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  profileImage: {
    width: scale(2.1),
    height: scale(2.1),
    borderRadius: scale(2.1) / 2,
    marginTop: scale(0.5),
    marginBottom: scale(0.9),
  },
  scrollContainer: {
    paddingBottom: scale(2),
  },
  title: {
    alignSelf: 'center',
    color: colors.white(),
    fontSize: scale(0.8),
    fontWeight: '700',
  },
  fieldLastItem: {
    marginBottom: scale(0.8),
  },
  saveBtn: {
    marginTop: scale(0.6),
    width: '90%',
  },
})

export default styles
