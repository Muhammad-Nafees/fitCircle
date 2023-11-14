import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView, // Import ScrollView
} from 'react-native';
import CustomSupportChat from '../../components/settings-components/CustomSupportChat';
import CameraSupportChatIcon from '../../../assets/icons/CameraSupportChatIcon';
import SendSupportIcon from '../../../assets/icons/SendSupportIcon';
import ImageLibraryIcon from '../../../assets/icons/ImageLibraryIconSupport';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {openCamera} from 'react-native-image-crop-picker';
import {
  getSupportChatMessages,
  sendMessageToSupport,
  socket,
} from '../../socket';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {FileData} from '../../interfaces/user.interface';

const SupportChat = ({route}: any) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const user = useSelector((state: RootState) => state.auth.user);

  const chatId = route?.params?.chatId;
  const [mediaUri, setMediaUri] = useState<FileData | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const message = route.params?.message;
  const imageUri = route?.params?.imageUri;
  console.log(chatId);

  useEffect(() => {
    getSupportChatMessages(userId as string, chatId);
    socket.on(`getChatSupportMessages/${userId}`, data => {
      console.log('CHAT MESSAGES');
      console.log(data);
    });
    return () => {
      socket.off(`getChatSupportMessages/${userId}`);
    };
  }, [chatId]);

  useEffect(() => {
    if (message || imageUri) {
      const newMessage = {
        username: 'Sameer',
        dateTime: '02/10/2023 | 6:00 AM',
        messageId: 'KGNV83JNFG8',
        message: message,
        imageUri: imageUri,
      };
      setMessages([newMessage]);
    }
  }, [message, imageUri]);

  const handleCaptureButtonPress = async () => {
    setMediaUri(null);
    await openCamera({
      width: 10000,
      height: 10000,
      cropping: false,
    })
      .then(image => {
        if (image.path) {
          setMediaUri(image.path);
        }
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  useEffect(() => {
    if (mediaUri) {
      console.log(mediaUri);
      handleSend();
    }
  }, [mediaUri]);

  const handlePhotoButtonPress = () => {
    setMediaUri(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri({
          uri: response.assets[0].uri as string,
          name: response.assets[0].fileName as any,
          type: response.assets[0].type as any,
        });
      }
    });
  };


  const handleSend = () => {
    const name = `${user?.firstName} ${user?.lastName}`;
    sendMessageToSupport(userId as string, chatId, messageInput, name);
    // if (mediaUri) {
    //   const newMessage = {
    //     username: 'Sameer',
    //     dateTime: '02/10/2023 | 6:00 AM',
    //     messageId: 'KGNV83JNFG8',
    //     message: '',
    //     imageUri: mediaUri,
    //   };

    //   setMessages([...messages, newMessage]);
    //   setMediaUri(null); // Clear the mediaUri
    // } else if (messageInput) {
    //   const newMessage = {
    //     username: 'Sameer',
    //     dateTime: '02/10/2023 | 6:00 AM',
    //     messageId: 'KGNV83JNFG8',
    //     message: messageInput,
    //     imageUri: null,
    //   };

    //   setMessages([...messages, newMessage]);
    //   setMessageInput(''); // Clear the message input
    // }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{paddingHorizontal: 16}}>
            <Text style={styles.heading}>Support</Text>
            {messages.map((message, index) => (
              <CustomSupportChat
                key={index}
                username={message.username}
                dateTime={message.dateTime}
                messageId={message.messageId}
                message={message.message}
                imageUri={message.imageUri}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.messageInputContainer}>
        <TouchableOpacity onPress={handlePhotoButtonPress}>
          <ImageLibraryIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCaptureButtonPress}>
          <CameraSupportChatIcon />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Send Message"
          placeholderTextColor={'rgba(153, 153, 153, 1)'}
          value={messageInput}
          onChangeText={text => setMessageInput(text)}
        />
        <TouchableOpacity onPress={handleSend}>
          <SendSupportIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#292A2C',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 20,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: 10,
    borderTopWidth: 1,
    paddingHorizontal: 16,
    borderColor: 'rgba(237, 237, 237, 1)',
  },
  icon: {
    margin: 5,
  },
  input: {
    flex: 1,
    height: 35,
    borderWidth: 1,
    backgroundColor: 'rgba(244, 244, 244, 1)',
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default SupportChat;
