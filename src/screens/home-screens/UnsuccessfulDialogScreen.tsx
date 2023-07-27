import {View, Text, StyleSheet, Image} from 'react-native';
const Icon = require('../../../assets/icons/cancel.png');
import {STYLES} from '../../styles/globalStyles';
import {verticalScale} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';

const SuccessfulDialog = ({navigation}: any) => {
  const handleNavigation = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Image source={Icon} style={styles.iconImage} />
        </View>
        <Text style={[STYLES.text14, {marginTop: 2}]}>Payment Successful</Text>
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
    borderRadius: 17,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: 34,
    height: 34,
    tintColor: '#fff',
  },
});
