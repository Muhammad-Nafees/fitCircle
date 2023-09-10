import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import Toast from 'react-native-toast-message';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {generateEmailOtp, otpValidationByEmail} from '../../../api';
import CustomLoader from '../../../components/shared-components/CustomLoader';

const OtpScreen = ({navigation, route}: any) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array());
  const accountType = useSelector((state: RootState) => state.auth.accountType);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResendLoading, setIsResendLoading] = useState<boolean>(false);
  const [verificationType, setVerificationType] = useState('');

  const [secondsRemaining, setSecondsRemaining] = useState(60);
  useEffect(() => {
    setVerificationType(route?.params?.verificationType);
    if (accountType === 'signup') {
      setEmail(userData?.email);
      setPhone(userData?.phone);
    } else {
      if (route?.params?.verificationType === 'phone') {
        setPhone(userData?.phone);
        setEmail('');
      } else {
        setEmail(route?.params?.email);
        setPhone('');
      }
    }
    setGeneratedOtp(route?.params?.otp);
  }, [route?.params?.verificationType]);

  const handleSubmit = async () => {
    const concatenatedString = otp.join('');
    const convertOtpIntoNumber = parseInt(concatenatedString);
    setIsLoading(true);
    try {
      const response = await otpValidationByEmail(convertOtpIntoNumber, email);
      if (response?.status == 200) {
        setIsLoading(false);
        setSecondsRemaining(0);
        Toast.show({
          type: 'success',
          text1: 'OTP verified!',
          text2: 'Account Created Successfully!',
        });
        if (accountType == 'signup') {
          Toast.show({
            type: 'success',
            text1: 'OTP verified!',
          });
          navigation.navigate('AccountVerified');
        } else {
          Toast.show({
            type: 'success',
            text1: 'OTP verified!',
          });
          navigation.navigate('CreateNewPassword', {email: email});
        }
      }
    } catch (error: any) {
      console.log(error.response.data);
      if (error?.response.status == 500) {
        Toast.show({
          type: 'error',
          text1: 'Invalid OTP!',
          text2: 'Please enter valid otp.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Plese try again later!',
        });
      }
      setIsLoading(false);
    }
  };
  const handleResendOtp = async () => {
    setIsResendLoading(true);
    try {
      const response = await generateEmailOtp(email as string);
      const newOtp = response.data;
      setGeneratedOtp(newOtp);
      setSecondsRemaining(60);

      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'New Otp generated!',
      });
      setIsResendLoading(false);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Server Error',
      });
      setIsResendLoading(false);
    }
  };
  useEffect(() => {
    if (secondsRemaining == 0) {
      return;
    }
    let interval = setInterval(() => {
      setSecondsRemaining(secondsRemaining => {
        secondsRemaining <= 1 && clearInterval(interval);
        return secondsRemaining - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const handleInputChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleInputKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key !== 'Backspace' && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <View style={STYLES.container}>
      <ScrollView>
        <View style={{gap: 10}}>
          <Text style={[STYLES.text16, {fontWeight: '700'}]}>
            Let's Verify You
          </Text>
          {verificationType === 'phone' ? (
            <Text style={[STYLES.text12, {fontWeight: '400'}]}>
              Your phone number is :{' '}
              <Text style={[STYLES.text14, {fontWeight: '500'}]}>{phone}</Text>
            </Text>
          ) : (
            <Text style={[STYLES.text12, {fontWeight: '400'}]}>
              Your email is :{' '}
              <Text style={[STYLES.text14, {fontWeight: '500'}]}>{email}</Text>
            </Text>
          )}
          <Text style={[STYLES.text12, {fontWeight: '400'}]}>
            Verification code is :{' '}
            <Text style={[STYLES.text14, {fontWeight: '500'}]}>
              {generatedOtp}
            </Text>
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              {Array.from({length: 6}, (_, index) => (
                <TextInput
                  key={index}
                  style={styles.input}
                  maxLength={1}
                  keyboardType="numeric"
                  secureTextEntry={!otp[index]}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  ref={ref => (inputRefs.current[index] = ref)}
                  value={otp[index]}
                  onChangeText={value => handleInputChange(index, value)}
                  onKeyPress={({nativeEvent: {key}}) =>
                    handleInputKeyPress(index, key)
                  }
                />
              ))}
            </View>
            <View style={{marginTop: verticalScale(20), gap: 4}}>
              <Text style={STYLES.text14}>
                {secondsRemaining == 0
                  ? 'Otp has expired!'
                  : 'OTP will expired in'}{' '}
                <Text style={{color: 'red'}}>
                  {' '}
                  {secondsRemaining != 0 && `00:${secondsRemaining}`}{' '}
                </Text>
              </Text>
              <View style={{flexDirection: 'row', gap: 2}}>
                <Text style={STYLES.text14}>Didn’t recive code?</Text>
                {secondsRemaining == 0 && (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text
                      style={{
                        color: '#209BCC',
                        textDecorationLine: 'underline',
                        marginTop: 3,
                        paddingHorizontal: 10,
                      }}>
                      {' '}
                      {isResendLoading ? <CustomLoader /> : 'Resend OTP'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View
              style={{
                marginHorizontal: horizontalScale(50),
                marginTop: verticalScale(50),
              }}>
              <CustomButton
                isDisabled={secondsRemaining == 0 || isLoading ? true : false}
                onPress={handleSubmit}>
                {isLoading ? <CustomLoader /> : 'Verify'}
              </CustomButton>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    marginTop: horizontalScale(68),
    width: horizontalScale(352),
    height: 240,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(16),
    marginBottom: verticalScale(40),
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#FBFBFB',
    textAlign: 'center',
    color: 'black',
  },
});
