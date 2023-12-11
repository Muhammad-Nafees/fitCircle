import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik, Field} from 'formik';
import {signupSchema} from '../../../validations';
import CustomPhoneInput from '../../../components/shared-components/CustomPhoneInput';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import PhoneInput from 'react-native-phone-number-input';
import {register} from '../../../api/auth-module';
import {RootState} from 'redux/store';
import Toast from 'react-native-toast-message';
import {
  setAccessToken,
  setRefreshToken,
  setUserData,
} from '../../../redux/authSlice';

export interface CreateAccountFormValues {
  email: string;
  phone: string | null;
  password: string;
  confirmPassword: string;
}

const CreateAccount = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState(route.params.phoneCode);
  const [countryCode, setCountryCode] = useState(route.params.countryCode);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const dispatch = useDispatch();

  const phoneNumberCheck = (values: any) => {
    const isValid = phoneInput.current?.isValidNumber(values);
    if (!isValid) {
      setIsError('Invalid phone number!');
    } else {
      setIsError('');
    }
  };
  const getCode = phoneInput.current?.getCountryCode();

  const initialValues: CreateAccountFormValues = {
    email: route.params.email,
    phone: route.params.phone,
    password: route.params.password,
    confirmPassword: route.params.password,
  };
  const handleSubmit = async (values: CreateAccountFormValues) => {
    if (isError) {
      return;
    }
    setIsLoading(true);
    const {confirmPassword, ...reqData} = values;
    try {
      const response = await register({
        ...reqData,
        phone: `${values.phone}`,
        phoneCode: `+${phoneCode}`,
        countryCode: getCode ? getCode : countryCode,
        role: userRole,
        fcmToken: 'abcabsdflskdjflskdj',
      });
      const data = response?.data?.data;
      console.log(data.user);
      console.log(data, 'ddd');
      dispatch(setUserData(data?.user));
      dispatch(setAccessToken(data?.accessToken));
      dispatch(setRefreshToken(data?.refreshToken));
      navigation.navigate('CreateProfile');
      Toast.show({
        type: 'success',
        text1: `${response?.data.message}`,
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message, 'ERROR FROM CREATE ACCOUNT!');
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
    }
    setIsLoading(false);
  };
  return (
    <ScrollView style={STYLES.container} keyboardShouldPersistTaps="always">
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          setFieldError,
        }) => (
          <>
            <Text style={styles.titleText}>Create Account</Text>
            <View style={styles.formContainer}>
              <CustomInput
                label="Email"
                placeholder="lincolnsmith@gmail.com"
                value={values.email}
                error={errors.email}
                touched={touched.email}
                keyboardType="email-address"
                autoCapitalize="none"
                initialTouched={true}
                handleChange={handleChange('email')}
                setFieldError={setFieldError}
                fieldName="email"
              />
              <CustomPhoneInput
                value={values.phone}
                error={errors.phone}
                touched={touched.phone}
                handleChange={handleChange('phone')}
                setFieldValue={setFieldValue}
                phoneInput={phoneInput}
                setIsError={setIsError}
                setFieldError={setFieldError}
                isError={isError}
                setPhoneCode={setPhoneCode}
                countryCode={countryCode}
              />
              <CustomInput
                label="Password"
                placeholder="Password"
                value={values.password}
                error={errors.password}
                touched={touched.password}
                isPasswordIcon={true}
                initialTouched={true}
                handleChange={handleChange('password')}
                setFieldError={setFieldError}
                fieldName="password"
              />
              <CustomInput
                label="Re-enter Password"
                placeholder="Re-Enter Password"
                value={values.confirmPassword}
                error={errors.confirmPassword}
                isPasswordIcon={true}
                touched={touched.confirmPassword}
                initialTouched={true}
                handleChange={handleChange('confirmPassword')}
                setFieldError={setFieldError}
                fieldName="confirmPassword"
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                onPress={async () => {
                  await phoneNumberCheck(values.phone);
                  handleSubmit();
                }}
                isDisabled={isLoading ? true : false}>
                {isLoading ? <CustomLoader /> : 'Continue'}{' '}
              </CustomButton>
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },
  button: {
    marginTop: verticalScale(100),
    paddingHorizontal: horizontalScale(22),
    paddingBottom: verticalScale(20),
  },
  titleText: {
    ...STYLES.text16,
    fontWeight: '700',
    marginTop: 16,
  },
});
