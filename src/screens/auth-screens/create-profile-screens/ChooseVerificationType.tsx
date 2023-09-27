import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {getOtpCode} from '../../../api/auth-module';

const ChooseVerificationType = ({navigation}: any) => {
  const [verificationType, setVerificationType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.user);
  console.log(userData?.phone,"phone")

  const handleSubmit = async (type: string) => {
    let reqData = {};
    if (type == 'email') {
      reqData = {email: userData?.email};
      setVerificationType('email');
    } else {
      setVerificationType('phone');
      reqData = {phone: `${userData?.phoneCode}${userData?.phone}`};
    }
    setIsLoading(true);
    try {
      const response = await getOtpCode(reqData);
      const data = response?.data.data;
      navigation.navigate('OtpScreen', {
        otp: data.code,
        verificationType: type,
      });
      setIsLoading(false);
  } catch (error: any) {
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
        console.log(error.response.data, 'error');
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
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
              {verificationType == 'email' && isLoading ? (
                <CustomLoader />
              ) : (
                'Email Verification'
              )}
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
              {verificationType == 'phone' && isLoading ? (
                <CustomLoader />
              ) : (
                'Phone Verification'
              )}
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
