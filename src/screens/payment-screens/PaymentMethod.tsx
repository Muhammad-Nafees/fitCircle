import CustomPaymentMethod from '../../components/payment-components/CustomPaymentMethod';
import CardPayment from '../../components/payment-components/CardPayment';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export const PaymentMethodScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Payment Method</Text>
        <TouchableOpacity onPress={() => console.log('Something')}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.subheading}>Payment Methods</Text>
        <CardPayment
          arrowColor={'rgba(43,47,50,255)'}
          cardNumber="**** 4637"
          type="Mastercard"
        />
        <Text style={styles.subheading}>
          YOU CAN USE MULTIPLE PAYMENT METHODS
        </Text>
        <CustomPaymentMethod
          onPress={() => navigation.navigate('AddPayment')}
          text="Add Payment Method"
          arrowColor={'rgba(43,47,50,255)'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  edit: {
    fontWeight: '500',
    fontSize: 12.8,
    color: '#209BCC',
    textDecorationLine: 'underline',
  },
  subheading: {
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
    marginBottom: 5,
  },
});
