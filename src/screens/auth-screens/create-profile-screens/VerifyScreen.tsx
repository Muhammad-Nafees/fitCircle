import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
const VerifyScreen = ({navigation}: any) => {
  const {name} = useRoute();
  const handleNavigation = () => {
    if (name == 'CertificateVerified') {
      navigation.navigate('InterestScreen');
    } else {
      Toast.show({
        type: 'success',
        text1: 'Welcome To Fit Circle!',
      });
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        <Text style={[STYLES.text14, {marginTop: 2}]}>
          {name == 'CertificateVerified'
            ? 'Certificate Verified!'
            : 'Account created!'}{' '}
        </Text>
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton onPress={handleNavigation}>Continue</CustomButton>
        </View>
      </View>
    </View>
  );
};

export default VerifyScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(107, 107, 107, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 271,
    height: 180,
    borderRadius: 30,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#30D298',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
