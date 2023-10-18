import CustomPaymentMethod from '../../components/payment-components/CustomPaymentMethod';
import CardPayment from '../../components/payment-components/CardPayment';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useState} from 'react';
import {CustomOutputModal} from '../../components/shared-components/CustomModals';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export const PaymentMethodScreen = ({navigation, route}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const sufficient = route?.params?.amount <= '50' || null;

  let modalText = 'Insufficient Wallet Funds';
  if (userRole !== 'user' && sufficient) {
    modalText = 'Successfully transferred to your bank!';
  } else if (userRole === 'user' && sufficient) {
    modalText = 'Successfully Paid!';
  }

  const handleAmountPayment = () => {
    if (sufficient !== null) {
      setIsModalVisible(true);
    }
    return;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Payment Method</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AddCard' as never, {
              dummyData: {
                type: 'Mastercard',
                cardNumber: '4929 4685 0480 5705',
                expiry: '12/24',
                cvv: '123',
                firstName: 'John',
                lastName: 'Doe',
                country: 'United States',
              },
            })
          }>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.subheading}>Payment Methods</Text>
        <CardPayment
          arrowColor={'rgba(43,47,50,255)'}
          cardNumber="**** 4637"
          type="Mastercard"
          onPress={handleAmountPayment}
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
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}>
        <CustomOutputModal
          type={sufficient ? 'success' : 'failed'}
          modalText={modalText}
          extraTextStyles={[
            modalText === 'Insufficient Wallet Funds'
              ? {
                  fontWeight: '600',
                  fontSize: 16,
                  color: 'rgba(255, 101, 101, 1)',
                }
              : {
                  fontWeight: '500',
                  fontSize: 14,
                  color: 'rgba(255, 255, 255, 1)',
                  marginHorizontal: 40,
                  textAlign: 'center',
                },
          ]}
          onPress={() => setIsModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: horizontalScale(16),
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
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
});
