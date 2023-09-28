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

const paymentMethods = [
  {label: 'Credit/Debit Card', miniText: 'Visa, MasterCard, American Express'},
  {label: 'Paypal'},
  {label: 'Apple Pay'},
  {label: 'Google Pay'},
];

const AddPaymentScreen = ({navigation}: any) => {
  const [selectedMethod, setSelectedMethod] = useState(0);

  const handleMethodSelect = (index: number) => {
    setSelectedMethod(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.heading}>Add Payment</Text>
        <View>
          <Text>PAYMENT METHODS</Text>
          <Text>Until you make a purchase, you will not be charged.</Text>
        </View>
        {paymentMethods.map((method, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleMethodSelect(index)}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
              backgroundColor:
                selectedMethod === index
                  ? 'rgba(54, 55, 56, 1)'
                  : 'transparent',
              paddingHorizontal: 14,
              paddingVertical: 16,
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
                style={{marginRight: 10, color: 'rgba(32, 155, 204, 1)'}}
              />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate('AddCard')}>
          Next
        </CustomButton>
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
    paddingBottom: 30,
    marginHorizontal: 16,
  },
});

export default AddPaymentScreen;
