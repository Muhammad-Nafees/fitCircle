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
import * as yup from 'yup';

const socialMediaSchema = yup.object().shape({
  facebook: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?facebook\.com(\/\S*)?$/i,
      'Invalid Facebook URL format',
    ),
  twitter: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?twitter\.com(\/\S*)?$/i,
      'Invalid Twitter URL format',
    ),
  instagram: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?instagram\.com(\/\S*)?$/i,
      'Invalid Instagram URL format',
    ),
  tiktok: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?tiktok\.com(\/\S*)?$/i,
      'Invalid TikTok URL format',
    ),
});

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
  console.log(previousUserData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>();

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
      role: 'user',
      socialMediaLinks: socialMediaLinks,
    };
    dispatch(setUserData(partialUserData));
    navigation.navigate('ChooseVerificationType');
  };
  return (
    <ScrollView style={[STYLES.container]}>
      <View>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validationSchema={socialMediaSchema}>
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            submitForm,
            values,
            errors,
            touched,
            initialTouched,
            setFieldError
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
                    autoCapitalize="none"
                    handleChange={handleChange('facebook')}
                    isFirstLetterLowercase={true}
                    setFieldError={setFieldError}
                    fieldName='facebook'
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
                    fieldName='instagram'
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
                    fieldName='twitter'
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
                    fieldName='tiktok'
                  />
                </View>
              </View>
              <View
                style={{
                  marginBottom: verticalScale(40),
                  marginHorizontal: horizontalScale(30),
                  marginTop: verticalScale(110),
                }}>
                <CustomButton onPress={handleSubmit}>
                  {isLoading ? <CustomLoader /> : 'Continue'}
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default SocialMediaAccount;
