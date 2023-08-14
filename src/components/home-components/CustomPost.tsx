import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Modal from 'react-native-modal';
import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
const Heart = require('../../../assets/icons/heart.png');
const Like = require('../../../assets/icons/like.png');
const LikeFilled = require('../../../assets/icons/likeFilled.png');
const Share = require('../../../assets/icons/share.png');
const CommentIcon = require('../../../assets/icons/comment.png');
const OptionIcon = require('../../../assets/icons/customPostOption.png');
const LockOpenIcon = require('../../../assets/icons/lock-open.png');
import {BackHandler} from 'react-native';
import CustomButton from '../shared-components/CustomButton';
import axiosInstance from '../../api/interceptor';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import Toast from 'react-native-toast-message';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Dot = require('../../../assets/icons/dot.png');

const width = Dimensions.get('window').width;
interface CustomPostProps {
  countComment?: any;
  isCommentsScreenActive?: boolean;
  handleCommentButtonPress?: (post: any, userId: string) => void;
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

export const CustomPost = ({
  post,
  userId,
  countComment,
  isCommentsScreenActive,
  handleCommentButtonPress,
}: CustomPostProps) => {
  const {_id, media, content, likes, createdAt, user, hexCode, cost} = post;
  const {profileImageUrl, username} = user;
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsCount, setCommentsCount] = useState<number>(countComment);
  const [shareText, setShareText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const dropdownOptions =
    userId === post.user._id ? ['Edit', 'Delete'] : ['Flag'];
  const isLocked = cost && cost > 0;

  useEffect(() => {
    const isCurrentUserLiked = likes.some(like => like.user._id === userId);
    setIsLiked(isCurrentUserLiked);
  }, [likes, userId]);

  useEffect(() => {
    setCommentsCount(countComment);
  }, [countComment]);

  const handleCommentPress = () => {
    handleCommentButtonPress(post, userId);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setImageFullscreen(false);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [isImageFullscreen]),
  );

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

  const handleOptionSelect = (option: string) => {
    setDropdownVisible(false);
    if (userId === post.user._id) {
      if (option === 'Edit') {
      } else if (option === 'Delete') {
      }
    } else if (option === 'Flag') {
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
        Toast.show({
          type: 'success',
          text1: 'Post Shared Successfully!',
          visibilityTime: 2000,
        });
      })
      .catch(error => {
        console.error('Error while sharing the post:', error);
        Toast.show({
          type: 'error',
          text1: 'Error Sharing Post!',
          visibilityTime: 2000,
        });
      });
  };

  const handleImagePress = () => {
    setImageFullscreen(true);
  };

  const handleImageClose = () => {
    setImageFullscreen(false);
  };

  return (
    <View>
      <View style={[styles.postContainer, isLocked ? {zIndex: 1000} : null]}>
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
              <Text style={styles.postId}>
                {`@${username?.toLowerCase()?.replace(/\s/g, '')}`}
              </Text>
              <Image
                source={Dot}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: '#666667',
                  marginLeft: -10,
                }}
              />
              <Text style={styles.postTime}>{getTimeDifference()}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => setDropdownVisible(!isDropdownVisible)}>
            <Image
              source={OptionIcon}
              style={{width: 24, height: 35, tintColor: '#fff'}}
            />
          </TouchableOpacity>
          {isDropdownVisible && (
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(false)}>
              {dropdownOptions.map((option, index) => (
                <React.Fragment key={index}>
                  <View
                    style={styles.dropdownOption}
                    onPress={() => handleOptionSelect(option)}>
                    <Text
                      style={{
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: 10,
                        paddingVertical: 2,
                        zIndex: 66666,
                      }}>
                      {option}
                    </Text>
                  </View>
                  {index === 0 && dropdownOptions[index + 1] === 'Delete' && (
                    <View style={styles.horizontalLine} />
                  )}
                </React.Fragment>
              ))}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isLocked ? (
        <View style={styles.lockedOverlay}>
          <View style={styles.lockedContainer}>
            <Text style={styles.lockedText}>{content}</Text>
            <TouchableOpacity style={styles.lockedButtonContainer}>
              <Text style={{color: '#fff'}}>
                Unlock this video for{' '}
                <Text
                  style={{color: '#30D298', fontWeight: '600', fontSize: 16}}>
                  ${cost}
                </Text>
              </Text>
              <View style={styles.lockedIconContainer}>
                <Image source={LockOpenIcon} style={styles.lockIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {content && (
        <View style={[styles.content, {backgroundColor: `${hexCode}`}]}>
          <Text style={styles.contentText}>{content}</Text>
        </View>
      )}
      {media && (
        <TouchableOpacity onPress={handleImagePress}>
          <Image style={styles.image} source={{uri: media}} />
        </TouchableOpacity>
      )}
      <View style={[styles.postButtons, isLocked ? {zIndex: 9999} : null]}>
        <View style={styles.postButtonsContainer}>
          <View style={styles.likesContainer}>
            <Image style={styles.heartIcon} source={Heart} />
            <Text style={styles.likesCount}>{`${likesCount} ${
              likesCount === 1 ? 'like' : 'likes'
            }`}</Text>
          </View>
          <Text style={styles.buttonText}>{`${commentsCount} ${
            commentsCount === 1 ? 'comment' : 'comments'
          }`}</Text>
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
            <Image
              style={[
                styles.postIcon,
                isCommentsScreenActive === true ? {tintColor: '#209BCC'} : null,
              ]}
              source={CommentIcon}
            />
            <Text
              style={[
                styles.buttonText,
                isCommentsScreenActive ? {color: '#209BCC'} : {},
              ]}>
              Comment
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleShareModal}>
            <Image style={styles.postIcon} source={Share} />
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
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
                  extraStyles={{marginVertical: verticalScale(15)}}
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
      <Modal
        isVisible={isImageFullscreen}
        backdropOpacity={1}
        onBackdropPress={() => setImageFullscreen(false)}
        style={styles.fullscreenContainer}>
        <TouchableOpacity
          onPress={handleImageClose}
          style={styles.fullscreenContainer}>
          <ImageZoom
            uri={media}
            minScale={1}
            maxScale={10}
            style={styles.imageZoom}
            isPinchEnabled={true}
          />
        </TouchableOpacity>
      </Modal>
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
    fontSize: 12,
    color: '#666667',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(16),
  },
  image: {
    width: horizontalScale(370),
    height: verticalScale(250),
    alignSelf: 'center',
    zIndex: -1,
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
    zIndex: -1,
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
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
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
    paddingHorizontal: 10,
    height: verticalScale(140),
    borderRadius: 16,
    color: 'black',
  },
  buttonContainer: {
    marginHorizontal: horizontalScale(20),
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  lockedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    marginRight: horizontalScale(30),
  },
  lockedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  lockIcon: {
    width: 18,
    height: 18,
    tintColor: '#fff',
  },
  lockedButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#209BCC',
    borderRadius: 40,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(16),
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lockedIconContainer: {
    backgroundColor: '#43c1df',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginLeft: 12,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdown: {
    backgroundColor: '#444545',
    position: 'absolute',
    justifyContent: 'center',
    right: 10,
    width: width / 3.4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 30,
  },
  dropdownOption: {
    color: '#fff',
  },
  horizontalLine: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    paddingTop: verticalScale(5),
    marginBottom: verticalScale(5),
  },
  fullscreenContainer: {
    justifyContent: 'center',
    width: width,
    height: 400,
    alignItems: 'center',
    backgroundColor: 'black',
    margin: 0,
    padding: 0,
  },
  imageZoom: {
    width: width,
    height: 300,
  },
});
