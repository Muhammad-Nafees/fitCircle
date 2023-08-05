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
import {loginSchema} from '../../../validations';
import CustomInput from '../../shared-components/CustomInput';
import {STYLES} from '../../../styles/globalStyles';
import CustomDivider from '../../shared-components/CustomDivider';
import SocialIcons from '../../shared-components/SocialIcons';
import CustomButton from '../../shared-components/CustomButton';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../interfaces/navigation.type';
import {useState} from 'react';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../shared-components/CustomLoader';
import {loginIn} from '../../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  authenticate,
  setaccessToken,
  setAuthorizationToken,
  setUserData,
  setuserRole,
} from '../../../redux/authSlice';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'HomeScreen',
  'ForgetPassword'
>;

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const initialValues: FormValues = {
    email: '',
    password: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await loginIn(values.email, values.password);
      setIsLoading(false);
      if (response?.status === 200) {
        dispatch(authenticate());
        dispatch(setAuthorizationToken(response?.headers.authorization));
        storeData(response?.headers.authorization);
        dispatch(setuserRole(response.data.role));
        dispatch(setaccessToken(response?.data.token));
        dispatch(setUserData(response?.data));
        Toast.show({
          type: 'success',
          text1: 'Login Successful!',
          text2: 'Welcome!',
        });
        navigation.navigate('HomeScreen');
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response.status === 400) {
        Toast.show({
          type: 'error',
          text1: 'Login Unsuccessfull!',
          text2: 'Invalid email or password!',
        });
      } else if (error.response.status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Login Unsuccessfull!',
          text2: 'Internal Server Error. Please try again later',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Unsuccessfull!',
          text2: 'Network error. Please try again later',
        });
      }
    }
  };

  const storeData = async (value: any) => {
    try {
      await AsyncStorage.setItem('authToken', value);
    } catch (e) {
      console.log(e);
    }
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
          <View
            style={{
              marginTop: verticalScale(42),
              gap: 0,
              alignItems: 'center',
            }}>
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
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPasswordEmail')}>
                <Text
                  style={[
                    STYLES.text12,
                    {
                      color: '#209BCC',
                      borderBottomWidth: 1,
                      borderBottomColor: '#209BCC',
                      width: horizontalScale(96),
                      position: 'absolute',
                      left: 0,
                      bottom: -verticalScale(10),
                    },
                  ]}>
                  Forget Password
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: verticalScale(37), gap: 37}}>
              <CustomButton
                onPress={handleSubmit}
                extraStyles={{height: verticalScale(50)}}
                isDisabled={isLoading ? true : false}>
                {' '}
                {isLoading ? <CustomLoader /> : ' Log in'}
              </CustomButton>
              <CustomDivider text="Or Sign Up" />
              <SocialIcons />
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 2,
                justifyContent: 'center',
                marginTop: verticalScale(30),
              }}>
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: verticalScale(630),
    // overflow: 'scroll',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.93)',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(42),
  },
});
