import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';

const CustomSupportChat = ({username, dateTime, messageId, message}) => {
  return (
    <View style={{gap: 10, flex: 1, marginVertical: 10}}>
      <View style={{flexDirection: 'row', gap: 15}}>
        <CustomProfileAvatar username={username} size={52} />
        <View>
          <Text style={styles.dateTime}>{dateTime}</Text>
          <Text style={styles.messageId}>{messageId}</Text>
        </View>
      </View>
      <Text style={styles.message}>{message}</Text>
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
