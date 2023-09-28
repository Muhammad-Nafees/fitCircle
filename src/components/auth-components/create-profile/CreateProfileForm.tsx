import {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
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
import {IUser} from '../../../interfaces/user.interface';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {format} from 'date-fns';
import {checkUsername, getCities, getCountries} from '../../../api/auth-module';
import PhoneInput from 'react-native-phone-number-input';

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
  const phoneInput = useRef<PhoneInput>(null);
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  const [usernameError, setUsernameError] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [countryCode, setCountryCode] = useState();
  const [allData, setAllData] = useState<any | null>([]);

  useEffect(() => {
    if (userData?.phone) {
      console.log(userData?.phone, 'sS');
      setUserPhone(userData.phone);
    }
  }, []);

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
  useEffect(() => {
    const getCountryCode = async (selectedCountry: string) => {
      console.log(selectedCountry, 'selecteds');
      const country = allData.filter(
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
        const fetchedCities = response?.data?.data.map((city: any) => {
          return city.name;
        });
        setAllCities(fetchedCities);
      } catch (error: any) {
        console.log('Error fetching cities:', error?.response?.data);
      }
    };
    if (countryCode) {
      fetchCities(countryCode);
    }
  }, [countryCode]);

  const dispatch = useDispatch();

  const initialValues: Partial<IUser> = {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    phone: userData?.phone,
    country: '',
    city: '',
    gender: '',
    physicalInformation: '',
    dob: '',
    hourlyRate: '',
    profileImage: null,
    coverImage: null,
  };

  const getCode = phoneInput.current?.getCountryCode();

  const handleSubmit = async (values: Partial<IUser>) => {
    if (isError) {
      return;
    }

    const partialUserData: Partial<IUser> = {
      ...userData,
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      bio: values.bio,
      phone: userData?.phone,
      country: values.country,
      city: values.city,
      gender: values.gender,
      physicalInformation: values.physicalInformation,
      dob: values.dob,
      hourlyRate: values.hourlyRate,
      profileImage: userData?.profileImage,
      coverImage: userData?.coverImage,
      height: {
        value: 0,
        unit: 'ft',
      },
      weight: {
        value: 0,
        unit: 'kg',
      },
      age: '18',
    };
    if (usernameError) {
      return;
    }
    dispatch(setUserData({...partialUserData} as IUser));
    if (userRole == 'user')
      navigation.navigate('GenderScreen', {
        profilePicture: profilePicture,
      });
    else {
      navigation.navigate('UploadCertificate');
    }
  };
  const handleChangeUserName = async (text: string, setFieldValue: any) => {
    setFieldValue('username', text);
    try {
      const response = await checkUsername({username: text});
      console.log(response.data);
      setUsernameError('');
    } catch (error: any) {
      console.log(error.response.data);
      if (error?.response.status == 409) {
        setUsernameError(error?.response.data.message);
      }
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={createProfileSchema(userRole)}
      validationContext={{userRole: userRole}}
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
          <View style={[styles.formContainer, {marginTop: verticalScale(0)}]}>
            <CustomInput
              label="First Name"
              placeholder="Enter your first name"
              value={values.firstName}
              error={errors.firstName}
              touched={touched.lastName}
              initialTouched={true}
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
              initialTouched={true}
              handleChange={handleChange('lastName')}
              setFieldError={setFieldError}
              fieldName="lastName"
            />
            <CustomInput
              label="Username"
              placeholder="Enter your username"
              value={values.username}
              error={errors.username || usernameError}
              touched={touched.username}
              initialTouched={true}
              setFieldError={setFieldError}
              fieldName="username"
              handleChange={text => handleChangeUserName(text, setFieldValue)}
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
              setFieldError={setFieldError}
              fieldName="bio"
            />
            {userRole == 'user' && (
              <CustomPhoneInput
                value={userData?.phone}
                error={errors.phone}
                touched={touched.phone}
                handleChange={handleChange('phone')}
                setFieldValue={setFieldValue}
                phoneInput={phoneInput}
                setIsError={setIsError}
                setFieldError={setFieldError}
                isError={isError}
                setPhoneCode={setPhoneCode}
                countryCode={userData?.countryCode}
                disabled={true}
              />
            )}
            <CustomSelect
              label="Country"
              selectedValue={values.country}
              values={allCountries}
              error={errors.country}
              initialTouched={true}
              setCountry={setCountry}
              touched={touched.country}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              fieldName="country"
            />
            <CustomSelect
              label="City"
              selectedValue={values.city}
              values={allCities}
              error={errors.city}
              initialTouched={true}
              touched={touched.city}
              setFieldValue={setFieldValue}
              setFieldError={setFieldError}
              fieldName="city"
            />
            {userRole == 'admin' && (
              <CustomSelect
                label="Gender"
                selectedValue={values.gender}
                values={['Male', 'Female']}
                initialTouched={true}
                touched={touched.gender}
                error={errors.gender}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                fieldName="gender"
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
              setFieldError={setFieldError}
              fieldName="physicalInformation"
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
                  setFieldError={setFieldError}
                  fieldName="dob"
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
                    setFieldValue('dob', formattedDate);
                    setFieldError('dob', '');
                    setDatePickerVisible(false);
                  }}
                  onCancel={() => setDatePickerVisible(false)}
                />
              </View>
            </TouchableWithoutFeedback>
            {userRole == 'admin' && (
              <CustomInput
                label="Hourly Rate"
                placeholder="$20.00"
                value={values.hourlyRate}
                error={errors.hourlyRate}
                touched={touched.hourlyRate}
                keyboardType="numeric"
                initialTouched={true}
                handleChange={handleChange('hourlyRate')}
                setFieldError={setFieldError}
                fieldName="hourlyRate"
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
    marginTop: verticalScale(35),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});
