import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
//----------------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import CustomBankInput from '../../components/payment-components/CustomBankInput';
import {bankSchema} from '../../validations';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import BankIcon from '../../../assets/Bank';
import CustomHeader from '../../components/shared-components/CustomHeader';

export const AddBankScreen = ({route, navigation}: any) => {
  const {dummyData} = route.params || {};
  const handleSubmit = values => {
    navigation.navigate('Wallet');
    console.log(values);
  };

  const initialValues = {
    lastName: (dummyData && dummyData.lastName) || '',
    firstName: (dummyData && dummyData.firstName) || '',
    bankName: (dummyData && dummyData.bankName) || '',
    accountNumber: (dummyData && dummyData.accountNumber) || '',
    routingNumber: (dummyData && dummyData.routingNumber) || '',
    country: (dummyData && dummyData.country) || '',
  };
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: 20,
          paddingRight: horizontalScale(20),
        }}>
        <CustomHeader />
        {dummyData && (
          <TouchableOpacity
            onPress={() => navigation.navigate('BankPaymentMethods')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: verticalScale(20),
            }}>
            <Text
              style={{
                color: 'rgba(32, 155, 204, 1)',
                fontWeight: '400',
                fontSize: 12,
              }}>
              Done
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.heading}>{dummyData ? 'Edit Bank' : 'Add Bank'}</Text>
      <Formik
        initialValues={initialValues}
        validationSchema={bankSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldError,
        }) => (
          <View style={{paddingHorizontal: horizontalScale(16)}}>
            <View style={{marginTop: 35, flex: 1, paddingHorizontal: 16}}>
              <View style={{gap: 15, marginBottom: 20}}>
                <View style={styles.bankImageTextContainer}>
                  <BankIcon />
                  <Text
                    style={{fontWeight: '500', fontSize: 14, color: 'white'}}>
                    Bank Account
                  </Text>
                </View>
                <Text
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 12,
                    color: 'white',
                  }}>
                  Info about your bank account
                </Text>
              </View>
              <CustomBankInput
                label="Last Name"
                value={values.lastName}
                error={errors.lastName}
                touched={touched.lastName}
                handleChange={handleChange('lastName')}
                setFieldError={setFieldError}
                fieldName="lastName"
              />
              <CustomBankInput
                label="First Name"
                value={values.firstName}
                error={errors.firstName}
                touched={touched.firstName}
                handleChange={handleChange('firstName')}
                setFieldError={setFieldError}
                fieldName="expiry"
              />
              <CustomBankInput
                label="Bank Name"
                value={values.bankName}
                error={errors.bankName}
                touched={touched.bankName}
                handleChange={handleChange('bankName')}
                setFieldError={setFieldError}
                fieldName="bankName"
              />
              <CustomBankInput
                label="Acc No."
                value={values.accountNumber}
                error={errors.accountNumber}
                touched={touched.accountNumber}
                handleChange={handleChange('accountNumber')}
                setFieldError={setFieldError}
                fieldName="accountNumber"
                keyboardType="numeric"
              />
              <CustomBankInput
                label="Routing No."
                value={values.routingNumber}
                error={errors.routingNumber}
                touched={touched.routingNumber}
                handleChange={handleChange('routingNumber')}
                setFieldError={setFieldError}
                fieldName="routingNumber"
              />
              <CustomBankInput
                label="Country"
                value={values.country}
                error={errors.country}
                touched={touched.country}
                handleChange={handleChange('country')}
                setFieldError={setFieldError}
                fieldName="country"
              />
            </View>
            <View style={styles.button}>
              <CustomButton onPress={handleSubmit}>Next</CustomButton>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    paddingHorizontal: horizontalScale(16),
  },
  button: {
    marginTop: verticalScale(40),
    marginHorizontal: verticalScale(30),
    paddingBottom: 30,
  },
  bankImageTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderRadius: 5,
    paddingHorizontal: horizontalScale(14),
    paddingVertical: verticalScale(8),
    gap: 14,
  },
});
