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

const SupportMessage = ({navigation}: any) => {
  const [mediaUri, setMediaUri] = useState(null);
  const [messageInput, setMessageInput] = useState('');

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

  const handleCancelPress = () => {
    setMediaUri(null);
  };

  const handleMessageSend = () => {
    const dataToSend = {
      message: messageInput,
      imageUri: mediaUri,
    };
    navigation.navigate('SupportChat', dataToSend);
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
                source={{uri: mediaUri}}
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
        <CustomButton onPress={handleMessageSend}>
          Send New Message
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
