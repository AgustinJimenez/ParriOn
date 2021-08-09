import React from 'react'
import { Platform, TouchableOpacity, Text, FlatList } from 'react-native'
import { Icon, Picker, View, Item } from 'native-base'
import globalStyles, { colors, scale } from '../../theme'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetToReducerAction } from '../../redux/actions'

const Select = ({
  placeholder,
  style,
  selectedValue,
  onValueChange,
  items = [],
  iosIcon = (
    <View style={{ flex: 1 }}>
      <Icon
        style={{ alignSelf: 'flex-end', paddingRight: 10 }}
        name="arrow-down"
      />
    </View>
  ),
}) => {
  let dispatch = useDispatch()
  let product_count_modal_is_visible = useSelector((state) =>
    datasetSelector(state, 'product_count_modal_is_visible')
  )
  let setVisible = (is_visible) =>
    dispatch(
      setDatasetToReducerAction(is_visible, 'product_count_modal_is_visible')
    )

  let selectedValueLabel = null
  items.some(({ value, label }) => {
    if (value === selectedValue) {
      selectedValueLabel = label
      return true
    }
    return false
  })

  return (
    <>
      <TouchableOpacity
        style={[{ flexDirection: 'row' }, style]}
        onPress={() => setVisible(!product_count_modal_is_visible)}
      >
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: '500',
              fontSize: scale(0.4),
            }}
          >
            {!!selectedValue ? selectedValueLabel : placeholder}
          </Text>
        </View>
        {iosIcon}
      </TouchableOpacity>
      <Modal
        isVisible={product_count_modal_is_visible}
        onBackButtonPress={() => setVisible(false)}
        style={{
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.support(),
            borderRadius: scale(0.4),
            marginVertical: scale(1.5),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1,
                alignSelf: 'center',
                fontSize: scale(0.5),
                color: 'white',
                textAlign: 'center',
                fontWeight: '800',
                paddingBottom: scale(0.3),
                paddingTop: scale(0.3),
                ...globalStyles.textShadowLow,
              }}
            >
              {placeholder}
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                paddingRight: scale(0.2),
                paddingTop: scale(0.2),
              }}
            >
              <Icon
                name="circle-with-cross"
                type="Entypo"
                style={{ color: 'white', ...globalStyles.textShadowLow }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            style={{ height: '100%' }}
            data={items}
            renderItem={({ item, key }) => (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  onValueChange(item.value)
                  setVisible(false)
                }}
                style={{
                  borderTopColor: 'gray',
                  borderTopWidth: scale(0.03),
                  width: '100%',
                  alignItems: 'center',
                  paddingVertical: scale(0.5),
                }}
              >
                <Text
                  style={[
                    {
                      fontSize: scale(0.4),
                      color: 'white',
                    },
                    globalStyles.textShadowLow,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  )
}

export default Select
