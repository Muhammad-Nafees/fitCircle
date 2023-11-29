import {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import CameraIconForm from '../../../../assets/icons/CameraIconForm';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {setUserData} from '../../../redux/authSlice';
import {FileData, IUser} from '../../../interfaces/user.interface';
import {useRoute} from '@react-navigation/native';
import {s3bucketReference} from '../../../api';

interface Props {
  profile: FileData | null | string | any;
  setProfile: any;
  cover: FileData | null | string | any;
  setCover: any;
}

const ProfilePhotos = ({profile, setProfile, cover, setCover}: Props) => {
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const cameraPermission =
        granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const storagePermission =
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
        PermissionsAndroid.RESULTS.GRANTED;

      if (cameraPermission && storagePermission) {
        console.log('Camera permissions granted');
      } else {
        console.log('Camera permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleUploadPhoto = async (type: string) => {
    if (type === 'profile' && profile) {
      setProfile(null);
      // const partialUserData: Partial<IUser> = {
      //   ...previousUserData,
      //   profileImage: null,
      // };
      // dispatch(setUserData({...partialUserData} as IUser));
      return;
    }
    if (type === 'cover' && cover) {
      setCover(null);

      // const partialUserData: Partial<IUser> = {
      //   ...previousUserData,
      //   coverImage: null,
      // };
      // dispatch(setUserData({...partialUserData} as IUser));
      return;
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
      // maxHeight: 10000,
      // maxWidth: 10000,
    };

    if (type === 'profile') {
      await launchImageLibrary(options, (response: any) => {
        if (response.assets) {
          // const partialUserData: Partial<IUser> = {
          //   ...previousUserData,
          //   profileImage: {
          //     uri: response.assets[0].uri,
          //     name: response.assets[0].fileName,
          //     type: response.assets[0].type,
          //   },
          // };
          // dispatch(setUserData({...partialUserData} as IUser));
          setProfile({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
        }
      });
    } else if (type === 'cover') {
      await launchImageLibrary(options, (response: any) => {
        if (response.assets) {
          setCover({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
          // const partialUserData: Partial<IUser> = {
          //   ...previousUserData,
          //   coverImage: {
          //     uri: response.assets[0].uri,
          //     name: response.assets[0].fileName,
          //     type: response.assets[0].type,
          //   },
          // };
          // dispatch(setUserData({...partialUserData} as IUser));
        }
      });
    }
  };

  const handleProfilePhotoContainerPress = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.5,
      maxHeight: 10000,
      maxWidth: 10000,
    };

    await launchCamera(options, (response: any) => {
      if (response.assets) {
        // const partialUserData: Partial<IUser> = {
        //   ...previousUserData,
        //   profileImage: {
        //     uri: response.assets[0].uri,
        //     name: response.assets[0].fileName,
        //     type: response.assets[0].type,
        //   },
        // };
        // dispatch(setUserData({...partialUserData} as IUser));
        setProfile({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  return (
    <>
      <View style={styles.coverPhotoContainer}>
        {route.name === 'EditProfile' && (
          <View
            style={[
              {
                alignSelf: 'flex-start',
                paddingHorizontal: horizontalScale(16),
              },
              cover && {
                position: 'absolute',
                top: verticalScale(78),
                zIndex: 99,
              },
            ]}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: 'rgba(255, 255, 255, 1)',
              }}>
              Edit Profile
            </Text>
          </View>
        )}
        {cover ? (
          <>
            <Image
              source={{
                uri: cover?.uri
                  ? cover?.uri
                  : cover
                  ? `${s3bucketReference}/${cover}`
                  : undefined,
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
      <TouchableOpacity
        style={styles.profilePhotoContainer}
        activeOpacity={0.7}
        onPress={handleProfilePhotoContainerPress}>
        {/* {selectedProfileImage && ( */}
        <Image
          source={{
            uri: profile?.uri
              ? profile?.uri
              : profile
              ? `${s3bucketReference}/${profile}`
              : undefined,
          }}
          resizeMode="cover"
          style={{width: 142, height: 142, borderRadius: 71}}
        />
        {/* )} */}
        <TouchableOpacity
          style={styles.profileCamera}
          activeOpacity={0.7}
          onPress={() => handleUploadPhoto('profile')}>
          {profile ? (
            <Icon name="trash-outline" color="white" size={20} />
          ) : (
            <CameraIconForm />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
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
