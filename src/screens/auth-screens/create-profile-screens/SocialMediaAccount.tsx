import {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {RootState} from '../../../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {ISocial, IUser} from '../../../interfaces/user.interface';
import {setUserData} from '../../../redux/authSlice';
import {createProfile} from '../../../api';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import Toast from 'react-native-toast-message';

interface FormValues {
  facebook: string;
  instagram: string;
  twitter: string;
  tiktok: string;
}

const SocialMediaAccount = ({navigation}: any) => {
  const initialValues: FormValues = {
    facebook: '',
    instagram: '',
    twitter: '',
    tiktok: '',
  };

  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>();
  console.log(previousUserData?.selectedCommunities);

  const handleSubmit = async (values: FormValues) => {
    const socialMediaLinks: ISocial[] = [
      
      {
        name: 'facebook',
        link: values.facebook,
      },
      {
        name: 'instagram',
        link: values.instagram,
      },
      {
        name: 'ticktock',
        link: values.tiktok,
      },
      {
        name: 'twitter',
        link: values.twitter,
      },
    ];
    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      socialMediaLinks: socialMediaLinks,
    };
    setIsLoading(true);

    try {
      const response = await createProfile({...partialUserData});
      const data = response?.data;
      dispatch(setUserData(data));
      setIsLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Veriy Email To complete your profile!',
      });
      navigation.navigate('ChooseVerificationType');
    } catch (error: any) {
      console.log(error.response.data);
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Server Error!',
      });
    }
  };
  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <ScrollView>
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
          }) => (
            <>
              <View>
                <Text style={[STYLES.text16, {fontWeight: '700'}]}>
                  Social media Account
                </Text>
                <View
                  style={{marginTop: verticalScale(43), alignItems: 'center'}}>
                  <CustomInput
                    label="Facebook"
                    placeholder="Enter link here"
                    value={values.facebook}
                    error={errors.facebook}
                    touched={touched.facebook}
                    initialTouched={true}
                    handleChange={handleChange('facebook')}
                  />
                  <CustomInput
                    label="Instagram"
                    placeholder="Enter link here"
                    value={values.instagram}
                    error={errors.instagram}
                    touched={touched.instagram}
                    initialTouched={true}
                    handleChange={handleChange('instagram')}
                  />
                  <CustomInput
                    label="Twitter"
                    placeholder="Enter link here"
                    value={values.twitter}
                    error={errors.twitter}
                    touched={touched.twitter}
                    initialTouched={true}
                    handleChange={handleChange('twitter')}
                  />
                  <CustomInput
                    label="Tiktok"
                    placeholder="Enter link here"
                    value={values.tiktok}
                    error={errors.tiktok}
                    touched={touched.tiktok}
                    initialTouched={true}
                    handleChange={handleChange('tiktok')}
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: verticalScale(40),
                  marginHorizontal: horizontalScale(30),
                  marginTop: verticalScale(150),
                }}>
                <CustomButton onPress={handleSubmit}>
                  {isLoading ? <CustomLoader /> : 'Continue'}
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default SocialMediaAccount;
