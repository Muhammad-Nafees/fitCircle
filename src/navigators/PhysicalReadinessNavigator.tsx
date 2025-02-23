import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {VerificationOne} from '../screens/dashboard-screens/physical-readiness-screens/VerificationOne';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
import VerificationTwo from '../screens/dashboard-screens/physical-readiness-screens/VerificationTwo';
import VerificationFour from '../screens/dashboard-screens/physical-readiness-screens/VerificationFour';
import VerificationFive from '../screens/dashboard-screens/physical-readiness-screens/VerificationFive';
import VerificationSix from '../screens/dashboard-screens/physical-readiness-screens/VerificationSix';
import VerificationThree from '../screens/dashboard-screens/physical-readiness-screens/VerificationThree';
import VerificationSeven from '../screens/dashboard-screens/physical-readiness-screens/VerificationSeven';
import {useNavigation} from '@react-navigation/native';
import VerifyScreen from '../screens/auth-screens/create-profile-screens/VerifyScreen';

const Stack = createStackNavigator();
const PhysicalReadinessStackNavigator = () => {
  const navigation = useNavigation();
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
      <Stack.Screen
        name="VerificationOne"
        component={VerificationOne}
        options={{headerShown: false}}
      />
      <Stack.Screen name="VerificationTwo" component={VerificationTwo} />
      <Stack.Screen name="VerificationThree" component={VerificationThree} />
      <Stack.Screen name="VerificationFour" component={VerificationFour} />
      <Stack.Screen name="VerificationFive" component={VerificationFive} />
      <Stack.Screen name="VerificationSix" component={VerificationSix} />
      <Stack.Screen name="VerificationSeven" component={VerificationSeven} />
      <Stack.Screen
        name="TdeeFromSavedScreen"
        component={VerifyScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default PhysicalReadinessStackNavigator;
