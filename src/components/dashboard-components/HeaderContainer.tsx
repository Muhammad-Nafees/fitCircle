import {View, Text, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';

export const HeaderContainer = ({
  userData,
  isTrainerAvailable,
  username,
}: any) => {
  const options: any = {weekday: 'short', day: 'numeric', month: 'short'};
  const currentDate = new Date().toLocaleDateString(undefined, options);
  return (
    <View>
      <Text style={styles.dateText}>{currentDate}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.name}>
          Hi, {userData?.firstName} {userData?.lastName}
        </Text>
        <View>
          <CustomProfileAvatar
            profileImage={userData?.profileImage}
            username={username}
          />
        </View>
      </View>
      {isTrainerAvailable ? (
        <View>
          <View style={styles.earningContainer}>
            <Text style={{fontSize: 16, fontWeight: '600', color: '#ffff'}}>
              Earnings
            </Text>
            <NotificationIcon />
          </View>
          <View style={styles.walletContainer}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.5)',
              }}>
              Wallet Balance
            </Text>
            <Text style={{fontSize: 12, fontWeight: '600', color: '#fff'}}>
              $0.00
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.notificationIconContainer}>
          <NotificationIcon />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '500',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
    marginRight: 10,
  },
  earningContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(5),
  },
  walletContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(5),
  },
  notificationIconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: verticalScale(10),
    marginHorizontal: horizontalScale(5),
  },
});
