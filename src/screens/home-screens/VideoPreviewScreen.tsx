import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
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
const BoostIcon = require('../../../assets/icons/boost.png');
const TextIcon = require('../../../assets/icons/textIcon.png');
import {format} from 'date-fns';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import axiosInstance from '../../api/interceptor';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import CustomLoader from '../../components/shared-components/CustomLoader';

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
  console.log(videoUri);

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
      const response = await axiosInstance.post('/posts/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: payment ? 'Post Boosted Successfully!' : 'Post Shared!',
          visibilityTime: 5000,
        });
        console.log(response);
        setIsLoading(false);
        handleBackButtonPress();
        handleClose();
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'success',
          text1: payment ? 'Post Boosted Successfully!' : 'Post Shared!',
          visibilityTime: 5000,
        });
        console.log(response);
        setIsLoading(false);
        handleBackButtonPress();
        handleClose();
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('API call error:', error);
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
    setBoostModalVisible(!isBoostModalVisible);
  };

  const handleTextModal = () => {
    setTextModalVisible(!isTextModalVisible);
    console.log(content);
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

  const handleTitleInputChange = (text: string) => {
    setTitleInputValue(text);
  };
  return (
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
      <Video
        ref={videoRef}
        onError={onError}
        resizeMode="cover"
        source={{uri: videoUri}}
        style={styles.video}
      />
      <View style={styles.textContentContainer}>
        <Text style={styles.textContent}>{content}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleNavigation}>
          <Image source={Icon} style={styles.cancelIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.singleIconContainer}
          onPress={handleTextModal}>
          <Image source={TextIcon} style={styles.icon} />
          <Text style={styles.iconText}>Text</Text>
        </TouchableOpacity>
        {isBoostAvailable && (
          <TouchableOpacity
            style={styles.singleIconContainer}
            onPress={handleBoostModal}>
            <Image source={BoostIcon} style={styles.icon} />
            <Text style={styles.iconText}>Boost</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal
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
        isVisible={isBoostModalVisible}
        style={styles.bottomModal}
        backdropOpacity={0.3}>
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
            <Text style={{color: 'white', textAlign: 'center', fontSize: 10}}>
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
    </View>
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
    backgroundColor: '#ebebeb',
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
    top: verticalScale(16),
    right: horizontalScale(16),
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
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
  },
  singleIconContainer: {
    marginVertical: verticalScale(15),
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
});

export default VideoPreviewScreen;
