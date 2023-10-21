import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AddPostScreen} from '../screens/home-screens/AddPostScreen';
import HomeTabNavigator from './HomeTabNavigator';
import PhysicalReadinessStackNavigator from './PhysicalReadinessNavigator';
import TdeeCalculatorStackNavigator from './TdeeCalculatorStackNavigator';
import ScheduleStackNavigator from './ScheduleStackNavigator';
import PaymentStackNavigator from './PaymentStackNavigator';
import MealPlanStackNavigator from './MealPlanStackNavigator';

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
      <Stack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tdee"
        component={TdeeCalculatorStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Physical"
        component={PhysicalReadinessStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeTab"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MealPlan"
        component={MealPlanStackNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
