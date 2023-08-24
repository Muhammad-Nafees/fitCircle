import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
import {TdeeCalculator} from '../screens/dashboard-screens/tdee-calculator-screens/TdeeCalculator';
import {Results} from '../screens/dashboard-screens/tdee-calculator-screens/Results';
import {MacroCalculator} from '../screens/dashboard-screens/tdee-calculator-screens/MacroCalculator';
import {ChartScreen} from '../screens/dashboard-screens/tdee-calculator-screens/Chart';
import HomeTabNavigator from './HomeTabNavigator';
import MealPlanStackNavigator from './MealPlanStackNavigator';

const Stack = createStackNavigator();
const TdeeCalculatorStackNavigator = () => {
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
      initialRouteName="TdeeCalculator">
      <Stack.Screen name="TdeeCalculator" component={TdeeCalculator} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="MacroCalculator" component={MacroCalculator} />
      <Stack.Screen name="Chart" component={ChartScreen} />
      <Stack.Screen
        name="DashboardScreen"
        component={MealPlanStackNavigator}
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

export default TdeeCalculatorStackNavigator;
