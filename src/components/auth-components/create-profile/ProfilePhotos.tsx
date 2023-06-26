import {useState} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import Cameraicon from '../../../../assets/icons/Cameraicon';
import ImagePicker, {
  ImagePickerResponse,
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
  MediaType,
} from 'react-native-image-picker';

interface Props {
  onSelectProfilePicture: (picture:any) => void;
}

const ProfilePhotos = ({onSelectProfilePicture}:Props) => {
  const [selectedCoverImage, setSelectedCoverImage] = useState<any | null>(
    null,
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState<any | null>(
    null,
  );

  const handleUploadPhoto = (type: string) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 10000,
      maxWidth: 10000,
    };

    launchImageLibrary(options, (response: any) => {
      if (type == 'profile') {
        setSelectedProfileImage({resourcePath: response.assets[0].uri});
        onSelectProfilePicture({resourcePath: response.assets[0].uri});
      } else {
        setSelectedCoverImage({resourcePath: response.assets[0].uri});
      }
    });
  };

  return (
    <>
      <View style={styles.coverPhotoContainer}>
        {selectedCoverImage ? (
          <Image
            source={{
              uri: selectedCoverImage.resourcePath,
            }}
            resizeMode="cover"
            style={{width: 375, height: 182}}
          />
        ) : (
          <TouchableOpacity onPress={() => handleUploadPhoto('cover')}>
            <Text style={[STYLES.text12, {textDecorationLine: 'underline'}]}>
              Upload Cover
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profilePhotoContainer}>
        {selectedProfileImage ? (
          <Image
            source={{
              uri: selectedProfileImage.resourcePath,
            }}
            resizeMode="cover"
            style={{width: 142, height: 142, borderRadius: 71}}
          />
        ) : (
          <TouchableOpacity
            style={styles.profileCamera}
            activeOpacity={0.7}
            onPress={() => handleUploadPhoto('profile')}>
            <Cameraicon />
          </TouchableOpacity>
        )}
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
