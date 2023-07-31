import React, {useState} from 'react';
import {View} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomInput from '../../../components/shared-components/CustomInput';
import {Formik} from 'formik';
import {forgetPasswordSchema} from '../../../validations';
import CustomButton from '../../../components/shared-components/CustomButton';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {generateOtp} from '../../../api';

interface FormValues {
  email: string;
}

const ForgetPassword = ({navigation}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: FormValues = {
    email: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await generateOtp(values.email);
      const data = response.data;
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'User Verified!',
      });
      navigation.navigate('OtpScreen', {
        otp: data,
        email: values.email.toLowerCase(),
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
  return (
    <View style={STYLES.container}>
      <View style={{gap: 10}}>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          Forgot Password
        </Text>
        <Text style={[STYLES.text12, {fontWeight: '400'}]}>
          Kindly enter your email so we can send you a verification.
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
        }) => (
          <>
            <View
              style={{
                marginTop: verticalScale(42),
                gap: 0,
              }}>
              <CustomInput
                label="Email"
                placeholder="Email-Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                initialTouched={true}
                extraStyles={{width: horizontalScale(340)}}
                handleChange={handleChange('email')}
              />
            </View>
            <View style={{marginTop: verticalScale(140)}}>
              <CustomButton
                isDisabled={isLoading ? true : false}
                onPress={handleSubmit}>
                {isLoading ? <CustomLoader /> : 'Send Verification'}
              </CustomButton>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default ForgetPassword;
