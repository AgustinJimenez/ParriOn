import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity, Image, Text } from 'react-native'
import { Input, Item, Form } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import MainContainer from '../../components/MainContainer'
import { datasetSelector } from '../../redux/selectors'
import ImageUserDefault from '../../assets/images/UserImageDefault.png'
import styles from './styles'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import globalStyles from '../../theme'
import dayjs from 'dayjs'
import ToggleEye from '../LoginScreen/ToggleEye'
import SimpleButton from '../../components/SimpleButton'
import { editProfileAction } from '../../actions'
import { UserInterface } from '../../interfaces'

const EditProfileScreen = ({}) => {
  const dispatch = useDispatch()
  const edit_profile_is_submiting = useSelector((state) =>
    datasetSelector(state, 'edit_profile_is_submiting')
  )
  const user: UserInterface = useSelector((state) =>
    datasetSelector(state, 'user')
  )
  const { t } = useTranslation()
  const [firstNames, setFirstNames] = React.useState(user.name)
  const [lastNames, setLastNames] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [birthDate, setBirthDate] = React.useState<Date>()
  const [showBirthDatePicker, setBirthDatePickerVisibility] = React.useState(
    false
  )
  const [password, setPassword] = React.useState('')
  const [showPassword, setPasswordVisibility] = React.useState(false)

  const firstNamesInputRef: React.RefObject<any> = React.useRef()
  const lastNamesInputRef: React.RefObject<any> = React.useRef()
  const emailInputRef: React.RefObject<any> = React.useRef()
  const phoneInputRef: React.RefObject<any> = React.useRef()
  const birthDateInputRef: React.RefObject<any> = React.useRef()
  const passwordInputRef: React.RefObject<any> = React.useRef()

  const [principalAddress, setPrincipalAddress] = React.useState('')
  const [secondaryAddress, setSecondaryAddress] = React.useState('')
  const [houseNumber, setHouseNumber] = React.useState('')
  const [otherReferences, setOtherReferences] = React.useState('')

  const principalAddressRef: React.RefObject<any> = React.useRef()
  const secondaryAddressRef: React.RefObject<any> = React.useRef()
  const houseNumberRef: React.RefObject<any> = React.useRef()
  const otherReferencesRef: React.RefObject<any> = React.useRef()
  const onSave = React.useCallback(() => {
    dispatch(
      editProfileAction({
        firstNames,
        lastNames,
        birthDate,
        password,
        principalAddress,
        secondaryAddress,
        houseNumber,
        otherReferences,
      })
    )
  }, [
    firstNames,
    lastNames,
    birthDate,
    password,
    principalAddress,
    secondaryAddress,
    houseNumber,
    otherReferences,
  ])

  return (
    <MainContainer
      hasShoppingCart
      hasTopFlameLogo
      hasGoBackButton
      title={t('edit_your_profile')}
      scrollPaddingBottom
    >
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: user?.image }}
          defaultSource={ImageUserDefault}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Datos personales</Text>
      <Form style={globalStyles.form}>
        <Item regular style={globalStyles.inputContainer}>
          <Input
            ref={firstNamesInputRef}
            autoCorrect={false}
            placeholder={t('first_name')}
            autoCapitalize="words"
            placeholderTextColor="white"
            style={globalStyles.input}
            returnKeyType="next"
            value={firstNames}
            onChangeText={(text) => setFirstNames(text)}
            onSubmitEditing={() => lastNamesInputRef?.current?._root?.focus()}
          />
        </Item>
        <Item regular style={globalStyles.inputContainer}>
          <Input
            ref={lastNamesInputRef}
            autoCorrect={false}
            placeholder={t('last_name')}
            autoCapitalize="words"
            placeholderTextColor="white"
            style={globalStyles.input}
            returnKeyType="next"
            value={lastNames}
            onChangeText={(text) => setLastNames(text)}
            onSubmitEditing={() => emailInputRef?.current?._root?.focus()}
          />
        </Item>
        <Item regular style={globalStyles.inputContainer}>
          <Input
            disabled
            ref={birthDateInputRef}
            placeholder={t('birthdate')}
            placeholderTextColor="white"
            style={globalStyles.input}
            returnKeyType="next"
            value={!!birthDate ? dayjs(birthDate).format('DD/MM/YYYY') : ''}
            onTouchStart={() => setBirthDatePickerVisibility(true)}
          />
          <DateTimePickerModal
            cancelTextIOS={t('cancel')}
            headerTextIOS={t('pick_a_date')}
            confirmTextIOS={t('confirm')}
            date={birthDate}
            isVisible={showBirthDatePicker}
            mode="date"
            onConfirm={(date: Date) => {
              setBirthDate(date)
              setBirthDatePickerVisibility(false)
              passwordInputRef?.current?._root?.focus()
            }}
            onCancel={() => setBirthDatePickerVisibility(false)}
          />
        </Item>
        <Item
          regular
          style={[globalStyles.inputContainer, styles.fieldLastItem]}
        >
          <Input
            ref={passwordInputRef}
            placeholder={t('password')}
            placeholderTextColor="white"
            textContentType="password"
            secureTextEntry={!showPassword}
            style={globalStyles.input}
            returnKeyType="next"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisibility(!showPassword)}
          >
            <ToggleEye show={showPassword} />
          </TouchableOpacity>
        </Item>
      </Form>
      <Text style={styles.title}>Direccion de envío</Text>
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
            onSubmitEditing={() => secondaryAddressRef?.current?._root?.focus()}
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
            onSubmitEditing={() => otherReferencesRef?.current?._root?.focus()}
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
            returnKeyType="next"
            keyboardType="number-pad"
            value={otherReferences}
            onChangeText={(text) => setOtherReferences(text)}
            // onSubmitEditing={() => setMapLocationVisibility(true)}
            multiline
          />
        </Item>
      </Form>
      <SimpleButton
        style={styles.saveBtn}
        loading={edit_profile_is_submiting}
        onPress={onSave}
      >
        <Text style={globalStyles.buttonTxt}>{t('save')}</Text>
      </SimpleButton>
    </MainContainer>
  )
}

export default EditProfileScreen
