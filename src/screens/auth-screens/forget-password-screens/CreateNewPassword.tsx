import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {Formik} from 'formik';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {createNewPasswordSchema} from '../../../validations';
import {
  resetPasswordWithEmail,
  resetPasswordWithPhone,
} from '../../../api';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface FormValues {
  newPassword: string;
  confirmNewPassword: string;
}

const CreateNewPassword = ({navigation, route}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [phone, setPhone] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const initialValues: FormValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(prev => !prev);
  };

  useEffect(() => {
    if (route.params.phone) {
      setPhone(route.params.phone);
      console.log(route.params.phone);
    } else {
      setEmail(route?.params.email);
      console.log(route.params.email);
    }
  }, []);

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      if (route.params.phone) {
        const response = await resetPasswordWithPhone(
          values.newPassword,
          route.params.phone,
        );
        if (response?.status == 200) {
          setIsLoading(false);
          navigation.navigate('PasswordChangedDialog');
        }
      } else {
        const response = await resetPasswordWithEmail(
          values.newPassword,
          route.params.email,
        );
        if (response?.status == 200) {
          setIsLoading(false);
          navigation.navigate('PasswordChangedDialog');
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Server Error',
        text2: 'Please try again later!',
      });
    }
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  return (
    <View style={STYLES.container}>
      <View>
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
          setFieldError,
        }) => (
          <View style={{flex: 1}}>
            <View style={{marginTop: verticalScale(25), gap: 0}}>
              <Text style={styles.label}>Create New Password</Text>
              <View
                style={[
                  styles.textInputContainer,
                  {
                    borderWidth: focusedField === 'newPassword' ? 2 : 1,
                    borderColor:
                      focusedField === 'newPassword' ? 'white' : 'gray',
                  },
                ]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type here"
                  placeholderTextColor="gray"
                  secureTextEntry={!passwordVisible}
                  autoCapitalize="none"
                  value={values.newPassword}
                  onChangeText={text => {
                    handleChange('newPassword')(text);
                    if (errors.newPassword && touched.newPassword) {
                      setFieldError('newPassword', '');
                    }
                  }}
                  onFocus={() => handleFocus('newPassword')}
                  onBlur={() => setFocusedField(null)}
                  textAlignVertical="bottom"
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                    color="black"
                    size={24}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
              {errors.newPassword && touched.newPassword ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: verticalScale(7),
                  }}>
                  <Icon name="alert-circle" size={22} color="red" />
                  <Text style={[STYLES.text12, {color: 'red'}]}>
                    {errors.newPassword}
                  </Text>
                </View>
              ) : (
                <View style={{height: 30}} />
              )}
            </View>
            <View style={{gap: 0}}>
              <Text style={styles.label}>Confirm New Password</Text>
              <View
                style={[
                  styles.textInputContainer,
                  {
                    borderWidth: focusedField === 'confirmNewPassword' ? 2 : 1,
                    borderColor:
                      focusedField === 'confirmNewPassword' ? 'white' : 'gray',
                  },
                ]}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type here"
                  placeholderTextColor="gray"
                  secureTextEntry={!confirmPasswordVisible}
                  autoCapitalize="none"
                  value={values.confirmNewPassword}
                  onChangeText={text => {
                    handleChange('confirmNewPassword')(text);
                    if (
                      errors.confirmNewPassword &&
                      touched.confirmNewPassword
                    ) {
                      setFieldError('confirmNewPassword', '');
                    }
                  }}
                  onFocus={() => handleFocus('confirmNewPassword')}
                  onBlur={() => setFocusedField(null)}
                  textAlignVertical="bottom"
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Icon
                    name={
                      confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'
                    }
                    color="black"
                    size={24}
                    style={styles.icon}
                    onPress={toggleConfirmPasswordVisibility}
                  />
                </TouchableOpacity>
              </View>
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
              style={{flex: 2, justifyContent: 'flex-end', marginBottom: 20}}>
              {/* <View style={{height: 320}}></View> */}
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
  label: {
    position: 'relative',
    top: verticalScale(20),
    left: horizontalScale(20),
    color: 'white',
    fontSize: 12,
    zIndex: 10,
  },
  buttonContainer: {
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: verticalScale(100),
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: horizontalScale(340),
    backgroundColor: 'black',
    borderRadius: 10,
    height: verticalScale(60),
    paddingHorizontal: horizontalScale(16),
  },
  textInput: {
    flex: 1,
    color: '#fff',
    marginTop: verticalScale(12),
  },
  icon: {
    padding: 8,
    color: 'gray',
  },
});

export default CreateNewPassword;
