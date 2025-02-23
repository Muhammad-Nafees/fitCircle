import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import {forgetPasswordSchema} from '../../../validations';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
// import {generateEmailOtp} from '../../../api';
import Icon from 'react-native-vector-icons/Ionicons';
import {getOtpCode} from '../../../api/auth-module';

interface FormValues {
  email: string;
}

const ForgetPasswordEmail = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const initialValues: FormValues = {
    email: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await getOtpCode(values);
      const data = response?.data.data;
      navigation.navigate('ForgetPasswordOtp', {
        otp: data.code,
        email: values.email.toLowerCase(),
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response?.data,"forgetpass error!!")
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
        console.log(error.response, 'error');
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <ScrollView style={STYLES.container} keyboardShouldPersistTaps="always">
      <View style={{gap: 10}}>
        <Text
          style={[
            STYLES.text16,
            {fontWeight: '500', fontSize: 22, paddingTop: verticalScale(12)},
          ]}>
          Forgot Password
        </Text>
        <Text style={[STYLES.text12, {fontWeight: '400'}]}>
          You can easily reset your password here!
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={forgetPasswordSchema}
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
          setFieldError,
        }) => (
          <View style={{flex: 1}}>
            <View style={{marginTop: verticalScale(42), gap: 0}}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={{
                  width: horizontalScale(340),
                  backgroundColor: 'black',
                  color: '#fff',
                  borderRadius: 10,
                  height: verticalScale(50),
                  paddingHorizontal: horizontalScale(15),
                  borderWidth: isFocused ? 1 : 0,
                  borderColor: isFocused ? 'white' : 'gray',
                }}
                placeholder="Type here"
                placeholderTextColor="gray"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                onChangeText={text => {
                  handleChange('email')(text);
                  if (errors.email && touched.email) {
                    setFieldError('email', '');
                  }
                }}
                onFocus={handleFocus}
              />
              {errors.email && touched.email ? (
                <View style={styles.errorContainer}>
                  <Icon name="alert-circle" size={22} color="red" />
                  <Text style={[STYLES.text12, {color: 'red'}]}>
                    {errors.email}
                  </Text>
                </View>
              ) : (
                <View style={{height: 35}} />
              )}
            </View>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
              <View style={{height: verticalScale(300)}}></View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPasswordNumber')}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: verticalScale(12),
                    color: '#268CAA',
                  }}>
                  Use phone number instead
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isLoading || values.email.trim() === ''}
                onPress={handleSubmit}
                style={{
                  backgroundColor:
                    values.email.trim() === '' ? 'transparent' : '#209BCC',
                  borderRadius: 25,
                  paddingVertical: verticalScale(17),
                  alignItems: 'center',
                  borderWidth: values.email.trim() === '' ? 1 : 0,
                  borderColor: 'gray',
                }}>
                {isLoading ? (
                  <CustomLoader />
                ) : (
                  <Text
                    style={{
                      color: values.email.trim() === '' ? 'gray' : 'white',
                    }}>
                    Next
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    paddingVertical: verticalScale(12),
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: verticalScale(7),
    marginBottom: verticalScale(4),
  },
});

export default ForgetPasswordEmail;
