import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView, // Import ScrollView
} from 'react-native';
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
import {FileData, IUser} from '../../interfaces/user.interface';
import {IMessage} from 'interfaces/chat.interface';
import CustomSupportChat from '../../components/settings-components/CustomSupportChat';

const SupportChat = ({route}: any) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const user = useSelector((state: RootState) => state.auth.user);
  const [mediaUri, setMediaUri] = useState<FileData | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (route?.params?.messages) {
      setMessages(route?.params?.messages);
    }
  }, []);

  const chatId = route?.params?.chatId;
  const admin = route?.params?.admin;

  const handleChatMessages = (data: any) => {
    console.log('CHAT MESSAGES');
    console.log(data?.messages);
    const sortedMessages = data?.messages?.sort((a: IMessage, b: IMessage) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
    setMessages(sortedMessages);
  };

  useEffect(() => {
    const handleMessage = (data: any) => {
      if (admin?._id !== data?.sentBy) {
        return;
      }
      if (admin?._id === data?.sentBy) {
        setMessages(prev => [...prev, data]);
      }
    };
    socket.on(`createSupportMessage/${chatId}/${admin?._id}`, handleMessage);
    return () => {
      socket.off(`createSupportMessage/${chatId}/${admin?._id}`, handleMessage);
    };
  }, []);

  useEffect(() => {
    console.log('SUPPORT CHAT MESSAGESS!!!');
    getSupportChatMessages(userId as string, chatId);
    socket.on(`getChatSupportMessages/${userId}`, handleChatMessages);
    return () => {
      socket.off(`getChatSupportMessages/${userId}`, handleChatMessages);
    };
  }, [chatId, userId]);


  const handleCaptureButtonPress = async () => {
    setMediaUri(null);
    await openCamera({
      width: 10000,
      height: 10000,
      cropping: false,
    })
      .then(image => {
        if (image.path) {
          console.log(image, 'imfff');
          setMediaUri({
            uri: image?.path,
            type: image?.mime,
            name: 'image',
          });
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
    console.log(userId, chatId, mediaUri, name, 'MESSAGE BODY');
    sendMessageToSupport(userId as string, chatId, messageInput, name);

    const newMessage: Partial<IMessage> = {
      createdAt: new Date(),
      _id: user?._id as string,
      body: messageInput,
      mediaUrls: [mediaUri],
    };
    let newMessageArr = [...messages, newMessage];
    setMessages(newMessageArr as any);
    setMessageInput('');
    setMediaUri(null)
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView style={{flexGrow: 1}}>
          <View style={{paddingHorizontal: 16}}>
            <Text style={styles.heading}>Support</Text>
            {messages?.map((message: IMessage) => {
              return (
                <CustomSupportChat
                  key={message._id}
                  message={message}
                  admin={admin}
                  user={user as IUser}
                />
              );
            })}
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
