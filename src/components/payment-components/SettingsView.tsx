import {useNavigation} from '@react-navigation/native';
import CardPayment from './CardPayment';
import CustomPaymentMethod from './CustomPaymentMethod';
import {View, Text} from 'react-native';

export const AdminSettingsView = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 12,
          color: 'rgba(125, 125, 125, 1)',
          marginVertical: 5,
        }}>
        Transfer To
      </Text>
      <CardPayment
        defaultView={false}
        type={'Bank'}
        cardName="Bank of US"
        extraCardNumberStyles={{color: 'white'}}
        cardNumber="**** 3257"
        extraStyles={{borderRadius: 10}}
      />
      <Text
        style={{
          fontWeight: '400',
          fontSize: 10,
          color: 'rgba(125, 125, 125, 1)',
          marginVertical: 5,
        }}>
        You can add multiple bank accounts
      </Text>
      <CustomPaymentMethod
        text={'Add Bank Account'}
        onPress={() => navigation.navigate('AddBank' as never)}
        extraStyles={{paddingVertical: 12, borderRadius: 10}}
      />
      <Text
        style={{
          fontWeight: '500',
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.7)',
          marginTop: 8,
        }}>
        Payment Methods
      </Text>
      <CardPayment type="Mastercard" cardNumber="**** 4637" />
    </View>
  );
};

export const UserSettingsView = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View>
        <Text>CURRENT METHOD</Text>
      </View>
      <CardPayment type="Mastercard" cardNumber="**** 4637" />
      <Text>ADD TOP UP METHOD</Text>
      <CustomPaymentMethod
        text={'Credit/Debit Card'}
        miniText={'Visa, MasterCard, American Express'}
        onPress={() => navigation.navigate('AddCard' as never)}
      />
      <CustomPaymentMethod
        text={'Paypal'}
        onPress={() => navigation.navigate('AddCard' as never)}
      />
      <CustomPaymentMethod
        text={'Apple Pay'}
        onPress={() => navigation.navigate('AddCard' as never)}
      />
    </View>
  );
};
