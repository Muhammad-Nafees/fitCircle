import React, {useRef, useState} from 'react';
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
import {register} from '../../../api';
import {
  authenticate,
  setaccessToken,
  setAuthorizationToken,
  setUserData,
} from '../../../redux/authSlice';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import PhoneInput from 'react-native-phone-number-input';

export interface CreateAccountFormValues {
  email: string;
  phone: string | null;
  password: string;
  confirmPassword: string;
}

const CreateAccount = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  const [countryCode, setCountryCode] = useState(route.params.countryCode);

  const phoneNumberCheck = (values: any) => {
    const isValid = phoneInput.current?.isValidNumber(values);
    if (!isValid) {
      setIsError('Invalid phone number!');
    } else {
      setIsError('');
    }
  };

  const initialValues: CreateAccountFormValues = {
    email: route.params.email,
    phone: route.params.phone,
    password: route.params.password,
    confirmPassword: route.params.password,
  };
  const handleSubmit = async (values: CreateAccountFormValues) => {
    setIsLoading(true);
    if (isError) {
      setIsLoading(false);
      return;
    }
    try {
      const dataToSend = {
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        phone: `+${phoneCode}${values.phone}`,
      };
      const response = await register(dataToSend);
      console.log('first');
      if (response?.status === 200) {
        setIsLoading(false);
        console.log(response?.data.email);
        dispatch(authenticate());
        dispatch(setAuthorizationToken(response?.headers.authorization));
        dispatch(setUserData({email: values.email, password: values.password}));
        navigation.navigate('CreateProfile', {email: route.params.email});
      }
    } catch (error: any) {
      console.log(error.response.data);
      setIsLoading(false);
      if (error.response.status === 409) {
        Toast.show({
          type: 'error',
          text1: 'Account Already Exists!',
          text2: 'Please try another email or phone number.',
        });
      } else if (error.response.status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Signup Unsuccessfull!',
          text2: 'Internal Server Error. Please try again later',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Signup Unsuccessfull!',
          text2: 'Invalid phone number!',
        });
      }
    }
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
            <Text style={[STYLES.text16, {fontWeight: '700', marginTop: 16}]}>
              Create Account
            </Text>
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
    marginTop: verticalScale(125),
    paddingHorizontal: horizontalScale(22),
    paddingBottom: verticalScale(20),
  },
});
