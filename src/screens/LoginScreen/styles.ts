import { StyleSheet, Platform } from 'react-native'
import { scale } from '../../theme'
import { colors } from '../../theme'

const styles = StyleSheet.create({
  welcome: {
    color: 'white',
    textAlign: 'center',
    fontSize: 41,
    fontWeight: '500',
    fontFamily: 'Reckoner',
  },
  register: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  flame: {
    alignSelf: 'center',
    width: 32.61,
    height: 52.56,
    position: 'absolute',
    top: scale(Platform.select({ android: 0.5, ios: 1.2 })),
  },
  formContainer: { flex: 0.9, justifyContent: 'center' },
  form: { width: '85%', alignSelf: 'center' },
  sigInText: { color: 'black', fontSize: 18 },
  sigInTextDisabled: { color: 'white' },
  sigInButton: {
    backgroundColor: colors.secondary(),
    borderRadius: scale(0.2),
    marginVertical: scale(0.2),
  },
  sigInButtonDisabled: { backgroundColor: 'gray' },
  inputContainer: { marginTop: scale(0.2), borderRadius: scale(0.2) },
  input: { fontSize: 16, color: 'white' },
  newUserText: { color: colors.secondary(), textAlign: 'center' },
  registerText: {
    color: colors.secondary(),
    textAlign: 'center',
    paddingHorizontal: scale(0.1) /* , fontFamily: 'CircularStd'  */,
  },
})
export default styles
