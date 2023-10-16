import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {horizontalScale} from '../../utils/metrics';
const ArrowDown = require('../../../assets/icons/arrow-down.png');

export const ScheduleContainer = ({
  isTrainerAvailable,
  username,
  userData,
  openModal,
}: any) => {
  return (
    <View>
      {isTrainerAvailable ? (
        <View style={styles.container}>
          <View style={styles.earningContainer}>
            <Text style={styles.earningText}>Earning in</Text>
            <TouchableOpacity onPress={openModal} style={styles.openModal}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#209BCC',
                }}>
                {'  '}May{' '}
              </Text>
              <Image
                source={ArrowDown}
                style={{
                  width: 10,
                  height: 10,
                  tintColor: '#209BCC',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#fff'}}>
            $0.00
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.dateText}>Today's Schedule</Text>
          <View style={styles.scheduleInfoContainer}>
            <View style={styles.avatarColumn}>
              <CustomProfileAvatar
                profileImage={userData?.profileImage}
                username={userData?.username}
              />
            </View>
            <View style={styles.detailsColumn}>
              <Text style={[styles.scheduleText, {color: '#209BCC'}]}>
                {userData?.firstName} {userData?.lastName}
              </Text>
              <Text style={styles.scheduleText}>Back and Triceps</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: horizontalScale(5),
  },
  scheduleInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatarColumn: {
    marginRight: 10,
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '500',
  },
  detailsColumn: {
    flex: 1,
  },
  scheduleText: {
    color: 'white',
    fontSize: 8,
    fontWeight: '400',
    marginTop: 2,
  },
  openModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  earningText: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  earningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
