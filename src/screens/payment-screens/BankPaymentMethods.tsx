import {useState} from 'react';
import CardPayment from '../../components/payment-components/CardPayment';
import CustomPaymentMethod from '../../components/payment-components/CustomPaymentMethod';
import {View, Text, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {CustomConfirmationModal} from '../../components/shared-components/CustomModals';
import {ScrollView} from 'react-native-gesture-handler';

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
          />
          <Text style={styles.miniText}>
            You can use multiple payment methods
          </Text>
          <CustomPaymentMethod
            text={'Add Payment Method'}
            onPress={() => navigation.navigate('AddPayment')}
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
          />
          <Text style={styles.miniText}>
            You can add multiple bank accounts
          </Text>
          <CustomPaymentMethod
            text={'Add Bank Account'}
            onPress={() => navigation.navigate('AddBank')}
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
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginBottom: 50,
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
    marginTop: 10,
  },
});

export default BankPaymentMethodsScreen;
