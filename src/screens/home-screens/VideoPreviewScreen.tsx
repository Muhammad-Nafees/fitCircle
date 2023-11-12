import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import {format} from 'date-fns';
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  CameraOptions,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//-------------------------------------------------------------------------------//
import CustomButton from '../../components/shared-components/CustomButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {WhoCanSeeThisPost} from '../../components/home-components/WhoCanSeePost';
import {Boost} from '../../components/home-components/Boost';
const ArrowDownIcon = require('../../../assets/icons/arrow-down.png');
import BoostIcon from '../../../assets/icons/BoostIcon';
import TextIcon from '../../../assets/icons/TextIcon';
import DiscIcon from '../../../assets/icons/DiscIcon';
import MusicIcon from '../../../assets/icons/MusicIcon';
import MusicIconTwo from '../../../assets/icons/MusicIconTwo';
import {RootState} from '../../redux/store';
import CustomLoader from '../../components/shared-components/CustomLoader';
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import Cameraicon from '../../../assets/icons/Cameraicon';
import BoostPriceDialog from '../../components/home-components/BoostPriceDialog';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import CustomAttachmentDialog from '../../components/shared-components/CustomAttachmentDialog';
import CustomBottomSheet from '../../components/shared-components/CustomBottomSheet';
import {FileData, IPost, IPostVisibility} from 'interfaces/user.interface';
import {
  Video as VideoCompress,
  Image as ImageCompress,
} from 'react-native-compressor';
import {createPostWithVideo, getMusicList} from '../../api/home-module';
import {getRandomNumber} from '../../utils/helper';

interface VideoPreviewScreenProps {
  videoUri: FileData;
  username?: string;
  email?: string;
  handleNavigation: () => void;
  setIsComponentMounted: (value: boolean) => void;
  handleBackButtonPress: any;
  costValue?: number;
  visibility?: IPostVisibility;
  videoThumbnail: FileData | undefined;
  isPlay: boolean;
  onPlayPause: () => void;
  onPause: () => void;
  onMusicSelect: (id: number) => void;
  onVideoEnd: () => void;
  selectedMusicUrl: string;
  setSelectedMusicUrl: (selectedMusicUrl: string) => void;
  selectedMusicTitle: string;
  setSelectedMusicTitle: (selectedMusicTitle: string) => void;
  thumbnails: string[];
}

