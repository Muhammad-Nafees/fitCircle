import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {View} from 'react-native';
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
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
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
      initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeTabNavigator}
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
        name="BlankButtonRender"
        component={BlankButtonRenderScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
