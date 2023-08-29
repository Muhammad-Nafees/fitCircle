import React from 'react';
import {TouchableOpacity, View, StyleSheet, Image, Text} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
const CameraIcon = require('../../../assets/icons/camera.png');

export const CreatePostIcon = ({
  handleCreatePostIconPress,
  handlePhotoButtonPress,
  handleVideoButtonPress,
  handleCaptureButtonPress,
}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleCreatePostIconPress}
        style={styles.topLine}></TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlePhotoButtonPress}>
        <CreatePostSvgIcon />
        <Text style={styles.label}>Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleVideoButtonPress}>
        <VideoSvgIcon />
        <Text style={styles.label}>Video</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleCaptureButtonPress}>
        <Image source={CameraIcon} style={styles.icon} />
        <Text style={styles.label}>Capture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(30),
    height: '50%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(8),
  },
  icon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: '#0192c0',
  },
  label: {
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
