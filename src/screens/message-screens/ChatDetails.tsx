import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import ChatCallIcon from '../../../assets/icons/ChatCall';
import {Userpic} from 'react-native-userpic';
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';
import Modal from 'react-native-modal';
const CancelIcon = require('../../../assets/icons/cancel.png');
import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {UserMessage} from '../../components/message-components/UserMessage';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
const Option = require('../../../assets/icons/customPostOption.png');
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
const SendIcon = require('../../../assets/icons/send.png');

const width = Dimensions.get('window').width;
export const ChatDetails = ({navigation, route}: any) => {
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

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <TouchableOpacity
            style={styles.arrowBack}
            onPress={() => navigation.goBack()}>
            <Image
              source={ArrowBack}
              style={{width: 24, height: 24, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <View style={styles.userDetailStatus}>
            <Userpic
              name={route.params.username[0]}
              size={40}
              color="#5e01a9"
              badge={true}
              badgeColor="green"
              badgeProps={{position: 'bottom-right'}}
              textStyle={{fontSize: 19, fontWeight: '400'}}
            />
            <View>
              <Text style={styles.name}>{route.params.username}</Text>
              <Text style={styles.status}>Online</Text>
            </View>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VoiceCall', {
                username: route.params.username,
              })
            }>
            <ChatCallIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('VideoCall', {
                username: route.params.username,
              })
            }>
            <VideoSvgIcon color={'white'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Option} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
        <FlatList
          data={userMessages}
          keyExtractor={item => item.id.toString()}
          inverted
          renderItem={({item}) => (
            <UserMessage
              text={item.text}
              timestamp={item.timestamp}
              mediaUri={item.mediaUri}
              handleMessageImagePress={handleMessageImagePress}
            />
          )}
        />
      </View>
      {mediaUri && (
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
                Photo Attached
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setMediaUri(null)}
              style={{marginRight: 8}}>
              <Image
                source={CancelIcon}
                style={{tintColor: '#fff', width: 18, height: 18}}
              />
            </TouchableOpacity>
          </View>
        </View>
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
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: horizontalScale(13),
              opacity: 0.8,
            }}
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
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#209BCC',
    paddingBottom: verticalScale(10),
    zIndex: 10,
  },
  arrowBack: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(12),
    bottom: 9,
  },
  icon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: moderateScale(15),
    alignItems: 'center',
    marginRight: horizontalScale(7),
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  status: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
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
  userDetailStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    top: 10,
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
});
