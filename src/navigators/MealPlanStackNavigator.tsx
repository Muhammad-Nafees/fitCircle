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
import CreateMealPlan from '../screens/dashboard-screens/meal-plan-screens/CreateMealPlan';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import UploadMealPlan from '../screens/dashboard-screens/meal-plan-screens/UploadMealPlan';
import MessageStackNavigator from './MessageStackNavigator';

const Stack = createStackNavigator();
const MealPlanStackNavigator = () => {
  const userRole: any = useSelector((state: RootState) => state.auth.userRole);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        title: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName={userRole !== 'user' ? 'CreateMealPlan' : 'MealPlanOne'}>
      <Stack.Screen name="CreateMealPlan" component={CreateMealPlan} />
      <Stack.Screen name="UploadMealPlan" component={UploadMealPlan} />
      <Stack.Screen name="MealPlanOne" component={MealPlanOne} />
      <Stack.Screen name="MealPlanTwo" component={MealPlanTwo} />
      <Stack.Screen name="MealPlanThree" component={MealPlanThree} />
      <Stack.Screen name="MealPlanFour" component={MealPlanFour} />
      <Stack.Screen
        name="RequestMealPlan"
        component={RequestMealPlan}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MealPlanStackNavigator;
