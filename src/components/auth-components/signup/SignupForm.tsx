import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {signUpFormSchema} from '../../../validations';
import CustomInput from '../../shared-components/CustomInput';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../shared-components/CustomButton';
import {Formik} from 'formik';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../interfaces/navigation.type';
import {useRef, useState} from 'react';
import CustomLoader from '../../shared-components/CustomLoader';
import CustomPhoneInput from '../../shared-components/CustomPhoneInput';
import PhoneInput from 'react-native-phone-number-input';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignupForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');

  const phoneNumberCheck = (values: any) => {
    const isValid = phoneInput.current?.isValidNumber(values);
    if (!isValid) {
      setIsError('Invalid phone number!');
    } else {
      setIsError('');
    }
  };

  const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    if (isError) {
      setIsLoading(false);
      return;
    }
    
    const getCode = phoneInput.current?.getCountryCode();
    navigation.navigate('CreateAccount', {
      email: values.email,
      password: values.password,
      phone: values.phone,
      name: values.name,
      phoneCode: phoneCode,
      countryCode: getCode,
    });
    setIsLoading(false);
  };

  return (
    <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpFormSchema}
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
          <View
            style={{
              marginTop: verticalScale(42),
              gap: 0,
              alignItems: 'center',
            }}>
            <CustomInput
              label="Name"
              placeholder="Username"
              value={values.name}
              error={errors.name}
              touched={touched.name}
              initialTouched={true}
              handleChange={handleChange('name')}
              setFieldError={setFieldError}
              fieldName="name"
            />
            <CustomInput
              label="Email"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              error={errors.email}
              touched={touched.email}
              initialTouched={true}
              handleChange={handleChange('email')}
              setFieldError={setFieldError}
              fieldName="email"
            />
            <CustomPhoneInput
              label="Phone number"
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
            />
            <View style={{gap: 0, position: 'relative'}}>
              <CustomInput
                label="Password"
                placeholder="Password"
                value={values.password}
                error={errors.password}
                touched={touched.email}
                initialTouched={true}
                isPasswordIcon={true}
                handleChange={handleChange('password')}
                setFieldError={setFieldError}
                fieldName="password"
              />
            </View>
            <View style={{marginTop: verticalScale(15), gap: 37}}>
              <CustomButton
                onPress={async () => {
                  await phoneNumberCheck(values.phone);
                  handleSubmit();
                }}
                extraStyles={{
                  height: verticalScale(50),
                  paddingHorizontal: horizontalScale(120),
                }}
                isDisabled={isLoading ? true : false}>
                {' '}
                {isLoading ? <CustomLoader /> : 'Sign up'}
              </CustomButton>
            </View>
            <View style={styles.loginContainer}>
              <Text style={STYLES.text14}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginFormScreen')}>
                <Text
                  style={[
                    STYLES.text14,
                    {
                      color: '#209BCC',
                      textDecorationLine: 'underline',
                      fontFamily: 'Poppins-Bold',
                    },
                  ]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginVertical: verticalScale(47),
                marginLeft: -50,
                width: 250
              }}>
              <Text
                style={[
                  STYLES.text12,
                  {
                    fontWeight: '500',
                    color: '#979797',
                    fontFamily: 'Gilroy-Medium',
                    lineHeight: 16,
                  },
                ]}>
                By clicking login, you agree to our{' '}
                <Text
                  style={{color: '#219EBC'}}
                  onPress={() => navigation.navigate('TermsConditions')}>
                  Terms and Conditions{' '}
                </Text>{' '}
                and
                <Text
                  style={{color: '#219EBC'}}
                  onPress={() => navigation.navigate('PrivacyPolicy')}>
                  {' '}
                  Privacy Policy{' '}
                </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default SignupForm;

const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
});
