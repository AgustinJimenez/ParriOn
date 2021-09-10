import React from 'react'
import { StatusBar, Linking, Platform } from 'react-native'
import NavigationProvider from './NavigationProvider'
import AsyncStorage from '@react-native-community/async-storage'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Root } from 'native-base'
import LoadingScreen from '../screens/AuthLoadingScreen'
//import NavigationMiddleware from './NavigationScreenMiddleware'
import './i18n'
import NetStatusChecker from './NetStatusChecker'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from './NavigationProvider/service'
//import { disableYellowBox, ignoreWarnings } from '../../env.json'
import GlobalFont from 'react-native-global-font'
import Geolocation from '@react-native-community/geolocation'
import StyleProvider from './StyleProvider'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import { SafeAreaProvider } from 'react-native-safe-area-context'

dayjs.locale('es')

console.disableYellowBox = true

const App = () => {
  const [isReady, setIsReady] = React.useState(__DEV__ ? false : true)
  const [initialState, setInitialState] = React.useState()
  const init = React.useCallback(() => {
    GlobalFont.applyGlobal('CircularStd-Book')
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: false,
    })
  }, [GlobalFont])
  React.useEffect(() => {
    init()
  }, [init])
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL()

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem('navigation')
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined

          if (state !== undefined) {
            setInitialState(state)
          }
        }
      } finally {
        setIsReady(true)
      }
    }

    if (!isReady) {
      restoreState()
    }
  }, [isReady])

  if (!isReady) return <LoadingScreen />

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'black' }}>
      <ReduxProvider store={store}>
        <NavigationContainer
          ref={navigationRef}
          initialState={initialState}
          onStateChange={(state) =>
            AsyncStorage.setItem('navigation', JSON.stringify(state))
          }
        >
          <PersistGate loading={<LoadingScreen />} persistor={persistor}>
            <StyleProvider>
              <Root>
                <StatusBar barStyle="light-content" />
                <NavigationProvider />
                <NetStatusChecker />
              </Root>
            </StyleProvider>
          </PersistGate>
        </NavigationContainer>
      </ReduxProvider>
    </SafeAreaProvider>
  )
}

export default App
