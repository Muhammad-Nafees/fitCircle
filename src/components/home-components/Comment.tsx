import React from 'react';
import {View, StyleSheet} from 'react-native';

import {IComment} from '../../interfaces/user.interface';
import CommentItem from './CommentItem';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';

interface Props {
  allComments: any;
  commentsCount: number | any;
  onReply: (id: string) => void;
  onLoadComments: () => void;
  isLoadMore?: boolean;
}

const Comment = ({
  allComments,
  commentsCount,
  onReply,
  onLoadComments,
  isLoadMore,
}: Props) => {
  // const totalCommentsLength = allComments.length;

  const nestedCommentsLength = allComments.reduce(
    (count: number, comment: IComment) => {
      return count + (comment.replies ? comment.replies.length : 0);
    },
    0,
  );

  const totalLength = commentsCount + nestedCommentsLength;
  console.log(totalLength, 'allcommm');

  return (
    <View style={styles.container}>
      {!isLoadMore && commentsCount > 2 && (
        <TouchableOpacity onPress={onLoadComments}>
          <Text
            style={{
              color: 'rgba(40, 88, 144, 1)',
              fontWeight: '500',
              fontSize: 12,
            }}>
            {' '}
            View {commentsCount - 2} more comments
          </Text>
        </TouchableOpacity>
      )}
      {allComments?.map((comment: IComment, index: number) => (
        <View key={comment._id + index} style={{marginTop: 8}}>
          <CommentItem comment={comment} index={index} onReply={onReply} />
          {comment?.replies?.length > 0 &&
            comment?.replies?.map((reply: any, index: number) => (
              <CommentItem
                comment={reply}
                index={index}
                onReply={onReply}
                parentComment={comment?._id}
                isNested={true}
              />
            ))}
        </View>
      ))}
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
    backgroundColor: '#ffffff',
    gap: 10,
  },
});
