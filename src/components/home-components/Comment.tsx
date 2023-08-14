import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {Avatar} from 'react-native-paper';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
const CancelIcon = require('../../../assets/icons/cancel.png');
const SendIcon = require('../../../assets/icons/send.png');
import CreatePostSvgIcon from '../../../assets/icons/CreatePostIcon';
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';

import Entypo from 'react-native-vector-icons/Entypo'

interface CommentProps {
  comments: CommentItem[];
  commentText: string;
  setCommentText: (commentText: string) => void;
  handleCommentPostSubmit: (commentText: string) => void;
  handleReplyPress: (commentId: string, parentCommentId?: string) => void;
  handleBackPress: () => void;
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
}

const CommentItem = ({
  comment,
  handleReplyPress,
  showReplyButton,
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
        {comment.user?.profileImageUrl ? (
          <Avatar.Image
            source={{uri: comment.user.profileImageUrl}}
            size={40}
          />
        ) : (
          <Avatar.Text
            label={comment.user?.username?.charAt(0)?.toUpperCase() || ''}
            size={40}
          />
        )}
      </View>
      <View style={styles.commentsContainer}>
        <View style={styles.commentContainer}>
          <Text style={styles.commentName}>{comment.user.username}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
          {comment.commentMedia && (
            <Image
              source={{uri: comment.commentMedia}}
              style={styles.commentMediaImage}
            />
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
}: CommentProps) => {
  const [mediaUri, setMediaUri] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null,
  );
  const [commentText, setCommentText] = useState('');

  const handleReplyButtonPress = (commentId: string) => {
    setReplyingCommentId(commentId);
    setIsReplying(true);
  };

  const handlePhotoButtonPress = () => {
    setMediaUri(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri(response.assets[0].uri);
      }
    });
  };
  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      if (isReplying) {
        handleReplyPostPress(commentText, mediaUri, replyingCommentId);
      } else {
        handleCommentPostSubmit(commentText, mediaUri);
      }
      setIsReplying(false);
      setReplyingCommentId(null);
      setMediaUri(null);
      setCommentText('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cancelIconContainer}
        onPress={handleBackPress}>
        <Image source={CancelIcon} style={styles.cancelIcon} />
      </TouchableOpacity>

      {
        !comments.length ? (
          <View style={{  alignItems: "center", marginTop: 40}}>
            <Entypo name='chat' color={"#898c93"} size={150} />

            <Text style={{ fontSize: 14, color: "#898c93", fontWeight: "500", marginTop: 10}}>No comments yet</Text>
            <Text style={{ fontSize: 14, color: "#898c93"}}>Be the first to comment.</Text>

          </View>
        ) : null
      }
      <ScrollView>
        {comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            handleReplyPress={handleReplyButtonPress}
            showReplyButton={true}
          />
        ))}
      </ScrollView>
      {mediaUri && (
        <View
          style={{
            backgroundColor: '#00abd2',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              padding: 10,
            }}>
            <View>
              <Text style={{color: '#fff', marginRight: 20}}>
                Photo Attached
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setMediaUri(null)}
              style={{marginRight: 8}}>
              <Image
                source={CancelIcon}
                style={{tintColor: '#fff', width: 18, height: 18}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <KeyboardAvoidingView>
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#00abd2',
              width: '85%',
            }}>
            <TextInput
              style={styles.textInput}
              placeholder="Message"
              placeholderTextColor="#fff"
              value={commentText}
              onChangeText={text => setCommentText(text)}
            />
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: horizontalScale(13),
                opacity: 0.8,
              }}
              onPress={handlePhotoButtonPress}>
              <CreatePostCommentSvgIcon />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => handleCommentSubmit()}>
            <Image
              source={SendIcon}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
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
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: "red",
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
    // position: "absolute",
    // bottom: 0,
    // left: 0
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
});
