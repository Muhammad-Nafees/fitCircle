import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  PanResponder,
  Alert,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import CustomButton from '../../components/shared-components/CustomButton';
import {Avatar} from 'react-native-paper';
import {PostOptionsIcon} from '../../components/home-components/PostOptionsIcon';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {WhoCanSeeThisPost} from '../../components/home-components/WhoCanSeePost';
import {CreatePostIcon} from '../../components/home-components/CreatePostIcon';
import {BottomMinimizedContainer} from '../../components/home-components/BottomMinimizedContainer';
import ColorSelectionSlider from '../../components/home-components/ColorSelectionSlider';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {postContent} from '../../api';
import {RootState} from '../../redux/store';
import VideoPreviewScreen from './VideoPreviewScreen';
import {ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import CustomLoader from '../../components/shared-components/CustomLoader';
import LinearGradient from 'react-native-linear-gradient';

import {Image as ImageCompress} from 'react-native-compressor';

const CancelIcon = require('../../../assets/icons/cancel.png');
const ArrowDownIcon = require('../../../assets/icons/arrow-down.png');

export const AddPostScreen = ({route}: any) => {
  const navigation = useNavigation();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const username = userData?.username;
  const [selectedOption, setSelectedOption] = useState('Public');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isCreatePostIconModalVisible, setIsCreatePostIconModalVisible] =
    useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputBackgroundColor, setTextInputBackgroundColor] = useState<
    string | string[]
  >('transparent');
  const [mediaUri, setMediaUri] = useState<string | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>();
  const [titleInput, setTitleInput] = useState('');
  const [costValue, setCostValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [compressedImage, setCompressedImage] = useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      setIsModalVisible(false);
      setIsComponentMounted(true);
      setIsCreatePostIconModalVisible(false);
      setTextInputValue('');
      setMediaUri('');
      setTextInputBackgroundColor('transparent');
      setIsLoading(false);
      setTitleInput('');
    }, []),
  );

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  useFocusEffect(
    React.useCallback(() => {
      setIsModalVisible(false);
      setIsComponentMounted(true);
      setIsCreatePostIconModalVisible(false);
      setTextInputValue('');
      setMediaUri('');
    }, []),
  );

  useEffect(() => {
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  const onSelectCost = (value: number) => {
    console.log(value);
    setCostValue(value);
  };

  const handlePostButtonPress = async () => {
    if (textInputValue == '') {
      Toast.show({
        type: 'error',
        text1: 'Post cannot be shared with text content!',
        visibilityTime: 2000,
      });
      return;
    }
    setIsLoading(true);

    if (textInputValue.trim().length === 0 && !mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Post Empty',
        text2: 'Post cannot be empty. Please attach media or text',
        visibilityTime: 2000,
      });
      setIsLoading(false);
      return;
    }

    try {
      let hexCode: string;

      if (!Array.isArray(textInputBackgroundColor))
        hexCode = textInputBackgroundColor;
      else {
        let str = '';

        textInputBackgroundColor.forEach((hex, i) => {
          str += hex + (i === textInputBackgroundColor.length - 1 ? '' : ',');
        });

        hexCode = str;
      }
      if (mediaUri) {
        const result = await ImageCompress.compress(mediaUri, {
          quality: 0.8,
        });
        setCompressedImage(result);
      }
      let postData = {
        content: textInputValue,
        media: videoUri ? videoUri : compressedImage,
        visibility: selectedOption.toLowerCase(),
        hexCode:
          textInputBackgroundColor === 'transparent' ? null : `${hexCode}`,
      };

      if (mediaUri) {
        postData = {
          ...postData,
          cost: costValue > 0 ? costValue : null,
        };
      } else {
        postData = {
          ...postData,
          cost: null,
        };
      }
      console.log(postData,"postData");

      const response = await postContent(postData);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Post successful',
          visibilityTime: 2000,
        });
        setIsLoading(false);
      } else {
        Toast.show({
          type: 'success',
          text1: 'Post successful',
          visibilityTime: 2000,
        });
        console.log('Post failed:', response.data);
        setIsLoading(false);
        navigation.navigate('Home');
      }
    } catch (error: any) {
      console.log('Error posting content:', error.response.data);
      Toast.show({
        type: 'error',
        text1: 'Post Failed',
        visibilityTime: 2000,
      });
      setIsLoading(false);
      navigation.navigate('Home');
    }
  };

  const handleAvatarButtonPress = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleScheduleRoute = () => {
    if (userData?.role === 'trainer') {
      navigation.navigate('MySche', {screen: 'Slot'});
    } else {
      navigation.navigate('MySche', {screen: 'SetSchedule'});
    }
  };

  const handleCreatePostIconPress = () => {
    setIsComponentMounted(false);
    setIsCreatePostIconModalVisible(!isCreatePostIconModalVisible);
  };

  const handlePostOptionsIconModalClose = () => {
    setIsComponentMounted(false);
  };

  const handleColorSelected = (color: string | string[]) => {
    setTextInputBackgroundColor(color);
  };

  const handlePhotoButtonPress = () => {
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri(response?.assets[0]?.uri);
      }
    });
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

  const handleVideoLibrary = () => {
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: ImageLibraryOptions = {
      mediaType: 'video',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setIsCreatePostIconModalVisible(false);
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  const handleCaptureButtonPress = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      Alert.alert('Permission denied', 'Allow permission to access images');
      console.log('Camera permission denied');
      return;
    }
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri(response.assets[0].uri);
      }
    });
  };

  async function hasAndroidPermission() {
    const permission =
      Platform.Version >= '33'
        ? PermissionsAndroid.PERMISSIONS.CAMERA
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const handleVideoButtonPress = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      Alert.alert('Permission denied', 'Allow permission to access images');
      return;
    }
    setIsCreatePostIconModalVisible(false);
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: CameraOptions = {
      mediaType: 'video',
      videoQuality: 'low',
      durationLimit: 120,
      saveToPhotos: true,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  const handleBackButtonPress = () => {
    setMediaUri(null);
    setTextInputValue('');
    setVideoUri(null);
    setTextInputBackgroundColor('transparent');
    setTitleInput('');
    navigation.navigate('Home');
  };

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
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
                onPress={handlePostButtonPress}
                extraStyles={{
                  width: 56,
                  height: 31,
                }}>
                {isLoading ? <CustomLoader /> : 'Post'}
              </CustomButton>
            </TouchableOpacity>
          </View>
          <TextInput
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
              {profileImageUrl ? (
                <Avatar.Image size={40} source={{uri: profileImageUrl}} />
              ) : (
                <Avatar.Text
                  size={40}
                  label={username ? username[0].toUpperCase() : 'SA'}
                />
              )}
              <TouchableOpacity
                style={styles.avatarButton}
                onPress={handleAvatarButtonPress}>
                <Text
                  style={{color: 'white', textAlign: 'center', fontSize: 10}}>
                  {selectedOption}
                </Text>
                <Image
                  source={ArrowDownIcon}
                  style={{
                    width: 12,
                    height: 12,
                    tintColor: 'white',
                    marginTop: 2,
                  }}
                />
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
                  onChangeText={text => {
                    console.log(text), setTextInputValue(text);
                  }}
                  textAlignVertical={'top'}
                />
              )}
            </View>
            <View style={styles.postContainer}>
              {mediaUri && !videoUri && (
                <View style={styles.mediaContainer}>
                  <Image source={{uri: mediaUri}} style={styles.media} />
                  <TouchableOpacity
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
                selectedOption={selectedOption}
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
                handleScheduleRoute={handleScheduleRoute}
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
            <View>
              <ColorSelectionSlider
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
          </View>
        )}
        <View style={styles.minimizedContainer} {...panResponder.panHandlers}>
          <BottomMinimizedContainer
            handlePhotoButtonPress={handlePhotoButtonPress}
            handleVideoButtonPress={handleVideoButtonPress}
            handleCaptureButtonPress={handleCaptureButtonPress}
          />
        </View>
      </View>
      {videoUri && (
        <View style={StyleSheet.absoluteFill}>
          <VideoPreviewScreen
            videoUri={videoUri}
            handleBackButtonPress={handleBackButtonPress}
            username={userData?.username}
            handleNavigation={handleVideoNullify}
            setIsComponentMounted={setIsComponentMounted}
          />
        </View>
      )}
    </KeyboardAvoidingView>
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
});
