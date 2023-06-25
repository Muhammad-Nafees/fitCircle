import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import CustomInput from '../../shared-components/CustomInput';
import CustomPhoneInput from '../../shared-components/CustomPhoneInput';
import CustomButton from '../../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {CustomSelect} from '../../shared-components/CustomSelect';
import { GenderScreenNavigationProp } from '../../../interfaces/NavigationTypes';

const countries = ['Country1', 'Country2', 'Country3', 'Country4'];
const cities = ['City1', 'City2', 'City4', 'City4'];

interface FormValues {
  firstName: string;
  lastName: string;
  userName: string;
  bio: string;
  phoneNumber: string;
  country: string;
  city: string;
  physicalInformation: string;
  dateOfBirth: string;
  
}

const CreateProfileForm = () => {
  const navigation = useNavigation<GenderScreenNavigationProp>();

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    userName: '',
    bio: '',
    phoneNumber: '',
    country: '',
    city: '',
    physicalInformation: '',
    dateOfBirth: '',
  };
  const handleSubmit = () => {};
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        submitForm,
        values,
        errors,
        touched,
        initialTouched,
        setFieldValue,
      }) => (
        <>
          <View style={[styles.formContainer, {marginTop: verticalScale(35)}]}>
            <CustomInput
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              error={errors.firstName}
              touched={touched.lastName}
              initialTouched={true}
              handleChange={handleChange('firstName')}
            />
            <CustomInput
              label="Last Name"
              placeholder="Enter your last name"
              value={values.lastName}
              error={errors.lastName}
              touched={touched.lastName}
              initialTouched={true}
              handleChange={handleChange('lastName')}
            />
            <CustomInput
              label="Username"
              placeholder="Enter your username"
              value={values.userName}
              error={errors.userName}
              touched={touched.userName}
              initialTouched={true}
              handleChange={handleChange('userName')}
            />
            <CustomInput
              extraStyles={{height: 120}}
              label="Add bio"
              placeholder="Type here..."
              value={values.bio}
              error={errors.bio}
              touched={touched.bio}
              initialTouched={true}
              handleChange={handleChange('bio')}
            />
            <CustomPhoneInput
              setFieldValue={setFieldValue}
              label="Phone Number"
            />
            <CustomSelect label='Country' values={countries} />
            <CustomSelect label='City' values={cities} />


            <CustomInput
              label="Physical Information"
              placeholder="Enter"
              value={values.physicalInformation}
              error={errors.physicalInformation}
              touched={touched.physicalInformation}
              initialTouched={true}
              handleChange={handleChange('physicalInformation')}
            />
            <CustomInput
              label="Date of birth"
              placeholder="01/01/2023"
              value={values.dateOfBirth}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
              initialTouched={true}
              handleChange={handleChange('dateOfBirth')}
            />
          </View>
          <View style={styles.button}>
            <CustomButton onPress={() => navigation.navigate('GenderScreen')}>
              Continue
            </CustomButton>
          </View>
        </>
      )}
    </Formik>
  );
};

export default CreateProfileForm;

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});
