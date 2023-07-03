import React, {useRef, useState} from 'react';
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

const OtpScreen = ({navigation, route}: any) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array());

  const handleSubmit = () => {
    const concatenatedString = otp.join('');
    const convertOtpIntoNumber = parseInt(concatenatedString);
    if (convertOtpIntoNumber == route.params.otp) {
      navigation.navigate('CreateNewPassword', {otp: convertOtpIntoNumber});
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'OTP verified.',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Invalid OTP!',
        text2: 'Please enter valid otp.',
      });
    }
  };

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
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={{gap: 10}}>
          <Text style={[STYLES.text16, {fontWeight: '700'}]}>
            Verify your phone
          </Text>
          <Text style={[STYLES.text12, {fontWeight: '400'}]}>
            Verification code is :{' '}
            <Text style={[STYLES.text14, {fontWeight: '500'}]}>
              {route?.params?.otp}{' '}
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
                OTP will expired in <Text style={{color: 'red'}}> 00:11 </Text>
              </Text>
              <Text style={STYLES.text14}>
                Didn’t recive code?
                <Text
                  style={{color: '#209BCC', textDecorationLine: 'underline'}}>
                  {' '}
                  Resend OTP
                </Text>
              </Text>
            </View>
            <View
              style={{
                marginHorizontal: horizontalScale(50),
                marginTop: verticalScale(50),
              }}>
              <CustomButton
                // isDisabled={otp.length == 6 ? true : false}
                onPress={handleSubmit}>
                Verify
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
  },
});
