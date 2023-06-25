import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {STYLES} from '../../../styles/globalStyles';
import Cameraicon from '../../../../assets/icons/Cameraicon';

const ProfilePhotos = () => {
  return (
    <>
      <View style={styles.coverPhotoContainer}>
        <TouchableOpacity>
          <Text style={[STYLES.text12, {textDecorationLine: 'underline'}]}>
            Upload Cover
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profilePhotoContainer}>
        <TouchableOpacity style={styles.profileCamera} activeOpacity={0.7}>
          <Cameraicon />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfilePhotos;

const styles = StyleSheet.create({
  coverPhotoContainer: {
    position: 'relative',
    width: horizontalScale(375),
    height: horizontalScale(182),
    backgroundColor: '#444444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
  },
  profilePhotoContainer: {
    position: 'absolute',
    top: verticalScale(130),
    zIndex: 100,
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCamera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#13728C',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
