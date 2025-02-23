import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {View} from 'react-native';
import SplashSc from '../screens';
import SplashScreen from '../screens';
import SignInScreenOne from '../screens/auth-screens/signin-screens/SigninScreenOne';
import SignInScreenTwo from '../screens/auth-screens/signin-screens/SigninScreenTwo';
import LoginFormScreen from '../screens/auth-screens/login-screens/LoginFormScreen';
import CreateAccount from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {verticalScale} from '../utils/metrics';
import GenderScreen from '../screens/auth-screens/create-profile-screens/GenderScreen';
import CustomHeader from '../components/shared-components/CustomHeader';
import InterestScreen from '../screens/auth-screens/create-profile-screens/InterestScreen';
import CommunitiesScreen from '../screens/auth-screens/create-profile-screens/CommunitiesScreen';
import SocialMediaAccount from '../screens/auth-screens/create-profile-screens/SocialMediaAccount';
import VerifyScreen from '../screens/auth-screens/create-profile-screens/VerifyScreen';
import OtpScreen from '../screens/auth-screens/create-profile-screens/OtpScreen';
import UploadCertificate from '../screens/auth-screens/create-profile-screens/UploadCertificate';
import ChooseVerificationType from '../screens/auth-screens/create-profile-screens/ChooseVerificationType';
import ForgetPasswordEmail from '../screens/auth-screens/forget-password-screens/ForgetPasswordEmail';
import CreateNewPassword from '../screens/auth-screens/forget-password-screens/CreateNewPassword';
import CreateProfile from '../screens/auth-screens/create-profile-screens/CreateProfile';
import ForgetPasswordOtp from '../screens/auth-screens/forget-password-screens/ForgetPasswordOtp';
import BlankButtonRenderScreen from '../screens/auth-screens/forget-password-screens/BlankButtonRender';
import ForgetPasswordNumber from '../screens/auth-screens/forget-password-screens/ForgotPasswordNumber';
import SignupFormScreen from '../screens/auth-screens/signup-screens/SignupFormScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import AuthStackNavigator from './AuthStackNavigator';
import FavoriteDialogScreen from '../screens/auth-screens/create-profile-screens/FavoriteDialogScreen';
import {TermsPolicyScreen} from '../screens/settings-screens/TermsPolicy';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  if (isAuthenticated) return <AuthStackNavigator />;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        title: '',
        headerStyle: {
          backgroundColor: '#292A2C',
          height: verticalScale(100),
        },
        headerLeft: () => <CustomHeader />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="SplashScreen">
      {/* //  initialRouteName="CreateProfile"> */}

      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigninScreenOne"
        component={SignInScreenOne}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigninScreenTwo"
        component={SignInScreenTwo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginFormScreen"
        component={LoginFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignupFormScreen"
        component={SignupFormScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
      <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen name="GenderScreen" component={GenderScreen} />
      <Stack.Screen name="InterestScreen" component={InterestScreen} />
      <Stack.Screen name="CommunitiesScreen" component={CommunitiesScreen} />
      <Stack.Screen name="SocialMediaAccount" component={SocialMediaAccount} />
      <Stack.Screen
        name="ChooseVerificationType"
        component={ChooseVerificationType}
      />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen
        name="AccountVerified"
        component={VerifyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="UploadCertificate" component={UploadCertificate} />
      <Stack.Screen
        name="CertificateVerified"
        component={VerifyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPasswordEmail"
        component={ForgetPasswordEmail}
      />
      <Stack.Screen
        name="ForgetPasswordNumber"
        component={ForgetPasswordNumber}
      />
      <Stack.Screen name="ForgetPasswordOtp" component={ForgetPasswordOtp} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen
        name="PasswordChangedDialog"
        component={FavoriteDialogScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BlankButtonRender"
        component={BlankButtonRenderScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TermsConditions" component={TermsPolicyScreen} />
      <Stack.Screen name="PrivacyPolicy" component={TermsPolicyScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
