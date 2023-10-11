import {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
//----------------------------------------------------------------------------------------//
import CardPayment from '../../components/payment-components/CardPayment';
import CustomPaymentMethod from '../../components/payment-components/CustomPaymentMethod';
import {CustomConfirmationModal} from '../../components/shared-components/CustomModals';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const BankPaymentMethodsScreen = ({navigation}: any) => {
  const [cardNumber, setCardNumber] = useState('**** 4637');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCardDelete = (cardType: string) => {
    if (cardType === 'Bank') {
      setCardNumber('**** 3257');
    } else {
      setCardNumber('**** 4637');
    }
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Payment Methods</Text>
        <View style={[styles.contentContainer, {marginTop: 20}]}>
          <Text style={styles.cardTypeHeading}>credit/debit</Text>
          <CardPayment
            type="Mastercard"
            arrowColor={'rgba(41, 45, 50, 1)'}
            defaultView={false}
            extraCardNumberStyles={{color: 'white'}}
            cardNumber="**** 4637"
            deleteIcon={true}
            handleCardDelete={handleCardDelete}
            onPress={() =>
              navigation.navigate('AddCard' as never, {
                dummyData: {
                  type: 'Mastercard',
                  cardNumber: '1234 5678 9012 3456',
                  expiry: '12/24',
                  cvv: '123',
                  firstName: 'John',
                  lastName: 'Doe',
                  country: 'United States',
                },
              })
            }
          />
          <Text style={styles.miniText}>
            You can use multiple payment methods
          </Text>
          <CustomPaymentMethod
            text={'Add Payment Method'}
            onPress={() => navigation.navigate('AddPayment')}
            arrowColor={'rgba(41, 45, 50, 1)'}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.cardTypeHeading}>bank accounts</Text>
          <CardPayment
            type="Bank"
            cardName="Bank Of US"
            arrowColor={'rgba(41, 45, 50, 1)'}
            defaultView={false}
            extraCardNumberStyles={{color: 'white'}}
            cardNumber="**** 3257"
            deleteIcon={true}
            handleCardDelete={handleCardDelete}
            onPress={() =>
              navigation.navigate('AddBank' as never, {
                dummyData: {
                  lastName: 'Smith',
                  firstName: 'Lincoln',
                  bankName: 'Something',
                  accountNumber: '123456789',
                  routingNumber: '123456789',
                  country: 'United States',
                },
              })
            }
          />
          <Text style={styles.miniText}>
            You can add multiple bank accounts
          </Text>
          <CustomPaymentMethod
            text={'Add Bank Account'}
            onPress={() => navigation.navigate('AddBank')}
            arrowColor={'rgba(41, 45, 50, 1)'}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.cardTypeHeading}>paypal</Text>
          <CardPayment
            type="Paypal"
            arrowColor={'rgba(41, 45, 50, 1)'}
            defaultView={false}
            cardName="PayPal"
            extraCardNumberStyles={{color: 'white'}}
            cardNumber="youremail@gmail.com"
          />
        </View>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}
        backdropOpacity={1}>
        <CustomConfirmationModal
          onCancel={() => setIsModalVisible(false)}
          onConfirm={() => setIsModalVisible(false)}
          modalText={`Do you want to remove this card ending with ${cardNumber}?`}
          confirmText="Remove"
          cancelText="No"
          confirmColor="rgba(32, 128, 183, 1)"
          cancelColor={'rgba(220, 77, 77, 1)'}
          modalHeading="Remove Card"
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
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  contentContainer: {
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(50),
  },
  cardTypeHeading: {
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    color: 'white',
  },
  miniText: {
    fontSize: 10,
    fontWeight: '400',
    color: 'white',
    marginTop: verticalScale(10),
  },
});

export default BankPaymentMethodsScreen;
