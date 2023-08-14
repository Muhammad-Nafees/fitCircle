import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import CameraMinimizedIcon from '../../../assets/icons/CameraMinimizedIcon';

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
        <CreatePostSvgIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVideoButtonPress}>
        <VideoSvgIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCaptureButtonPress}>
        <CameraMinimizedIcon />
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
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(16),
    alignItems: 'center',
    paddingVertical: 27,
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
    gap: 15,
  },
  bottomMinimizedContainerText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
    marginRight: horizontalScale(35),
  },
});