export const VideoPreviewScreen = ({
  videoUri,
  username,
  visibility,
  handleNavigation,
  setIsComponentMounted,
  handleBackButtonPress,
  videoThumbnail,
  isPlay,
  onPlayPause,
  onPause,
  onMusicSelect,
  onVideoEnd,
  selectedMusicUrl,
  setSelectedMusicUrl,
  selectedMusicTitle,
  setSelectedMusicTitle,
  thumbnails,
}: VideoPreviewScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
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
  const videoRef = React.useRef<any>(null);
  const userData = useSelector((state: RootState) => state.auth.user);
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
  const [thumbnail, setThumbnail] = useState<FileData | null>(null);
  const [thumbnailOpen, setThumbnailOpen] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState<boolean>(true);
  const [musicModal, setMusicModal] = useState<boolean>(false);
  const [musicList, setMusicList] = useState([]);
  const [music, setMusic] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number | null>(null);
  const PlayIcon = require('../../../assets/icons/playIcon.png');
  const PauseIcon = require('../../../assets/icons/pauseIcon.png');

  useEffect(() => {
    let hideButtonTimer: any;
    hideButtonTimer = setTimeout(() => {
      setShowPlayIcon(false);
    }, 3000);

    return () => {
      clearTimeout(hideButtonTimer);
    };
  }, [isPlay]);

  useFocusEffect(
    useCallback(() => {
      const fetchMusicList = async () => {
        try {
          setLoader(true);
          const musicListResponse = await getMusicList(debouncedValue);
          setMusicList(musicListResponse?.data?.data);
          setLoader(false);
        } catch (error: any) {
          setLoader(false);
          console.log(error?.response, 'Error fetching music list!');
        }
      };
      fetchMusicList();
    }, [debouncedValue]),
  );

  useEffect(() => {
    setLoader(true);
    const timer = setTimeout(() => {
      setDebouncedValue(title);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [title]);

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

  const handleClose = () => {
    setIsModalVisible(false);
    setBoostModalVisible(false);
    setTextModalVisible(false);
    setPayment(false);
    setTitleInputValue('');
    setContent('');
  };

  const handleBoostModal = () => {
    setBoostModalVisible(!isBoostModalVisible);
  };

  const handleMusicPress = () => {
    setMusicModal(true);
    videoRef.current.seek(0);
    onPause();
  };

  const handleTextModal = () => {
    setTextModalVisible(!isTextModalVisible);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const onError = () => {
    console.log('onError');
  };

  const handleAvatarButtonPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleContentChange = (text: string) => {
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

  const handlePhotoButtonPress = async () => {
    setThumbnail(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.9,
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        console.log(response?.assets, 'assets');
        setThumbnail({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  const handleThumbnailSelect = () => {
    setThumbnailOpen(false);
  };

  const handleCaptureButtonPress = async () => {
    setThumbnail(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 0.8,
    };
    await launchCamera(options, (response: any) => {
      if (response.assets) {
        setThumbnail({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  const handleTitleInputChange = (text: string) => {
    setTitleInputValue(text);
  };

  // api call
  const handleShareVideo = async () => {
    if (content == '') {
      Toast.show({
        type: 'error',
        text1: `Add text to post a video!`,
      });
      return;
    }
    setIsLoading(true);
    try {
      if (videoUri) {
        let compressedVideo = null;
        let compressedThumbnail = null;
        const result = await VideoCompress.compress(videoUri.uri);
        compressedVideo = {
          name: videoUri?.name as string,
          type: videoUri?.type as string,
          uri: result,
        };
        if (thumbnail) {
          const result = await ImageCompress.compress(thumbnail.uri);
          compressedThumbnail = {
            name: thumbnail?.name as string,
            type: thumbnail?.type as string,
            uri: result,
          };
        } else {
          if (videoThumbnail) {
            const result = await ImageCompress.compress(videoThumbnail.uri);
            compressedThumbnail = {
              name: videoThumbnail?.name as string,
              type: videoThumbnail?.type as string,
              uri: result,
            };
          }
        }

        const reqData: Partial<IPost> = {
          text: content,
          media: videoUri,
          mediaType: 'video',
          musicTitle: selectedMusicTitle,
          musicUrl: selectedMusicUrl,
          title: titleInputValue,
          visibility: visibility,
          ...(costValue !== 0 && {cost: costValue}),
          thumbnail: compressedThumbnail,
        };
        console.log(reqData, 'video req data');
        const response = await createPostWithVideo(reqData);
        console.log(response?.data, 'from video!');
        onPause();
        navigation.navigate('Home');
        Toast.show({
          type: 'success',
          text1: `${response?.data.message}`,
        });
      }
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response.data, 'FROM VIDEO POST');
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

  const musicSelectHandler = (id: number, title: string, url: string) => {
    videoRef.current.seek(0);
    setMusic(id);
    setSelectedMusicTitle(title);
    setSelectedMusicUrl(url);
    setMusicModal(false);
    onMusicSelect(id);
  };

  const selectThumbnail = (index: number) => {
    setImageIndex(index);
    setThumbnail({
      uri: thumbnails[index],
      name: getRandomNumber() + '_thumbnail.jpg',
      type: 'image/jpeg',
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topLeftContent}>
          <CustomProfileAvatar
            profileImage={userData?.profileImage as any}
            username={userData?.username}
          />
          <View style={styles.postTextContainer}>
            <Text style={styles.postName}>{username}</Text>
            <Text style={styles.postId}>{`@${username
              ?.toLowerCase()
              ?.replace(/\s/g, '')}`}</Text>
          </View>
        </View>
        <Video
          ref={videoRef}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={isPlay}
          source={{uri: videoUri.uri}}
          onTouchStart={() => setShowPlayIcon(true)}
          onEnd={onVideoEnd}
          style={styles.video}
          muted={!!music}
        />
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
            onPress={onPlayPause}>
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
            disabled={isLoading}
            onPress={() => setThumbnailOpen(!thumbnailOpen)}
            style={styles.singleIconContainer}>
            <Text style={[styles.iconText]}>
              {thumbnailOpen ? 'Back' : 'Select Thumbnail'}
            </Text>
          </TouchableOpacity>

          {!thumbnailOpen && (
            <TouchableOpacity
              disabled={isLoading}
              style={[styles.singleIconContainer, {alignItems: 'center'}]}
              onPress={handleMusicPress}>
              <MusicIcon />
              <Text style={styles.iconText}>Music</Text>
            </TouchableOpacity>
          )}
          {!thumbnailOpen && (
            <TouchableOpacity
              disabled={isLoading}
              style={{marginTop: -5, marginRight: 4}}
              onPress={handleTextModal}>
              <TextIcon />
              <Text style={styles.iconText}>Text</Text>
            </TouchableOpacity>
          )}
          {isBoostAvailable && !thumbnailOpen && (
            <TouchableOpacity
              disabled={isLoading}
              style={[styles.singleIconContainer, {marginRight: 4}]}
              onPress={handleBoostModal}>
              <BoostIcon color={payment ? '#209BCC' : 'white'} />
            </TouchableOpacity>
          )}
        </View>
        {!isLoading && (
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
        )}
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
                value={content}
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
          <CustomAttachmentDialog
            message="Thumbnail Attached"
            onCancel={() => setThumbnail(null)}
            showCancel={true}
          />
        )}
        {thumbnailOpen ? (
          <View style={{zIndex: 999}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.bottomWrapper}>
              {thumbnails.map((item: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => selectThumbnail(index)}>
                  <Image
                    style={
                      index === imageIndex
                        ? styles.selectedBottomImage
                        : styles.bottomImage
                    }
                    source={{
                      uri: item,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View
              style={[
                styles.bottomContainer,
                {paddingVertical: verticalScale(15)},
              ]}>
              <View style={styles.iconRow}>
                <TouchableOpacity onPress={handlePhotoButtonPress}>
                  <CreatePostSvgIcon />
                </TouchableOpacity>
              </View>
              <View>
                <CustomButton
                  extraStyles={{paddingHorizontal: 30}}
                  isDisabled={thumbnail == null}
                  onPress={handleThumbnailSelect}>
                  Select as thumbnail
                </CustomButton>
              </View>
            </View>
          </View>
        ) : (
          <View>
            {selectedMusicTitle ? (
              <View
                style={
                  !thumbnail
                    ? styles.musicWrapper
                    : [styles.musicWrapper, {bottom: 140}]
                }>
                <View style={styles.musicContainer}>
                  <MusicIconTwo />
                  <Text style={styles.musicName} numberOfLines={2}>
                    {selectedMusicTitle}
                  </Text>
                </View>
                <DiscIcon />
              </View>
            ) : null}
            <View style={styles.bottomContainer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Add title here..."
                  placeholderTextColor="#fff"
                  onChangeText={handleTitleInputChange}
                  editable={!isLoading}
                  multiline
                />
                <TouchableOpacity
                  style={styles.avatarButton}
                  onPress={handleAvatarButtonPress}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 10}}>
                    {selectedOption}
                  </Text>
                  <Image source={ArrowDownIcon} style={styles.arrowDown} />
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton onPress={handleShareVideo} isDisabled={isLoading}>
                  {isLoading ? <CustomLoader /> : 'Share'}
                </CustomButton>
              </View>
            </View>
          </View>
        )}
      </View>

      <CustomBottomSheet
        setMusicModal={setMusicModal}
        musicModal={musicModal}
        musicList={musicList}
        onMusicSelect={musicSelectHandler}
        title={title}
        setTitle={setTitle}
        loader={loader}
      />
      {/* {showDialog && (
        <>
          <BoostPriceDialog
            onYes={unsuccessfulCompletion}
            onNo={unsuccessfulCompletion}
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
    opacity: 0.9,
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
  musicWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    position: 'absolute',
    bottom: 110,
  },
  musicName: {
    color: '#fff',
    fontSize: 16,
    width: '85%',
  },
  bottomWrapper: {
    backgroundColor: 'black',
    paddingHorizontal: verticalScale(8),
  },
  bottomImage: {
    width: 50,
    height: 60,
    marginHorizontal: 10,
  },
  selectedBottomImage: {
    width: 50,
    height: 60,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#fff',
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
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginHorizontal: 16,
  },
  arrowDown: {
    width: 12,
    height: 12,
    tintColor: 'white',
    marginTop: 2,
  },
  music: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  musicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
