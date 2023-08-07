import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {Formik} from 'formik';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {generatePhoneOtp} from '../../../api';
import PhoneInput from 'react-native-phone-number-input';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Yup from 'yup';

interface FormValues {
  phone: string;
}

const forgetPasswordNumberSchema = Yup.object().shape({
  phone: Yup.string().required('Phone number is required'),
});

const ForgetPasswordNumber = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const phoneInput = useRef<PhoneInput>(null);
  const initialValues: FormValues = {
    phone: '',
  };
  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    const checkValid = phoneInput.current?.isValidNumber(value);
    if (!checkValid) {
      setIsLoading(false);
      return setError('Invalid phone number');
    }
    try {
      console.log(`${values.phone}`);
      const response = await generatePhoneOtp(values.phone);
      console.log(response);
      const data = response.data;
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'User Verified!',
      });
      navigation.navigate('ForgetPasswordOtp', {
        otp: data,
        phone: values.phone,
      });
    } catch (error: any) {
      if (error.response.status == 409) {
        Toast.show({
          type: 'error',
          text1: 'User does not exist!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
        });
      }
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleCountryChange = () => {
    phoneInput.current?.setState({number: ''});
  };

  return (
    <View style={STYLES.container}>
      <View style={{gap: 10}}>
        <Text
          style={[
            STYLES.text16,
            {fontWeight: '500', fontSize: 22, paddingTop: 12},
          ]}>
          Forgot Password
        </Text>
        <Text style={[STYLES.text12, {fontWeight: '400'}]}>
          You can easily reset your password here!
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={forgetPasswordNumberSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          submitForm,
          values,
          errors,
          touched,
          initialTouched,
          setFieldValue,
        }) => (
          <View style={{flex: 1}}>
            <View style={{marginTop: verticalScale(42), gap: 0}}>
              <Text style={styles.label}>Phone Number</Text>
              <View
                style={[
                  {borderRadius: 12},
                  isFocused ? {borderWidth: 1, borderColor: 'white'} : {},
                ]}>
                <PhoneInput
                  ref={phoneInput}
                  defaultCode="US"
                  layout="second"
                  textContainerStyle={{
                    backgroundColor: 'black',
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  }}
                  textInputStyle={{
                    height: 20,
                    width: 20,
                    padding: 0,
                    fontSize: 12,
                    color: 'white',
                  }}
                  codeTextStyle={{
                    fontSize: moderateScale(12),
                    color: 'gray',
                    marginTop: -verticalScale(1),
                  }}
                  containerStyle={{
                    height: verticalScale(50),
                    width: '100%',
                    backgroundColor: '#1F1F1F',
                    borderRadius: 12,
                  }}
                  flagButtonStyle={{
                    width: horizontalScale(85),
                  }}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder=" "
                  value={values.phone}
                  onChangeText={(text: string) => setValue(text)}
                  onChangeFormattedText={phone => {
                    handleChange('phone');
                    setFieldValue('phone', phone);
                    setError('');
                  }}
                  onChangeCountry={country => {
                    handleCountryChange();
                  }}
                />
              </View>
            </View>
            {error ? ( // Render the error message if it's not empty
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  marginTop: verticalScale(7),
                  marginBottom: verticalScale(4),
                }}>
                <Icon name="alert-circle" size={22} color="red" />
                <Text style={[STYLES.text12, {color: 'red'}]}>{error}</Text>
              </View>
            ) : null}
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPasswordEmail')}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: 12,
                    color: '#268CAA',
                  }}>
                  Use email address instead
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading || values.phone.trim() === ''}
                onPress={() => handleSubmit()}
                style={{
                  backgroundColor:
                    values.phone.trim() === '' ? 'transparent' : '#209BCC',
                  borderRadius: 25,
                  paddingVertical: 17,
                  alignItems: 'center',
                  borderWidth: values.phone.trim() === '' ? 1 : 0,
                  borderColor: 'gray',
                }}>
                {isLoading ? (
                  <CustomLoader />
                ) : (
                  <Text
                    style={{
                      color: values.phone.trim() === '' ? 'gray' : 'white',
                    }}>
                    Next
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    paddingVertical: 12,
  },
});

export default ForgetPasswordNumber;
