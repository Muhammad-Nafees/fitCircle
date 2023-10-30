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
import {
  checkUsername,
  getCities,
  getCountries,
  updateProfile,
} from '../../api/auth-module';
import Toast from 'react-native-toast-message';
import {IUser} from '../../interfaces/user.interface';
import {Image as ImageCompress} from 'react-native-compressor';
import CustomLoader from '../../components/shared-components/CustomLoader';

export const EditProfile = ({navigation}: any) => {
  const [profilePicture, setProfilePicture] = useState<any>();
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const userData = useSelector((state: RootState) => state.auth.user);
  const phoneInput = useRef<PhoneInput>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [allCountries, setAllCountries] = useState<any | null>([]);
  const [allCities, setAllCities] = useState([]);
  const [country, setCountry] = useState();
  const [isError, setIsError] = useState('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [phoneCode, setPhoneCode] = useState('1');
  const [countryCode, setCountryCode] = useState();
  const [allData, setAllData] = useState<any | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const originalDate = new Date('1990-09-21T00:00:00.000Z');
  const formattedDate = format(originalDate, 'dd/MM/yyyy');

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

  const handleSubmit = async (values: IUser) => {
    setIsLoading(true);

    try {
      let compressedProfileImage = null;
      let compressedCoverImage = null;

      if (
        userData?.profileImage &&
        !userData?.profileImage.includes('uploads')
      ) {
        const result = await ImageCompress.compress(userData.profileImage.uri, {
          quality: 0.8,
        });
        compressedProfileImage = {
          name: userData?.profileImage?.name as string,
          type: userData?.profileImage?.type as string,
          uri: result,
        };
      }

      if (userData?.coverImage && !userData?.coverImage.includes('uploads')) {
        const result = await ImageCompress.compress(userData.coverImage.uri, {
          quality: 0.8,
        });
        compressedCoverImage = {
          name: userData?.coverImage?.name as string,
          type: userData?.coverImage?.type as string,
          uri: result,
        };
        const filteredLinks = userData?.socialMediaLinks.filter(
          linkData => linkData.link,
        );
        // const reqUserData: Partial<IUser> = {
        //   ...values,
        //   profileImage: compressedProfileImage || userData?.profileImage,
        //   coverImage: compressedCoverImage || userData?.coverImage,
        //   socialMediaLinks: filteredLinks,
        // };
        const response = await updateProfile(values as IUser);
        console.log(response?.data, 'RESPONSE');
      }
    } catch (error: any) {
      console.log(error?.response?.data, 'FROM UPDATE PROFILE IN SETTINGS!');
    }
    setIsLoading(false);
    // navigation.navigate('SettingsOne');
  };

  const initialValues: any = {
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    username: userData?.username || '',
    bio: userData?.bio || '',
    phone: userData?.phone || '',
    country: userData?.country || '',
    city: userData?.city || '',
    physicalInformation: userData?.physicalInformation || '',
    dob: formattedDate || '',
    hourlyRate: userData?.hourlyRate || '',
    profileImage: null,
    coverImage: null,
    facebook: '',
    twitter: '',
    instagaram: '',
    tiktok: '',
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
        if (userData?.username == text) {
          return;
        }
        setUsernameError(error?.response.data.message);
      }
    }
  };

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
          }) => {
            return (
              <View style={styles.formContainer}>
                <CustomInput
                  label="First Name"
                  placeholder="Enter your first name"
                  value={values.firstName}
                  error={errors.firstName as string}
                  touched={touched.firstName as boolean}
                  handleChange={handleChange('firstName')}
                  setFieldError={setFieldError}
                  fieldName="firstName"
                />
                <CustomInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={values.lastName}
                  error={errors.lastName as string}
                  touched={touched.lastName as boolean}
                  handleChange={handleChange('lastName')}
                  setFieldError={setFieldError}
                  fieldName="lastName"
                />
                <CustomInput
                  label="Username"
                  placeholder="Enter your username"
                  value={values.username as string}
                  error={errors.username || (usernameError as any)}
                  touched={touched.username as boolean}
                  setFieldError={setFieldError}
                  fieldName="username"
                  handleChange={text =>
                    handleChangeUserName(text, setFieldValue)
                  }
                />
                <CustomInput
                  label="Add bio"
                  placeholder="Type here..."
                  value={values.bio as string}
                  error={errors.bio as string}
                  touched={touched.bio as boolean}
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
                  error={errors.phone as string}
                  touched={touched.phone as boolean}
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
                  selectedValue={values?.country}
                  values={allCountries}
                  error={errors.country as string}
                  setCountry={setCountry}
                  touched={touched.country as boolean}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  placeholder={values?.country}
                  placeholderColor="#000"
                  fieldName="country"
                />
                <CustomSelect
                  label="City"
                  selectedValue={values.city}
                  values={allCities}
                  error={errors.city as string}
                  touched={touched.city as boolean}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  placeholder={values?.city}
                  placeholderColor="#000"
                  fieldName="city"
                />
                <CustomInput
                  label="Physical Information"
                  placeholder="Enter"
                  value={values.physicalInformation}
                  error={errors.physicalInformation as string}
                  touched={touched.physicalInformation as boolean}
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
                      error={errors.dob as string}
                      touched={touched.dob as boolean}
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
                    error={errors.hourlyRate as string}
                    touched={touched.hourlyRate as boolean}
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
                  value={values.facebook as string}
                  error={errors.facebook as string}
                  touched={touched.facebook as boolean}
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
                  error={errors.instagram as string}
                  touched={touched.instagram as boolean}
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
                  error={errors.twitter as string}
                  touched={touched.twitter as boolean}
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
                  error={errors.tiktok as string}
                  touched={touched.tiktok as boolean}
                  initialTouched={true}
                  autoCapitalize="none"
                  handleChange={handleChange('tiktok')}
                  isFirstLetterLowercase={true}
                  setFieldError={setFieldError}
                  fieldName="tiktok"
                />
                <CustomButton
                  onPress={handleSubmit}
                  isDisabled={isLoading}
                  extraStyles={{
                    width: horizontalScale(320),
                    marginBottom: verticalScale(55),
                  }}>
                  {isLoading ? <CustomLoader /> : 'Continue'}
                </CustomButton>
              </View>
            );
          }}
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
