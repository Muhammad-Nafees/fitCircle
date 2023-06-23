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
import HeaderBackArrow from '../components/shared-components/HeaderBackArrow';
import {horizontalScale, verticalScale} from '../utils/metrics';

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SigninScreenOne" component={SignInScreenOne} />
      <Stack.Screen name="SigninScreenTwo" component={SignInScreenTwo} />
      <Stack.Screen name="LoginFormScreen" component={LoginFormScreen} />
      <Stack.Screen name="SignupFormScreen" component={SignupFormScreen} />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={({route, navigation}) => ({
          headerShown: true,
          headerShadowVisible: false,
          title: '',
          headerStyle: {
            backgroundColor: '#292A2C',
            height: verticalScale(100),
          },
          headerLeft: () => (
            <View
              style={{
                marginTop: verticalScale(20),
                marginLeft: horizontalScale(20),
              }}>
              <HeaderBackArrow onPress={() => navigation.goBack()} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
