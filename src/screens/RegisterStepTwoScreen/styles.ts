import { StyleSheet } from 'react-native'
import { colors, scale } from '../../theme'

const styles = StyleSheet.create({
  locateInMapContainer: {
    marginTop: scale(0.4),
  },
  locateInMapModal: {
    margin: 0,
  },
  locateInMapModalContent: {
    backgroundColor: colors.secondary(),
    height: '80%',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderRadius: scale(0.6),
    paddingHorizontal: '8%',
  },
  locateInMapTxt: {
    textAlign: 'center',
    color: colors.secondary(),
    fontWeight: '600',
    alignSelf: 'center',
    paddingVertical: scale(0.4),
  },
  locateInMapTxtContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  locateInMapModalTitleTxt: {
    fontWeight: '700',
    paddingTop: scale(0.9),
    paddingBottom: scale(0.4),
    fontSize: scale(0.7),
  },
  locateInMapModalSubTitleTxt: {
    fontWeight: '400',
    marginBottom: scale(0.2),
    fontSize: scale(0.4),
  },
  map: {
    height: '60%',
    borderRadius: scale(0.4),
    marginVertical: scale(0.3),
  },
  saveBtn: {
    width: '100%',
  },
  saveBtnTxt: {
    color: colors.secondary(),
    fontWeight: '600',
    fontSize: scale(0.5),
  },
  registerBtn: {
    position: 'absolute',
    bottom: scale(0.8),
  },
  registerBtnTxt: {
    fontWeight: '500',
    fontSize: scale(0.45),
  },
  locateInMapCheck: {
    color: colors.secondary(),
    position: 'absolute',
    right: '15%',
    alignSelf: 'center',
  },
})
export default styles
