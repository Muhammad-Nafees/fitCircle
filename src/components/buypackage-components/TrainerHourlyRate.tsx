import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet} from 'react-native';

const TrainerHourlyRate = ({trainerData}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer1}>
        <CustomProfileAvatar size={50} profileImage={trainerData?.profileImage} username={trainerData?.username} />
        <Text style={styles.name}>
          {trainerData?.firstName} {trainerData?.lastName}
        </Text>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.priceText}>${trainerData?.hourlyRate}</Text>
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

export default TrainerHourlyRate;
