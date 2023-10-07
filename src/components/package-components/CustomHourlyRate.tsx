import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet} from 'react-native';

const CustomHourlyRate = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer1}>
        <CustomProfileAvatar size={50} username={'Sameer'} />
        <Text style={styles.name}>Sameer Ather</Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.priceText}>$20.00</Text>
        <Text style={styles.priceText}>Hourly Rate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 12,
  },
  contentContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(48, 210, 152, 1)',
  },
  name: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
});

export default CustomHourlyRate;
