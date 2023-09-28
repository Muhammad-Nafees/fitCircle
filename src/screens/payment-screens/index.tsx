import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {PaymentEllipse} from '../../../assets/images/PaymentEllipse';
import CustomButton from '../../components/shared-components/CustomButton';
import CustomPaymentMethod from '../../components/payment-components/CustomPaymentMethod';
import Modal from 'react-native-modal';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CardPayment from '../../components/payment-components/CardPayment';
import {CustomOutputModal} from '../../components/shared-components/CustomModals';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const PaymentScreen = ({navigation}: any) => {
  const [topupVisible, setTopupVisible] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [amount, setAmount] = useState<any>('');
  const [balance, setBalance] = useState('50.00');
  const [failedModal, setFailedModal] = useState(false);

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleModalNavigation = () => {
    setTopupVisible(false);
    if (amount > balance) {
      setFailedModal(true);
      setAmount('');
      return;
    }
    navigation.navigate('PaymentMethod');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wallet</Text>
      <View style={styles.topContainer}>
        <View style={{marginLeft: 16}}>
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <Text style={styles.balanceAmount}>${balance}</Text>
            </View>
            <PaymentEllipse />
          </View>
          <View style={{paddingBottom: 20}}>
            <Text style={styles.updateText}>12 Jan 2023 Last Update</Text>
          </View>
        </View>
      </View>
      <View style={{marginVertical: 10, gap: 12}}>
        <CustomButton onPress={() => setTopupVisible(true)}>
          Top Up
        </CustomButton>
        {userRole === 'admin' && (
          <CustomButton onPress={() => setTopupVisible(true)}>
            Withdraw
          </CustomButton>
        )}
      </View>
      {userRole === 'admin' ? (
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
            onPress={() => navigation.navigate('AddBank')}
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
      ) : (
        <View>
          <View>
            <Text>CURRENT METHOD</Text>
          </View>
          <CardPayment type="Mastercard" />
          <Text>ADD TOP UP METHOD</Text>
          <CustomPaymentMethod
            text={'Credit/Debit Card'}
            miniText={'Visa, MasterCard, American Express'}
            onPress={() => navigation.navigate('AddCard')}
          />
          <CustomPaymentMethod
            text={'Paypal'}
            onPress={() => navigation.navigate('AddCard')}
          />
          <CustomPaymentMethod
            text={'Apple Pay'}
            onPress={() => navigation.navigate('AddCard')}
          />
        </View>
      )}
      <Modal
        isVisible={topupVisible}
        backdropColor="rgba(0, 0, 0, 0.8)"
        onBackdropPress={() => setTopupVisible(false)}
        onBackButtonPress={() => setTopupVisible(false)}
        style={[styles.modal, {justifyContent: 'flex-end'}]}>
        <View
          style={{
            backgroundColor: 'rgba(41, 42, 44, 1)',
            height: '35%',
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            alignItems: 'center',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => setTopupVisible(false)}
            style={styles.topLine}></TouchableOpacity>
          <View style={{marginTop: 24}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
              Amount
            </Text>
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter amount"
              placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="numeric"
            />
          </View>
          <View
            style={{
              width: '100%',
            }}>
            <CustomButton
              isDisabled={amount === ''}
              onPress={handleModalNavigation}
              extraTextStyles={{color: 'white'}}>
              Continue
            </CustomButton>
          </View>
        </View>
      </Modal>
      <Modal
        isVisible={failedModal}
        onBackButtonPress={() => setFailedModal(false)}
        onBackdropPress={() => setFailedModal(false)}
        style={styles.modal}>
        <CustomOutputModal
          type="failed"
          modalText="Insufficient wallet funds"
          extraTextStyles={{
            fontWeight: '600',
            fontSize: 16,
            color: 'rgba(255, 101, 101, 1)',
          }}
          onPress={() => setFailedModal(false)}
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
  topContainer: {
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: '#209BCC',
    borderRadius: 15,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '500',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  updateText: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(58),
    backgroundColor: 'white',
    marginTop: verticalScale(10),
    alignSelf: 'center',
    borderRadius: 3,
  },
  textInput: {
    backgroundColor: 'rgba(54, 55, 56, 1)',
    borderRadius: 5,
    paddingLeft: 22,
    color: 'white',
  },
  textInputContainer: {
    marginVertical: 54,
    width: '100%',
  },
});

export default PaymentScreen;
