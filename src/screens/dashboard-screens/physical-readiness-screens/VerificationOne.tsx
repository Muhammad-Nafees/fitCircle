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
import React, {useState} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {PhysicalReadinessTestSchema} from '../../../validations';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const VerificationOne = ({navigation}: any) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSubmit = () => {
    console.log('Navigating to VerificationTwo');
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
          validationSchema={PhysicalReadinessTestSchema}
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
              <View style={styles.formContainer}>
                <TouchableWithoutFeedback
                  onPress={() => setDatePickerVisible(true)}>
                  <View style={{position: 'relative'}}>
                    <CustomInput
                      label="Date"
                      placeholder="Select a date"
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
                  placeholder="Enter your email"
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
                  placeholder="Enter your first name"
                  value={values.firstName}
                  error={errors.firstName}
                  touched={touched.firstName}
                  handleChange={handleChange('firstName')}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                />
                <CustomInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  error={errors.lastName}
                  touched={touched.lastName}
                  handleChange={handleChange('lastName')}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                />
                <CustomInput
                  label="Address"
                  placeholder="Enter your address"
                  value={values.address}
                  error={errors.address}
                  touched={touched.address}
                  handleChange={handleChange('address')}
                  setFieldError={setFieldError}
                  fieldName="address"
                />
                <CustomInput
                  label="City"
                  placeholder="Enter your City"
                  value={values.city}
                  error={errors.city}
                  touched={touched.city}
                  handleChange={handleChange('city')}
                  setFieldError={setFieldError}
                  fieldName="city"
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
              <View style={styles.button}>
                <CustomButton
                  onPress={() => {
                    navigation.navigate('VerificationTwo');
                  }}>
                  Continue
                </CustomButton>
              </View>
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
