import React, {useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import {Field} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  setFieldValue: any;
  label?: string;
  value: any;
  error?: string;
  touched: boolean | undefined;
  handleChange: (number: string) => void;
}

const CustomPhoneInput = ({
  label,
  handleChange,
  error,
  value,
  touched,
  setFieldValue,
}: Props) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<
    boolean | undefined
  >(false);
  const [isError, setIsError] = useState('');
  useEffect(() => {
    if (touched && value === '') {
      setIsError('Phone number is required!');
    }
  }, [touched, value]);
  return (
    <View
      style={{
        // marginVertical: verticalScale(4),
        // marginBottom: verticalScale(20),
        gap: 8,
      }}>
      <Text style={STYLES.text12}>{label ? label : 'Verify Number'}</Text>
      <Field name="phoneNumber">
        {() => (
          <PhoneInput
            ref={phoneInput}
            defaultCode="PK"
            textInputStyle={{
              height: 20,
              width: 20,
              padding: 0,
              fontSize: 12,
              color: '#000',
            }}
            codeTextStyle={{fontSize: 11, color: '#000'}}
            containerStyle={{
              height: verticalScale(48),
              width: horizontalScale(290),
              backgroundColor: 'white',
            }}
            value={value}
            onChangeText={phoneNumber => {
              const isValid = phoneInput.current?.isValidNumber(phoneNumber);
              if (!isValid) {
                setIsError('Invalid phone number!');
              }
              if (isValid) {
                setIsError('');
              }
              handleChange(phoneNumber);
            }}
            withShadow
          />
        )}
      </Field>

      {isError != '' || (touched && !value) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
          }}>
          <Icon name="alert-circle" size={22} color="white" />
          <Text style={STYLES.text12}>{error ? error : isError}</Text>
        </View>
      ) : (
        <View style={{height: 25}} />
      )}
    </View>
  );
};

export default CustomPhoneInput;
