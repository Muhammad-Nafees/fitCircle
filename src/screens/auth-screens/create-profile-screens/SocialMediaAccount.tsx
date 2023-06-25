import {View, Text,ScrollView} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';

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

  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <View style={[STYLES.container, {justifyContent: 'space-between'}]}>
      <ScrollView>
        <Formik
          initialValues={initialValues}
          // validationSchema={loginSchema}
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
                  marginTop: verticalScale(150)
                }}>
                <CustomButton
                  onPress={() => navigation.navigate('ChooseVerificationType')}>
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

export default SocialMediaAccount;
