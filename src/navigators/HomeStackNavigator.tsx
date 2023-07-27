import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {View} from 'react-native';
import {horizontalScale, verticalScale} from '../utils/metrics';
import PaymentScreen from '../screens/home-screens/PaymentScreen';
import {AddPostScreen} from '../screens/home-screens/AddPostScreen';
import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import {ProfileScreen} from '../screens/home-screens/ProfileScreen';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        title: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="AddPostScreen">
      {/* // initialRouteName="SplashScreen">  */}
      <Stack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessfulDialog"
        component={SuccessfulDialog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UnsuccessfulDialog"
        component={UnsuccessfulDialog}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
