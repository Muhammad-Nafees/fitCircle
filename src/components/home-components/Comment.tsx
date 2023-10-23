import React from 'react';
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {IComment} from '../../interfaces/user.interface';
import CommentItem from './CommentItem';

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
  const totalCommentsLength = allComments.length;

  const nestedCommentsLength = allComments.reduce(
    (count: number, comment: IComment) => {
      return (
        count + (comment.nestedComments ? comment.nestedComments.length : 0)
      );
    },
    0,
  );

  const totalLength = totalCommentsLength + nestedCommentsLength;

  return (
    <View style={styles.container}>
      {!isLoadMore && totalLength !== commentsCount && commentsCount > 2 && (
        <TouchableOpacity onPress={onLoadComments}>
          <Text
            style={{
              color: 'rgba(40, 88, 144, 1)',
              fontWeight: '500',
              fontSize: 12,
            }}>
            {' '}
            View {commentsCount - totalLength} more comments
          </Text>
        </TouchableOpacity>
      )}
      {allComments?.map((parentComment: any, index: number) => (
        <View key={parentComment._id + index} style={{marginTop: 8}}>
          <CommentItem
            comment={parentComment}
            index={index}
            onReply={onReply}
          />

          {parentComment?.nestedComments?.length > 0 &&
            parentComment?.nestedComments?.map(
              (comment: any, index: number) => (
                <CommentItem
                  comment={comment}
                  index={index}
                  onReply={onReply}
                  parentComment={parentComment}
                  isNested={true}
                />
              ),
            )}
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
