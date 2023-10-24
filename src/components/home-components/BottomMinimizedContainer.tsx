import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import Cameraicon from '../../../assets/icons/Cameraicon';

interface BottomMinimizedContainerProps {
  handlePhotoButtonPress: () => void;
  handleVideoButtonPress: () => void;
  handleCaptureButtonPress: () => void;
  isLoading?: boolean;
}

export const BottomMinimizedContainer = ({
  handlePhotoButtonPress,
  handleVideoButtonPress,
  handleCaptureButtonPress,
  isLoading
}: BottomMinimizedContainerProps) => (
  <View style={styles.bottomMinimizedContainer}>
    <View style={styles.bottomMinimizedTextContainer}>
      <Text style={styles.bottomMinimizedContainerText}>Add to your post</Text>
    </View>
    <View style={styles.bottomMinimizedIconsContainer}>
      <TouchableOpacity onPress={handlePhotoButtonPress} disabled={isLoading}>
        <CreatePostSvgIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleVideoButtonPress} disabled={isLoading}>
        <VideoSvgIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleCaptureButtonPress} disabled={isLoading}>
        <Cameraicon />
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