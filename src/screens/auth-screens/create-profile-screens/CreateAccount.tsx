import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik, Field} from 'formik';
import {signupSchema} from '../../../validations';
import CustomPhoneInput from '../../../components/shared-components/CustomPhoneInput';
import {register} from '../../../api';
import {
  authenticate,
  setaccessToken,
  setUserData,
} from '../../../redux/authSlice';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {IUser} from '../../../interfaces/user.interface';
import {RootState} from '../../../redux/store';

export interface CreateAccountFormValues {
  email: string;
  phone: number | null;
  password: string;
  confirmPassword: string;
}

const CreateAccount = ({navigation}: any) => {
  const dispatch = useDispatch();
  console.log(useSelector((state: RootState) => state.auth.user?.email));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValues: CreateAccountFormValues = {
    email: '',
    phone: null,
    password: '',
    confirmPassword: '',
  };
  const handleSubmit = async (values: CreateAccountFormValues) => {
    setIsLoading(true);
    try {
      const response = await register(values);
      console.log('first');
      if (response?.status === 200) {
        setIsLoading(false);
        console.log(response?.data.email)
        dispatch(authenticate());
        dispatch(setUserData({email: response?.data.email}));
        Toast.show({
          type: 'success',
          text1: 'User Registered Successfully!',
        });
        navigation.navigate('CreateProfile');
      }
    } catch (error: any) {
      console.log(error.response.data);
      setIsLoading(false);
      if (error.response.status === 409) {
        Toast.show({
          type: 'error',
          text1: 'Account Already Exists!',
          text2: 'Please try another email.',
        });
      } else if (error.response.status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Signup Unsuccessfull!',
          text2: 'Internal Server Error. Please try again later',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Signup Unsuccessfull!',
          text2: 'Invalid phone number!',
        });
      }
    }
  };
  return (
    <View style={STYLES.container}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
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
              <Text style={[STYLES.text16, {fontWeight: '700'}]}>
                Create Account
              </Text>

              <View style={styles.formContainer}>
                <CustomInput
                  label="Email"
                  placeholder="lincolnsmith@gmail.com"
                  value={values.email}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  initialTouched={true}
                  handleChange={handleChange('email')}
                />
                <CustomPhoneInput
                  value={values.phone}
                  error={errors.phone}
                  touched={touched.phone}
                  handleChange={handleChange('phone')}
                  setFieldValue={setFieldValue}
                />
                <CustomInput
                  label="Password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  isPasswordIcon={true}
                  initialTouched={true}
                  handleChange={handleChange('password')}
                />
                <CustomInput
                  label="Re-Enter Password"
                  placeholder="Re-Enter Password"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  isPasswordIcon={true}
                  touched={touched.confirmPassword}
                  initialTouched={true}
                  handleChange={handleChange('confirmPassword')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton
                  onPress={handleSubmit}
                  isDisabled={isLoading ? true : false}>
                  {isLoading ? <CustomLoader /> : 'Continue'}{' '}
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },

  button: {
    marginTop: verticalScale(90),
    paddingHorizontal: horizontalScale(27),
    paddingBottom: verticalScale(20),
  },
});
