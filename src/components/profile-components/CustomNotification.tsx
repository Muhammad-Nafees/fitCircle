import CustomButton from '../shared-components/CustomButton';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

interface NotificationProps {
  username: string;
  dateTime: string;
  requestText: string;
  responseTime: string;
  handleConfirmPress?: any;
  handleDeclinePress?: any;
}

const CustomNotification = ({
  username,
  dateTime,
  requestText,
  responseTime,
  handleDeclinePress,
  handleConfirmPress,
}: NotificationProps) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
        <CustomProfileAvatar username={username} size={50} />
        <View style={{flex: 1, gap: 5}}>
          <View style={styles.avatarTimeContainer}>
            <Text style={[styles.text, {fontSize: 11}]}>{username}</Text>
            <Text style={[styles.dateTimeText]}>{dateTime}</Text>
          </View>
          <View>
            <Text style={[styles.text, {color: 'rgba(255, 255, 255, 0.5)'}]}>
              {requestText}
            </Text>
            <Text style={styles.text}>{responseTime}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          extraStyles={styles.declineButton}
          onPress={handleDeclinePress}>
          Decline
        </CustomButton>
        <CustomButton
          extraStyles={{paddingHorizontal: 16, height: 25}}
          onPress={handleConfirmPress}>
          Confirm
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: 'rgba(19, 114, 140, 0.5)',
    borderRadius: 10,
    marginVertical: 5,
  },
  text: {
    fontWeight: '400',
    fontSize: 10,
    color: 'white',
  },
  dateTimeText: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'right',
    bottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  declineButton: {
    backgroundColor: 'rgba(222, 49, 49, 1)',
    paddingHorizontal: 16,
    height: 25,
  },
  avatarTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomNotification;
