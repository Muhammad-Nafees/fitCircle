import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useIsFocused} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useRef, useState, useEffect} from 'react';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
// --------------------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {PhysicalReadinessTestSchema} from '../../../validations';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import CustomPhoneInput from '../../../components/shared-components/CustomPhoneInput';
import CustomHeader from '../../../components/shared-components/CustomHeader';

export const VerificationOne = ({navigation, disabled, data, route}: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  console.log(route, 'route');

  const phoneNumberCheck = (values: any) => {
    const isValid = phoneInput.current?.isValidNumber(values);
    if (!isValid) {
      setIsError('Invalid phone number!');
    } else {
      setIsError('');
    }
  };
  const editable = typeof disabled === 'boolean' ? !disabled : true;

  const isFocused = useIsFocused();
  const formikRef = useRef();

  const formdata: null | any = data;

  const formSubmit = (values: any) => {
    if (isError) {
      return;
    }
    console.log('Form values:', values);
    navigation.navigate('VerificationTwo', {verificationOne: values});
  };

  useEffect(() => {
    if (isFocused && route?.params?.clearValues) formikRef.current?.resetForm();
  }, [isFocused]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('DashboardScreen', {screen: 'Dashboard'});
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <View style={{paddingBottom: 10}}>
        {route?.name == 'VerificationOne' && (
          <CustomHeader
            onPress={() =>
              navigation.navigate('DashboardScreen', {screen: 'Dashboard'})
            }
          />
        )}
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          innerRef={formikRef}
          initialValues={{
            date: formdata?.date ?? '',
            email: formdata?.email ?? '',
            firstName: formdata?.firstName ?? '',
            lastName: formdata?.lastName ?? '',
            address: formdata?.address ?? '',
            city: formdata?.city ?? '',
            zip: formdata?.zip ?? '',
            homePhone: formdata?.homePhone ?? '',
            cellPhone: formdata?.cellPhone ?? '',
            age: formdata?.age ?? '',
            height: formdata?.height ?? '',
            weight: formdata?.weight ?? '',
          }}
          onSubmit={formSubmit}
          validateOnChange={false}
          validationSchema={PhysicalReadinessTestSchema}>
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
                <Text style={[STYLES.text16, styles.title]}>
                  Physical Activity Readiness
                </Text>
              )}
              <View style={styles.formContainer}>
                <TouchableWithoutFeedback
                  onPress={() => editable && setDatePickerVisible(true)}>
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
                      style={styles.icon}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      disabled={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  editable={editable}
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
                  label="Cell Phone"
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
                  placeholder="123-1234"
                />
                <View style={styles.inputRow}>
                  <CustomInput
                    editable={editable}
                    label="Age"
                    placeholder=""
                    value={values.age}
                    error={errors.age}
                    touched={touched.age}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('age')}
                    setFieldError={setFieldError}
                    extraStyles={styles.ageInput}
                    fieldName="age"
                  />
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Height</Text>
                    <DropdownTextInput
                      editable={editable}
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
                      editable={editable}
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
                    onPress={async () => {
                      await phoneNumberCheck(values.cellPhone);
                      handleSubmit();
                    }}>
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
    gap: moderateScale(15),
    marginHorizontal: horizontalScale(30),
    zIndex: 1000,
  },
  inputContainer: {
    flex: 1,
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
    marginTop: verticalScale(50),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
  ageInput: {
    width: horizontalScale(80),
    height: verticalScale(47),
    alignItems: 'center',
    marginTop: 7,
  },
  icon: {
    position: 'absolute',
    right: horizontalScale(12),
    top: verticalScale(34),
  },
  title: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
});
