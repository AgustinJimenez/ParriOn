import React from 'react'
import {
  ImageBackground,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
  RefreshControl,
  Platform,
} from 'react-native'
import ImageAtomsBg from '../../assets/images/atoms_bg.png'
import globalStyles, { colors } from '../../theme'
import ImageUserDefault from '../../assets/images/UserImageDefault.png'
import ImageFlame from '../../assets/images/flame.png'
import { scale } from '../../theme'
import ShoppingCart from './ShoppingCart'
import { useNavigation } from '@react-navigation/native'
import { ProfileScreenRouteName } from '../../screens/screensRoutes'
import { Icon } from 'native-base'
import styles from './styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'

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

const TopFlameLogo = ({ topFlameIconStyles }: any = {}) => {
  return (
    <Image
      source={ImageFlame}
      resizeMode="contain"
      style={[styles.topFlameIcon, topFlameIconStyles]}
    />
  )
}

const Avatar = () => {
  const navigation = useNavigation()
  const user = useSelector((state) => datasetSelector(state, 'user'))

  const goToProfile = React.useCallback(() => {
    console.log('hwere')
    navigation.navigate(ProfileScreenRouteName)
  }, [navigation, ProfileScreenRouteName])

  return (
    <TouchableOpacity onPress={goToProfile} style={styles.avatarContainer}>
      <Image
        defaultSource={ImageUserDefault}
        source={
          !!user.avatar ? { uri: user.avatar || undefined } : ImageUserDefault
        }
        resizeMode="cover"
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
  refreshing?: boolean
  onRefresh?: () => void
  renderBottomView?: Function
  topFlameIconStyles?: object
  scrollHeight?: number | string
}

const MainContainer = (props: MainContainerProps) => {
  const {
    children,
    hasAvatar = false,
    hasShoppingCart = false,
    hasTopFlameLogo = true,
    hasGoBackButton = false,
    title = '',
    refreshing = false,
    onRefresh,
    scrollHeight = '100%',
    renderBottomView = () => {},
    topFlameIconStyles = {},
  } = props
  return (
    <ImageBackground
      source={ImageAtomsBg}
      style={styles.bgImage}
      resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableAutomaticScroll
          scrollEnabled
          enableOnAndroid
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
            {
              height: scrollHeight,
            },
          ]}
        >
          <TopTitle value={title} />
          {children}
        </KeyboardAwareScrollView>
        {renderBottomView()}
        {hasTopFlameLogo && (
          <TopFlameLogo topFlameIconStyles={topFlameIconStyles} />
        )}
        {hasGoBackButton && <BackButton />}
        {hasAvatar && <Avatar />}
        {hasShoppingCart && <ShoppingCart />}
      </SafeAreaView>
    </ImageBackground>
  )
}
export default MainContainer
