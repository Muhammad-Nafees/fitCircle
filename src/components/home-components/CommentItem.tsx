import {IComment} from '../../interfaces/user.interface';
import CustomProfileAvatar from '../../components/shared-components/CustomProfileAvatar';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {verticalScale} from '../../utils/metrics';
import {s3bucketReference} from '../../api';

interface Props {
  comment: IComment;
  index: number;
  isNested?: boolean;
  onReply: (id: string) => void;
}

const CommentItem = ({comment, onReply, isNested}: Props) => {
  const timeDifference = (createdAt: string) => {
    const commentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - commentDate.getTime()) / 1000,
    );

    if (differenceInSeconds <= 0) {
      return `Just now`;
    } else if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  return (
    <View
      key={comment?._id + 1}
      style={{
        flexDirection: 'row',
        gap: 7,
        marginLeft: isNested ? 50 : undefined,
        marginTop: isNested ? 10 : undefined,
      }}>
      <CustomProfileAvatar
        profileImage={comment?.user.profileImage as any}
        username={comment?.user.firstName.charAt(0) as string}
      />
      <View style={{gap: 4}}>
        <View style={[styles.commentContainer, {width: isNested ? 210 : 260}]}>
          <Text
            style={{
              color: 'rgba(9, 17, 14, 1)',
              fontSize: 12,
              fontWeight: '600',
            }}>
            {comment?.user?.firstName} {comment?.user?.lastName}
          </Text>
          <Text style={{color: 'rgba(68, 68, 68, 1)'}}>{comment?.text}</Text>
          {comment?.media?.length > 0 && (
            <TouchableOpacity>
              <Image
                source={{uri: `${s3bucketReference}/${comment.media}`}}
                style={styles.commentMediaImage}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
          <Text style={styles.replyText}>
            {timeDifference(comment.createdAt)}
          </Text>

          <TouchableOpacity onPress={() => onReply(comment?._id)}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: 'rgba(68, 68, 68, 0.2)',
    borderRadius: 5,
    padding: 8,
    gap: 5,
  },
  replyText: {
    fontWeight: '500',
    color: '#939393',
    fontSize: 10,
  },
  commentMediaImage: {
    width: 100,
    height: 100,
    marginTop: verticalScale(8),
    borderRadius: 8,
  },
});
