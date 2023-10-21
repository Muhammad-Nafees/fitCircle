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
  hasMoreComments: boolean;
  onReply: (id: string) => void;
  onLoadComments: () => void;
  isLoadMore?: boolean;
}

const Comment = ({
  allComments,
  commentsCount,
  hasMoreComments,
  onReply,
  onLoadComments,
  isLoadMore,
}: Props) => {
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
      {allComments?.map((comment: any, index: number) => (
        <View key={comment._id + index} style={{marginTop: 8}}>
          <CommentItem comment={comment} index={index} onReply={onReply} />

          {comment?.nestedComments?.length > 0 &&
            comment?.nestedComments?.map((comment: any, index: number) => (
              <CommentItem
                comment={comment}
                index={index}
                onReply={onReply}
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
