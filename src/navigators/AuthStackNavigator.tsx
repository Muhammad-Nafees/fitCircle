import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {View} from 'react-native';
import SplashScreen from '../screens';
import SignInScreenOne from '../screens/auth-screens/signin-screens/SigninScreenOne';
import SignInScreenTwo from '../screens/auth-screens/signin-screens/SigninScreenTwo';
import LoginFormScreen from '../screens/auth-screens/login-screens/LoginFormScreen';
import SignupFormScreen from '../screens/auth-screens/signup-screens/SignupFormScreen';
import CreateAccount from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {horizontalScale, verticalScale} from '../utils/metrics';
import CreateProfile from '../screens/auth-screens/create-profile-screens/CreateProfile';
import GenderScreen from '../screens/auth-screens/create-profile-screens/GenderScreen';
import CustomHeader from '../components/shared-components/CustomHeader';
import InterestScreen from '../screens/auth-screens/create-profile-screens/InterestScreen';
import CommunitiesScreen from '../screens/auth-screens/create-profile-screens/CommunitiesScreen';
import SocialMediaAccount from '../screens/auth-screens/create-profile-screens/SocialMediaAccount';
import VerifyScreen from '../screens/auth-screens/create-profile-screens/VerifyScreen';
import OtpScreen from '../screens/auth-screens/create-profile-screens/OtpScreen';
import UploadCertificate from '../screens/auth-screens/create-profile-screens/UploadCertificate';
import ChooseVerificationType from '../screens/auth-screens/create-profile-screens/ChooseVerificationType';
import HomeScreen from '../screens/home-screens';
import ForgetPassword from '../screens/auth-screens/forget-password-screens/ForgetPassword';
import CreateNewPassword from '../screens/auth-screens/forget-password-screens/CreateNewPassword';
import HomeTabNavigator from './HomeModuleNavigator';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
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
      initialRouteName="GenderScreen">
      {/* // initialRouteName="SplashScreen">  */}
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
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="HomeModule" component={HomeTabNavigator} />
    </Stack.Navigator>  
  );
};

export default AuthStackNavigator;
