import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import Toast from 'react-native-toast-message';
import {generateEmailOtp} from '../../../api';
import CustomLoader from '../../../components/shared-components/CustomLoader';

const ChooseVerificationType = ({navigation}: any) => {
  const [verificationType, setVerificationType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.user);
  const email = userData?.email;
  const handleSubmit = async (type: string) => {
    if (type == 'email') {
      await setVerificationType('email');
    } else {
      await setVerificationType('phone');
    }
    try {
      setIsLoading(true);
      console.log(email, 'email');
      const response = await generateEmailOtp(email as string);
      const data = response.data;
      navigation.navigate('OtpScreen', {
        otp: data,
        verificationType: type,
      });
      setIsLoading(false);
    } catch (error: any) {
      if (error?.response.status == 409) {
        Toast.show({
          type: 'error',
          text1: 'User does not exist!',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Error',
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={STYLES.container}>
      <View style={{gap: 10}}>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          {verificationType == ''
            ? 'Continue with email or phone'
            : verificationType == 'phone'
            ? 'Continue with phone'
            : 'Continue with email'}
        </Text>
        <Text style={[STYLES.text12, {fontWeight: '400'}]}>
          You’ll receive 6 digit code to verify next
        </Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={[STYLES.text14, {textAlign: 'center'}]}>
            Select the verification platform to continue
          </Text>
          <View style={{gap: 24, marginTop: 18}}>
            <CustomButton
              extraStyles={{
                backgroundColor:
                  verificationType == 'email' ? '#13728C' : 'transparent',
                borderWidth: verificationType == 'email' ? 0 : 1,
                borderColor:
                  verificationType == 'email' ? 'transparent' : 'white',
              }}
              onPress={() => {
                handleSubmit('email');
              }}>
              {verificationType == 'email'
                ? 'Email Verification'
                : 'Email Verification'}
            </CustomButton>
            <CustomButton
              extraStyles={{
                backgroundColor:
                  verificationType == 'phone' ? '#13728C' : 'transparent',
                borderWidth: verificationType == 'phone' ? 0 : 1,
                borderColor:
                  verificationType == 'phone' ? 'transparent' : 'white',
              }}
              onPress={() => handleSubmit('phone')}>
              {verificationType == 'phone'
                ? 'Phone Verification'
                : 'Phone Verification'}
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChooseVerificationType;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    marginTop: horizontalScale(68),
    width: 282,
    height: 230,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(16),
  },
});
