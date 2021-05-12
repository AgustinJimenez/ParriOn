import React from 'react'
import getTheme from '../theme/native-base-theme/components'
import material from '../theme/native-base-theme/variables/material'
import { StyleProvider as NativeBaseProvider } from 'native-base'

const StyleProvider = ({ children }: any) => (
  <NativeBaseProvider style={getTheme(material)}>{children}</NativeBaseProvider>
)

export default StyleProvider
