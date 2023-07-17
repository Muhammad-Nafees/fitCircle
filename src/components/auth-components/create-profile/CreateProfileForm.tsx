import {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import CustomInput from '../../shared-components/CustomInput';
import CustomPhoneInput from '../../shared-components/CustomPhoneInput';
import CustomButton from '../../shared-components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {CustomSelect} from '../../shared-components/CustomSelect';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../../interfaces/navigation.type';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {createProfileSchema} from '../../../validations';
import {setUserData} from '../../../redux/authSlice';
import {IUserRole} from '../../../interfaces/auth.interface';
import {IUser} from '../../../interfaces/user.interface';
import {getCities, getCountries} from '../../../api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';

const countries = ['Country1', 'Country2', 'Country3', 'Country4'];
const cities = ['City1', 'City2', 'City4', 'City4'];

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
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [allCountries, setAllCountries] = useState<any | null>([]);
  const [allCities, setAllCities] = useState([]);
  const [country, setCountry] = useState();
  const [countryCode, setCountryCode] = useState();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        // console.log(response.data)
        // const countries = response?.data.countries;
        // const countryCodes = Object.keys(countries);
        // const extractedData = countryCodes.map(countryCode => {
        //   const country = countries[countryCode];
        //   return {
        //     code: countryCode,
        //     name: country?.name || '',
        //   };
        // });
        setAllCountries(response?.data);
      } catch (error: any) {
        console.log('Error fetching countries:', error.response);
      }
    };

    fetchCountries();
  }, []);
  useEffect(() => {
    const getCountryCode = async (selectedCountry: string) => {
      const country = allCountries.filter(
        (country: any) => country.name == selectedCountry,
      );

      setCountryCode(country[0].isoCode);
    };

    if (country) {
      getCountryCode(country);
    }
  }, [country]);
  useEffect(() => {
    const fetchCities = async (countryCode: string) => {
      try {
        const response = await getCities(countryCode);
        const cities = response?.data;
        setAllCities(cities);
      } catch (error: any) {
        console.log('Error fetching cities:', error);
      }
    };
    if (countryCode) {
      fetchCities(countryCode);
    }
  }, [countryCode]);

  const dispatch = useDispatch();

  const initialValues: IUser = {
    role: userRole || undefined,
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    phone: '',
    country: '',
    city: '',
    gender: '',
    age: '',
    activity: '',
    bodytype: '',
    height: '',
    weight: '',
    physicalInformation: '',
    dob: '',
    hourlyRate: '',
    profileImage: null,
    coverImage: null,
  };
  const handleSubmit = (values: IUser) => {
    const partialUserData: Partial<IUser> = {
      ...userData,
      role: userRole,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      bio: values.bio,
      phone: values.phone,
      country: values.country,
      city: values.city,
      gender: values.gender,
      age: values.age,
      activity: values.activity,
      bodytype: values.bodytype,
      height: values.height,
      weight: values.weight,
      physicalInformation: values.physicalInformation,
      dob: values.dob,
      hourlyRate: values.hourlyRate,
      profileImage: userData?.profileImage,
      coverImage: userData?.coverImage,
    };

    dispatch(setUserData({...partialUserData}));

    if (userRole == 'user')
      navigation.navigate('GenderScreen', {
        profilePicture: profilePicture,
      });
    else {
      navigation.navigate('UploadCertificate');
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createProfileSchema(userRole)}
      validationContext={{userRole: userRole}} // Provide the context here
      onSubmit={handleSubmit}>
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
              value={values.username}
              error={errors.username}
              touched={touched.username}
              initialTouched={true}
              handleChange={handleChange('username')}
            />
            <CustomInput
              label="Add bio"
              placeholder="Type here..."
              value={values.bio}
              error={errors.bio}
              touched={touched.bio}
              initialTouched={true}
              multiline
              handleChange={handleChange('bio')}
              textAlignVertical="top"
              extraStyles={{height: verticalScale(130)}}
            />
            <CustomPhoneInput
              setFieldValue={setFieldValue}
              label="Phone Number"
              value={values.phone}
              error={errors.phone}
              touched={touched.phone}
              handleChange={handleChange('phone')}
            />
            <CustomSelect
              label="Country"
              selectedValue={values.country}
              values={allCountries.map((countries: any) => countries.name)}
              error={errors.country}
              initialTouched={true}
              setCountry={setCountry}
              touched={touched.country}
              setFieldValue={setFieldValue}
            />
            <CustomSelect
              label="City"
              selectedValue={values.city}
              values={allCities.map((cities: any) => cities.name)}
              error={errors.city}
              initialTouched={true}
              touched={touched.city}
              setFieldValue={setFieldValue}
            />
            {userRole == 'trainer' && (
              <CustomSelect
                label="Gender"
                selectedValue={values.gender}
                values={['Male', 'Female']}
                initialTouched={true}
                touched={touched.gender}
                error={errors.gender}
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
            <TouchableWithoutFeedback
              onPress={() => setDatePickerVisible(true)}>
              <View style={{position: 'relative'}}>
                <CustomInput
                  label="Date of birth"
                  placeholder="01/01/2023"
                  value={values.dob}
                  error={errors.dob}
                  touched={touched.dob}
                  initialTouched={true}
                  handleChange={handleChange('dob')}
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
                    setFieldValue('dob', formattedDate);
                    setDatePickerVisible(false);
                  }}
                  onCancel={() => setDatePickerVisible(false)}
                />
              </View>
            </TouchableWithoutFeedback>

            {userRole == 'trainer' && (
              <CustomInput
                label="Hourly Rate"
                placeholder="$20.00"
                value={values.hourlyRate}
                error={errors.hourlyRate}
                touched={touched.hourlyRate}
                keyboardType="numeric"
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