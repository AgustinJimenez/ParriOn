import React from 'react'
import ImageUserDefault from '../../assets/images/UserImageDefault.png'
import { ActivityIndicator, Image, Text, TouchableOpacity } from 'react-native'
import { View } from 'native-base'

import MainContainer from '../../components/MainContainer'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import SimpleButton from '../../components/SimpleButton'
import {
  logoutAction,
  profileScreenSagaAction,
  updateProfileSagaAction,
} from '../../actions'
import { EditProfileScreenRouteName } from '../screensRoutes'
import dayjs from 'dayjs'
import CameraPicker from '../../components/CameraPicker'
import { UserInterface } from '../../interfaces'

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch()
  const user: UserInterface = useSelector((state) =>
    datasetSelector(state, 'user')
  )
  const profile_photo_is_loading = useSelector((state) =>
    datasetSelector(state, 'profile_photo_is_loading')
  )
  const birthdate = user.birthdate
  const { t } = useTranslation()
  const [showCamera, setCameraStatus] = React.useState(false)

  const logout = React.useCallback(() => {
    dispatch(logoutAction())
  }, [dispatch, logoutAction])
  const goToEditProfile = React.useCallback(() => {
    navigation.navigate(EditProfileScreenRouteName)
  }, [navigation])

  const birthDateFormated = React.useMemo(() => {
    return dayjs(birthdate).format('D [de] MMMM YYYY')
  }, [birthdate, dayjs])

  const updateProfilePicture = React.useCallback(
    (base64) => {
      dispatch(updateProfileSagaAction({ base64 }))
    },
    [dispatch]
  )

  React.useEffect(() => {
    dispatch(profileScreenSagaAction())
  }, [])

  return (
    <MainContainer hasShoppingCart hasGoBackButton title={t('your_profile')}>
      <TouchableOpacity
        disabled={profile_photo_is_loading}
        style={{ alignItems: 'center' }}
        onPress={() => setCameraStatus(true)}
      >
        {!!profile_photo_is_loading ? (
          <ActivityIndicator
            style={styles.profilePhotoIsLoadingLoader}
            size="large"
          />
        ) : (
          <Image
            source={!!user?.avatar ? { uri: user.avatar } : ImageUserDefault}
            defaultSource={ImageUserDefault}
            style={styles.profileImage}
          />
        )}
      </TouchableOpacity>
      <CameraPicker
        base64Data={user.avatar}
        isVisible={showCamera}
        onClose={() => setCameraStatus(false)}
        onSave={updateProfilePicture}
      />

      <View style={styles.fieldContainer}>
        {[
          { label: 'Nombre y apellido', value: user.name },
          {
            label: 'Fecha de nacimiento',
            value: birthDateFormated,
          },
          { label: 'Numero de teléfono', value: user.cellphone },
          {
            label: 'Direccion',
            value: `${user.addresses?.[0]?.address_1}${
              !!user.addresses?.[0]?.house_number
                ? ' ' + user.addresses?.[0]?.house_number
                : ''
            } ${
              !!user.addresses?.[0]?.address_2
                ? 'c/ ' + user.addresses?.[0]?.address_2
                : ''
            }`,
          },
        ].map(({ label, value }, key) => (
          <React.Fragment key={key}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.fieldValue}>{value}</Text>
          </React.Fragment>
        ))}
      </View>
      <SimpleButton style={styles.editDataButton} onPress={goToEditProfile}>
        <Text style={styles.buttonTxt}>{t('edit_data')}</Text>
      </SimpleButton>
      <SimpleButton style={styles.logOutButton} onPress={logout}>
        <Text style={styles.buttonTxt}>{t('logout')}</Text>
      </SimpleButton>
    </MainContainer>
  )
}
export default ProfileScreen
