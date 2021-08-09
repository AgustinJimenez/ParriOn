import React from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Input, Item, Icon, Form, Text } from 'native-base'
import MainContainer from '../../components/MainContainer'
import styles from './styles'
import globalStyles from '../../theme'
import { useTranslation } from 'react-i18next'
import SimpleButton from '../../components/SimpleButton'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'
import emailIsValid from '../../utils/emailIsValid'
import { RegisterStepTwoRouteName } from '../screensRoutes'
import ToggleEye from '../LoginScreen/ToggleEye'

const RegisterStepOneScreen = ({ navigation }: any) => {
  const { t } = useTranslation()

  const [firstNames, setFirstNames] = React.useState('')
  const [lastNames, setLastNames] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [birthDate, setBirthDate] = React.useState<Date>(
    dayjs().subtract(18, 'year').toDate()
  )
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

  const goBack = React.useCallback(navigation.goBack, [navigation])

  const goNextStep = React.useCallback(async () => {
    const payload = {
      firstNames,
      email,
      password,
      lastNames,
      phone,
      birthDate: dayjs(birthDate).format('YYYY-MM-DD'),
    }
    navigation.navigate(RegisterStepTwoRouteName, payload)
  }, [firstNames, email, password, lastNames, phone, birthDate, navigation])

  const formIsInvalid = React.useMemo(() => {
    return (
      firstNames?.length > 2 &&
      firstNames?.length < 100 &&
      password?.length >= 6 &&
      emailIsValid(email)
    )
  }, [firstNames, email, password])

  const dateNow = React.useMemo(() => new Date(), [])

  const onPressDateInput = React.useCallback(() => {
    phoneInputRef?.current?._root?.blur()
    setBirthDatePickerVisibility(true)
  }, [setBirthDatePickerVisibility, phoneInputRef])

  return (
    <View style={{ flex: 1 }}>
      <MainContainer title="registrarte a parri!">
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
              ref={emailInputRef}
              autoCorrect={false}
              autoCapitalize="none"
              placeholder={t('email')}
              placeholderTextColor="white"
              textContentType="emailAddress"
              style={globalStyles.input}
              returnKeyType="next"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => phoneInputRef?.current?._root?.focus()}
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
            <Input
              ref={phoneInputRef}
              placeholder={t('phone')}
              placeholderTextColor="white"
              textContentType="telephoneNumber"
              keyboardType="phone-pad"
              style={globalStyles.input}
              returnKeyType="next"
              value={phone}
              onChangeText={(text) => setPhone(text)}
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
            <TouchableOpacity
              style={styles.dateInputContainer}
              onPress={onPressDateInput}
            >
              <Input
                disabled
                ref={birthDateInputRef}
                placeholder={t('birthdate')}
                placeholderTextColor="white"
                style={globalStyles.input}
                returnKeyType="next"
                value={!!birthDate ? dayjs(birthDate).format('DD/MM/YYYY') : ''}
                onTouchStart={onPressDateInput}
              />
            </TouchableOpacity>
            <DateTimePickerModal
              cancelTextIOS={t('cancel')}
              headerTextIOS={t('pick_a_date')}
              confirmTextIOS={t('confirm')}
              maximumDate={dateNow}
              date={birthDate}
              isVisible={showBirthDatePicker}
              mode="date"
              onConfirm={(date: Date) => {
                setBirthDate(date)
                setBirthDatePickerVisibility(false)
                setTimeout(() => passwordInputRef?.current?._root?.focus(), 400)
              }}
              onCancel={() => setBirthDatePickerVisibility(false)}
            />
          </Item>
          <Item regular style={globalStyles.inputContainer}>
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
      </MainContainer>
      <View style={styles.bottomItems}>
        <SimpleButton
          disabled={!formIsInvalid}
          onPress={goNextStep}
          style={{ width: '85%' }}
        >
          <View style={styles.nextStepSubContainer}>
            <Text style={styles.nextStepTxt}>{t('next_step')}</Text>
            <Icon
              name="arrowright"
              type="AntDesign"
              style={styles.nextStepArrowIcon}
            />
          </View>
        </SimpleButton>
        <TouchableOpacity
          style={styles.alreadyRegisteredContainer}
          onPress={goBack}
        >
          <Text style={styles.alreadyRegisteredTxtOne}>Ya soy usuario, </Text>
          <View style={styles.alreadyRegisteredTxtTwoContainer}>
            <Text style={styles.alreadyRegisteredTxtTwo}>quiero ingresar </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default RegisterStepOneScreen
