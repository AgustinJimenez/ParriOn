import { Platform, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const scale = (number = 1) => (number / 10) * width

export const colors = {
  dark: (o = 1) => `rgba(29, 29, 27, ${o})`,
  support: (o = 1) => `rgba(249,178,51,${o})`,
  gray: (o = 1) => `rgba(128,127,127,${o})`,
  white: (o = 1) => `rgba(255,255,255,${o})`,
  midRed: (o = 1) => `rgba(195,80,46,${o})`,
  primary: (o = 1) => `rgba(29,29,27,${o})`,
  danger: (o = 1) => `rgba(217,83,79,${o})`,
  warning: (o = 1) => `rgba(240,173,78,${o})`,
  cardDefaultBg: (o = 1) => `rgba(247,247,247,${o})`,
  black: (o = 1) => `rgba(0, 0, 0, ${o})`,
}

export const globalStyles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
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
    color: colors.primary(), // brandPrimary
  },
  elevationLow: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        //backgroundColor: 'red',
      },
      android: {
        elevation: 5,
      },
    }),
  },
  textShadowLow: {
    textShadowColor: 'black',
    textShadowOffset: { width: -0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  padVertical5: {
    paddingVertical: 5,
  },
  bgDanger: {
    backgroundColor: colors.danger(),
  },
  bgPrimary: {
    backgroundColor: colors.primary(),
  },
  bgWarning: {
    backgroundColor: colors.warning(),
  },
  //Helpers
  m0: {
    margin: 0,
  },
  p0: {
    padding: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  form: { width: '85%', alignSelf: 'center' },
  input: { fontSize: 16, color: 'white', flex: 1 },
  inputArea: {
    height: scale(4),
    textAlignVertical: 'top',
    color: colors.white(),
  },
  inputContainer: {
    marginTop: scale(0.2),
    borderRadius: scale(0.2),
    flexDirection: 'row',
  },
  secondaryBorder: { borderColor: colors.support() },
  grayBorder: { borderColor: 'gray' },
  scrollContainer: {
    // flexGrow: 1,
  },
  buttonTxt: {
    fontWeight: '500',
    fontSize: scale(0.45),
  },
})

export default globalStyles
