import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import {MealPlanOne} from '../screens/dashboard-screens/meal-plan-screens/MealPlanOne';
import {Image, TouchableOpacity} from 'react-native';
import {MealPlanTwo} from '../screens/dashboard-screens/meal-plan-screens/MealPlanTwo';
import {MealPlanThree} from '../screens/dashboard-screens/meal-plan-screens/MealPlanThree';
import {MealPlanFour} from '../screens/dashboard-screens/meal-plan-screens/MealPlanFour';
import RequestMealPlan from '../screens/dashboard-screens/meal-plan-screens/RequestMealPlan';

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
        name="SuccessfulDialog"
        component={SuccessfulDialog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RequestMealPlan"
        component={RequestMealPlan}
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

export default MealPlanStackNavigator;
