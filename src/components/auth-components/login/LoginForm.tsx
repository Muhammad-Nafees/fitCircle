import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {loginSchema} from '../../../validations';
import CustomInput from '../../shared-components/CustomInput';
import {STYLES} from '../../../styles/globalStyles';
import CustomDivider from '../../shared-components/CustomDivider';
import SocialIcons from '../../shared-components/SocialIcons';
import CustomButton from '../../shared-components/CustomButton';
import {Formik} from 'formik';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../shared-components/CustomLoader';
import {useDispatch} from 'react-redux';
import {
  authenticate,
  setAccessToken,
  setRefreshToken,
  setUserData,
  setuserRole,
} from '../../../redux/authSlice';
import {login} from '../../../api/auth-module';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    const reqData = {
      ...values,
      fcmToken: 'asdfsdfsdfsd211',
    };
    try {
      const response = await login(reqData);
      const data = response?.data.data;
      if (data?.user.isProfileCompleted) {
        dispatch(authenticate(true));
        Toast.show({
          type: 'success',
          text1: `${response?.data.message}`,
        });
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'success',
          text1: `Complete Your Profile To Continue!`,
          visibilityTime: 5000,
        });
        navigation.navigate('CreateProfile');
      }
      dispatch(setuserRole(data?.user.role));
      dispatch(setUserData(data?.user));
      dispatch(setAccessToken(data?.accessToken));
      dispatch(setRefreshToken(data?.refreshToken));
    } catch (error: any) {
      console.log(error?.response);
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
    <ScrollView
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps={'always'}
      showsVerticalScrollIndicator={false}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
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
          <View style={styles.container}>
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
            {/* <View style={{gap: 0, position: 'relative'}}> */}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPasswordEmail')}>
              <Text style={[STYLES.text12, styles.forgetPasswordText]}>
                Forget Password
              </Text>
            </TouchableOpacity>
            {/* </View> */}
            <View
              style={{
                marginTop: verticalScale(37),
                gap: 37,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CustomButton
                onPress={handleSubmit}
                extraStyles={{
                  height: verticalScale(50),
                  width: horizontalScale(300),
                }}
                isDisabled={isLoading ? true : false}>
                {' '}
                {isLoading ? <CustomLoader /> : ' Log in'}
              </CustomButton>
              <CustomDivider text="Or Sign Up" />
              <SocialIcons />
            </View>
            <View style={styles.signUpText}>
              <Text style={STYLES.text14}>Don’t have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SigninScreenTwo')}>
                <Text
                  style={[
                    STYLES.text14,
                    {
                      fontWeight: '700',
                      color: '#209BCC',
                      textDecorationLine: 'underline',
                    },
                  ]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{marginVertical: verticalScale(47)}}>
              <Text
                style={[STYLES.text12, {fontWeight: '500', color: '#979797'}]}>
                By clicking login, you agree to our{' '}
                <Text style={{color: '#219EBC'}}>Terms and Conditions </Text>{' '}
                and
                <Text style={{color: '#219EBC'}}> Privacy Policy </Text>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(42),
    gap: 0,
    // alignItems: 'center',
  },
  forgetPasswordText: {
    color: '#209BCC',
    borderBottomWidth: 1,
    borderBottomColor: '#209BCC',
    // width: 104,
    position: 'absolute',
    left: 0,
    bottom: -verticalScale(10),
  },
  signUpText: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    marginTop: verticalScale(30),
  },
});
