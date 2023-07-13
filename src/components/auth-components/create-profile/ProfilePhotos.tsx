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
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setUserData} from '../../../redux/authSlice';
import {IUser} from '../../../interfaces/user.interface';

interface Props {
  onSelectProfilePicture: (picture: any) => void;
}

const ProfilePhotos = ({onSelectProfilePicture}: Props) => {
  const [selectedCoverImage, setSelectedCoverImage] = useState<any | null>(
    null,
  );
  const [selectedProfileImage, setSelectedProfileImage] = useState<any | null>(
    null,
  );
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  // console.log(previousUserData, 'ss');

  const handleUploadPhoto = (type: string) => {
    if (type == 'profile' && selectedProfileImage) {
      setSelectedProfileImage(null);
      onSelectProfilePicture(null);
      const partialUserData: Partial<IUser> = {
        ...previousUserData,
        profileImage: null,
      };
      // dispatch(setUserData(partialUserData));
      return;
    }
    if (type == 'cover' && selectedCoverImage) {
      setSelectedCoverImage(null);
      const partialUserData: Partial<IUser> = {
        ...previousUserData,
        coverImage: null,
      };
      // dispatch(setUserData(partialUserData));
      return;
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 10000,
      maxWidth: 10000,
    };

    launchImageLibrary(options, (response: any) => {
      if (type == 'profile') {
        if (response.assets) {
          const partialUserData: Partial<IUser> = {
            ...previousUserData,
            profileImage: {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
            },
          };
          // dispatch(setUserData(partialUserData));
          setSelectedProfileImage({resourcePath: response.assets[0].uri});
          onSelectProfilePicture({resourcePath: response.assets[0].uri});
        }
      }
      if (type == 'cover') {
        if (response.assets) {
          setSelectedCoverImage({resourcePath: response.assets[0].uri});
          const partialUserData: Partial<IUser> = {
            ...previousUserData,
            coverImage: {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName, // or undefined
              type: response.assets[0].type, // or undefined
            },
          };
          // dispatch(setUserData(partialUserData));
        }
      }
    });
  };

  return (
    <>
      <View style={styles.coverPhotoContainer}>
        {selectedCoverImage ? (
          <>
            <Image
              source={{
                uri: selectedCoverImage.resourcePath,
              }}
              resizeMode="cover"
              style={{width: 375, height: 182}}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.profileCamera,
                {
                  position: 'absolute',
                  top: verticalScale(19),
                  right: horizontalScale(10),
                  backgroundColor: '#34535A',
                },
              ]}
              onPress={() => handleUploadPhoto('cover')}>
              <Icon name="trash-outline" color="white" size={20} />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={() => handleUploadPhoto('cover')}>
            <Text style={[STYLES.text12, {textDecorationLine: 'underline'}]}>
              Upload Cover
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profilePhotoContainer}>
        {selectedProfileImage && (
          <Image
            source={{
              uri: selectedProfileImage.resourcePath,
            }}
            resizeMode="cover"
            style={{width: 142, height: 142, borderRadius: 71}}
          />
        )}
        <TouchableOpacity
          style={styles.profileCamera}
          activeOpacity={0.7}
          onPress={() => handleUploadPhoto('profile')}>
          {selectedProfileImage ? (
            <Icon name="trash-outline" color="white" size={20} />
          ) : (
            <Cameraicon />
          )}
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
