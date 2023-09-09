import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import ChatCallIcon from '../../../assets/icons/ChatCall';
import {Avatar} from 'react-native-paper';
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';
const CancelIcon = require('../../../assets/icons/cancel.png');

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {UserMessage} from '../../components/message-components/UserMessage';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
const Option = require('../../../assets/icons/customPostOption.png');
import {launchImageLibrary} from 'react-native-image-picker';
const SendIcon = require('../../../assets/icons/send.png');

export const ChatDetails = ({navigation, route}: any) => {
  const [message, setMessage] = useState('');
  const [userMessages, setUserMessages] = useState<any>([]);
  const [mediaUri, setMediaUri] = useState(null);

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
        console.log(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#209BCC',
          paddingBottom: verticalScale(10),
          zIndex: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View style={styles.onlineIndicator}></View>
          <TouchableOpacity
            style={{paddingTop: 24, paddingBottom: 16, paddingHorizontal: 12}}
            onPress={() => navigation.goBack()}>
            <Image
              source={ArrowBack}
              style={{width: 24, height: 24, tintColor: 'white'}}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              top: 10,
            }}>
            <Avatar.Text
              size={40}
              label={route.params.username[0]}
              style={{backgroundColor: '#5e01a9'}}
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
      <ScrollView>
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
              />
            )}
          />
        </View>
      </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  icon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: moderateScale(10),
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
  onlineIndicator: {
    width: horizontalScale(10),
    height: verticalScale(10),
    backgroundColor: 'green',
    borderRadius: 5,
    position: 'absolute',
    bottom: 2,
    right: '48%',
    zIndex: 1000,
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
});
