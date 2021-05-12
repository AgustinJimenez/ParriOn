import React from 'react'
import ImageUserDefault from '../../assets/images/UserImageDefault.png'
import { Image, Text, TouchableOpacity } from 'react-native'
import { View, Input, Item, Icon, Form } from 'native-base'

import MainContainer from '../../components/MainContainer'
import globalStyles, { colors, scale } from '../../theme'
import styles from './styles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import SimpleButton from '../../components/SimpleButton'
import { logoutAction } from '../../actions'
import { EditProfileScreenRouteName } from '../screensRoutes'

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => datasetSelector(state, 'user'))
  const { t } = useTranslation()

  const logout = React.useCallback(() => {
    dispatch(logoutAction())
  }, [dispatch, logoutAction])
  const goToEditProfile = React.useCallback(() => {
    navigation.navigate(EditProfileScreenRouteName)
  }, [navigation])

  return (
    <MainContainer
      hasShoppingCart
      hasGoBackButton
      title={t('your_profile')}
      scrollPaddingBottom
    >
      <TouchableOpacity style={{ alignItems: 'center' }}>
        <Image
          source={{ uri: user?.image }}
          defaultSource={ImageUserDefault}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <View style={styles.fieldContainer}>
        {[
          { label: 'Nombre y apellido', value: user.name },
          { label: 'Fecha de nacimiento', value: '20 de enero 1987' },
          { label: 'Numero de teléfono', value: '+595 975 122387' },
          { label: 'Direccion', value: 'Antequeran 532 c/ Tacuari' },
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
