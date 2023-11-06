import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  PanResponder,
  ScrollView,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {openCamera} from 'react-native-image-crop-picker';

import {useSelector} from 'react-redux';
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Image as ImageCompress} from 'react-native-compressor';
import LinearGradient from 'react-native-linear-gradient';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// ------------------------------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import {PostOptionsIcon} from '../../components/home-components/PostOptionsIcon';
import {WhoCanSeeThisPost} from '../../components/home-components/WhoCanSeePost';
import {BottomMinimizedContainer} from '../../components/home-components/BottomMinimizedContainer';
import ColorSelectionSlider from '../../components/home-components/ColorSelectionSlider';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {RootState} from '../../redux/store';
import VideoPreviewScreen from './VideoPreviewScreen';
import CustomLoader from '../../components/shared-components/CustomLoader';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import {FileData, IPost, IPostVisibility} from 'interfaces/user.interface';
import {
  createPostWithContent,
  createPostWithImage,
} from '../../api/home-module';
import Toast from 'react-native-toast-message';
import {CreatePostIcon} from '../../components/home-components/CreatePostIcon';
import {createThumbnail} from 'react-native-create-thumbnail';
import RNFS from 'react-native-fs';

const CancelIcon = require('../../../assets/icons/cancel.png');
const ArrowDownIcon = require('../../../assets/icons/arrow-down.png');

