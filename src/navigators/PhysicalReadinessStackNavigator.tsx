import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {VerificationOne} from '../screens/dashboard-screens/physical-readiness-screens/VerificationOne';
import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
import VerificationTwo from '../screens/dashboard-screens/physical-readiness-screens/VerificationTwo';
import VerificationFour from '../screens/dashboard-screens/physical-readiness-screens/VerificationFour';
import VerificationFive from '../screens/dashboard-screens/physical-readiness-screens/VerificationFive';
import VerificationSix from '../screens/dashboard-screens/physical-readiness-screens/VerificationSix';
import VerificationThree from '../screens/dashboard-screens/physical-readiness-screens/VerificationThree';
import VerificationSeven from '../screens/dashboard-screens/physical-readiness-screens/VerificationSeven';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();
const PhysicalReadinessStackNavigator = () => {
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
      initialRouteName="VerificationOne">
      <Stack.Screen name="VerificationOne" component={VerificationOne} />
      <Stack.Screen name="VerificationTwo" component={VerificationTwo} />
      <Stack.Screen name="VerificationThree" component={VerificationThree} />
      <Stack.Screen name="VerificationFour" component={VerificationFour} />
      <Stack.Screen name="VerificationFive" component={VerificationFive} />
      <Stack.Screen name="VerificationSix" component={VerificationSix} />
      <Stack.Screen name="VerificationSeven" component={VerificationSeven} />
      <Stack.Screen
        name="DashboardScreen"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormSaved"
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

export default PhysicalReadinessStackNavigator;
