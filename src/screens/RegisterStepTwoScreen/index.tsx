import React from 'react'
import { View, Input, Item, Icon, Form, Text } from 'native-base'
import MainContainer from '../../components/MainContainer'
import styles from './styles'
import globalStyles from '../../theme'
import { useTranslation } from 'react-i18next'
import Modal from 'react-native-modal'
import MapView, { Marker, Region } from 'react-native-maps'
import SimpleButton from '../../components/SimpleButton'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { registerAction } from '../../actions'
import { setDatasetToReducerAction } from '../../redux/actions'
import { ActivityIndicator, Platform, TouchableOpacity } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import sleep from '../../utils/sleep'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions'

var tmpTimer: any = null

const RegisterStepTwoScreen = ({ route }: any) => {
  const {
    email,
    firstNames,
    password,
    lastNames,
    phone,
    birthDate,
  } = route.params
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const register_is_loading = useSelector((state) =>
    datasetSelector(state, 'register_is_loading')
  )
  const [principalAddress, setPrincipalAddress] = React.useState('')
  const [secondaryAddress, setSecondaryAddress] = React.useState('')
  const [houseNumber, setHouseNumber] = React.useState('')
  const [otherReferences, setOtherReferences] = React.useState('')
  const [mapModalShowedFirstTime, setMapModalShowedFirstTime] = React.useState(
    false
  )
  const [location, setLocation] = React.useState<Region>()
  const [tmpLocation, setTmpLocation] = React.useState<Region>(null)

  const principalAddressRef: React.RefObject<any> = React.useRef()
  const secondaryAddressRef: React.RefObject<any> = React.useRef()
  const houseNumberRef: React.RefObject<any> = React.useRef()
  const otherReferencesRef: React.RefObject<any> = React.useRef()

  const [showMapLocation, setMapLocationVisibility] = React.useState(false)

  const formIsValid = React.useMemo(() => {
    return !!principalAddress && !!secondaryAddress && !!location?.latitude
  }, [principalAddress, secondaryAddress, location])

  const register = () => {
    const payload = {
      email,
      firstNames,
      password,
      lastNames,
      phone,
      birthDate,
      principalAddress,
      secondaryAddress,
      houseNumber,
      otherReferences,
      location,
    }
    dispatch(registerAction(payload))
  }

  React.useEffect(() => {
    dispatch(setDatasetToReducerAction(false, 'register_is_loading'))
  }, [])

  const modalMapOnShow = React.useCallback(async () => {
    try {
      let permissionIsGranted = false

      if (!mapModalShowedFirstTime) {
        const checkPermissionResults = await check(
          Platform.select({
            ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          })
        )
        console.log('SECOND ===> ', { checkPermissionResults })
        if (checkPermissionResults === RESULTS.GRANTED)
          permissionIsGranted = true

        if (!permissionIsGranted) {
          const requestPermissionResults = await request(
            Platform.select({
              ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            })
          )
          console.log('THIRD ===> ', { requestPermissionResults })
          if (requestPermissionResults !== RESULTS.GRANTED)
            setMapLocationVisibility(false)
          return
        }
        console.log('FOURTH ===> ', { checkPermissionResults })
        Geolocation?.requestAuthorization?.()
        Geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            console.log('FIVE ===> ')
            const location = {
              latitude,
              longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.09,
            }
            console.log('Geolocation.getCurrentPosition ===> ', {
              checkPermissionResults,
              location,
            })
            setTmpLocation(location)
            sleep(500)
            setMapModalShowedFirstTime(true)
          }
        )
      }
    } catch (error) {
      console.log('modalMapOnShow error ==> ', error)
    }
  }, [
    Geolocation,
    mapModalShowedFirstTime,
    setMapModalShowedFirstTime,
    setTmpLocation,
  ])

  return (
    <>
      <MainContainer title={t('add_your_address')}>
        <Form style={globalStyles.form}>
          <Item regular style={globalStyles.inputContainer}>
            <Input
              ref={principalAddressRef}
              autoCorrect={false}
              placeholder={t('principal_address')}
              placeholderTextColor="white"
              autoCapitalize="words"
              style={globalStyles.input}
              returnKeyType="next"
              value={principalAddress}
              onChangeText={(text) => setPrincipalAddress(text)}
              onSubmitEditing={() =>
                secondaryAddressRef?.current?._root?.focus()
              }
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
            <Input
              ref={secondaryAddressRef}
              autoCorrect={false}
              placeholder={t('secondary_address')}
              placeholderTextColor="white"
              autoCapitalize="words"
              style={globalStyles.input}
              returnKeyType="next"
              value={secondaryAddress}
              onChangeText={(text) => setSecondaryAddress(text)}
              onSubmitEditing={() => houseNumberRef?.current?._root?.focus()}
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
            <Input
              ref={houseNumberRef}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={t('house_number')}
              placeholderTextColor="white"
              textContentType="telephoneNumber"
              style={globalStyles.input}
              returnKeyType="next"
              keyboardType="number-pad"
              value={houseNumber}
              onChangeText={(text) => setHouseNumber(text)}
              onSubmitEditing={() =>
                otherReferencesRef?.current?._root?.focus()
              }
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
            <Input
              ref={houseNumberRef}
              autoCorrect={false}
              placeholder={t('other_references')}
              placeholderTextColor="white"
              autoCapitalize="sentences"
              textContentType="telephoneNumber"
              style={globalStyles.inputArea}
              returnKeyType="done"
              keyboardType="default"
              value={otherReferences}
              onChangeText={(text) => setOtherReferences(text)}
              onSubmitEditing={() => setMapLocationVisibility(true)}
              multiline
            />
          </Item>
          <Item
            regular
            style={[
              globalStyles.inputContainer,
              globalStyles.secondaryBorder,
              styles.locateInMapContainer,
            ]}
            onPress={() => setMapLocationVisibility(true)}
          >
            <View style={styles.locateInMapTxtContainer}>
              <Text style={styles.locateInMapTxt}>{t('locate_in_map')}</Text>
              {!!location?.latitude && !!location?.longitude && (
                <Icon
                  name="check"
                  type="AntDesign"
                  style={styles.locateInMapCheck}
                />
              )}
            </View>
            <Modal
              isVisible={showMapLocation}
              onBackdropPress={() => {
                setMapLocationVisibility(false)
              }}
              onModalShow={modalMapOnShow}
              style={styles.locateInMapModal}
            >
              <View style={styles.locateInMapModalContent}>
                <Text style={styles.locateInMapModalTitleTxt}>
                  {t('locate_your_address_in_the_map')}
                </Text>
                <Text style={styles.locateInMapModalSubTitleTxt}>
                  {t('move_the_map_to_locate_your_shipping_place')}.
                </Text>
                {!mapModalShowedFirstTime && (
                  <ActivityIndicator
                    style={styles.mapLoader}
                    size="large"
                    color="white"
                  />
                )}
                {!!mapModalShowedFirstTime && !!tmpLocation?.latitude && (
                  <MapView
                    style={styles.map}
                    onRegionChange={(region: Region) => {
                      clearTimeout(tmpTimer)
                      tmpTimer = setTimeout(() => {
                        setTmpLocation(region)
                      }, 5)
                    }}
                    initialRegion={tmpLocation}
                  >
                    <Marker coordinate={tmpLocation} />
                  </MapView>
                )}
                {!!mapModalShowedFirstTime && (
                  <SimpleButton
                    dark
                    style={styles.saveBtn}
                    onPress={() => {
                      setLocation(tmpLocation)
                      setMapLocationVisibility(false)
                    }}
                  >
                    <Text style={styles.saveBtnTxt}>{t('save')}</Text>
                  </SimpleButton>
                )}
              </View>
              <TouchableOpacity
                onPress={() => {
                  setMapLocationVisibility(false)
                }}
                style={styles.locateInMapExitBtnContainer}
              >
                <Icon
                  type="Entypo"
                  name="circle-with-cross"
                  style={styles.locateInMapExitBtn}
                />
              </TouchableOpacity>
            </Modal>
          </Item>
        </Form>
      </MainContainer>
      <SimpleButton
        loading={register_is_loading}
        disabled={!formIsValid}
        onPress={register}
        style={styles.registerBtn}
      >
        <Text style={styles.registerBtnTxt}>{t('register')}</Text>
      </SimpleButton>
    </>
  )
}

export default RegisterStepTwoScreen
