import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {AddPostScreen} from '../screens/home-screens/AddPostScreen';
import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import MealPlanStackNavigator from './MealPlanStackNavigator';
import ScheduleStackNavigator from './ScheduleStackNavigator';
import PhysicalReadinessStackNavigator from './PhysicalReadinessStackNavigator';
import TdeeCalculatorStackNavigator from './TdeeCalculatorStackNavigator';

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
        name="MealPlan"
        component={MealPlanStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPostScreen"
        component={AddPostScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MySche"
        component={ScheduleStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PhysicalReadiness"
        component={PhysicalReadinessStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tdee"
        component={TdeeCalculatorStackNavigator}
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
