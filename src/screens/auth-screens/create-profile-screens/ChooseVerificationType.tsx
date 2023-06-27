import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';

const ChooseVerificationType = ({navigation}: any) => {
  const [verificationType, setVerificationType] = useState<string>('phone');
  return (
    <View style={STYLES.container}>
      <View style={{gap: 10}}>
        <Text style={[STYLES.text16, {fontWeight: '700'}]}>
          {verificationType == 'email'
            ? 'Continue with email'
            : 'Continue with phone'}
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
          <View style={{gap: 20, marginTop: 10}}>
            <CustomButton
              extraStyles={{
                backgroundColor:
                  verificationType == 'phone' ? 'transparent' : '#13728C',
                borderWidth: verificationType == 'phone' ? 1 : 0,
                borderColor:
                  verificationType == 'phone' ? 'white' : 'transparent',
              }}
              onPress={() => {
                setVerificationType('email'),
                  navigation.navigate('OtpScreen');
              }}>
              Email Verification
            </CustomButton>
            <CustomButton
              extraStyles={{
                backgroundColor:
                  verificationType != 'phone' ? 'transparent' : '#13728C',
                borderWidth: verificationType != 'phone' ? 1 : 0,
                borderColor:
                  verificationType != 'phone' ? 'white' : 'transparent',
              }}
              onPress={() => {
                setVerificationType('phone'),
                  navigation.navigate('OtpScreen');
              }}>
              Phone Verification
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
    width: 272,
    height: 217,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(32),
    paddingVertical: verticalScale(16),
  },
});
