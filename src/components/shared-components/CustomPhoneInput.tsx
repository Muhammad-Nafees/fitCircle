import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import {Field} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  setFieldValue: any;
  label?: string;
  value: any;
  error?: string;
  touched?: boolean;
  handleChange: (number: string) => void;
  phoneInput?: any;
  isError?: any;
  setIsError?: any;
  setPhoneCode: (code: string) => void;
  setFieldError?: any;
  countryCode?: any;
  placeholder?: string;
  disabled?: boolean;
  extraStyles?: any;
}

const CustomPhoneInput = ({
  label,
  handleChange,
  error,
  value,
  touched,
  setFieldValue,
  phoneInput,
  isError,
  setIsError,
  setPhoneCode,
  setFieldError,
  countryCode,
  placeholder,
  disabled = false,
  extraStyles,
}: Props) => {
  const handleCountryChange = () => {
    phoneInput.current?.setState({number: ''});
    setFieldValue('phone', '');
    setIsError('Phone number is required!');
  };

  useEffect(() => {
    if (touched && value === '') {
      setIsError('Phone number is required!');
    }
  }, [touched, value]);

  return (
    <View
      style={{
        gap: 8,
      }}>
      <Text style={STYLES.text12}>{label ? label : 'Verify Number'}</Text>
      <Field name="phoneNumber">
        {() => (
          <PhoneInput
            ref={phoneInput}
            placeholder={placeholder}
            disabled={disabled}
            defaultCode={countryCode === undefined ? 'US' : countryCode}
            textInputStyle={[
              {
                height: 40,
                width: '40%',
                padding: 0,
                margin: 0,
                fontSize: 12,
                color: extraStyles ? 'rgba(255, 255, 255, 0.5)' : '#000',
              },
            ]}
            codeTextStyle={{
              fontSize: moderateScale(12),
              marginTop: -verticalScale(3),
              marginLeft: -horizontalScale(9),
              marginRight: -horizontalScale(-3),
              color: extraStyles ? 'rgba(255, 255, 255, 0.5)' : '#000',
            }}
            textContainerStyle={{
              backgroundColor: extraStyles ? 'rgba(68, 68, 68, 0)' : undefined,
            }}
            containerStyle={[
              {
                height: 45,
                width: horizontalScale(320),
                backgroundColor: 'white',
              },
              extraStyles,
            ]}
            flagButtonStyle={{
              width: horizontalScale(85),
            }}
            value={value}
            onChangeText={phoneNumber => {
              handleChange(phoneNumber);
              setFieldError('phone', '');
              setIsError('');
            }}
            onChangeCountry={country => {
              setPhoneCode(country.callingCode as any);
              console.log(country.callingCode, 'phoeCode');
              handleCountryChange();
            }}
            withShadow
          />
        )}
      </Field>

      {isError !== '' || (touched && !value) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>
            {error ? error : isError}
          </Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};

export default CustomPhoneInput;
