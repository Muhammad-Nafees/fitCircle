import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';

const CustomSupportChat = ({
  username,
  dateTime,
  messageId,
  message,
  imageUri,
}) => {
  return (
    <View style={{gap: 10, flex: 1, marginVertical: 10}}>
      <View style={{flexDirection: 'row', gap: 15}}>
        <CustomProfileAvatar username={username} size={52} />
        <View>
          <Text style={styles.dateTime}>{dateTime}</Text>
          <Text style={styles.messageId}>{messageId}</Text>
        </View>
      </View>
      {message && <Text style={styles.message}>{message}</Text>}
      {imageUri && (
        <Image
          source={{uri: imageUri}}
          style={{borderRadius: 10, height: 200, width: 200}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dateTime: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  messageId: {
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(36, 163, 204, 1)',
  },
  message: {
    fontWeight: '400',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 1)',
  },
});

export default CustomSupportChat;
