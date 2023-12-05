import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
const CancelIcon = require('../../../assets/icons/cancel.png');
import CustomButton from '../../components/shared-components/CustomButton';
import CameraSupportIcon from '../../../assets/icons/CameraSupportIcon';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {
  createChatSupport,
  sendMediaToSupport,
  sendMessageToSupport,
  socket,
} from '../../socket';
import Toast from 'react-native-toast-message';
import {FileData} from '../../interfaces/user.interface';
import CustomLoader from '../../components/shared-components/CustomLoader';

const SupportMessage = ({navigation}: any) => {
  const [mediaUri, setMediaUri] = useState<FileData | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const user = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handlePhotoButtonPress = () => {
    setMediaUri(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri({
          uri: response.assets[0].uri as string,
          name: response.assets[0].fileName as any,
          type: response.assets[0].type as any,
        });
      }
    });
  };

  const handleCancelPress = () => {
    setMediaUri(null);
  };
  const handleCreateChatSupport = async (data: any) => {
    const name = `${user?.firstName} ${user?.lastName}`;
    console.log(data, 'creting chat for support!');
    if (data?.data) {
      setIsLoading(true);

      if (mediaUri && messageInput) {
        try {
          const response = await sendMediaToSupport(
            user?._id as string,
            data?.data?._id,
            mediaUri,
            messageInput,
          );
        } catch (error) {
          console.log(error, 'From send media to support');
        }
      } else {
        sendMessageToSupport(
          user?._id as string,
          data?.data?._id,
          messageInput,
          name,
        );
      }
      setIsLoading(false);
      setTimeout(() => {
        navigation.navigate('SupportChat', {
          chatId: data?.data?._id,
          ticketId: data?.data?.chat_Id,
        });
      }, 3000);
    } else {
      Toast.show({
        type: 'error',
        text1: `You already have an open ticket!`,
      });
    }
  };

  const handleMessageSend = async () => {
    if (messageInput === '') {
      Toast.show({
        type: 'error',
        text1: 'Add a message to continue!',
      });
      return;
    }
    createChatSupport(user?._id as string);
    socket.on(`createChatForSupport/${user?._id}`, handleCreateChatSupport);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Message</Text>
        <View style={styles.textInputContainer}>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 14,
              color: 'white',
              marginBottom: 10,
            }}>
            Your Message
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Type here"
            placeholderTextColor="rgba(155, 155, 155, 1)"
            multiline
            value={messageInput}
            onChangeText={text => setMessageInput(text)}
          />
          {mediaUri !== null ? (
            <View style={{marginVertical: 30}}>
              <Image
                source={{uri: mediaUri.uri}}
                style={{borderRadius: 10, height: 300, width: '100%'}}
              />
              <TouchableOpacity
                style={styles.cancelIcon}
                onPress={handleCancelPress}>
                <Image
                  source={CancelIcon}
                  style={{width: 20, height: 20, tintColor: 'white'}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.attachmentContainer}>
              <TouchableOpacity
                style={{marginVertical: 10}}
                onPress={handlePhotoButtonPress}>
                <CameraSupportIcon />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  color: 'rgba(188, 188, 188, 1)',
                }}>
                Attach Image or Proof
              </Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          paddingTop: verticalScale(110),
          paddingBottom: verticalScale(30),
          marginHorizontal: horizontalScale(24),
        }}>
        <CustomButton
          isDisabled={
            messageInput !== '' || isLoading || mediaUri !== null ? false : true
          }
          onPress={handleMessageSend}>
          {isLoading ? <CustomLoader /> : 'Send New Message'}
        </CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: 16,
  },
  content: {
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  textInputContainer: {
    marginVertical: 24,
  },
  textInput: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    height: 283,
    borderRadius: 20,
    textAlignVertical: 'top',
    paddingHorizontal: 18,
    color: 'white',
  },
  attachmentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  cancelIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

export default SupportMessage;
