import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomInput from '../../../components/shared-components/CustomInput';
import {Formik} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {createNewPasswordSchema} from '../../../validations';
import {otpValidation, resetPassword} from '../../../api';

interface FormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const CreateNewPassword = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: FormValues = {
    newPassword: '',
    confirmNewPassword: '',
  };
  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(
        values.newPassword
      );
      if (response?.status == 200) {
        setIsLoading(false);
        Toast.show({
          type: 'success',
          text1: 'Password updated!',
        });
        navigation.navigate('LoginFormScreen');
      }
    } catch (error:any) {
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: 'Plese try again later!',
      });

      setIsLoading(false);
    }
  };
  return (
    <View style={STYLES.container}>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <View style={{gap: 10}}>
          <Text style={[STYLES.text16, {fontWeight: '700'}]}>
            Create New Password
          </Text>
          <Text style={[STYLES.text12, {fontWeight: '400'}]}>
            Make a new password that’s different with your old password.
          </Text>
        </View>
        <Formik
          initialValues={initialValues}
          validationSchema={createNewPasswordSchema}
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
              <View
                style={{
                  marginTop: verticalScale(42),
                  gap: 0,
                }}>
                <CustomInput
                  label="New Password"
                  placeholder="New Password"
                  value={values.newPassword}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                  initialTouched={true}
                  isPasswordIcon={true}
                  extraStyles={{width: horizontalScale(340)}}
                  handleChange={handleChange('newPassword')}
                />
                <CustomInput
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  value={values.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  touched={touched.confirmNewPassword}
                  initialTouched={true}
                  isPasswordIcon={true}
                  extraStyles={{width: horizontalScale(340)}}
                  handleChange={handleChange('confirmNewPassword')}
                />
              </View>
              <View
                style={{
                  marginTop: verticalScale(70),
                  marginBottom: verticalScale(40),
                }}>
                <CustomButton
                  isDisabled={isLoading ? true : false}
                  onPress={handleSubmit}>
                  {isLoading ? <CustomLoader /> : 'Create New Password'}
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateNewPassword;
