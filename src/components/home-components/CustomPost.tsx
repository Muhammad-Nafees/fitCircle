import React, {useCallback, useEffect, useState} from 'react';
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
import LikeIcon from '../../../assets/icons/like';
const LikeFilled = require('../../../assets/icons/likeFilled.png');
const Share = require('../../../assets/icons/share.png');
const CommentIcon = require('../../../assets/icons/comment.png');
const OptionIcon = require('../../../assets/icons/customPostOption.png');
const LockOpenIcon = require('../../../assets/icons/lock-open.png');
import {BackHandler} from 'react-native';
import CustomButton from '../shared-components/CustomButton';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import Toast from 'react-native-toast-message';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {s3bucketReference} from '../../api';
import {likePost, sharePost} from '../../api/home-module';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {cleanSingle} from 'react-native-image-crop-picker';
import {setSelectedPost} from '../../redux/postSlice';

const Dot = require('../../../assets/icons/dot.png');

const width = Dimensions.get('window').width;
interface CustomPostProps {
  isCommentsScreenActive?: boolean;
  handleCommentButtonPress?: (post: any, id: string) => void;
  handleBackPress?: () => void;
  isLoading?: boolean;
  // userId: string;
  post: any;
  heightFull?: boolean;
  commentCount?: any;
}

export const CustomPost = ({
  post,
  isLoading,
  heightFull,
  isCommentsScreenActive,
  handleBackPress,
  handleCommentButtonPress,
  commentCount,
}: CustomPostProps) => {
  // const { likes, createdAt, user, hexCode, cost} = post;
  let isGradient = post?.hexCode && post?.hexCode.includes(',');

  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length);
  const [likes,setLikes] = useState<number | null>(null);
  const [commentsCount, setCommentsCount] = useState<number | null>(0);
  const [shareText, setShareText] = useState('');
  const [isLiked, setIsLiked] = useState(post?.likedByMe);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const dropdownOptions =
    post?.user?._id === post?.user?._id ? ['Edit', 'Delete'] : ['Flag'];
  const isLocked = post?.cost && post?.cost > 0;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const isCurrentUserLiked = likes.some(like => like.user._id === userId);
  //   setIsLiked(isCurrentUserLiked);
  // }, [likes, userId]);

  useFocusEffect(
    useCallback(() => {
      if (post && commentCount) {
        setCommentsCount(commentCount);
      }
      if (post && !commentCount) {
        setCommentsCount(post.comments.length);
      }
    }, [post, commentCount]),
  );

  const handleCommentPress = (postData: any, id: string) => {
    if (handleCommentButtonPress) {
      handleCommentButtonPress(postData, id);
    }
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
    const postTime = new Date(post?.createdAt).getTime();
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
    if (user === post.user._id) {
      if (option === 'Edit') {
      } else if (option === 'Delete') {
      }
    } else if (option === 'Flag') {
    }
  };

  // useFocusEffect(useCallback(() => {
  //   console.log(selectedP)
  // }, [isLiked]));

  const handleLikeButtonPress = async () => {
    setIsLiked(!isLiked);
    try {
      const response = await likePost(post._id);
      const data = response?.data.data;
      // setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      setLikesCount(data.likes.length);
      setSelectedPost(data);
      // setLikes(data?.likes);
    } catch (error: any) {
      console.log(error?.response, 'error from likepost!');
    }
  };

  const handleShareModal = () => {
    setShareModalVisible(!isShareModalVisible);
  };

  const handleShareButtonPress = async (text: string | null = null) => {
    try {
      const response = await sharePost(post._id);
      console.log(response?.data?.message);
      console.log(response?.data);
      setShareModalVisible(false);
      Toast.show({
        type: 'success',
        text1: `${response?.data?.message}`,
      });
    } catch (error: any) {
      console.log(error?.response, 'from sharing post');
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
    }
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
        <CustomProfileAvatar
          profileImage={post?.user?.profileImage as any}
          username={post?.user?.username}
        />
        <View style={styles.postParentContainer}>
          <View style={styles.postTextContainer}>
            <Text style={styles.postName}>{post?.user?.username}</Text>
            <View style={styles.postDetails}>
              <Text style={styles.postId}>
                {`@${post?.user?.username?.toLowerCase()?.replace(/\s/g, '')}`}
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
                <React.Fragment key={option}>
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
            <Text style={styles.lockedText}>{post?.text}</Text>
            <TouchableOpacity style={styles.lockedButtonContainer}>
              <Text style={{color: '#fff'}}>
                Unlock this post for{' '}
                <Text
                  style={{color: '#30D298', fontWeight: '600', fontSize: 16}}>
                  ${post?.cost}
                </Text>
              </Text>
              <View style={styles.lockedIconContainer}>
                <Image source={LockOpenIcon} style={styles.lockIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      {post?.text &&
        (!isGradient ? (
          <View
            style={[
              styles.content,
              {
                backgroundColor: `${post?.hexCode}`,
                height: heightFull ? verticalScale(290) : undefined,
              },
            ]}>
            {post?.title && (
              <Text
                style={[
                  styles.contentText,
                  {fontWeight: '600', fontSize: 16, paddingBottom: 20},
                ]}>
                {post?.title}
              </Text>
            )}
            <Text style={styles.contentText}>{post?.text}</Text>
          </View>
        ) : (
          <LinearGradient
            colors={post?.hexCode.split(',')}
            style={styles.content}>
            <Text style={styles.contentText}>{post?.text}</Text>
          </LinearGradient>
        ))}
      {post?.media && (
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            style={styles.image}
            source={{uri: `${s3bucketReference}/${post.media}`}}
          />
        </TouchableOpacity>
      )}
      <View style={[styles.postButtons, isLocked ? {zIndex: 9999} : null]}>
        <View style={styles.postButtonsContainer}>
          <View style={styles.likesContainer}>
            <Image
              style={[styles.heartIcon, {marginRight: horizontalScale(5)}]}
              source={Heart}
            />
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
            {isLiked ? (
              <Image style={styles.heartIcon} source={LikeFilled} />
            ) : (
              <LikeIcon />
            )}
            <Text style={styles.buttonText}>Like</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              isCommentsScreenActive
                ? handleBackPress()
                : handleCommentPress(post, post._id);
            }}>
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
          onBackButtonPress={() => setShareModalVisible(false)}
          isVisible={true}
          backdropOpacity={0.3}
          style={styles.modalContainer}>
          <ScrollView style={styles.shareModal}>
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
            {/* <TouchableOpacity>
              <Image
                source={OptionIcon}
                style={{width: 24, height: 35, tintColor: '#fff'}}
              />
            </TouchableOpacity> */}
          </ScrollView>
        </Modal>
      )}
      <Modal
        onBackButtonPress={() => setImageFullscreen(false)}
        isVisible={isImageFullscreen}
        backdropOpacity={1}
        onBackdropPress={() => setImageFullscreen(false)}
        style={styles.fullscreenContainer}>
        <TouchableOpacity
          onPress={handleImageClose}
          style={styles.fullscreenContainer}>
          <ImageZoom
            uri={`${s3bucketReference}/${post?.media}`}
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
    width: horizontalScale(14),
    height: verticalScale(14),
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
    gap: 5,
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
    marginBottom: 10,
  },
  contentText: {
    color: '#fff',
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
