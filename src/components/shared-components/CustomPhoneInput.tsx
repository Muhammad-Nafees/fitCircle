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
            defaultCode="US"
            textInputStyle={{
              height: 20,
              width: 20,
              padding: 0,
              fontSize: 12,
              color: '#000',
            }}
            codeTextStyle={{
              fontSize: moderateScale(12),
              marginTop: -verticalScale(4),
              color: '#000',
            }}
            containerStyle={{
              height: verticalScale(48),
              width: horizontalScale(320),
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
