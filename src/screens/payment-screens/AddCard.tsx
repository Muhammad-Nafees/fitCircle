import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
//--------------------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import CustomInput from '../../components/shared-components/CustomInput';
import {CustomSelect} from '../../components/shared-components/CustomSelect';
import {getCountries} from '../../api/auth-module';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CardPayment from '../../components/payment-components/CardPayment';
import {CustomConfirmationModal} from '../../components/shared-components/CustomModals';
import {cardSchema} from '../../validations';

const AddCardScreen = ({navigation, route}: any) => {
  const [allData, setAllData] = useState<any | null>([]);
  const [allCountries, setAllCountries] = useState<any | null>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const {dummyData} = route.params || {};

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        setAllData(response?.data.data);
        const fetchedCountries = response?.data?.data.map((country: any) => {
          return country.name;
        });
        setAllCountries(fetchedCountries);
      } catch (error: any) {
        console.log('Error fetching countries:', error.response);
      }
    };

    fetchCountries();
  }, []);

  const initialValues = {
    number: (dummyData && dummyData.cardNumber) || '',
    expiry: (dummyData && dummyData.expiry) || '',
    cvv: (dummyData && dummyData.cvv) || '',
    firstName: (dummyData && dummyData.firstName) || '',
    lastName: (dummyData && dummyData.lastName) || '',
    country: (dummyData && dummyData.country) || '',
  };

  const handleSubmit = values => {
    navigation.navigate('Wallet');
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.heading}>Payment Method</Text>
          {dummyData && (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'rgba(255, 72, 72, 1)',
                  fontWeight: '500',
                }}>
                Remove Card
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View>
          <CardPayment
            arrowColor={'rgba(43,47,50,255)'}
            type={route.params.type}
            cardNumber="**** 4637"
          />
          <Text style={styles.text1}>INFO ABOUT YOUR CARD</Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={cardSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => (
            <>
              <View style={{marginTop: 10}}>
                <CustomInput
                  label="Number"
                  placeholder="Required"
                  value={values.number}
                  error={errors.number}
                  extraStyles={styles.textInput}
                  touched={touched.number}
                  handleChange={handleChange('number')}
                  setFieldError={setFieldError}
                  fieldName="number"
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Expires"
                  placeholder="MM / YY"
                  value={values.expiry}
                  error={errors.expiry}
                  extraStyles={styles.textInput}
                  touched={touched.expiry}
                  handleChange={handleChange('expiry')}
                  setFieldError={setFieldError}
                  fieldName="expiry"
                />
                <CustomInput
                  label="CVV"
                  placeholder="Security Code"
                  value={values.cvv}
                  error={errors.cvv}
                  extraStyles={styles.textInput}
                  touched={touched.cvv}
                  handleChange={handleChange('cvv')}
                  setFieldError={setFieldError}
                  fieldName="cvv"
                  keyboardType="numeric"
                />
                <View>
                  <Text style={[styles.text1, {marginTop: 0}]}>
                    INFO ABOUT YOU
                  </Text>
                </View>
                <CustomInput
                  label="First Name"
                  placeholder="Required"
                  value={values.firstName}
                  error={errors.firstName}
                  extraStyles={styles.textInput}
                  touched={touched.firstName}
                  handleChange={handleChange('firstName')}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                />
                <CustomInput
                  label="Last Name"
                  placeholder="Required"
                  value={values.lastName}
                  error={errors.lastName}
                  extraStyles={styles.textInput}
                  touched={touched.lastName}
                  handleChange={handleChange('lastName')}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                />
                <CustomSelect
                  label="Country"
                  placeholder="Select here"
                  width={horizontalScale(340)}
                  placeholderColor="rgba(255, 255, 255, 0.5)"
                  selectedValue={values.country}
                  extraButtonStyles={{
                    backgroundColor: 'rgba(54, 55, 56, 1)',
                    borderRadius: 12,
                    fontSize: 20,
                    color: 'white',
                  }}
                  values={allCountries}
                  extraRowStyle={{backgroundColor: 'rgba(54, 55, 56, 1)'}}
                  extraRowTextStyle={{color: 'white'}}
                  error={errors.country}
                  touched={touched.country}
                  setFieldValue={setFieldValue}
                  fieldName="country"
                  setFieldError={setFieldError}
                  fontColor="white"
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Next</CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={1}
        onBackButtonPress={() => setIsModalVisible(false)}
        onBackdropPress={() => setIsModalVisible(false)}>
        <CustomConfirmationModal
          onCancel={() => setIsModalVisible(false)}
          onConfirm={() => setIsModalVisible(false)}
          modalText={'Do you want to remove this card with ending *** 4637?'}
          modalHeading="Remove Card"
          confirmText="Remove"
          cancelText="No"
          confirmColor={'rgba(32, 128, 183, 1)'}
          cancelColor={'rgba(220, 77, 77, 1)'}
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
  textInput: {
    backgroundColor: 'rgba(54, 55, 56, 1)',
    borderRadius: 12,
    paddingHorizontal: horizontalScale(16),
    width: horizontalScale(340),
    color: 'white',
  },
  button: {
    marginTop: verticalScale(10),
    marginHorizontal: verticalScale(30),
    marginBottom: verticalScale(35),
  },
  text1: {
    marginVertical: 15,
    fontWeight: '500',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
  },
});

export default AddCardScreen;
