import HeaderBackArrow from '../../components/shared-components/HeaderBackArrow';
import ProfilePhotos from '../../components/auth-components/create-profile/ProfilePhotos';
import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {verticalScale, horizontalScale} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';
import {CustomSelect} from '../../components/shared-components/CustomSelect';
import CustomPhoneInput from '../../components/shared-components/CustomPhoneInput';
import CustomInput from '../../components/shared-components/CustomInput';
import {Formik} from 'formik';
import CustomButton from '../../components/shared-components/CustomButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {editProfileSchema} from '../../validations';
import PhoneInput from 'react-native-phone-number-input';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format} from 'date-fns';
import {getCities, getCountries} from '../../api/auth-module';
import Toast from 'react-native-toast-message';

export const EditProfile = ({navigation}: any) => {
  const [profilePicture, setProfilePicture] = useState<any>();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userData = useSelector((state: RootState) => state.auth.user);
  const phoneInput = useRef<PhoneInput>(null);
  console.log(userData);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [allCountries, setAllCountries] = useState<any | null>([]);
  const [allCities, setAllCities] = useState([]);
  const [country, setCountry] = useState();
  const [isError, setIsError] = useState('');
  const [phoneCode, setPhoneCode] = useState('1');
  const [usernameError, setUsernameError] = useState<string>('');
  const [userPhone, setUserPhone] = useState<string>('');
  const [countryCode, setCountryCode] = useState();
  const [allData, setAllData] = useState<any | null>([]);

  // const isoDate = userData?.dob;
  // const date = new Date(isoDate);
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();

  // const formattedDate = `${day.toString().padStart(2, '0')}/${month
  //   .toString()
  //   .padStart(2, '0')}/${year}`;

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
        setAllCities([]);
        Toast.show({
          type: 'error',
          text1: `No cities found!`,
        });
      }
    };
    if (countryCode) {
      fetchCities(countryCode);
    }
  }, [countryCode]);

  const handleSelectProfilePicture = (image: any) => {
    setProfilePicture(image);
  };

  const handleSubmit = values => {
    navigation.navigate('SettingsOne');
    console.log(values);
  };

  const initialValues: any = {
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    phone: '',
    country: '',
    city: '',
    physicalInformation: '',
    dob: '',
    hourlyRate: '',
    profileImage: null,
    coverImage: null,
    facebook: '',
    twitter: '',
    instagaram: '',
    tiktok: '',
  };

  // For settings the social media links
  // userData?.socialMediaLinks.forEach(linkItem => {
  //   initialValues[linkItem.name] = linkItem.link;
  // });

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.contentContainer}>
          <HeaderBackArrow
            extraStyles={{
              marginTop: verticalScale(20),
              position: 'absolute',
              zIndex: 1,
              left: horizontalScale(15),
            }}
            onPress={() => navigation.goBack()}
          />
          <ProfilePhotos onSelectProfilePicture={handleSelectProfilePicture} />
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={editProfileSchema(userRole)}
          validationContext={{userRole: userRole}}
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
            <View style={styles.formContainer}>
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
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                error={errors.username}
                touched={touched.username}
                setFieldError={setFieldError}
                fieldName="username"
                handleChange={handleChange('username')}
              />
              <CustomInput
                label="Add bio"
                placeholder="Type here..."
                value={values.bio}
                error={errors.bio}
                touched={touched.bio}
                multiline
                handleChange={handleChange('bio')}
                textAlignVertical="top"
                extraStyles={{height: verticalScale(130)}}
                setFieldError={setFieldError}
                fieldName="bio"
              />

              <CustomPhoneInput
                disabled={false}
                value={values.phone}
                label="Phone Number"
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
              />

              <CustomSelect
                label="Country"
                selectedValue={values.country}
                values={allCountries}
                error={errors.country}
                setCountry={setCountry}
                touched={touched.country}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                placeholder="Select"
                fieldName="country"
              />
              <CustomSelect
                label="City"
                selectedValue={values.city}
                values={allCities}
                error={errors.city}
                touched={touched.city}
                setFieldValue={setFieldValue}
                setFieldError={setFieldError}
                placeholder="Select"
                fieldName="city"
              />
              <CustomInput
                label="Physical Information"
                placeholder="Enter"
                value={values.physicalInformation}
                error={errors.physicalInformation}
                touched={touched.physicalInformation}
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
              {userRole !== 'user' && (
                <CustomInput
                  label="Hourly Rate"
                  placeholder="$20.00"
                  value={values.hourlyRate}
                  error={errors.hourlyRate}
                  touched={touched.hourlyRate}
                  keyboardType="numeric"
                  handleChange={handleChange('hourlyRate')}
                  setFieldError={setFieldError}
                  fieldName="hourlyRate"
                />
              )}
              <View style={{right: horizontalScale(100), paddingBottom: 20}}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    color: 'rgba(255, 255, 255, 1)',
                  }}>
                  Social media Account
                </Text>
              </View>
              <CustomInput
                label="Facebook"
                placeholder="Enter link here"
                value={values.facebook}
                error={errors.facebook}
                touched={touched.facebook}
                initialTouched={true}
                autoCapitalize="none"
                handleChange={handleChange('facebook')}
                isFirstLetterLowercase={true}
                setFieldError={setFieldError}
                fieldName="facebook"
              />
              <CustomInput
                label="Instagram"
                placeholder="Enter link here"
                value={values.instagram}
                error={errors.instagram}
                touched={touched.instagram}
                initialTouched={true}
                autoCapitalize="none"
                handleChange={handleChange('instagram')}
                isFirstLetterLowercase={true}
                setFieldError={setFieldError}
                fieldName="instagram"
              />
              <CustomInput
                label="Twitter"
                placeholder="Enter link here"
                value={values.twitter}
                error={errors.twitter}
                touched={touched.twitter}
                initialTouched={true}
                autoCapitalize="none"
                handleChange={handleChange('twitter')}
                isFirstLetterLowercase={true}
                setFieldError={setFieldError}
                fieldName="twitter"
              />
              <CustomInput
                label="Tiktok"
                placeholder="Enter link here"
                value={values.tiktok}
                error={errors.tiktok}
                touched={touched.tiktok}
                initialTouched={true}
                autoCapitalize="none"
                handleChange={handleChange('tiktok')}
                isFirstLetterLowercase={true}
                setFieldError={setFieldError}
                fieldName="tiktok"
              />
              <CustomButton
                onPress={handleSubmit}
                extraStyles={{
                  width: horizontalScale(320),
                  marginBottom: verticalScale(55),
                }}>
                Continue
              </CustomButton>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  profilePhotoContainer: {
    position: 'absolute',
    top: verticalScale(100),
    zIndex: 4,
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    position: 'relative',
    zIndex: 3,
    height: verticalScale(292),
    alignItems: 'center',
  },
  formContainer: {
    alignItems: 'center',
  },
});
