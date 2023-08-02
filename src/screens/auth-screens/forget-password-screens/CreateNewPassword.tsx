import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {createNewPasswordSchema} from '../../../validations';
import {otpValidation, resetPassword} from '../../../api';
import Icon from 'react-native-vector-icons/Ionicons';

interface FormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const CreateNewPassword = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const initialValues: FormValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  useEffect(() => {
    setEmail(route?.params.email);
  }, []);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await resetPassword(values.newPassword, email);
      if (response?.status == 200) {
        setIsLoading(false);
        navigation.navigate('PasswordChangedDialog');
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: 'Please try again later!',
      });
      setIsLoading(false);
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  return (
    <View style={STYLES.container}>
      <View style={{gap: 10}}>
        <Text
          style={[
            STYLES.text16,
            {fontWeight: '500', fontSize: 22, paddingTop: 12},
          ]}>
          Create New Password
        </Text>
      </View>
      <Formik
        initialValues={initialValues}
        validationSchema={createNewPasswordSchema}
        validateOnChange={false}
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
          <View style={{flex: 1}}>
            <View style={{marginTop: verticalScale(42), gap: 0}}>
              <Text style={styles.label}>Create New Password</Text>
              <TextInput
                style={{
                  width: horizontalScale(340),
                  backgroundColor: 'black',
                  color: '#fff',
                  borderRadius: 10,
                  height: verticalScale(55),
                  paddingHorizontal: 16,
                  borderWidth: focusedField === 'newPassword' ? 2 : 1,
                  borderColor:
                    focusedField === 'newPassword' ? 'white' : 'gray',
                }}
                placeholder="Type here"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onFocus={() => handleFocus('newPassword')}
                onBlur={() => setFocusedField(null)}
              />
              {errors.newPassword && touched.newPassword ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: verticalScale(7),
                    marginBottom: verticalScale(4),
                  }}>
                  <Icon name="alert-circle" size={22} color="red" />
                  <Text style={[STYLES.text12, {color: 'red'}]}>
                    {errors.newPassword}
                  </Text>
                </View>
              ) : (
                <View style={{height: 35}} />
              )}
            </View>
            <View style={{gap: 0}}>
              <Text style={styles.label}>Confirm New Password</Text>
              <TextInput
                style={{
                  width: horizontalScale(340),
                  backgroundColor: 'black',
                  color: '#fff',
                  borderRadius: 10,
                  height: verticalScale(55),
                  paddingHorizontal: 16,
                  borderWidth: focusedField === 'confirmNewPassword' ? 2 : 1,
                  borderColor:
                    focusedField === 'confirmNewPassword' ? 'white' : 'gray',
                }}
                placeholder="Type here"
                placeholderTextColor="gray"
                secureTextEntry={true}
                autoCapitalize="none"
                value={values.confirmNewPassword}
                onChangeText={handleChange('confirmNewPassword')}
                onFocus={() => handleFocus('confirmNewPassword')}
                onBlur={() => setFocusedField(null)}
              />
              {errors.confirmNewPassword && touched.confirmNewPassword ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: verticalScale(7),
                    marginBottom: verticalScale(4),
                  }}>
                  <Icon name="alert-circle" size={22} color="red" />
                  <Text style={[STYLES.text12, {color: 'red'}]}>
                    {errors.confirmNewPassword}
                  </Text>
                </View>
              ) : (
                <View style={{height: 35}} />
              )}
            </View>
            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 20}}>
              <TouchableOpacity
                disabled={isLoading || values.confirmNewPassword.trim() === ''}
                onPress={handleSubmit}
                style={{
                  backgroundColor:
                    values.confirmNewPassword.trim() === ''
                      ? 'transparent'
                      : '#209BCC',
                  borderRadius: 25,
                  paddingVertical: 17,
                  alignItems: 'center',
                  borderWidth: values.confirmNewPassword.trim() === '' ? 1 : 0,
                  borderColor: 'gray',
                }}>
                {isLoading ? (
                  <CustomLoader />
                ) : (
                  <Text
                    style={{
                      color:
                        values.confirmNewPassword.trim() === ''
                          ? 'gray'
                          : 'white',
                    }}>
                    Next
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: 2,
    left: 14,
    color: 'white',
    fontSize: 12,
    zIndex: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'black',
    borderRadius: 12,
    color: 'white',
    borderWidth: 1,
    borderColor: 'transparent',
    paddingHorizontal: horizontalScale(16),
    fontSize: 16,
    height: verticalScale(55),
    paddingTop: verticalScale(20),
  },
  focusedInput: {
    borderColor: '#fff',
  },
  buttonContainer: {
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateNewPassword;
