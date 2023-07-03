import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import CustomInput from '../../shared-components/CustomInput';
import CustomPhoneInput from '../../shared-components/CustomPhoneInput';
import CustomButton from '../../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {CustomSelect} from '../../shared-components/CustomSelect';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../interfaces/navigation.type';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

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
  gender?: string;
  physicalInformation: string;
  dateOfBirth: string;
  hourlyRate?: string;
}
interface Props {
  profilePicture: any;
}
type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'GenderScreen',
  'UploadCertificate'
>;

const CreateProfileForm = ({profilePicture}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    userName: '',
    bio: '',
    phoneNumber: '',
    country: '',
    city: '',
    gender: '',
    physicalInformation: '',
    dateOfBirth: '',
    hourlyRate: '',
  };
  const handleSubmit = (values: FormValues) => {
    if (userRole == 'user')
      navigation.navigate('GenderScreen', {
        profilePicture: profilePicture,
      });
    else {
      navigation.navigate('UploadCertificate');
    }
  };
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
              value={values.phoneNumber}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              handleChange={handleChange('phoneNumber')}
            />
            <CustomSelect
              label="Country"
              values={countries}
              setFieldValue={setFieldValue}
            />
            <CustomSelect
              label="City"
              values={cities}
              setFieldValue={setFieldValue}
            />
            {userRole == 'trainer' && (
              <CustomSelect
                label="Gender"
                values={['Male', 'Female']}
                defaultValue="Male"
                setFieldValue={setFieldValue}
              />
            )}
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
            {userRole == 'trainer' && (
              <CustomInput
                label="Hourly Rate"
                placeholder="$20.00"
                value={values.hourlyRate}
                error={errors.hourlyRate}
                touched={touched.hourlyRate}
                initialTouched={true}
                handleChange={handleChange('hourlyRate')}
              />
            )}
          </View>
          <View style={styles.button}>
            <CustomButton onPress={handleSubmit}>Continue</CustomButton>
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
