import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';

const RequestMealPlan = ({navigation}: any) => {
  const handleNavigation = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.icon}>
          <Icon name="checkmark-outline" color="white" size={24} />
        </View>
        <Text
          style={[
            STYLES.text14,
            {marginTop: 2, color: 'rgba(48, 210, 152, 1)'},
          ]}>
          Request sent!
        </Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 35,
            marginTop: 25,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: 'white',
              textAlign: 'center',
            }}>
            Please wait for nutritionist to confirm
          </Text>
        </View>
        <View style={{width: '75%', marginTop: verticalScale(25)}}>
          <CustomButton onPress={handleNavigation}>Return</CustomButton>
        </View>
      </View>
    </View>
  );
};

export default RequestMealPlan;

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
    width: 275,
    height: 232,
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
