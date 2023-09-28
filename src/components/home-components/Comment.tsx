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
}

const Comment = ({
  allComments,
  commentsCount,
  hasMoreComments,
  onReply,
  onLoadComments,
}: Props) => {
  console.log(allComments,"allcmnts!!!!!s")
  return (
    <View style={styles.container}>
      {/* {hasMoreComments && commentsCount > 3 && (
        <TouchableOpacity onPress={onLoadComments}>
          <Text
            style={{
              color: 'rgba(40, 88, 144, 1)',
              fontWeight: '500',
              fontSize: 11,
            }}>
            {' '}
            View previous comments
          </Text>
        </TouchableOpacity>
      )} */}
      {allComments?.map((comment: any, index: number) => (
        <View key={comment._id + index} style={{marginTop: 20}}>
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
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    gap: 10,
  },
});
