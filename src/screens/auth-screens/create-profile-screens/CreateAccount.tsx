import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik, Field} from 'formik';
import {signupSchema} from '../../../validations';
import PhoneInput from 'react-native-phone-number-input';

interface FormValues {
  email: string;
  phoneNumber: number | null;
  password: string;
  confirmPassword: string;
}

const CreateAccount = () => {
  const initialValues: FormValues = {
    email: '',
    phoneNumber: null,
    password: '',
    confirmPassword: '',
  };
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <View style={styles.container}>
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
                <View style={{marginVertical: verticalScale(4),marginBottom: verticalScale(20), gap: 8}}>
                <Text style={STYLES.text12}>Verify Number</Text>
                  <Field name="phoneNumber">
                    {() => (
                      <PhoneInput
                        //   defaultValue={value}
                        defaultCode="PK"
                        textInputStyle={{
                          height: 20,
                          width: 20,
                          padding: 0,
                          fontSize: 12,
                          color: '#000',
                        }}
                        codeTextStyle={{fontSize: 11, color: '#000'}}
                        containerStyle={{
                          height: verticalScale(48),
                          width: horizontalScale(290),
                          backgroundColor: 'white',
                        }}
                        onChangeText={phoneNumber =>
                          setFieldValue('phoneNumber',  +phoneNumber)
                        }
                        withShadow
                      />
                    )}
                  </Field>
                </View>
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
                <CustomButton onPress={handleSubmit}>Cotinue</CustomButton>
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
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: horizontalScale(14),
  },
  formContainer: {
    marginTop: verticalScale(62),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4
    // gap: 10,
  },

  button: {
    marginTop: verticalScale(120),
    paddingHorizontal: horizontalScale(27),
    paddingBottom: verticalScale(20),
  },
});
