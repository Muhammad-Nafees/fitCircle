import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  BackHandler,
} from 'react-native';
import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
import Modal from 'react-native-modal';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
// --------------------------------------------------------------------------------------------//
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {UserMessage} from '../../components/message-components/UserMessage';
import CustomAttachmentDialog from '../../components/shared-components/CustomAttachmentDialog';
import {MessageHeaderContainer} from '../../components/message-components/HeaderContainer';
import {useFocusEffect} from '@react-navigation/native';
const SendIcon = require('../../../assets/icons/send.png');

const width = Dimensions.get('window').width;
export const ChatDetails = ({route, navigation}: any) => {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState<any>([]);
  const [mediaUri, setMediaUri] = useState(null);
  const [imageFullScreen, setImageFullScreen] = useState(false);
  const [messageMedia, setMessageMedia] = useState<any>(null);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: message,
        timestamp: new Date().toISOString(),
        isUser: true,
        mediaUri: mediaUri,
      };
      setUserMessages((prevMessages: any) => [newMessage, ...prevMessages]);
      setMessage('');
      setMediaUri(null);
    }
  };

  useFocusEffect(() => {
    const backAction = () => {
      navigation.navigate('MessagesOne');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  });

  const handleImageClose = () => {
    setImageFullScreen(false);
    setMessageMedia(null);
  };

  const handleMessageImagePress = (image: string) => {
    setMessageMedia(image);
    setImageFullScreen(true);
  };

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
        setMediaUri(response.assets[0].uri);
      }
    });
  };

  useEffect(() => {
    const staticMessages = [
      {
        id: 1,
        text: 'Please wait 24 hours until Jason accepts',
      },
      {
        id: 2,
        text: 'Requesting for a meal plan',
      },
    ];

    if (route.params.type === 'accepted') {
      staticMessages.unshift({
        id: 3,
        text: 'Jason accepted your request',
      });
    }
    setUserMessages(route.params.type ? staticMessages : []);
  }, [route.params.type]);

  return (
    <View style={styles.container}>
      <MessageHeaderContainer username={route.params.username} />
      <View style={styles.flatlistContainer}>
        <FlatList
          data={userMessages}
          keyExtractor={item => item.id.toString()}
          inverted
          renderItem={({item}) =>
            item.text === 'Please wait 24 hours until Jason accepts' ||
            item.text === 'Jason accepted your request' ? (
              <View style={styles.centeredMessageContainer}>
                <Text
                  style={
                    item.text === 'Please wait 24 hours until Jason accepts' &&
                    route.params.type === 'accepted'
                      ? styles.whiteText
                      : styles.blueText
                  }>
                  {item.text}
                </Text>
              </View>
            ) : item.text === 'Requesting for a meal plan' ? (
              <View style={styles.centeredMessageContainer}>
                <Text style={styles.grayText}>{item.text}</Text>
              </View>
            ) : (
              <View style={styles.userMessageContainer}>
                <UserMessage
                  text={item.text}
                  timestamp={item.timestamp}
                  mediaUri={item.mediaUri}
                  handleMessageImagePress={handleMessageImagePress}
                />
              </View>
            )
          }
        />
      </View>
      {mediaUri && (
        <CustomAttachmentDialog
          message="Photo Attached"
          showCancel={true}
          onCancel={() => setMediaUri(null)}
        />
      )}
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#00abd2',
            width: '85%',
          }}>
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            placeholderTextColor="#fff"
            value={message}
            onChangeText={text => setMessage(text)}
          />
          <TouchableOpacity
            style={styles.commentSvgIcon}
            onPress={handlePhotoButtonPress}>
            <CreatePostCommentSvgIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleSendMessage}>
          <Image
            source={SendIcon}
            style={{width: 20, height: 20, tintColor: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <Modal
        onBackButtonPress={() => setImageFullScreen(false)}
        isVisible={imageFullScreen}
        backdropOpacity={1}
        onBackdropPress={() => setImageFullScreen(false)}
        style={styles.fullscreenContainer}>
        <TouchableOpacity
          onPress={handleImageClose}
          style={styles.fullscreenContainer}>
          <ImageZoom
            uri={messageMedia}
            minScale={1}
            maxScale={10}
            style={styles.imageZoom}
            isPinchEnabled={true}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#209BCC',
    padding: moderateScale(16),
    width: '100%',
  },
  textInput: {
    flex: 1,
    color: 'white',
    padding: moderateScale(8),
    backgroundColor: '#00abd2',
    position: 'relative',
  },
  commentButton: {
    marginLeft: horizontalScale(5),
    backgroundColor: '#019acd',
    borderRadius: 10,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  fullscreenContainer: {
    justifyContent: 'center',
    width: width,
    height: verticalScale(500),
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
  imageZoom: {
    width: width,
    height: verticalScale(300),
  },
  flatlistContainer: {
    flex: 1,
  },
  commentSvgIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(13),
    opacity: 0.8,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  centeredMessageContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  grayText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontWeight: '400',
    fontSize: 12,
  },
  blueText: {
    color: 'rgba(32, 155, 204, 1)',
    fontWeight: '400',
    fontSize: 12,
  },
  whiteText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
});
