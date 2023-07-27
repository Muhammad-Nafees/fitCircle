import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
const PhotoIcon = require('../../../assets/icons/createpost.png');
const VideoIcon = require('../../../assets/icons/video.png');
const CameraIcon = require('../../../assets/icons/camera.png');

interface BottomMinimizedContainerProps {
  handlePhotoButtonPress: () => void;
  handleVideoButtonPress: () => void;
  handleCaptureButtonPress: () => void;
}

export const BottomMinimizedContainer = ({
  handlePhotoButtonPress,
  handleVideoButtonPress,
  handleCaptureButtonPress,
}: BottomMinimizedContainerProps) => (
  <View style={styles.bottomMinimizedContainer}>
    <View style={styles.bottomMinimizedTextContainer}>
      <Text style={styles.bottomMinimizedContainerText}>Add to your post</Text>
    </View>
    <View style={styles.bottomMinimizedIconsContainer}>
      <TouchableOpacity onPress={handlePhotoButtonPress}>
        <Image source={PhotoIcon} style={styles.imageIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVideoButtonPress}>
        <Image source={VideoIcon} style={styles.imageIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCaptureButtonPress}>
        <Image source={CameraIcon} style={styles.imageIcon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  bottomMinimizedContainer: {
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: '100%',
    justifyContent: 'flex-end',
    flex: 0.5,
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
  },
  bottomMinimizedTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomMinimizedIconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  bottomMinimizedContainerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    marginRight: horizontalScale(35),
  },
  imageIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: '#0192c0',
    marginHorizontal: horizontalScale(5),
  },
});
