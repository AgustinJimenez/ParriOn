import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  RefreshControl,
  RefreshControlProps,
} from 'react-native'
import ImageAtomsBg from '../../assets/images/atoms_bg.png'
import globalStyles, { colors } from '../../theme'
import ImageUserDefault from '../../assets/images/UserImageDefault.png'
import AvatarImage from '../../assets/images/avatar_image.png'
import { scale } from '../../theme'
import ShoppingCart from '../ShoppingCart'
import { useNavigation } from '@react-navigation/core'
import ImageFlame from '../../assets/images/flame.png'
import { ProfileScreenRouteName } from '../../screens/screensRoutes'
import { Icon } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const BackButton = ({}) => {
  const navigation = useNavigation()
  const goBack = React.useCallback(() => {
    navigation.goBack()
  }, [navigation])

  return (
    <TouchableOpacity onPress={goBack} style={styles.goBackIconContainer}>
      <Icon type="AntDesign" name="arrowleft" style={styles.goBackIcon} />
    </TouchableOpacity>
  )
}

const TopTitle = ({ value = '' }: any) => {
  if (!value) return null

  return <Text style={styles.title}>{value}</Text>
}

const TopFlameLogo = () => {
  return (
    <Image
      source={ImageFlame}
      resizeMode="contain"
      style={styles.topFlameIcon}
    />
  )
}

const Avatar = () => {
  const navigation = useNavigation()

  const goToProfile = React.useCallback(() => {
    navigation.navigate(ProfileScreenRouteName)
  }, [navigation, ProfileScreenRouteName])

  return (
    <TouchableOpacity onPress={goToProfile} style={[styles.avatarContainer]}>
      <Image
        defaultSource={ImageUserDefault}
        source={{ uri: undefined }}
        resizeMode="contain"
        style={styles.avatar}
      />
    </TouchableOpacity>
  )
}

interface MainContainerProps {
  children?: any
  hasAvatar?: boolean
  hasShoppingCart?: boolean
  hasTopFlameLogo?: boolean
  hasGoBackButton?: boolean
  title?: string | undefined
  scrollPaddingBottom?: boolean
  refreshing?: boolean
  onRefresh?: () => void
}

const MainContainer = ({
  children,
  hasAvatar = false,
  hasShoppingCart = false,
  hasTopFlameLogo = true,
  hasGoBackButton = false,
  title = '',
  scrollPaddingBottom = false,
  refreshing = false,
  onRefresh,
}: MainContainerProps) => (
  <View style={{ flex: 1 }}>
    <ImageBackground
      source={ImageAtomsBg}
      style={styles.bgImage}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          refreshControl={
            !!onRefresh && (
              <RefreshControl
                enabled={!!onRefresh}
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.warning()}
              />
            )
          }
          contentContainerStyle={[
            globalStyles.scrollContainer,
            !!scrollPaddingBottom ? { paddingBottom: scale(2) } : {},
          ]}
        >
          <TopTitle value={title} />
          {children}
        </KeyboardAwareScrollView>
        {hasTopFlameLogo && <TopFlameLogo />}
        {hasGoBackButton && <BackButton />}
        {hasAvatar && <Avatar />}
        {hasShoppingCart && <ShoppingCart />}
      </SafeAreaView>
    </ImageBackground>
  </View>
)
export default MainContainer
