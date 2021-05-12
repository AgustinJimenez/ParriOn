import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  addDirection: {
    color: 'white',
    fontFamily: 'Reckoner',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: scale(1.4),
    marginTop: scale(2),
  },
  goBackButton: {
    backgroundColor: 'red',
  },
  profileImage: {
    width: scale(2.1),
    height: scale(2.1),
    marginTop: scale(0.5),
    marginBottom: scale(0.9),
  },
  fieldContainer: {
    paddingLeft: '7%',
    paddingRight: '7%',
    marginBottom: scale(),
  },
  fieldLabel: {
    color: colors.secondary(),
    fontSize: scale(0.5),
    paddingTop: scale(0.3),
  },
  fieldValue: {
    color: colors.light(),
    fontSize: scale(0.7),
  },
  editDataButton: {
    paddingVertical: scale(0.3),
  },
  logOutButton: {
    paddingVertical: scale(0.3),
    marginTop: scale(0.2),
  },
  buttonTxt: {
    fontSize: scale(0.55),
  },
})

export default styles
