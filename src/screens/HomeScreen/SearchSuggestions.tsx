import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { navigationRef } from '../../app/NavigationProvider/service'
import { CATEGORIES_TYPES } from '../../constants'
import { colors, scale } from '../../theme'
import { CategoriesScreenRouteName } from '../screensRoutes'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: scale(0.3),
  },
  suggestion: {
    backgroundColor: colors.support(),
    borderRadius: scale(0.4),
  },
  suggestionTxt: {
    paddingVertical: scale(0.2),
    paddingHorizontal: scale(0.2),
    fontSize: scale(0.37),
  },
  mr: {
    marginRight: scale(0.25),
  },
})

const SearchSuggestions = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const goToCategory = React.useCallback(() => {
    navigation.navigate(CategoriesScreenRouteName, {
      type: CATEGORIES_TYPES.CATEGORIES,
    })
  }, [navigation])
  const goToBrands = React.useCallback(() => {
    navigation.navigate(CategoriesScreenRouteName, {
      type: CATEGORIES_TYPES.BRANDS,
    })
  }, [navigation])
  const goToPromotions = React.useCallback(() => {
    navigation.navigate(CategoriesScreenRouteName, {
      type: CATEGORIES_TYPES.PROMOTIONS,
    })
  }, [navigation])
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.suggestion, styles.mr]}
        onPress={goToCategory}
      >
        <Text style={styles.suggestionTxt}>{t('categories')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.suggestion, styles.mr]}
        onPress={goToBrands}
      >
        <Text style={styles.suggestionTxt}>{t('brands')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.suggestion} onPress={goToPromotions}>
        <Text style={styles.suggestionTxt}>{t('promotions')}</Text>
      </TouchableOpacity>
    </View>
  )
}
export default SearchSuggestions
