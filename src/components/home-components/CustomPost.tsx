import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Modal from 'react-native-modal';
const Heart = require('../../../assets/icons/heart.png');
const Like = require('../../../assets/icons/like.png');
const LikeFilled = require('../../../assets/icons/likeFilled.png');
const Share = require('../../../assets/icons/share.png');
const CommentIcon = require('../../../assets/icons/comment.png');
const OptionIcon = require('../../../assets/icons/customPostOption.png');
import CustomButton from '../shared-components/CustomButton';
import axiosInstance from '../../api/interceptor';
import {Comment} from './Comment';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const width = Dimensions.get('window').width;
interface CustomPostProps {
  userId: string;
  post: {
    _id: string;
    media?: string;
    content?: string;
    likes: any[];
    comments: any[];
    shares: any[];
    createdAt: string;
    hexCode: any;
    cost: number | null;
    user: {
      profileImageUrl?: string;
      username: string;
      email?: string;
    };
  };
}

export const CustomPost = ({post, userId}: CustomPostProps) => {
  const {_id, media, content, likes, createdAt, user, hexCode, cost} = post;
  const {profileImageUrl, username, email} = user;
  const [isCommentModalVisible, setCommentModalVisible] = useState(false);
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [likesCount, setLikesCount] = useState(likes.length);
  const [shareText, setShareText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const isContentLocked = cost && cost > 0;
  const handleCommentPress = () => {
    setCommentModalVisible(!isCommentModalVisible);
  };
  useEffect(() => {
    const isCurrentUserLiked = likes.some(like => like.user._id === userId);
    setIsLiked(isCurrentUserLiked);
  }, [likes, userId]);
  useEffect(() => {
    handleCommentsRetrieve();
  }, []);

  const getTimeDifference = () => {
    const postTime = new Date(createdAt).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - postTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    if (months > 0) {
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else if (weeks > 0) {
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    }
  };

  const handleLikeButtonPress = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    const apiEndpoint = `posts/likes/${_id}`;
    axiosInstance
      .patch(apiEndpoint)
      .then(response => {
        console.log('Post liked successfully!');
      })
      .catch(error => {
        console.error('Error while liking the post:', error);
        setIsLiked(!isLiked);
      });
  };

  const handleShareModal = () => {
    setShareModalVisible(!isShareModalVisible);
  };

  const handleShareButtonPress = (text: string | null = null) => {
    setShareModalVisible(false);
    const apiEndpoint = `posts/shares/${_id}`;
    const shareData = text ? {text} : null;
    axiosInstance
      .patch(apiEndpoint, shareData)
      .then(response => {
        console.log('Post shared successfully!');
      })
      .catch(error => {
        console.error('Error while sharing the post:', error);
      });
  };

  const handleCommentsRetrieve = () => {
    axiosInstance
      .get(`posts/comments/${_id}`)
      .then(res => {
        setCommentsData(res.data);
      })
      .catch(error => {
        console.error('Error while fetching comments:', error);
      });
  };

  const handleCommentPostPress = (commentText: any) => {
    const apiEndpoint = `posts/comments/${_id}`;
    axiosInstance
      .patch(apiEndpoint, {text: commentText})
      .then(response => {
        console.log('Comment Posted successfully!');
        handleCommentsRetrieve();
      })
      .catch(error => {
        console.error('Error while commenting on the post:', error);
      });
  };
  return (
    <View>
      <View
        style={[styles.postContainer, isContentLocked ? {zIndex: 1000} : null]}>
        {profileImageUrl ? (
          <Avatar.Image
            size={40}
            source={{uri: profileImageUrl}}
            style={styles.avatarImage}
          />
        ) : (
          <Avatar.Text
            size={40}
            label={username ? username[0].toUpperCase() : 'SA'}
            style={styles.avatarText}
          />
        )}
        <View style={styles.postParentContainer}>
          <View style={styles.postTextContainer}>
            <Text style={styles.postName}>{username}</Text>
            <View style={styles.postDetails}>
              <Text style={styles.postId}>{email}</Text>
              <Text style={styles.postTime}>{getTimeDifference()}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={OptionIcon}
              style={{width: 24, height: 35, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isContentLocked && (
        <View style={styles.contentOverlay}>
          <Text style={styles.lockedText}>Content Locked</Text>
        </View>
      )}
      {content && (
        <View style={[styles.content, {backgroundColor: `${hexCode}`}]}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
      {media && <Image style={styles.image} source={{uri: media}} />}
      <View
        style={[styles.postButtons, isContentLocked ? {zIndex: 9999} : null]}>
        <View style={styles.postButtonsContainer}>
          <View style={styles.likesContainer}>
            <Image style={styles.heartIcon} source={Heart} />
            <Text style={styles.likesCount}>{`${likesCount} likes`}</Text>
          </View>
          <Text
            style={styles.buttonText}>{`${commentsData.length} comments`}</Text>
        </View>
        <View style={styles.mediaButtons}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLikeButtonPress}>
            <Image
              style={styles.heartIcon}
              source={isLiked ? LikeFilled : Like}
            />
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCommentPress}>
            <Image style={styles.postIcon} source={CommentIcon} />
            <Text style={styles.buttonText}>Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleShareModal}>
            <Image style={styles.postIcon} source={Share} />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isCommentModalVisible && (
        <Modal
          isVisible={true}
          backdropOpacity={0.3}
          style={styles.modalContainer}>
          <View style={styles.commentModal}>
            <Comment
              handleCommentPostSubmit={handleCommentPostPress}
              comments={commentsData}
              commentText={commentText}
              setCommentText={setCommentText}
              handleCommentPress={handleCommentPress}
            />
          </View>
        </Modal>
      )}
      {isShareModalVisible && (
        <Modal
          isVisible={true}
          backdropOpacity={0.3}
          style={styles.modalContainer}>
          <View style={styles.shareModal}>
            <View style={styles.shareContainer}>
              <TextInput
                placeholder="Type here..."
                multiline={true}
                style={styles.shareInput}
                textAlignVertical="top"
                value={shareText}
                onChangeText={setShareText}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  extraStyles={{marginVertical: 15}}
                  onPress={() => handleShareButtonPress(shareText)}>
                  Share Now
                </CustomButton>
                <CustomButton
                  extraStyles={{backgroundColor: 'red'}}
                  onPress={() => setShareModalVisible(false)}>
                  Cancel
                </CustomButton>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - horizontalScale(65),
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 16,
  },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1111,
  },
  lockedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  postTextContainer: {
    marginLeft: horizontalScale(10),
  },
  postDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postId: {
    marginRight: horizontalScale(10),
    color: '#007797',
    fontSize: 12,
  },
  postName: {
    color: '#fff',
    fontSize: 14,
  },
  postTime: {
    color: '#666667',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(16),
  },
  image: {
    width: horizontalScale(380),
    height: verticalScale(300),
    alignSelf: 'center',
  },
  postButtons: {
    backgroundColor: '#E1E1E1',
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
  },
  postButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(15),
  },
  buttonText: {
    fontSize: 10,
    color: '#444444',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: horizontalScale(18),
    height: verticalScale(18),
    marginRight: horizontalScale(5),
  },
  likesCount: {
    fontSize: 12,
    color: '#444444',
  },
  button: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postIcon: {
    width: horizontalScale(13),
    height: verticalScale(12),
    marginHorizontal: 5,
  },
  content: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(10),
    borderRadius: 10,
  },
  contentText: {
    color: '#fff',
  },
  avatarImage: {
    backgroundColor: 'transparent',
  },
  avatarText: {
    backgroundColor: '#ebebeb',
  },
  commentModal: {
    backgroundColor: '#292a2c',
    borderRadius: 20,
    height: '100%',
  },
  modalContainer: {
    margin: 0,
  },
  shareModal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#292a2c',
    borderRadius: 20,
    height: '40%',
  },
  shareContainer: {
    marginHorizontal: horizontalScale(30),
  },
  shareInput: {
    backgroundColor: '#fff',
    marginVertical: verticalScale(15),
    height: verticalScale(140),
  },
  buttonContainer: {
    marginHorizontal: horizontalScale(20),
  },
});
