import React from 'react';
import {Text, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import {Field} from 'formik';
import PhoneInput from 'react-native-phone-number-input';

interface Props {
  setFieldValue: any;
  label?: string;
}

const CustomPhoneInput = ({label, setFieldValue}: Props) => {
  return (
    <View
      style={{
        marginVertical: verticalScale(4),
        marginBottom: verticalScale(20),
        gap: 8,
      }}>
      <Text style={STYLES.text12}>{label ? label : 'Verify Number'}</Text>
      <Field name="phoneNumber">
        {() => (
          <PhoneInput
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
            onChangeText={phoneNumber =>
              setFieldValue('phoneNumber', +phoneNumber)
            }
            withShadow
          />
        )}
      </Field>
    </View>
  );
};

export default CustomPhoneInput;
