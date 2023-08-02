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

const CancelIcon = require('../../../assets/icons/cancel.png');
const ArrowDownIcon = require('../../../assets/icons/arrow-down.png');

export const AddPostScreen = ({route}: any) => {
  const navigation = useNavigation();
  const authToken = useSelector(
    (state: RootState) => state.auth.authorizationToken,
  );
  const userData = useSelector((state: RootState) => state.auth.user);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const username = userData?.username;
  const [selectedOption, setSelectedOption] = useState('Public');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isComponentMounted, setIsComponentMounted] = useState(false);
  const [isCreatePostIconModalVisible, setIsCreatePostIconModalVisible] =
    useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  const [textInputBackgroundColor, setTextInputBackgroundColor] =
    useState('transparent');
  const [mediaUri, setMediaUri] = useState<string | null>();
  const [videoUri, setVideoUri] = useState<string | null>();
  const [isEnabled, setIsEnabled] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [costValue, setCostValue] = useState(0);

  const checkButtonEnable = () => {
    return textInputValue.length > 0 || mediaUri !== null;
  };

  const handleNavigation = () => {
    navigation.navigate('Home');
  };

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

  useEffect(() => {
    setIsEnabled(checkButtonEnable());
  }, [textInputValue, mediaUri]);

  const handlePostButtonPress = async () => {
    try {
      const postData = {
        content: textInputValue,
        media: videoUri ? videoUri : mediaUri,
        cost: costValue > 0 ? costValue : null,
        visibility: selectedOption.toLowerCase(),
        hexCode:
          textInputBackgroundColor === 'transparent'
            ? null
            : `${textInputBackgroundColor}`,
      };
      console.log(postData.media);
      const response = await postContent(postData, authToken);
      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Post successful',
          visibilityTime: 2000,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Post successful',
          visibilityTime: 2000,
        });
        console.log('Post failed:', response.data);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error posting content:', error);
      Toast.show({
        type: 'error',
        text1: 'Post Failed',
        visibilityTime: 2000,
      });
      navigation.navigate('Home');
    }
  };

  const handleAvatarButtonPress = () => {
    setIsModalVisible(!isModalVisible);
  };
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleCreatePostIconPress = () => {
    setIsComponentMounted(false);
    setIsCreatePostIconModalVisible(!isCreatePostIconModalVisible);
  };

  const handlePostOptionsIconModalClose = () => {
    setIsComponentMounted(false);
  };

  const handleColorSelected = (color: any) => {
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
        setMediaUri(response.assets[0].uri);
      }
    });
  };

  const handleVideoLibrary = () => {
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: ImageLibraryOptions = {
      mediaType: 'video',
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setVideoUri(response.assets[0].uri);
      }
    });
  };

  const handleCaptureButtonPress = () => {
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

  const handleVideoButtonPress = () => {
    setIsCreatePostIconModalVisible(false);
    setVideoUri(null);
    setMediaUri(null);
    setTextInputBackgroundColor('transparent');
    const options: CameraOptions = {
      mediaType: 'video',
      videoQuality: 'low',
      durationLimit: 60,
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
                onPress={isEnabled ? handlePostButtonPress : undefined}
                isDisabled={!isEnabled}
                extraStyles={{width: 56, height: 31}}>
                Post
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
            <TextInput
              style={[
                styles.textInputColor,
                {backgroundColor: textInputBackgroundColor},
                textInputBackgroundColor !== 'transparent'
                  ? {height: 150}
                  : null,
              ]}
              placeholder="What do you want to talk about?"
              placeholderTextColor="white"
              value={textInputValue}
              multiline
              onChangeText={text => setTextInputValue(text)}
              textAlignVertical={'top'}
            />
            <View style={styles.postContainer}>
              {mediaUri && !videoUri && (
                <View style={styles.mediaContainer}>
                  <Image source={{uri: mediaUri}} style={styles.media} />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
        <View style={styles.modalContainer}>
          <Modal
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
          <ColorSelectionSlider
            colors={[
              '#CC5252',
              '#88BD91',
              '#654848',
              '#AF3E3E',
              '#42A883',
              '#00FF00',
              '#0000FF',
              '#FFFF00',
              '#FF00FF',
            ]}
            onColorSelected={handleColorSelected}
          />
        )}
        <BottomMinimizedContainer
          handlePhotoButtonPress={handlePhotoButtonPress}
          handleVideoButtonPress={handleVideoButtonPress}
          handleCaptureButtonPress={handleCaptureButtonPress}
        />
      </View>
      {videoUri && (
        <View style={StyleSheet.absoluteFill}>
          <VideoPreviewScreen
            videoUri={videoUri}
            email={userData?.email}
            username={userData?.username}
            handleNavigation={handleNavigation}
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
    paddingHorizontal: horizontalScale(16),
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: verticalScale(10),
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
    paddingHorizontal: horizontalScale(15),
  },
  mediaContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
});
