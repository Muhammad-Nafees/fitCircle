import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import Video from 'react-native-video';
const Icon = require('../../../assets/icons/cancel.png');
import {Avatar} from 'react-native-paper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';
import Modal from 'react-native-modal';
import {WhoCanSeeThisPost} from '../../components/home-components/WhoCanSeePost';
import {Boost} from '../../components/home-components/Boost';
const ArrowDownIcon = require('../../../assets/icons/arrow-down.png');
import BoostIcon from '../../../assets/icons/BoostIcon';
import TextIcon from '../../../assets/icons/TextIcon';
import {format} from 'date-fns';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../api/interceptor';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomLoader from '../../components/shared-components/CustomLoader';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
const CancelIcon = require('../../../assets/icons/cancel.png');
import {
  ImageLibraryOptions,
  launchImageLibrary,
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Cameraicon from '../../../assets/icons/Cameraicon';
import MusicIcon from '../../../assets/icons/MusicIcon';
import BottomSheet, {BottomSheetSectionList} from '@gorhom/bottom-sheet';
import CustomBottomSheet from '../../components/shared-components/CustomBottomSheet';
import {BlurView} from '@react-native-community/blur';
import MusicIconTwo from '../../../assets/icons/MusicIconTwo';
import DiscIcon from '../../../assets/icons/DiscIcon';
import ViewShot from 'react-native-view-shot';
import {createThumbnail} from 'react-native-create-thumbnail';
import axios from 'axios';
const PlayIcon = require('../../../assets/icons/playIcon.png');
const PauseIcon = require('../../../assets/icons/pauseIcon.png');
interface VideoPreviewScreenProps {
  videoUri: string;
  username?: string;
  email?: string;
  handleNavigation: () => void;
  setIsComponentMounted: (value: boolean) => void;
  handleBackButtonPress: () => void;
}

export const VideoPreviewScreen = ({
  videoUri,
  username,
  handleNavigation,
  setIsComponentMounted,
  handleBackButtonPress,
}: VideoPreviewScreenProps) => {
  const navigation = useNavigation();
  const options = [
    {label: '24hrs', price: '$5'},
    {label: '72hrs', price: '$10'},
    {label: '7 Days', price: '$15'},
  ];
  const frontendToBackendMapping = {
    '24hrs': '24hours',
    '72hrs': '72hours',
    '7 Days': '7days',
  };
  const videoRef = React.useRef(null);
  const userData = useSelector((state: RootState) => state.auth.user);
  const [profileImageUrl, setProfileImageUrl] = useState();
  const isBoostAvailable = userData?.role !== 'user';
  const [selectedOption, setSelectedOption] = useState('Public');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBoostModalVisible, setBoostModalVisible] = useState(false);
  const [isTextModalVisible, setTextModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [content, setContent] = useState('');
  const [payment, setPayment] = useState(false);
  const [costValue, setCostValue] = useState<number | null>(0);
  const [selectedOptionInternal, setSelectedOptionInternal] = useState(
    options[0],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const [isMusicModalVisible, setMusicModalVisible] = useState(false);
  const [music, setMusic] = useState<any>();
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [showPlayIcon, setShowPlayIcon] = useState<boolean>(true);
  const viewShotRef = React.useRef<any>();

  useEffect(() => {
    let hideButtonTimer: any;
    hideButtonTimer = setTimeout(() => {
      setShowPlayIcon(false);
    }, 3000);

    return () => {
      clearTimeout(hideButtonTimer);
    };
  }, [isPlay]);

  const handleBoostOptionSelect = (optionLabel: any) => {
    setSelectedOptionInternal(optionLabel);
  };

  useFocusEffect(
    React.useCallback(() => {
      setIsComponentMounted(false);
      videoRef.current.seek(0);
    }, []),
  );

  const onSelectCost = (value: number) => {
    console.log(value);
    setCostValue(value);
  };
  const handleDateConfirm = (date: Date) => {
    const formattedDate = format(date, 'dd/MM/yyyy');
    setSelectedDate(formattedDate);
    setDatePickerVisible(false);
  };

  useEffect(() => {
    const handleBackPress = () => {
      handleNavigation();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => {
      backHandler.remove();
    };
  }, [handleNavigation]);

  useEffect(() => {
    const imageUri = userData?.profileImage?.uri || userData?.profileImageUrl;
    setProfileImageUrl(imageUri);
  }, [userData]);

  const handleClose = () => {
    setIsModalVisible(false);
    setBoostModalVisible(false);
    setTextModalVisible(false);
    setPayment(false);
    setTitleInputValue('');
    setContent('');
  };

  const handlePostButtonPress = async () => {
    console.log(music);
    const trimmedContent = content.trim();
    if (trimmedContent === '') {
      Toast.show({
        type: 'error',
        text1: 'Video cannot be shared without text content',
        visibilityTime: 3000,
      });
      return;
    }
    setIsLoading(true);
    console.log(selectedOptionInternal.label);
    try {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('visibility', selectedOption.toLowerCase());
      formData.append('media', {
        uri: videoUri,
        name: 'video.mp4',
        type: 'video/mp4',
      });

      const selectedBackendOption: any =
        frontendToBackendMapping[selectedOptionInternal.label];
      if (payment) {
        formData.append('boostTimePeriod', selectedBackendOption);
      }
      if (costValue && costValue > 0) {
        formData.append('cost', costValue.toString());
      }
      if (thumbnail !== null) {
        formData.append('thumbnail', {
          uri: thumbnail,
          type: 'image/jpeg',
          name: `image_${Date.now()}.jpg`,
        });
      }
      const response = await axiosInstance.post('posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 201) {
        setIsLoading(false);
        // handleBackButtonPress();
        handleClose();
        navigation.navigate('Home');
        Toast.show({
          type: 'success',
          text1: payment ? 'Post Boosted Successfully!' : 'Post Shared!',
          visibilityTime: 5000,
        });
      }
      console.log(response.status, 'rada');
    } catch (error: any) {
      console.log('API call error:', error?.response);
      Toast.show({
        type: 'error',
        text1: 'Error sharing post. Please try again!',
        visibilityTime: 5000,
      });
      setIsLoading(false);
      handleClose();
      handleBackButtonPress();
      handleNavigation();
    }
  };

  const onBuffer = () => {
    console.log('onBuffer2');
  };

  const handleBoostModal = () => {
    if (payment) {
      Toast.show({
        type: 'error',
        text1: `This post is already boosted for ${selectedOptionInternal.label}`,
        visibilityTime: 2000,
      });
      return;
    }
    setBoostModalVisible(!isBoostModalVisible);
  };

  const handleTextModal = () => {
    setTextModalVisible(!isTextModalVisible);
    console.log(content);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  const handleMusicModal = () => {
    setMusicModalVisible(!isMusicModalVisible);
  };

  const onError = () => {
    console.log('onError');
  };

  const handleAvatarButtonPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleContentChange = (text: string) => {
    console.log(text);
    setContent(text);
  };

  const handleDialog = () => {
    setBoostModalVisible(false);
    setShowDialog(!showDialog);
  };
  const successfulCompletion = () => {
    setPayment(true);
    setShowDialog(false);
    navigation.navigate('SuccessfulDialog');
  };
  const unsuccessfulCompletion = () => {
    setPayment(false);
    setShowDialog(false);
    navigation.navigate('UnsuccessfulDialog');
  };

  const handlePhotoButtonPress = () => {
    setThumbnail(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setThumbnail(response.assets[0].uri);
      }
    });
  };

  const handleThumbnailSelect = async () => {
    setThumbnailOpen(false);
  };

  const handleCaptureButtonPress = async () => {
    setThumbnail(null);
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setThumbnail(response.assets[0].uri);
      }
    });
  };
  console.log(thumbnail, 'thumnail attached!');

  const handleTitleInputChange = (text: string) => {
    setTitleInputValue(text);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topLeftContent}>
          {profileImageUrl ? (
            <Avatar.Image size={40} source={{uri: profileImageUrl}} />
          ) : (
            <Avatar.Text
              size={40}
              style={styles.avatarText}
              label={username ? username[0].toUpperCase() : 'SA'}
            />
          )}
          <View style={styles.postTextContainer}>
            <Text style={styles.postName}>{username}</Text>
            <Text style={styles.postId}>{`@${username
              ?.toLowerCase()
              ?.replace(/\s/g, '')}`}</Text>
          </View>
        </View>
        {/* <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 0.9}}> */}
        <Video
          ref={videoRef}
          // onError={onError}
          resizeMode="cover"
          repeat={true}
          paused={isPlay}
          source={{uri: videoUri}}
          style={styles.video}
          onTouchStart={() => setShowPlayIcon(true)}
        />
        {/* </ViewShot> */}
        {showPlayIcon && (
          <TouchableOpacity
            style={[
              styles.playIconBackground,
              {
                position: 'absolute',
                top: 350,
                left: '42%',
              },
            ]}
            onPress={() => setIsPlay(!isPlay)}>
            <Image
              style={{tintColor: '#fff', width: 40, height: 30}}
              source={isPlay ? PlayIcon : PauseIcon}
            />
          </TouchableOpacity>
        )}
        <View style={styles.textContentContainer}>
          <Text style={styles.textContent}>{content}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => setThumbnailOpen(!thumbnailOpen)}
            style={styles.singleIconContainer}>
            <Text style={[styles.iconText]}>
              {thumbnailOpen ? 'Back' : 'Select Thumbnail'}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
            onPress={handleMusicModal}>
            <MusicIcon />
            <Text style={styles.iconText}>Music</Text>
          </TouchableOpacity> */}
          {!thumbnailOpen && (
            <TouchableOpacity
              style={styles.singleIconContainer}
              onPress={handleTextModal}>
              <TextIcon />
              <Text style={styles.iconText}>Text</Text>
            </TouchableOpacity>
          )}
          {isBoostAvailable && !thumbnailOpen && (
            <TouchableOpacity
              style={styles.singleIconContainer}
              onPress={handleBoostModal}>
              <BoostIcon color={payment ? '#209BCC' : 'white'} />
            </TouchableOpacity>
          )}
        </View>
        {/* <View
          style={{
            position: 'absolute',
            zIndex: 99,
            bottom: 110,
            left: 32,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '74%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <MusicIconTwo />
              <Text style={{color: 'white', opacity: 0.7}}>
                Avicii - Push it ft.{' '}
              </Text>
            </View>
            <DiscIcon />
          </View>
        </View> */}
        <Modal
          onBackButtonPress={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
          style={styles.bottomModal}
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
          onBackButtonPress={() => setBoostModalVisible(false)}
          isVisible={isBoostModalVisible}
          style={styles.bottomModal}
          backdropOpacity={0.7}>
          <View style={styles.boostModal}>
            <Boost
              handleDateConfirm={handleDateConfirm}
              selectedDate={selectedDate}
              options={options}
              selectedOptionInternal={selectedOptionInternal}
              setDatePickerVisible={setDatePickerVisible}
              isDatePickerVisible={isDatePickerVisible}
              handleBoostOptionSelect={handleBoostOptionSelect}
              handleDialog={handleDialog}
              onBackdropPress={() => setBoostModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal
          onBackButtonPress={() => setTextModalVisible(false)}
          isVisible={isTextModalVisible}
          style={styles.bottomModal}
          backdropOpacity={0.3}>
          <View style={[styles.modal, {backgroundColor: '#3a3b3d'}]}>
            <View style={styles.textInputModal}>
              <TextInput
                placeholder="Type here..."
                placeholderTextColor="#fff"
                style={styles.modalInput}
                multiline={true}
                onChangeText={handleContentChange}
              />
              <CustomButton onPress={handleTextModal}>Continue</CustomButton>
            </View>
          </View>
        </Modal>
        {thumbnail !== null && (
          <View
            style={{
              backgroundColor: '#00abd2',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
                padding: 10,
              }}>
              <View>
                <Text style={{color: '#fff', marginRight: 20}}>
                  Thumbnail Attached
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setThumbnail(null)}
                style={{marginRight: 8}}>
                <Image
                  source={CancelIcon}
                  style={{tintColor: '#fff', width: 18, height: 18}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {thumbnailOpen ? (
          <View
            style={[
              styles.bottomContainer,
              {paddingVertical: verticalScale(15)},
            ]}>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handlePhotoButtonPress}>
                <CreatePostSvgIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCaptureButtonPress}>
                <Cameraicon />
              </TouchableOpacity>
            </View>
            <View>
              <CustomButton
                extraStyles={{paddingHorizontal: 30}}
                onPress={handleThumbnailSelect}>
                Select as thumbnail
              </CustomButton>
            </View>
          </View>
        ) : (
          <View style={styles.bottomContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Add title here..."
                placeholderTextColor="#fff"
                onChangeText={handleTitleInputChange}
                multiline
              />
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
            <View style={styles.buttonContainer}>
              <CustomButton onPress={handlePostButtonPress}>
                {isLoading ? <CustomLoader /> : 'Share'}
              </CustomButton>
            </View>
          </View>
        )}
      </View>
      {showDialog && (
        <View style={styles.dialogContainer}>
          <View style={styles.dialogBox}>
            <Text style={styles.dialogText}>Please Confirm</Text>
            <Text style={styles.dialogText}>
              Do you want to boost this post for {selectedOptionInternal.price}?
            </Text>
            <CustomButton onPress={successfulCompletion}>Yes</CustomButton>
            <CustomButton
              onPress={unsuccessfulCompletion}
              extraStyles={{backgroundColor: 'red', marginVertical: 10}}>
              No
            </CustomButton>
          </View>
        </View>
      )}
      {/* {isMusicModalVisible && (
        <>
          <CustomBottomSheet
            setMusicModalVisible={setMusicModalVisible}
            setMusic={setMusic}
          />
        </>
      )} */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: verticalScale(610),
  },
  topLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
    marginHorizontal: horizontalScale(16),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  postTextContainer: {
    marginLeft: horizontalScale(10),
  },
  postId: {
    marginRight: horizontalScale(10),
    color: '#007797',
    fontSize: 10,
    fontWeight: '400',
  },
  postName: {
    color: '#fff',
    fontSize: 16,
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  avatarText: {
    backgroundColor: '#5e01a9',
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
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottomContainer: {
    zIndex: 999,
    backgroundColor: '#292a2c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
  },
  inputContainer: {
    flexDirection: 'column',
    flex: 1,
    marginRight: horizontalScale(16),
  },
  textInput: {
    height: verticalScale(45),
    backgroundColor: '#2c2c2f',
    color: 'white',
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    marginBottom: verticalScale(8),
  },
  buttonContainer: {
    width: horizontalScale(100),
  },
  iconsContainer: {
    position: 'absolute',
    top: verticalScale(22),
    right: horizontalScale(26),
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 15,
  },
  singleIconContainer: {
    marginVertical: verticalScale(5),

    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
  },
  icon: {
    width: horizontalScale(40),
    height: verticalScale(40),
    tintColor: 'white',
    marginBottom: verticalScale(8),
  },
  iconText: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 10,
    fontWeight: '500',
  },
  boostModal: {
    backgroundColor: '#3a3b3d',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
  },
  textInputModal: {
    paddingHorizontal: horizontalScale(25),
    height: '30%',
    marginVertical: verticalScale(25),
  },
  modalInput: {
    backgroundColor: '#918f96',
    borderRadius: 15,
    marginBottom: verticalScale(10),
    paddingLeft: verticalScale(16),
    color: 'white',
  },
  textContentContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginTop: '145%',
    marginRight: '10%',
    marginLeft: horizontalScale(20),
    zIndex: 88,
  },
  textContent: {
    color: 'white',
    fontSize: 16,
  },
  dialogContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dialogBox: {
    backgroundColor: '#292a2c',
    padding: moderateScale(20),
    borderRadius: 8,
  },
  dialogText: {
    fontSize: 16,
    marginBottom: verticalScale(10),
    color: '#fff',
    textAlign: 'center',
  },
  cancelIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: 'white',
    position: 'absolute',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  playIconBackground: {
    backgroundColor: 'rgba(141, 156, 152, 0.8)',
    width: horizontalScale(55),
    height: verticalScale(55),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPreviewScreen;
