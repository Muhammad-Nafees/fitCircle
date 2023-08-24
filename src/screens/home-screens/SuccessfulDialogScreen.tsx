import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../styles/globalStyles';
import {verticalScale} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';
import {useState} from 'react';

const SuccessfulDialog = ({navigation, route}: any) => {
  const [message, setMessage] = useState(
    route.name === 'FormSaved' ? 'Form Saved!' : 'Payment Successful',
  );
  const handleNavigation = () => {
    if (route.name === 'FormSaved') {
      navigation.navigate('DashboardScreen');
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        <Text style={[STYLES.text14, {marginTop: 2}]}>{message}</Text>
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton onPress={handleNavigation}>Return</CustomButton>
        </View>
      </View>
    </View>
  );
};

export default SuccessfulDialog;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
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
