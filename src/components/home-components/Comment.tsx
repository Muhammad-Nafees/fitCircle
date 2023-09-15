import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomProfileAvatar from 'components/shared-components/CustomProfileAvatar';
const CancelIcon = require('../../../assets/icons/cancel.png');

interface CommentProps {
  comments: CommentItem[];
  commentText: string;
  available: boolean;
  setAvailable: (value: boolean) => void;
  commentTxt: string;
  media: any;
  setmedia: any;
  setcomment: any;
  isReplying: any;
  setIsReplying: any;
  setCommentText: (commentText: string) => void;
  handleCommentPostSubmit: (commentText: string) => void;
  handleReplyPress: (commentId: string, parentCommentId?: string) => void;
  handleBackPress: () => void;
  handleImageOpen: (imageUrl: string) => void;
  handleReplyPostPress: (
    commentText: string,
    mediaUri: any,
    commentId: string,
  ) => void;
}

interface CommentItem {
  user: {
    _id: string;
    email?: string;
    profileImageUrl?: string;
    username?: string;
  };
  text: string;
  _id: string;
  commentMedia?: string | null;
  replies?: CommentItem[];
  createdAt: string;
  handleReplyPress: (commentId: string, parentCommentId?: string) => void;
  showReplyButton: boolean;
  isReplying: boolean;
  handleImageOpen: (imageUrl: string) => void;
}

const CommentItem = ({
  comment,
  handleReplyPress,
  showReplyButton,
  handleImageOpen,
}: {
  comment: CommentItem;
  handleReplyPress: any;
  showReplyButton: any;
}) => {
  const timeDifference = (createdAt: string) => {
    const commentDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - commentDate.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
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
    <View style={styles.rowContainer}>
      <View style={styles.profileImageContainer}>
        <CustomProfileAvatar
          profileImageUrl={comment.user?.profileImageUrl}
          username={comment.user?.username}
        />
      </View>
      <View style={styles.commentsContainer}>
        <View style={styles.commentContainer}>
          <Text style={styles.commentName}>{comment.user.username}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
          {comment.commentMedia && (
            <TouchableOpacity
              onPress={() => handleImageOpen(comment.commentMedia)}>
              <Image
                source={{uri: comment.commentMedia}}
                style={styles.commentMediaImage}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{flexDirection: 'row', gap: 15}}>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {timeDifference(comment.createdAt)}
            </Text>
          </View>
          {showReplyButton && (
            <TouchableOpacity onPress={() => handleReplyPress(comment._id)}>
              <Text style={styles.replyButton}>Reply</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.repliesContainer}>
          {comment.replies?.map(reply => (
            <CommentItem
              key={reply._id}
              comment={reply}
              handleReplyPress={handleReplyPress}
              showReplyButton={false}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export const Comment = ({
  comments,
  handleCommentPostSubmit,
  handleReplyPostPress,
  handleBackPress,
  handleImageOpen,
  available,
  setAvailable,
  commentTxt,
  media,
  setmedia,
  setcomment,
  isReplying,
  setIsReplying,
}: CommentProps) => {
  const [mediaUri, setMediaUri] = useState(null);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    if (available) {
      setAvailable(false);
      handleCommentSubmit(commentTxt, media);
    }
  }, [available]);

  const handleReplyButtonPress = (commentId: string) => {
    setReplyingCommentId(commentId);
    setIsReplying(true);
  };

  const handleCommentSubmit = (a: any, b: any) => {
    if (a.trim() !== '' && b?.trim() !== '') {
      if (isReplying) {
        handleReplyPostPress(a, b, replyingCommentId);
      } else {
        handleCommentPostSubmit(a, b);
      }
      setIsReplying(false);
      setReplyingCommentId(null);
      setmedia(null);
      setcomment('');
      setMediaUri(null);
      setCommentText('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.cancelIconContainer}
          onPress={handleBackPress}>
          <Image source={CancelIcon} style={styles.cancelIcon} />
        </TouchableOpacity>

        {!comments.length ? (
          <View style={{alignItems: 'center', marginTop: 40}}>
            <Entypo name="chat" color={'#898c93'} size={150} />
            <Text
              style={{
                fontSize: 14,
                color: '#898c93',
                fontWeight: '500',
                marginTop: 10,
              }}>
              No comments yet
            </Text>
            <Text style={{fontSize: 14, color: '#898c93'}}>
              Be the first to comment.
            </Text>
          </View>
        ) : null}
        <ScrollView style={styles.commentsAndInputContainer}>
          {comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              handleReplyPress={handleReplyButtonPress}
              showReplyButton={true}
              handleImageOpen={handleImageOpen}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: horizontalScale(10),
  },
  profileImageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  commentsAndInputContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  commentsAndInputContainer: {
    flex: 1,
  },
  commentsList: {
    paddingBottom: verticalScale(10),
  },
  commentsContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  commentText: {
    color: '#444444',
  },
  commentContainer: {
    marginHorizontal: horizontalScale(10),
    backgroundColor: '#c2c2c2',
    marginVertical: verticalScale(10),
    borderRadius: 10,
    padding: moderateScale(10),
    width: '85%',
  },
  commentName: {
    color: 'black',
    fontWeight: '600',
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#209BCC',
    padding: moderateScale(16),
    width: '100%',
  },
  textInput: {
    flex: 1,
    color: 'white',
    padding: moderateScale(8),
    backgroundColor: '#00abd2',
    position: 'relative',
  },
  commentButton: {
    marginLeft: horizontalScale(5),
    backgroundColor: '#019acd',
    borderRadius: 10,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
  },
  cancelIconContainer: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  cancelIcon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: '#000',
  },
  commentMediaImage: {
    width: 100,
    height: 100,
    marginTop: verticalScale(8),
    borderRadius: 8,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '35%',
    marginLeft: horizontalScale(20),
  },
  timeText: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'left',
  },
  replyButton: {
    fontSize: 10,
    fontWeight: '500',
    color: '#888888',
  },
  repliesContainer: {
    marginLeft: 0,
  },
  commentMediaImage: {
    width: 100,
    height: 100,
    marginTop: verticalScale(8),
    borderRadius: 8,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '25%',
    marginLeft: horizontalScale(20),
  },
  timeText: {
    color: '#888888',
    fontSize: 10,
    textAlign: 'left',
  },
  replyButton: {
    fontSize: 10,
    fontWeight: '500',
  },
  repliesContainer: {
    marginLeft: 0,
  },
});
