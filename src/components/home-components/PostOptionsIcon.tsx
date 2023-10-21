import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import ProfileSvgIcon from '../../../assets/icons/ProfileIcon';
import MealPlanSvgIcon from '../../../assets/icons/MealPlanIcon';
import ScheduleSvgIcon from '../../../assets/icons/ScheduleIcon';
import CalculatorSvgIcon from '../../../assets/icons/CalculatorIcon';
import PhysicalSvgIcon from '../../../assets/icons/PhysicalIcon';
import WalletSvgIcon from '../../../assets/icons/WalletIcon';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import PackageIcon from '../../../assets/icons/PackageIcon';

export const PostOptionsIcon = ({
  handleCreatePostIconPress,
  handlePostOptionsIconModalClose,
  handleVideoButtonPress,
}: any) => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);
  const navigation = useNavigation();

  const handleScheduleRoute = () => {
    if (userRole !== 'user') {
      navigation.navigate('Schedule');
    } else {
      navigation.navigate('UserSchedule');
    }
  };

  return (
    <View style={styles.bottomOptions}>
      <TouchableOpacity
        onPress={handlePostOptionsIconModalClose}
        style={styles.topLine}></TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={handleCreatePostIconPress}>
        <CreatePostSvgIcon />
        <Text style={styles.options}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={handleVideoButtonPress}>
        <VideoSvgIcon />
        <Text style={styles.options}>Take a video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={() => navigation.navigate('HomeTab', {screen: 'Profile'})}>
        <ProfileSvgIcon />
        <Text style={styles.options}>My Profile</Text>
      </TouchableOpacity>
      {userRole !== 'user' && userRole !== 'nutritionist' && (
        <TouchableOpacity
          style={styles.bottomContainerButtons}
          onPress={() =>
            navigation.navigate('HomeTab', {screen: 'PackagesScreen'})
          }>
          <PackageIcon />
          <Text style={styles.options}>My Package</Text>
        </TouchableOpacity>
      )}
      {userRole === 'nutritionist' && (
        <TouchableOpacity
          style={styles.bottomContainerButtons}
          onPress={() => navigation.navigate('MealPlan')}>
          <MealPlanSvgIcon />
          <Text style={styles.options}>My Meal Plan</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={handleScheduleRoute}>
        <ScheduleSvgIcon />
        <Text style={styles.options}>My Schedule</Text>
      </TouchableOpacity>
      {userRole === 'user' && (
        <View>
          <TouchableOpacity
            style={styles.bottomContainerButtons}
            onPress={() => navigation.navigate('Tdee')}>
            <CalculatorSvgIcon />
            <Text style={styles.options}>My TDEE Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomContainerButtons}
            onPress={() => navigation.navigate('Physical')}>
            <PhysicalSvgIcon />
            <Text style={styles.options}>My Physical Readiness Test</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={() => navigation.navigate('Payment')}>
        <WalletSvgIcon />
        <Text style={styles.options}>My Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomOptions: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(30),
    paddingTop: verticalScale(15),
    height: '45%',
  },
  bottomContainerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(8),
  },
  options: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: horizontalScale(8),
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(48),
    backgroundColor: 'white',
    marginBottom: verticalScale(20),
    alignSelf: 'center',
    borderRadius: 3,
  },
});
