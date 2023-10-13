import {
  BackHandler,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React, {useRef, useState, useEffect} from 'react';
import {format, parse} from 'date-fns';
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
import {Unit} from '../../../components/auth-components/create-profile/GenderForm';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {IPhysicalActivity} from '../../../interfaces/user.interface';

export const VerificationOne = ({
  navigation,
  disabled,
  data,
  route,
  disabledStlyes,
}: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  const [weightUnit, setWeightUnit] = useState<Unit['kg']>('kg');
  const [heightUnit, setHeightUnit] = useState<Unit['ft']>('ft');
  console.log(phoneCode, 'phoneCode');

  const handleSelectUnit = (unit: keyof Unit, type: string) => {
    if (type == 'kg') {
      setWeightUnit(unit);
    } else {
      setHeightUnit(unit);
    }
  };

  const phoneNumberCheck = (values: any) => {
    const isValid = phoneInput.current?.isValidNumber(values);
    if (!isValid) {
      setIsError('Invalid phone number!');
    } else {
      setIsError('');
    }
  };
  const editable = typeof disabled === 'boolean' ? !disabled : true;
  const formdata: null | any = data;

  const formSubmit = async (values: any) => {
    if (isError) {
      return;
    }
    const parsedDate = parse(values.date, 'dd/MM/yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');
    const {phone, ...VALUESWithoutPhone} = values;
    const VALUES = {
      ...VALUESWithoutPhone,
      weight: {
        value: values.weight,
        unit: weightUnit,
      },
      height: {
        value: values.height,
        unit: heightUnit,
      },
      homePhone: values.cellPhone,
      date: formattedDate,
      cellPhone: `+${phoneCode}${values.cellPhone}`,
    };
    navigation.navigate('VerificationTwo', {verificationOne: VALUES});
  };
  console.log(formdata, 'FORM');
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <View style={{paddingBottom: 10}}>
        {route?.name == 'VerificationOne' && (
          <CustomHeader
            onPress={() =>
              navigation.navigate('Dashboard', {screen: 'Dashboard'})
            }
          />
        )}
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          // innerRef={formikRef}
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
            height: formdata?.height.value ?? '',
            weight: formdata?.weight.value ?? '',
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
                      error={errors.date as string}
                      touched={touched.date as boolean}
                      handleChange={handleChange('date')}
                      setFieldError={setFieldError}
                      fieldName="date"
                      editable={false}
                      extraStyles={disabledStlyes}
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
                  autoCapitalize="none"
                  error={errors.email as string}
                  touched={touched.email as boolean}
                  handleChange={handleChange('email')}
                  setFieldError={setFieldError}
                  fieldName="email"
                  keyboardType="email-address"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="First Name"
                  placeholder="Lincoln"
                  value={values.firstName}
                  error={errors.firstName as string}
                  touched={touched.firstName as boolean}
                  handleChange={handleChange('firstName')}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="Last Name"
                  placeholder="Smith"
                  value={values.lastName}
                  error={errors.lastName as string}
                  touched={touched.lastName as boolean}
                  handleChange={handleChange('lastName')}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="Address"
                  placeholder="New York, United States"
                  value={values.address}
                  error={errors.address as string}
                  touched={touched.address as boolean}
                  handleChange={handleChange('address')}
                  setFieldError={setFieldError}
                  fieldName="address"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="City"
                  placeholder="New York"
                  value={values.city}
                  error={errors.city as string}
                  touched={touched.city as boolean}
                  handleChange={handleChange('city')}
                  setFieldError={setFieldError}
                  fieldName="city"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="Zip"
                  placeholder="10001"
                  value={values.zip}
                  error={errors.zip as string}
                  touched={touched.zip as boolean}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('zip')}
                  setFieldError={setFieldError}
                  fieldName="zip"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={editable}
                  label="Home Phone"
                  placeholder="(555) 555-1234"
                  value={values.homePhone}
                  error={errors.homePhone as string}
                  touched={touched.homePhone as boolean}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('homePhone')}
                  setFieldError={setFieldError}
                  fieldName="homePhone"
                  extraStyles={disabledStlyes}
                />
                <CustomPhoneInput
                  label="Cell Phone"
                  disabled={disabledStlyes ? true : false}
                  value={values.cellPhone}
                  error={errors.cellPhone as string}
                  touched={touched.cellPhone as boolean}
                  handleChange={handleChange('cellPhone')}
                  setFieldValue={setFieldValue}
                  phoneInput={phoneInput}
                  setIsError={setIsError}
                  setFieldError={setFieldError}
                  isError={isError}
                  setPhoneCode={setPhoneCode}
                  placeholder="123-1234"
                  extraStyles={disabledStlyes}
                />
                <View style={styles.inputRow}>
                  <CustomInput
                    editable={editable}
                    label="Age"
                    placeholder=""
                    value={values.age}
                    error={errors.age as string}
                    touched={touched.age as boolean}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('age')}
                    setFieldError={setFieldError}
                    extraStyles={[styles.ageInput, disabledStlyes]}
                    fieldName="age"
                  />
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.label,
                        {marginBottom: disabledStlyes ? -2 : 2},
                      ]}>
                      Height
                    </Text>
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
                      onSelectUnit={handleSelectUnit}
                      extraStyles={
                        disabledStlyes && {
                          backgroundColor: 'rgba(68, 68, 68, 0.5)',
                        }
                      }
                      textInputStyle={
                        disabledStlyes && {
                          color: 'rgba(255, 255, 255, 0.5)',
                        }
                      }
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text
                      style={[
                        styles.label,
                        {marginBottom: disabledStlyes ? -2 : 2},
                      ]}>
                      Weight
                    </Text>
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
                      onSelectUnit={handleSelectUnit}
                      extraStyles={
                        disabledStlyes && {
                          backgroundColor: 'rgba(68, 68, 68, 0.5)',
                        }
                      }
                      textInputStyle={
                        disabledStlyes && {
                          color: 'rgba(255, 255, 255, 0.5)',
                        }
                      }
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
    paddingBottom: 20,
  },
  inputContainer: {
    flex: 1,
    marginTop: 3,
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
