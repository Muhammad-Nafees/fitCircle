import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
const CancelIcon = require('../../../assets/icons/cancel.png');

interface CommentProps {
  comments: Array<{
    user: {
      _id: string;
      username?: string;
    };
    text: string;
    _id: string;
  }>;
  commentText: string;
  setCommentText: (commentText: string) => void;
  handleCommentPostSubmit: (commentText: string) => void;
  handleCommentPress: () => void;
}

export const Comment = ({
  comments,
  handleCommentPostSubmit,
  commentText,
  setCommentText,
  handleCommentPress,
}: CommentProps) => {
  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      handleCommentPostSubmit(commentText);
      setCommentText('');
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cancelIconContainer}
        onPress={handleCommentPress}>
        <Image source={CancelIcon} style={styles.cancelIcon} />
      </TouchableOpacity>
      <View style={styles.commentsContainer}>
        {comments.map(comment => (
          <View key={comment._id} style={styles.commentContainer}>
            {comment.user.username ? (
              <Text style={styles.commentName}>{comment.user.username}</Text>
            ) : null}
            <Text style={styles.commentText}>{comment.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type your comment..."
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <TouchableOpacity
          style={styles.commentButton}
          onPress={handleCommentSubmit}>
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  commentsContainer: {
    flex: 1,
  },
  commentText: {
    color: '#fff',
  },
  commentContainer: {
    marginHorizontal: horizontalScale(20),
    backgroundColor: '#333534',
    marginVertical: verticalScale(10),
    borderRadius: 10,
    padding: moderateScale(10),
  },
  commentName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: horizontalScale(20),
    marginBottom: verticalScale(20),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: moderateScale(8),
  },
  commentButton: {
    marginLeft: horizontalScale(10),
    backgroundColor: '#019acd',
    borderRadius: 10,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  commentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
  },
  cancelIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: '#fff',
  },
});

export default Comment;
