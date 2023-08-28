import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import UnsuccessfulDialog from '../screens/home-screens/UnsuccessfulDialogScreen';
import SuccessfulDialog from '../screens/home-screens/SuccessfulDialogScreen';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
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
        name="SuccessfulDialog"
        component={SuccessfulDialog}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DashboardScreen"
        component={HomeTabNavigator}
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

export default ScheduleStackNavigator;
