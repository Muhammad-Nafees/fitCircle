import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Avatar} from 'react-native-paper';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import ReadinessTestIcon from '../../../assets/icons/ReadinessTestIcon';
import TdeeCalculatorIcon from '../../../assets/icons/TdeeCalculatorIcon';
import ScheduleDashboardIcon from '../../../assets/icons/ScheduleDashboardIcon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import WalletDashboardIcon from '../../../assets/icons/WalletDashboard';
import PackagesMealIcon from '../../../assets/icons/PackagesMealIcon';
import {CustomTransaction} from '../../components/dashboard-components/CustomTransaction';
const ArrowDown = require('../../../assets/icons/arrow-down.png');

const DashboardScreen = ({navigation}: any) => {
  const options = {weekday: 'short', day: 'numeric', month: 'short'};
  const currentDate = new Date().toLocaleDateString(undefined, options);
  const userData = useSelector((state: RootState) => state.auth.user);
  const isTrainerAvailable = userData?.role !== 'user';
  const username = userData?.username;
  const [profileImageUrl, setProfileImageUrl] = useState();
  const [userId, setUserId] = useState(userData?._id);

  useEffect(() => {
    setUserId(userData?._id);
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  const withNavigationAction = routeName => {
    return () => {
      navigation.navigate(routeName);
    };
  };

  const roleBasedItems =
    userData?.role !== 'user'
      ? [
          {
            text: 'Packages / Meal Plan',
            icon: <PackagesMealIcon />,
            routeName: 'ScheduleScreen',
          },
          {
            text: 'Wallet',
            icon: <WalletDashboardIcon />,
            routeName: 'ScheduleScreen',
          },
          {
            text: 'Schedule',
            icon: <ScheduleDashboardIcon />,
            routeName: 'ScheduleScreen',
          },
        ]
      : [
          {
            text: 'Physical Activity Readiness',
            icon: <ReadinessTestIcon />,
            routeName: 'PhysicalReadiness',
          },
          {
            text: 'Total Daily Exercise Expenditure Calculator',
            icon: <TdeeCalculatorIcon />,
            routeName: 'PhysicalReadiness',
          },
          {
            text: 'Schedule',
            icon: <ScheduleDashboardIcon />,
            routeName: 'ScheduleScreen',
          },
        ];

  const renderItem = ({item}: any) => {
    const onPress = withNavigationAction(item.routeName); // Create the onPress handler using the HOC
    return (
      <TouchableOpacity onPress={onPress} style={styles.carouselItem}>
        {item.icon}
        <Text style={styles.carouselItemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.dateText}>{currentDate}</Text>
        <View style={styles.userInfo}>
          <Text style={styles.name}>
            Hi, {userData?.firstName} {userData?.lastName}
          </Text>
          <View>
            {profileImageUrl ? (
              <Avatar.Image size={34} source={{uri: profileImageUrl}} />
            ) : (
              <Avatar.Text
                size={40}
                label={username ? username[0].toUpperCase() : 'SA'}
                style={{backgroundColor: '#5e01a9'}}
              />
            )}
          </View>
        </View>
        {isTrainerAvailable ? (
          <View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: verticalScale(10),
                marginHorizontal: horizontalScale(5),
              }}>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#ffff'}}>
                Earnings
              </Text>
              <NotificationIcon />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: verticalScale(10),
                marginHorizontal: horizontalScale(5),
              }}>
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginTop: verticalScale(10),
              marginHorizontal: horizontalScale(5),
            }}>
            <NotificationIcon />
          </View>
        )}
        <View style={styles.scheduleContainer}>
          {isTrainerAvailable ? (
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: horizontalScale(5),
              }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: 'rgba(255, 255, 255, 0.5)',
                }}>
                Earning in
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '600',
                      color: '#209BCC',
                    }}>
                    {'  '}May
                  </Text>
                  <Image
                    source={ArrowDown}
                    style={{width: 13, height: 13, tintColor: '#209BCC'}}
                  />
                </TouchableOpacity>
              </Text>
              <Text style={{fontSize: 12, fontWeight: '600', color: '#fff'}}>
                $0.00
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.dateText}>Today's Schedule</Text>
              <View style={styles.scheduleInfoContainer}>
                <View style={styles.avatarColumn}>
                  {profileImageUrl ? (
                    <Avatar.Image size={34} source={{uri: profileImageUrl}} />
                  ) : (
                    <Avatar.Text
                      size={40}
                      label={username ? username[0].toUpperCase() : 'SA'}
                      style={{backgroundColor: '#5e01a9'}}
                    />
                  )}
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
        <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
          <FlatList
            horizontal
            data={roleBasedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <View style={[styles.bottomContainer, isTrainerAvailable && {flex: 1}]}>
        <Text style={styles.transactionText}>Last Transaction</Text>
        <CustomTransaction
          profileImageUrl={profileImageUrl}
          username="Sam"
          name="Sameer Ather"
          date={'May 4'}
          amount="50"
          listText="Unlocked Content"
        />
        <CustomTransaction
          profileImageUrl={profileImageUrl}
          username="Sam"
          name="Sameer Ather"
          date={'May 4'}
          amount="50"
          listText="Unlocked Content"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
  },
  topContainer: {
    padding: 15,
    flex: 1,
  },
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
  scheduleContainer: {
    marginTop: 20,
    gap: 12,
    backgroundColor: '#222123',
    borderRadius: 10,
    padding: 18,
  },
  scheduleInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarColumn: {
    marginRight: 10,
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
  otherText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomContainer: {
    backgroundColor: '#222123',
    flex: 0.8,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  carouselItem: {
    backgroundColor: '#209BCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    height: 110,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    lineHeight: 11.77,
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default DashboardScreen;
