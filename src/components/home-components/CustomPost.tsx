import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import Modal from 'react-native-modal';
const Heart = require('../../../assets/icons/heart.png');
import LikeIcon from '../../../assets/icons/like';
const LikeFilled = require('../../../assets/icons/likeFilled.png');
const Share = require('../../../assets/icons/share.png');
const CommentIcon = require('../../../assets/icons/comment.png');
const OptionIcon = require('../../../assets/icons/customPostOption.png');
const LockOpenIcon = require('../../../assets/icons/lock-open.png');
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
import {setSelectedPost} from '../../redux/postSlice';
import ImagePreview from './ImagePreview';
import {timeDifference} from '../../utils/helper';

const Dot = require('../../../assets/icons/dot.png');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
interface CustomPostProps {
  isCommentsScreenActive?: boolean;
  handleCommentButtonPress?: (post: any, id: string) => void;
  handleBackPress?: () => void;
  isPersonalProfile?: boolean;
  post?: any;
  heightFull?: boolean;
  commentCount?: any;
  onEditDeletePost?: (type: string, postId: string) => void;
}

export const CustomPost = ({
  post,
  isPersonalProfile,
  heightFull,
  isCommentsScreenActive,
  handleBackPress,
  handleCommentButtonPress,
  commentCount,
  onEditDeletePost,
}: CustomPostProps) => {
  const [isShareModalVisible, setShareModalVisible] = useState(false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length);
  const [commentsCount, setCommentsCount] = useState<number | null>(0);
  const [shareText, setShareText] = useState('');
  const [isLiked, setIsLiked] = useState(post?.likedByMe);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const navigation = useNavigation();

  const isLocked = post?.cost && post?.cost > 0;
  useFocusEffect(
    useCallback(() => {
      if (post && commentCount) {
        setCommentsCount(commentCount);
      }
      if (post && !commentCount) {
        setCommentsCount(post?.comments?.length);
      }
    }, [post, commentCount]),
  );

  const handleCommentPress = (postData: any, id: string) => {
    if (handleCommentButtonPress) {
      handleCommentButtonPress(postData, id);
    }
  };

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
  let isGradient =
    (post?.hexCode && post.hexCode?.length === 2) || post.hexCode?.length === 3;

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownOptions = ['Edit', 'Delete'];

  const handleOptionSelect = (option: string, id: string) => {
    setDropdownVisible(false);
    if (onEditDeletePost) {
      onEditDeletePost(option, id);
    }
  };
  const route = useRoute();
  const [showFullContent, setShowFullContent] = useState(false);
  const thresholdLines = post?.media
    ? 7
    : route.name == 'CommentsScreen'
    ? 12
    : 15; // Set your threshold here

  const contentToShow = post?.text
    ? showFullContent
      ? post.text
      : post.text.split('\n').slice(0, thresholdLines).join('\n')
    : '';

  const newlineCount = post?.text?.split('\n');

  const toggleShowMore = () => {
    setShowFullContent(!showFullContent);
  };

  return (
    <View>
      <View style={[styles.postContainer]}>
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
              <Text style={styles.postTime}>
                {timeDifference(post?.createdAt)}
              </Text>
            </View>
          </View>
        </View>
        {isPersonalProfile && (
          <TouchableOpacity
            onPress={() => setDropdownVisible(!isDropdownVisible)}>
            <Image
              source={OptionIcon}
              style={{
                width: 24,
                height: 30,
                tintColor: '#fff',
                position: 'absolute',
                right: 5,
                top: -20,
                zIndex: 999,
              }}
            />
          </TouchableOpacity>
        )}
        {isDropdownVisible && (
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(false)}>
            {dropdownOptions.map((option, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity
                  onPress={() => handleOptionSelect(option, post?._id)}>
                  <Text
                    style={{
                      color: '#fff',
                      textAlign: 'center',
                      fontSize: 10,
                      paddingVertical: 2,
                      position: 'relative',
                      zIndex: 999,
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
                {index === 0 && dropdownOptions[index + 1] === 'Delete' && (
                  <View style={styles.horizontalLine} />
                )}
              </React.Fragment>
            ))}
          </TouchableOpacity>
        )}
      </View>
      {isLocked ? (
        <View style={[styles.lockedOverlay]}>
          <View style={[styles.lockedContainer]}>
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
      {isGradient ? (
        <LinearGradient
          colors={post?.hexCode}
          style={[
            styles.content,
            {height: heightFull ? verticalScale(290) : undefined},
          ]}>
          <ScrollView scrollEnabled={true} nestedScrollEnabled={true}>
            <Text style={styles.contentText}>{contentToShow}</Text>
            {newlineCount?.length > 10 ? (
              <TouchableOpacity onPress={toggleShowMore}>
                <Text style={{color: 'blue'}}>
                  {/* See More */}
                  {showFullContent ? 'See Less' : 'See More'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        </LinearGradient>
      ) : (
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={true}
          style={[
            {
              position: 'relative',
              zIndex: -1,
              borderRadius: 10,
              marginBottom: 10,
              backgroundColor:
                post?.hexCode !== undefined ||
                post?.hexCode !== null ||
                post?.hexCode?.length === 1
                  ? `${post?.hexCode}`
                  : undefined,
              height: heightFull
                ? verticalScale(290)
                : post.cost !== null
                ? verticalScale(100)
                : // : !post?.media
                  // ? verticalScale(200)
                  undefined,
            },
          ]}>
          <View style={styles.content}>
            {post?.title && (
              <Text
                style={[
                  styles.contentText,
                  {fontWeight: '600', fontSize: 16, paddingBottom: 20},
                ]}>
                {post?.title}
              </Text>
            )}
            <Text style={styles.contentText}>{contentToShow}</Text>
            {newlineCount?.length > 10 ? (
              <TouchableOpacity onPress={toggleShowMore}>
                <Text style={{color: 'blue'}}>
                  {showFullContent ? 'See Less' : 'See More'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      )}

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
            <TouchableOpacity>
              <Image
                source={OptionIcon}
                style={{width: 24, height: 35, tintColor: '#fff'}}
              />
            </TouchableOpacity>
          </ScrollView>
        </Modal>
      )}

      <ImagePreview
        handleImageClose={handleImageClose}
        media={post?.media}
        isImageFullscreen={isImageFullscreen}
        width={width}
        setImageFullscreen={setImageFullscreen}
      />
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
    position: 'relative',
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
    zIndex: -2,
    position: 'relative',
    marginBottom: 10,
    overflow: 'scroll',
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
    // zIndex: 999,
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
    zIndex: 999,
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
  horizontalLine: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    paddingTop: verticalScale(5),
    marginBottom: verticalScale(5),
    position: 'relative',
    zIndex: 999,
  },
});
