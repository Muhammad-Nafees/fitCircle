import React from 'react';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../styles/globalStyles';

const CustomRadioButton = ({
  text,
  setFieldValue,
  name,
  disabled,
  value,
  error,
  isFormSubmitted,
}: any) => {
  const handleSelect = (selected: string) => {
    setFieldValue(`${name}`, selected);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '400',
          color: 'white',
          textAlign: 'left',
          marginBottom: 5,
        }}>
        {text}
      </Text>
      {error && isFormSubmitted ? (
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
            },
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{error}</Text>
        </View>
      ) : (
        ''
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 16,
        }}>
        <RadioButton.Item
          label="Yes"
          value="Yes"
          status={value === 'Yes' ? 'checked' : 'unchecked'}
          onPress={() => !disabled && handleSelect('Yes')}
          color="#209BCC"
          labelStyle={{
            marginLeft: 5,
            color: 'white',
            fontSize: 12,
            fontWeight: '400',
          }}
          position="leading"
        />
        <RadioButton.Item
          label="No"
          value="No"
          status={value === 'No' ? 'checked' : 'unchecked'}
          onPress={() => !disabled && handleSelect('No')}
          color="#209BCC"
          labelStyle={{
            marginLeft: 5,
            color: 'white',
            fontSize: 12,
            fontWeight: '400',
          }}
          position="leading"
        />
      </View>
    </View>
  );
};

export default CustomRadioButton;