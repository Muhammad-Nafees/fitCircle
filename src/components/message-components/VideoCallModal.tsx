import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CallRejectIcon from '../../../assets/icons/CallReject';
import CameraFlipIcon from '../../../assets/icons/CameraFlip';
import CameraOnIcon from '../../../assets/icons/CameraOn';
import SpeakerIcon from '../../../assets/icons/Speaker';
import VolumeOffIcon from '../../../assets/icons/VolumeOff';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {
  moderateScale,
  horizontalScale,
  verticalScale,
} from '../../utils/metrics';

export const VideoCallModal = ({
  onPressTopLine,
  username,
  isCameraActive,
  toggleCameraComponent,
  toggleCamera,
}: any) => {
  const navigation = useNavigation();
  return (
    <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
      <View style={[styles.bottomView, !isCameraActive && {height: '70%'}]}>
        <View style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <TouchableOpacity
            onPress={onPressTopLine}
            style={styles.topLine}></TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.iconBackground}>
                <VolumeOffIcon />
              </View>
              <Text style={styles.iconText}>mute</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCamera}>
              <View style={styles.iconBackground}>
                <CameraFlipIcon />
              </View>
              <Text style={styles.iconText}>flip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() =>
                navigation.navigate('Rating', {
                  username: username,
                })
              }>
              <View
                style={[
                  styles.iconBackground,
                  {backgroundColor: 'rgba(235, 85, 69, 1)'},
                ]}>
                <CallRejectIcon />
              </View>
              <Text style={styles.iconText}>end</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={toggleCameraComponent}>
              <View style={styles.iconBackground2}>
                {isCameraActive ? (
                  <CameraOnIcon />
                ) : (
                  <View style={styles.cameraIconContainer}>
                    <FontAwesomeIcon name={'video'} size={15} color={'white'} />
                    <Text style={{color: 'white', fontSize: 10.5}}>
                      Camera Off
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <View style={styles.iconBackground2}>
                <SpeakerIcon />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    bottom: 0,
    height: '35%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: moderateScale(20),
  },
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    marginHorizontal: horizontalScale(16),
    alignItems: 'center',
  },
  iconBackground: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBackground2: {
    width: horizontalScale(137),
    height: verticalScale(43),
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginTop: verticalScale(8),
    fontSize: 10,
    color: 'white',
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(58),
    backgroundColor: 'white',
    marginTop: verticalScale(20),
    alignSelf: 'center',
    borderRadius: 3,
  },
  cameraIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(5.5),
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(30),
    gap: moderateScale(15),
  },
});
