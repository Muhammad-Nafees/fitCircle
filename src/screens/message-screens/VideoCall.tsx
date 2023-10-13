import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Text, PanResponder, BackHandler} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {Avatar} from 'react-native-paper';
// --------------------------------------------------------------------//
import {VideoCallModal} from '../../components/message-components/VideoCallModal';

export const VideoCall = ({route}: any) => {
  const devices = useCameraDevices();
  const cameraRef = useRef(null);
  const [flip, setFlip] = useState(false);
  let cameraDevice = flip ? devices.front : devices.back;
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(true);

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

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const swipeThreshold = 100;
        if (gestureState.dy < -swipeThreshold) {
          setIsModalVisible(true);
        }
      },
      onPanResponderRelease: () => {},
      onPanResponderTerminate: () => {},
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {cameraDevice && (
        <Camera
          ref={cameraRef}
          device={cameraDevice}
          isActive={isCameraActive}
          style={isCameraActive && StyleSheet.absoluteFill}
        />
      )}
      <View
        style={[
          styles.avatarContainer,
          !isCameraActive && styles.avatarContainerCameraInactive,
        ]}>
        <Avatar.Text
          size={!isCameraActive ? 100 : 40}
          label={route.params.username[0]}
          style={{
            backgroundColor: '#5e01a9',
            borderWidth: 1,
            borderColor: 'white',
          }}
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
      {isModalVisible && (
        <VideoCallModal
          onPressTopLine={() => setIsModalVisible(false)}
          toggleCamera={toggleCamera}
          toggleCameraComponent={toggleCameraComponent}
          isCameraActive={isCameraActive}
          username={route.params.username}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
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
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 15,
    marginHorizontal: 15,
  },
  avatarContainerCameraInactive: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
});
