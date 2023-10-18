import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import CustomHeader from '../components/shared-components/CustomHeader';
import {verticalScale} from '../utils/metrics';
import PaymentScreen from '../screens/payment-screens';
import {PaymentMethodScreen} from '../screens/payment-screens/PaymentMethod';
import AddPaymentScreen from '../screens/payment-screens/AddPayment';
import AddCardScreen from '../screens/payment-screens/AddCard';
import {AddBankScreen} from '../screens/payment-screens/AddBank';
import BankPaymentMethodsScreen from '../screens/payment-screens/BankPaymentMethods';

const Stack = createStackNavigator();
const PaymentStackNavigator = () => {
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
      initialRouteName="Wallet">
      <Stack.Screen name="Wallet" component={PaymentScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="AddPayment" component={AddPaymentScreen} />
      <Stack.Screen name="AddCard" component={AddCardScreen} />
      <Stack.Screen
        name="AddBank"
        component={AddBankScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BankPaymentMethods"
        component={BankPaymentMethodsScreen}
      />
    </Stack.Navigator>
  );
};

export default PaymentStackNavigator;
