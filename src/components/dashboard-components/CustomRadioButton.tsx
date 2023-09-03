import React from 'react';
import {View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';

const CustomRadioButton = ({
  text,
  value,
  selectedValue,
  setFieldValue,
  name,
  disabled,
  error,
  setFieldError,
}: any) => {
  const handleSelect = (selected: string) => {
    console.log(error);
    setFieldError(name, null);
    setFieldValue(name, selected);
  };

  return (
    <View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          color: 'white',
          textAlign: 'left',
          marginBottom: 5,
        }}>
        {text}
      </Text>
      {error && (
        <Text style={{color: 'red', fontSize: 12}}>This field is required</Text>
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
          status={selectedValue === 'Yes' ? 'checked' : 'unchecked'}
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
          status={selectedValue === 'No' ? 'checked' : 'unchecked'}
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
