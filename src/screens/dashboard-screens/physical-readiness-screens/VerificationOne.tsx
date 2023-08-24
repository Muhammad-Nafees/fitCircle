import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import CustomInput from '../../../components/shared-components/CustomInput';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import React, {useRef, useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {PhysicalReadinessTestSchema} from '../../../validations';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {setAnswers} from '../../../redux/readinessTestSlice';
import CustomPhoneInput from '../../../components/shared-components/CustomPhoneInput';
import PhoneInput from 'react-native-phone-number-input';

export const VerificationOne = ({navigation, disabled}: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  const dispatch = useDispatch();

  const formSubmit = (values: any) => {
    console.log('Form values:', values);
    dispatch(setAnswers(values));
    navigation.navigate('VerificationTwo');
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            date: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            zip: '',
            homePhone: '',
            cellPhone: '',
            age: '',
            height: '',
            weight: '',
          }}
          validateOnChange={false}
          // validationSchema={PhysicalReadinessTestSchema}
          onSubmit={formSubmit}>
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
              {disabled !== true && (
                <Text
                  style={[
                    STYLES.text16,
                    {
                      fontWeight: '700',
                      marginTop: 16,
                      paddingHorizontal: 16,
                      paddingBottom: 28,
                    },
                  ]}>
                  Physical Activity Readiness
                </Text>
              )}
              <View style={styles.formContainer}>
                <TouchableWithoutFeedback
                  onPress={() => setDatePickerVisible(true)}>
                  <View style={{position: 'relative'}}>
                    <CustomInput
                      label="Date"
                      placeholder="02/28/2023"
                      value={values.date}
                      error={errors.date}
                      touched={touched.date}
                      handleChange={handleChange('date')}
                      setFieldError={setFieldError}
                      fieldName="date"
                      editable={false}
                    />
                    <Icon
                      name="calendar-outline"
                      size={23}
                      color="black"
                      style={{
                        position: 'absolute',
                        right: horizontalScale(12),
                        top: verticalScale(34),
                      }}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(e: any) => {
                        const formattedDate = format(e, 'dd/MM/yyyy');
                        setFieldValue('date', formattedDate);
                        setFieldError('date', '');
                        setDatePickerVisible(false);
                      }}
                      onCancel={() => setDatePickerVisible(false)}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <CustomInput
                  label="Email"
                  placeholder="lincolnsmith@gmail.com"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  handleChange={handleChange('email')}
                  setFieldError={setFieldError}
                  fieldName="email"
                  keyboardType="email-address"
                />
                <CustomInput
                  label="First Name"
                  placeholder="Lincoln"
                  value={values.firstName}
                  error={errors.firstName}
                  touched={touched.firstName}
                  handleChange={handleChange('firstName')}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                />
                <CustomInput
                  label="Last Name"
                  placeholder="Smith"
                  value={values.lastName}
                  error={errors.lastName}
                  touched={touched.lastName}
                  handleChange={handleChange('lastName')}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                />
                <CustomInput
                  label="Address"
                  placeholder="New York, United States"
                  value={values.address}
                  error={errors.address}
                  touched={touched.address}
                  handleChange={handleChange('address')}
                  setFieldError={setFieldError}
                  fieldName="address"
                />
                <CustomInput
                  label="City"
                  placeholder="New York"
                  value={values.city}
                  error={errors.city}
                  touched={touched.city}
                  handleChange={handleChange('city')}
                  setFieldError={setFieldError}
                  fieldName="city"
                />
                <CustomInput
                  label="Zip"
                  placeholder="10001"
                  value={values.zip}
                  error={errors.zip}
                  touched={touched.zip}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('zip')}
                  setFieldError={setFieldError}
                  fieldName="zip"
                />
                <CustomInput
                  label="Home Phone"
                  placeholder="(555) 555-1234"
                  value={values.homePhone}
                  error={errors.homePhone}
                  touched={touched.homePhone}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('homePhone')}
                  setFieldError={setFieldError}
                  fieldName="homePhone"
                />
                <CustomPhoneInput
                  label="Phone number"
                  value={values.cellPhone}
                  error={errors.cellPhone}
                  touched={touched.cellPhone}
                  handleChange={handleChange('cellPhone')}
                  setFieldValue={setFieldValue}
                  phoneInput={phoneInput}
                  setIsError={setIsError}
                  setFieldError={setFieldError}
                  isError={isError}
                  setPhoneCode={setPhoneCode}
                  placeholder='123-1234'
                />
                <CustomInput
                  label="Age"
                  placeholder=""
                  value={values.age}
                  error={errors.age}
                  touched={touched.age}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('age')}
                  setFieldError={setFieldError}
                  fieldName="age"
                />
                <View style={styles.inputRow}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Height</Text>
                    <DropdownTextInput
                      value={values.height}
                      options={['ft', 'm']}
                      defaultOption="ft"
                      handleChange={handleChange('height')}
                      error={errors.height}
                      touched={touched.height}
                      initialTouched={true}
                      setFieldError={setFieldError}
                      fieldName="height"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Weight</Text>
                    <DropdownTextInput
                      value={values.weight}
                      options={['kg', 'lb']}
                      defaultOption="kg"
                      handleChange={handleChange('weight')}
                      error={errors.weight}
                      touched={touched.weight}
                      initialTouched={true}
                      setFieldError={setFieldError}
                      fieldName="weight"
                    />
                  </View>
                </View>
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton
                    onPress={() => navigation.navigate('VerificationTwo')}>
                    Continue
                  </CustomButton>
                </View>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginHorizontal: horizontalScale(30),
    zIndex: 1000,
  },
  inputContainer: {
    flex: 3,
  },
  label: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});
