import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import * as Yup from 'yup';
//--------------------------------------------------------------------------------//
import {PaymentEllipse} from '../../../assets/images/PaymentEllipse';
import CustomButton from '../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {RootState} from '../../redux/store';
import {
  AdminSettingsView,
  UserSettingsView,
} from '../../components/payment-components/SettingsView';
import {Formik} from 'formik';
import CustomInput from '../../components/shared-components/CustomInput';

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .min(1, 'Amount must be greater than zero'),
});

const PaymentScreen = ({navigation}: any) => {
  const [topupVisible, setTopupVisible] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const [balance, setBalance] = useState('50.00');

  const handleModalNavigation = values => {
    console.log(values);
    navigation.navigate('PaymentMethod', {amount: values.amount});
  };

  return (
    <ScrollView style={styles.container}>
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
        {userRole !== 'user' && (
          <CustomButton onPress={() => setTopupVisible(true)}>
            Withdraw
          </CustomButton>
        )}
      </View>
      {userRole !== 'user' ? <AdminSettingsView /> : <UserSettingsView />}
      <Modal
        isVisible={topupVisible}
        backdropColor="rgba(0, 0, 0, 0.8)"
        onBackdropPress={() => setTopupVisible(false)}
        onBackButtonPress={() => setTopupVisible(false)}
        style={[styles.modal, {justifyContent: 'flex-end'}]}>
        <View
          style={{
            backgroundColor: 'rgba(41, 42, 44, 1)',
            height: verticalScale(340),
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
          <Formik
            initialValues={{
              amount: '',
            }}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={handleModalNavigation}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldError,
            }) => (
              <>
                <View style={styles.textInputContainer}>
                  <CustomInput
                    placeholder="Enter amount"
                    value={values.amount}
                    error={errors.amount}
                    touched={touched.amount}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('amount')}
                    setFieldError={setFieldError}
                    fieldName="amount"
                    extraStyles={{
                      backgroundColor: 'rgba(54, 55, 56, 1)',
                      borderRadius: 5,
                      paddingLeft: 10,
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  />
                </View>
                <View style={{width: '100%'}}>
                  <CustomButton
                    isDisabled={!values.amount}
                    onPress={handleSubmit}
                    extraTextStyles={{color: 'white'}}>
                    Continue
                  </CustomButton>
                </View>
              </>
            )}
          </Formik>
        </View>
      </Modal>
    </ScrollView>
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
  topContainer: {
    marginTop: verticalScale(12),
    marginBottom: verticalScale(8),
    backgroundColor: '#209BCC',
    borderRadius: 15,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: verticalScale(20),
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
    paddingLeft: horizontalScale(22),
    color: 'white',
  },
  textInputContainer: {
    marginVertical: verticalScale(20),
    width: '100%',
    alignItems: 'center',
  },
});

export default PaymentScreen;
