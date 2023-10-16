import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//--------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const paymentMethods = [
  {
    type: 'Mastercard',
    label: 'Credit/Debit Card',
    miniText: 'Visa, MasterCard, American Express',
  },
  {type: 'Paypal', label: 'Paypal'},
  {type: 'ApplePay', label: 'Apple Pay'},
  {type: 'GooglePay', label: 'Google Pay'},
];

const AddPaymentScreen = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState(0);

  const handleMethodSelect = (index: number) => {
    setSelectedMethod(index);
  };

  const handleSubmit = () => {
    const selectedPaymentMethodType = paymentMethods[selectedMethod].type;
    navigation.navigate('AddCard', {type: selectedPaymentMethodType});
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.heading}>Add Payment</Text>
        <View style={{marginVertical: 12}}>
          <Text style={[styles.text1, {marginVertical: 10}]}>
            PAYMENT METHODS
          </Text>
          <Text style={[styles.text1, {fontWeight: '400'}]}>
            Until you make a purchase, you will not be charged.
          </Text>
        </View>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMethodSelect(index)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: verticalScale(5),
              backgroundColor:
                selectedMethod === index
                  ? 'rgba(54, 55, 56, 1)'
                  : 'transparent',
              paddingHorizontal: horizontalScale(14),
              paddingVertical: verticalScale(16),
              borderRadius: 5,
            }}>
            <View style={{justifyContent: 'center'}}>
              <Text
                style={
                  selectedMethod === index ? styles.selectedLabel : styles.label
                }>
                {method.label}
              </Text>
              {method.miniText && (
                <Text style={styles.miniText}>{method.miniText}</Text>
              )}
            </View>
            {selectedMethod === index && (
              <Icon
                size={14}
                name="check"
                style={{
                  marginRight: horizontalScale(10),
                  color: 'rgba(32, 155, 204, 1)',
                }}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={handleSubmit}>Next</CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
  },
  scrollContainer: {
    flex: 1,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  miniText: {
    fontSize: 12,
    color: 'gray',
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.46)',
  },
  selectedLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  buttonContainer: {
    paddingBottom: verticalScale(30),
    marginHorizontal: horizontalScale(16),
  },
  text1: {
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

export default AddPaymentScreen;