export const AddPostScreen = ({route}: any) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userData: any = useSelector((state: RootState) => state.auth.user);
  const [visibility, setVisibility] = useState<IPostVisibility>('Public');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(true);
  const [isCreatePostIconModalVisible, setIsCreatePostIconModalVisible] =
    useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputBackgroundColor, setTextInputBackgroundColor] = useState<
    string | string[]
  >('transparent');
  const [mediaUri, setMediaUri] = useState<FileData | null>(null);
  const [videoUri, setVideoUri] = useState<FileData | null>();
  const [videoThumbnail, setVideoThumbnail] = useState<FileData | undefined>(
    undefined,
  );
  const [titleInput, setTitleInput] = useState('');
  const [costValue, setCostValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState<any>();

  const onSelectCost = (value: number) => {
    setCostValue(value);
  };

  const handleAvatarButtonPress = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleOptionSelect = (option: IPostVisibility) => {
    setVisibility(option);
  };

  const handleCreatePostIconPress = () => {
    setIsComponentMounted(false);
    setIsCreatePostIconModalVisible(!isCreatePostIconModalVisible);
  };

  const handlePostOptionsIconModalClose = () => {
    setIsComponentMounted(false);
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleColorSelected = (color: string | string[]) => {
    setTextInputBackgroundColor(color);
  };

  const handlePhotoButtonPress = async () => {
    if (permissionGranted === false) {
      return;
    }
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        console.log(response?.assets, 'assets');
        setMediaUri({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        setIsCreatePostIconModalVisible(false);
      }
    });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission granted');
        setPermissionGranted(true);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setIsComponentMounted(true);
      },
      onPanResponderRelease: () => {},
      onPanResponderTerminate: () => {},
    }),
  ).current;

  const handleVideoLibrary = async () => {
    if (permissionGranted === false) {
      return;
    }
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: ImageLibraryOptions = {
      mediaType: 'video',
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        setVideoUri({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
        setIsCreatePostIconModalVisible(false);
      }
    });
  };
  const handleCaptureButtonPress = async () => {
    if (permissionGranted === false) {
      return;
    }
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');

    await openCamera({
      width: 10000,
      height: 10000,
      cropping: false,
    })
      .then((image: any) => {
        if (image.path) {
          console.log(image, 'image');
          setMediaUri({
            uri: image.path,
            name: 'camera',
            type: image.mime,
          });
        }
      })
      .catch((error: any) => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  const handleVideoButtonPress = async () => {
    if (permissionGranted === false) {
      return;
    }
    setIsCreatePostIconModalVisible(false);
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: CameraOptions = {
      mediaType: 'video',
      videoQuality: 'low',
      saveToPhotos: false,
      durationLimit: 15,
    };
    await launchCamera(options, (response: ImagePickerResponse) => {
      console.log(response, 'rrrrrr');
      if (response?.assets) {
        if (response?.assets && response.assets.length > 0) {
          const fileSizeInBytes = response.assets[0].fileSize;
          if (fileSizeInBytes) {
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

            console.log(`Video File Size: ${fileSizeInMB} MB`);
          }
        }
        setVideoUri({
          uri: response.assets[0].uri as string,
          name: response.assets[0].fileName as string,
          type: response.assets[0].type as string,
        });
      }
    });
  };
  const fetchThumbnail = async () => {
    console.log(videoUri, 'videoUri');
    if (videoUri) {
      try {
        const response = await createThumbnail({
          url: videoUri?.uri,
          timeStamp: 1000,
          format: 'jpeg',
        });
        setVideoThumbnail({
          uri: response.path,
          name: 'thumbnail',
          type: 'image/jpeg',
        });
      } catch (err) {
        console.log('err', err);
      }
    }
  };
  console.log(videoThumbnail, 'videoThumbnail');
  useFocusEffect(
    useCallback(() => {
      if (videoUri) {
        fetchThumbnail();
      }
    }, [videoUri]),
  );

  const handleBackButtonPress = () => {
    setMediaUri(null);
    setTextInputValue('');
    setVideoUri(null);
    setTextInputBackgroundColor('transparent');
    setTitleInput('');
    navigation.navigate('Home');
  };

  const handleCancelImage = () => {
    setMediaUri(null);
  };

  const handleVideoNullify = () => {
    setIsCreatePostIconModalVisible(false);
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    setTitleInput('');
  };

  // api call here
  const handleCreatePost = async () => {
    if (textInputValue == '') {
      Toast.show({
        type: 'error',
        text1: `Add text to post a photo!`,
      });
      return;
    }
    setIsLoading(true);
    try {
      if (mediaUri) {
        let compressedImage = null;
        const result = await ImageCompress.compress(mediaUri.uri, {
          quality: 0.8,
        });
        compressedImage = {
          name: 'Image' as string,
          type: mediaUri?.type as string,
          uri: result,
        };
        const cleanedText = textInputValue.replace(/\n{3,}/g, '\n\n').trim();

        const reqData: Partial<IPost> = {
          text: cleanedText,
          media: compressedImage,
          mediaType: 'image',
          visibility: visibility,
          ...(titleInput !== '' && {title: titleInput}),
          ...(costValue !== 0 && {cost: costValue}),
        };
        console.log(reqData, 'req');
        const response = await createPostWithImage(reqData);
        console.log(response?.data, 'response!');
        handleBackButtonPress();
        Toast.show({
          type: 'success',
          text1: `${response?.data.message}`,
        });
      } else {
        const cleanedText = textInputValue.replace(/\n{3,}/g, '\n\n').trim();
        const reqData: Partial<IPost> = {
          text: cleanedText,
          hexCode:
            textInputBackgroundColor === 'transparent'
              ? ['#292A2C']
              : textInputBackgroundColor,

          visibility: visibility,
          ...(costValue !== 0 && {cost: costValue}),
        };
        console.log(reqData, 'req');
        const response = await createPostWithContent(reqData);
        handleBackButtonPress();
        Toast.show({
          type: 'success',
          text1: `${response?.data.message}`,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response.data);
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={isLoading}
              style={styles.button}
              onPress={handleBackButtonPress}>
              <Image
                source={CancelIcon}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <CustomButton
                onPress={handleCreatePost}
                extraStyles={{
                  width: 56,
                  height: 31,
                }}
                isDisabled={isLoading || textInputValue === ''}>
                {isLoading ? <CustomLoader /> : 'Post'}
              </CustomButton>
            </TouchableOpacity>
          </View>
          <TextInput
            editable={!isLoading}
            style={styles.textInput}
            value={titleInput}
            onChangeText={text => setTitleInput(text)}
            placeholder="Title here ..."
            placeholderTextColor="white"
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={styles.topContainer}>
            <View style={styles.avatarContainer}>
              <CustomProfileAvatar
                profileImage={userData?.profileImage}
                username={userData?.username}
              />
              <TouchableOpacity
                disabled={isLoading}
                style={styles.avatarButton}
                onPress={handleAvatarButtonPress}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 10}}>
                  {visibility}
                </Text>
                <Image source={ArrowDownIcon} style={styles.arrowDown} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.inputContainer,
                mediaUri !== null && {marginBottom: 0},
              ]}>
              {Array.isArray(textInputBackgroundColor) ? (
                <LinearGradient
                  colors={textInputBackgroundColor}
                  style={styles.coloredInput}>
                  <TextInput
                    editable={!isLoading}
                    style={[
                      styles.textInputColor,
                      {
                        backgroundColor: !Array.isArray(
                          textInputBackgroundColor,
                        )
                          ? textInputBackgroundColor
                          : 'transparent',
                        minHeight: 90,
                      },
                    ]}
                    placeholder="What do you want to talk about?"
                    placeholderTextColor="white"
                    value={textInputValue}
                    multiline
                    onChangeText={text => setTextInputValue(text)}
                    textAlignVertical={'top'}
                  />
                </LinearGradient>
              ) : (
                <TextInput
                  editable={!isLoading}
                  style={[
                    styles.textInputColor,
                    {
                      backgroundColor:
                        textInputBackgroundColor ?? 'transparent',
                    },
                    textInputBackgroundColor !== 'transparent'
                      ? {minHeight: 90, marginTop: 10}
                      : null,
                  ]}
                  placeholder="What do you want to talk about?"
                  placeholderTextColor="white"
                  value={textInputValue}
                  multiline
                  onChangeText={text => setTextInputValue(text)}
                  textAlignVertical={'top'}
                />
              )}
            </View>
            <View style={styles.postContainer}>
              {mediaUri && !videoUri && (
                <View style={styles.mediaContainer}>
                  <Image source={{uri: mediaUri.uri}} style={styles.media} />
                  <TouchableOpacity
                    disabled={isLoading}
                    style={styles.cancelIconContainer}
                    onPress={handleCancelImage}>
                    <Image source={CancelIcon} style={styles.cancelIcon} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.modalContainer}>
          <Modal
            onBackButtonPress={() => setIsModalVisible(false)}
            isVisible={isModalVisible}
            style={styles.bottomModal}
            onBackdropPress={() => setIsModalVisible(false)}
            backdropOpacity={0.3}>
            <View style={styles.modal}>
              <WhoCanSeeThisPost
                isMedia={mediaUri || videoUri}
                selectedOption={visibility}
                onSelectOption={handleOptionSelect}
                modalClose={handleAvatarButtonPress}
                onSelectCost={onSelectCost}
              />
            </View>
          </Modal>
          <Modal
            onBackButtonPress={() => setIsComponentMounted(false)}
            isVisible={isComponentMounted}
            style={styles.bottomModal}
            onBackdropPress={handlePostOptionsIconModalClose}
            backdropOpacity={0.3}>
            <View style={styles.modal}>
              <PostOptionsIcon
                handleCreatePostIconPress={handleCreatePostIconPress}
                handlePostOptionsIconModalClose={
                  handlePostOptionsIconModalClose
                }
                handleVideoButtonPress={handleVideoButtonPress}
              />
            </View>
          </Modal>
          <Modal
            onBackButtonPress={() => setIsCreatePostIconModalVisible(false)}
            isVisible={isCreatePostIconModalVisible}
            style={styles.bottomModal}
            onBackdropPress={() => setIsCreatePostIconModalVisible(false)}
            backdropOpacity={0.3}>
            <View style={styles.modal}>
              <CreatePostIcon
                handlePhotoButtonPress={handlePhotoButtonPress}
                handleVideoButtonPress={handleVideoLibrary}
                handleCreatePostIconPress={handleCreatePostIconPress}
                handleCaptureButtonPress={handleCaptureButtonPress}
              />
            </View>
          </Modal>
        </View>
        {!mediaUri && (
          <View style={{paddingTop: verticalScale(40)}}>
            <ColorSelectionSlider
              isLoading={isLoading}
              colors={[
                '#CC5252',
                '#88BD91',
                ['#DC8686', '#274B6C'],
                '#654848',
                '#AF3E3E',
                '#42A883',
                ['#4A8D21', '#9CE271', '#BF3A3A'],
                '#FFFF00',
                '#FF00FF',
              ]}
              onColorSelected={handleColorSelected}
            />
          </View>
        )}

        <TouchableWithoutFeedback
          disabled={isLoading}
          style={styles.minimizedContainer}
          {...panResponder.panHandlers}>
          <BottomMinimizedContainer
            isLoading={isLoading}
            handlePhotoButtonPress={handlePhotoButtonPress}
            handleVideoButtonPress={handleVideoButtonPress}
            handleCaptureButtonPress={handleCaptureButtonPress}
          />
        </TouchableWithoutFeedback>
      </View>
      {videoUri && (
        <View style={StyleSheet.absoluteFill}>
          <VideoPreviewScreen
            videoUri={videoUri}
            videoThumbnail={videoThumbnail}
            handleBackButtonPress={handleBackButtonPress}
            username={userData?.username}
            handleNavigation={handleVideoNullify}
            costValue={costValue}
            visibility={visibility}
            setIsComponentMounted={setIsComponentMounted}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282b2c',
  },
  headerContainer: {
    paddingTop: verticalScale(5),
    borderWidth: 1,
    borderBottomColor: '#545656',
  },
  buttonContainer: {
    padding: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#282b2c',
  },
  button: {
    padding: moderateScale(8),
  },
  textInput: {
    height: 40,
    marginHorizontal: horizontalScale(16),
    backgroundColor: '#2c2c2f',
    color: 'white',
    paddingHorizontal: horizontalScale(10),
    width: '80%',
    alignSelf: 'center',
    marginBottom: verticalScale(10),
  },
  topContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: horizontalScale(0),
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: verticalScale(1),
    paddingHorizontal: horizontalScale(20),
    marginTop: 10,
  },
  postContainer: {
    flex: 1,
  },
  avatarButton: {
    borderWidth: 1,
    borderColor: 'white',
    width: horizontalScale(80),
    height: verticalScale(23),
    borderRadius: 40,
    marginHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: horizontalScale(8),
  },
  bottomContainerButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: 'black',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
  },
  textInputColor: {
    width: '100%',
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: horizontalScale(20),
  },
  mediaContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  media: {
    width: horizontalScale(340),
    height: verticalScale(340),
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  minimizedContainer: {
    position: 'relative',
    marginTop: 0,
  },
  inputContainer: {
    flex: 2,
    width: '100%',
    marginBottom: 40,
  },
  coloredInput: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  cancelIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  arrowDown: {
    width: 12,
    height: 12,
    tintColor: 'white',
    marginTop: 2,
  },
});
