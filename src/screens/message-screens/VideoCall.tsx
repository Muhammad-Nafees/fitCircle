import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {
  verticalScale,
  horizontalScale,
  moderateScale,
} from '../../utils/metrics';
import CallRejectIcon from '../../../assets/icons/CallReject';
import SpeakerIcon from '../../../assets/icons/Speaker';
import VolumeOffIcon from '../../../assets/icons/VolumeOff';
import CameraFlipIcon from '../../../assets/icons/CameraFlip';
import CameraOnIcon from '../../../assets/icons/CameraOn';
import {Avatar} from 'react-native-paper';

export const VideoCall = ({route, navigation}: any) => {
  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const [flip, setFlip] = useState(false);
  let cameraDevice = flip ? devices.front : devices.back;
  const [isCameraActive, setIsCameraActive] = useState(true);

  const toggleCamera = () => {
    if (isCameraActive) {
      setFlip(!flip);
    }
  };

  const toggleCameraComponent = () => {
    setIsCameraActive(!isCameraActive);
  };
  useEffect(() => {
    setIsCameraActive(true);
  }, []);

  return (
    <View style={styles.container}>
      {isCameraActive && cameraDevice && (
        <Camera
          ref={cameraRef}
          device={cameraDevice}
          isActive={true}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 15,
            marginHorizontal: 15,
          },
          !isCameraActive && {
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            flexDirection: 'column',
          },
        ]}>
        <Avatar.Text
          size={!isCameraActive ? 100 : 40}
          label={route.params.username[0]}
          style={{backgroundColor: '#5e01a9'}}
        />
        <View
          style={
            !isCameraActive && {justifyContent: 'center', alignItems: 'center'}
          }>
          <Text style={styles.name}>{route.params.username}</Text>
          <Text style={styles.status}>
            @{route.params.username.replace(/\s+/g, '').toLowerCase()}
          </Text>
        </View>
      </View>
      <View
        style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 1}}>
        <View style={[styles.bottomView, !isCameraActive && {height: '80%'}]}>
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
                navigation.navigate('Rating', {username: route.params.username})
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
                <CameraOnIcon />
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
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  bottomView: {
    bottom: 0,
    height: '40%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    gap: moderateScale(20),
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  status: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(32, 155, 204, 1)',
  },
});
