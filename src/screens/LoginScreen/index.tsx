import React from 'react'
import { View, Input, Item, Text, Button, Form } from 'native-base'
import { Image, ActivityIndicator, Platform } from 'react-native'
import MainContainer from '../../components/MainContainer'
import ImageFlame from '../../assets/images/flame.png'
import { globalStyles } from '../../theme'
import ToggleEye from './ToggleEye'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useTranslation } from 'react-i18next'
import emailIsValid from '../../utils/emailIsValid'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetToReducerAction } from '../../redux/actions'
import { logAction } from '../../actions'
import styles from './styles'
import { RegisterStepOneRouteName } from '../screensRoutes'

const LoginScreen = ({ navigation }: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = React.useState('')
  const email: string = useSelector((state) =>
    datasetSelector(state, 'login_email')
  )
  const login_is_loading: boolean = useSelector((state) =>
    datasetSelector(state, 'login_is_loading')
  )
  const setEmail = React.useCallback(
    (email: string) => {
      dispatch(setDatasetToReducerAction(email, 'login_email'))
    },
    [dispatch, setDatasetToReducerAction]
  )

  const inputsValid = React.useMemo(() => {
    let isValid = !login_is_loading

    if (!email.length || !emailIsValid(email)) isValid = false
    else if (password.length < 6) isValid = false

    return isValid
  }, [login_is_loading, email, emailIsValid, password])

  const inputEmail: React.RefObject<any> = React.useRef()
  const inputPassword: React.RefObject<any> = React.useRef()

  const onLogin = React.useCallback(
    async (email: string, password: string) => {
      dispatch(logAction(email, password))
    },
    [dispatch, logAction]
  )

  const goToRegisterScreen = React.useCallback(() => {
    navigation.navigate(RegisterStepOneRouteName)
  }, [])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setDatasetToReducerAction(false, 'login_is_loading'))
    })
    navigation.addListener('blur', () => {
      dispatch(setDatasetToReducerAction(false, 'login_is_loading'))
    })

    return unsubscribe
  }, [navigation, dispatch])

  return (
    <MainContainer scrollHeight="100%">
      <View style={styles.formContainer}>
        <Form style={styles.form}>
          <Text style={styles.welcome}>Bienvenido</Text>
          <Item regular style={styles.inputContainer}>
            <Input
              ref={inputEmail}
              placeholder={t('email_or_phone')}
              placeholderTextColor="white"
              style={styles.input}
              returnKeyType="next"
              value={email}
              onChangeText={(text) => setEmail(text)}
              onSubmitEditing={() => inputPassword?.current?._root?.focus()}
              autoCapitalize="none"
            />
          </Item>

          <Item regular style={styles.inputContainer}>
            <Input
              ref={inputPassword}
              placeholder={t('password')}
              placeholderTextColor="white"
              style={styles.input}
              returnKeyType="done"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <ToggleEye show={showPassword} />
            </TouchableOpacity>
          </Item>

          <Button
            block
            style={[
              styles.sigInButton,
              !inputsValid && styles.sigInButtonDisabled,
            ]}
            disabled={!inputsValid}
            onPress={() => onLogin(email, password)}
          >
            {login_is_loading ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <Text
                style={[
                  styles.sigInText,
                  !inputsValid && styles.sigInTextDisabled,
                ]}
              >
                {t('login')}
              </Text>
            )}
          </Button>
        </Form>
      </View>
      <TouchableOpacity style={[styles.register]} onPress={goToRegisterScreen}>
        <Text style={styles.newUserText}>¿{t('im_new')}?</Text>
        <Text style={[styles.registerText, globalStyles.bold]}>
          {t('register')}
        </Text>
      </TouchableOpacity>
    </MainContainer>
  )
}
export default LoginScreen
