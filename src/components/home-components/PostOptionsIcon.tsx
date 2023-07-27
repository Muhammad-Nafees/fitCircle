import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet, Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
const CreatePostIcon = require('../../../assets/icons/createpost.png');
const ScheduleIcon = require('../../../assets/icons/schedule.png');
const WalletIcon = require('../../../assets/icons/wallet.png');
const VideoIcon = require('../../../assets/icons/video.png');
const FitnessIcon = require('../../../assets/icons/fitness.png');
const CalculatorIcon = require('../../../assets/icons/calculator.png');
const ProfileIcon = require('../../../assets/icons/profile.png');

export const PostOptionsIcon = ({
  handleCreatePostIconPress,
  handlePostOptionsIconModalClose,
}: any) => {
  return (
    <View style={styles.bottomOptions}>
      <TouchableOpacity
        onPress={handlePostOptionsIconModalClose}
        style={styles.topLine}></TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomContainerButtons}
        onPress={handleCreatePostIconPress}>
        <Image
          source={CreatePostIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>Create Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={VideoIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>Take a video</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={ProfileIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>My profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={CreatePostIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>My Meal Plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={ScheduleIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>My Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={CalculatorIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>My TDEE Calculator</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={FitnessIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
        <Text style={styles.options}>My Physical Readiness Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomContainerButtons}>
        <Image
          source={WalletIcon}
          style={{width: 24, height: 24, tintColor: '#0192c0'}}
        />
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
