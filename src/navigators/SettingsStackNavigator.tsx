import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
import {SettingsOne} from '../screens/settings-screens';
import {NotificationScreen} from '../screens/settings-screens/Notification';
import {FaqScreen} from '../screens/settings-screens/Faq';
import {TermsPolicyScreen} from '../screens/settings-screens/TermsPolicy';
import {PrivacySettingsScreen} from '../screens/settings-screens/PrivacySettings';
import {BlocklistScreen} from '../screens/settings-screens/Blocklist';
import {SettingsTransactionScreen} from '../screens/settings-screens/SettingsTransaction';
import {TransactionHistoryScreen} from '../screens/settings-screens/TransactionHistory';
import CreateProfile from '../screens/auth-screens/create-profile-screens/CreateProfile';
import SubscriptionScreen from '../screens/settings-screens/Subscription';
import PaymentStackNavigator from './PaymentStackNavigator';

const Stack = createStackNavigator();
const SettingsStackNavigator = () => {
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
      initialRouteName="SettingsOne">
      <Stack.Screen name="SettingsOne" component={SettingsOne} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="TermsConditions" component={TermsPolicyScreen} />
      <Stack.Screen name="PrivacyPolicy" component={TermsPolicyScreen} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="Blocklist" component={BlocklistScreen} />
      <Stack.Screen
        name="Payment"
        component={PaymentStackNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SettingsTransaction"
        component={SettingsTransactionScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={CreateProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
      />
      <Stack.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
