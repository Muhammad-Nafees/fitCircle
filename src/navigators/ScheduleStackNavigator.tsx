import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {Slot} from '../screens/schedule-trainer-screens/Slot';
import SetSchedule from '../screens/schedule-trainer-screens/SetSchedule';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();
const ScheduleStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        title: '',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      initialRouteName="Slot">
      <Stack.Screen name="Slot" component={Slot} />
      <Stack.Screen name="SetSchedule" component={SetSchedule} />
      <Stack.Screen
        name="DashboardScreen"
        component={HomeTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ScheduleStackNavigator;
