import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MealPlanOne} from '../screens/dashboard-screens/meal-plan-screens/MealPlanOne';
import {MealPlanTwo} from '../screens/dashboard-screens/meal-plan-screens/MealPlanTwo';
import {MealPlanThree} from '../screens/dashboard-screens/meal-plan-screens/MealPlanThree';
import {MealPlanFour} from '../screens/dashboard-screens/meal-plan-screens/MealPlanFour';
import RequestMealPlan from '../screens/dashboard-screens/meal-plan-screens/RequestMealPlan';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();
const MealPlanStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        title: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="MealPlanOne">
      <Stack.Screen name="MealPlanOne" component={MealPlanOne} />
      <Stack.Screen name="MealPlanTwo" component={MealPlanTwo} />
      <Stack.Screen name="MealPlanThree" component={MealPlanThree} />
      <Stack.Screen name="MealPlanFour" component={MealPlanFour} />
      <Stack.Screen
        name="RequestMealPlan"
        component={RequestMealPlan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MealPlanStackNavigator;
