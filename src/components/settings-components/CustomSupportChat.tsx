import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {FileData, IUser} from 'interfaces/user.interface';
import {IMessage, IParticipant} from 'interfaces/chat.interface';
import {s3bucketReference} from '../../api';
import {getTimeAndDate} from '../../utils/helper';

interface Props {
  message: IMessage;
  admin: IParticipant;
  user: IUser;
  ticketId?: string;
}

const CustomSupportChat = ({message, admin, user,ticketId}: Props) => {
  const isMessageByAdmin = message?.senderId === admin?._id;
  const {formattedTime, formattedDate} = getTimeAndDate(message?.createdAt);
  return (
    <View
      style={{
        gap: 10,
        flex: 1,
        marginVertical: 10,
      }}>
      <View>
        <View style={{flexDirection: 'row', gap: 15}}>
          <CustomProfileAvatar
            profileImage={
              isMessageByAdmin ? admin?.profileImage : user?.profileImage
            }
            username={isMessageByAdmin ? admin?.firstName : user?.username}
            size={52}
          />
          <View>
            <Text style={styles.dateTime}>
              {formattedDate} | {formattedTime}
            </Text>
            <Text style={styles.messageId}>{ticketId}</Text>
          </View>
        </View>
        <Text style={styles.message}>{message?.body}</Text>
        {message?.mediaUrls &&
          message?.mediaUrls?.map((media: FileData) => (
            <Image
              key={media?.uri}
              source={{
                uri: media?.uri ? media?.uri : `${s3bucketReference}/${media}`,
              }}
              style={{borderRadius: 10, height: 200, width: 200}}
            />
          ))}
      </View>
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
