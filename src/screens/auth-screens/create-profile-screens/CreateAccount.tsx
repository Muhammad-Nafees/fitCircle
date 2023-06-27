import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik, Field} from 'formik';
import {signupSchema} from '../../../validations';
import CustomPhoneInput from '../../../components/shared-components/CustomPhoneInput';

interface FormValues {
  email: string;
  phoneNumber: number | null;
  password: string;
  confirmPassword: string;
}

const CreateAccount = ({navigation,route}: any) => {
  const initialValues: FormValues = {
    email: '',
    phoneNumber: null,
    password: '',
    confirmPassword: '',
  };
  const handleSubmit = (values: FormValues) => {
    navigation.navigate('CreateProfile',route);
  };
  return (
    <View style={STYLES.container}>
      <ScrollView>
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
                  initialTouched={true}
                  handleChange={handleChange('email')}
                />
                <CustomPhoneInput setFieldValue={setFieldValue} />
                <CustomInput
                  label="Password"
                  placeholder="Password"
                  value={values.password}
                  error={errors.password}
                  touched={touched.password}
                  initialTouched={true}
                  handleChange={handleChange('password')}
                />
                <CustomInput
                  label="Re-enter Password"
                  placeholder="Re-enter Passowrd"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  initialTouched={true}
                  handleChange={handleChange('confirmPassword')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Continue</CustomButton>
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
    marginTop: verticalScale(62),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
  },

  button: {
    marginTop: verticalScale(120),
    paddingHorizontal: horizontalScale(27),
    paddingBottom: verticalScale(20),
  },
});
