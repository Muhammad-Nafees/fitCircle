import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Text,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Modal from 'react-native-modal';
import { ImageZoom } from '@thaihuynhquang/react-native-image-zoom-next';
import { Image as ImageCompress } from 'react-native-compressor';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import CustomAttachmentDialog from '../../components/shared-components/CustomAttachmentDialog';
import { addComment, getAllCommentsByPosts } from '../../api/home-module';
import NoComment from './NoComment';
import Comment from '../../components/home-components/Comment';
import Toast from 'react-native-toast-message';
const SendIcon = require('../../../assets/icons/send.png');

const width = Dimensions.get('window').width;

const CommentsScreen = ({ route, navigation }) => {
  const selectedPost = useSelector(
    (state: RootState) => state.post.selectedPost
  );
  const profileScreen = route?.params?.profileScreen;
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentScreenActive, setCommentScreenActive] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const [media, setMedia] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [mediaUri, setMediaUri] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyId, setReplyId] = useState('');
  const inputRef = useRef();
  const userData = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [loadMore, setLoadMore] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isScrollToBottom, setIsScrollToBottom] = useState(false);
  const [noComments, setNoComments] = useState(false);

  const commentRef = useRef();

  const handlePhotoButtonPress = async () => {
    setMediaUri(null);
    const options = {
      mediaType: 'photo',
      quality: 0.8,
    };

    await launchImageLibrary(options, (response) => {
      if (response.assets) {
        console.log(response?.assets, 'assets');
        setMediaUri({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      const getComments = async () => {
        setIsCommentsLoading(true);
        try {
          const response = await getAllCommentsByPosts(
            selectedPost._id,
            limit,
            page
          );
          const data = response?.data?.data;
          const sortedComments = data?.comments?.sort(
            (sortA, sortB) => {
              const dateA = new Date(sortA.createdAt);
              const dateB = new Date(sortB.createdAt);
              return dateA - dateB;
            }
          );

          setComments(sortedComments);
          setAllComments(data?.pagination?.totalItems);
          setCommentsCount(data?.pagination?.totalItems);
        } catch (error) {
          console.log(
            'errorfrom fetching comments',
            error?.response?.data
          );
        };

        setIsCommentsLoading(false);
      };
      getComments();
    }, [limit, isLoading])
  );

  const handleLoadMoreComments = () => {
    setLoadMore(true);
    setLimit(20);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, comments]);

  const handleImageClose = () => {
    setImageFullscreen(false);
    setMedia(null);
  };

  const handleAddComment = async () => {
    if (commentText == '') {
      Toast.show({
        type: 'error',
        text1: `Add a comment message!`,
      });
      return;
    }

    try {
      let compressedImage = null;
      if (mediaUri) {
        const result = await ImageCompress.compress(
          mediaUri.uri,
          {
            quality: 0.8,
          }
        );

        compressedImage = {
          name: mediaUri?.name,
          type: mediaUri?.type,
          uri: result,
        };
      }

      let reqData = {};

      if (isReplying) {
        reqData = {
          parent: replyId,
          text: commentText,
          media: mediaUri,
        };
      } else {
        reqData = {
          post: selectedPost?._id,
          text: commentText,
          media: mediaUri,
        };
      }

      setIsLoading(true);
      const response = await addComment(reqData);
      const data = response?.data.data;
      if (isReplying) {
        setIsScrollToBottom(false);
      } else {
        setIsScrollToBottom(true);
      }

    } catch (error) {
      console.log(error, 'error from add comment');
    }
    setIsLoading(false);
    setMediaUri(null);
    setCommentText('');
    setIsReplying(false);
    setReplyId('');
  };



  const handleReply = (id) => {
    setReplyId(id);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsReplying(true);
  };


  return (
    <View
      style={{ flex: 1, justifyContent: 'space-between', position: 'relative' }}
    >
      <ScrollView
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        style={{ position: 'relative' }}
      >

        <View style={{ backgroundColor: '#353535' }}>
          {/* Assuming CustomPost is a valid component */}
          {/* Adjust props accordingly */}
          {/* {CustomPost({
            post: selectedPost,
            commentCount: commentsCount,
            isCommentsScreenActive: commentScreenActive,
            heightFull: !selectedPost?.media,
            isEditing: route?.params?.isEdit,
          })} */}
        </View>
        <View
          style={{
            height: verticalScale(350),
            width: '100%',
            backgroundColor: '#ffffff',
          }}
        >
          <ScrollView
            ref={commentRef}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            onContentSizeChange={() =>
              allComments &&
              allComments?.length > 0 &&
              isScrollToBottom &&
              commentRef?.current.scrollToEnd({ animated: true })
            }
          >

            {comments && comments?.length > 0 ? (
              <Comment
                isLoadMore={loadMore}
                allComments={comments}
                commentsCount={commentsCount}
                onLoadComments={handleLoadMoreComments}
                onReply={handleReply}
              />
            ) : isCommentsLoading ? (
              <CustomLoader extraStyles={{ marginTop: 30 }} />
            ) : (
              <NoComment />
            )}
          </ScrollView>
        </View>

        <Modal
          onBackButtonPress={() => setImageFullscreen(false)}
          isVisible={isImageFullscreen}
          backdropOpacity={1}
          onBackdropPress={() => setImageFullscreen(false)}
          style={styles.fullscreenContainer}
        >
          <TouchableOpacity
            onPress={handleImageClose}
            style={styles.fullscreenContainer}
          >
            <ImageZoom
              uri={media}
              minScale={1}
              maxScale={10}
              style={styles.imageZoom}
              isPinchEnabled={true}
            />
          </TouchableOpacity>
        </Modal>

        <View
          style={{ backgroundColor: 'black', position: 'absolute', bottom: 0 }}
        >
          {mediaUri && !isReplying && (
            <CustomAttachmentDialog
              message="Photo Attached"
              showCancel={true}
              onCancel={() => setMediaUri(null)}
            />
          )}
          {isReplying && (
            <CustomAttachmentDialog
              message="Replying"
              showCancel={true}
              onCancel={() => setIsReplying(false)}
            />
          )}

          {isReplying && mediaUri && (
            <CustomAttachmentDialog
              message="Photo Attached in Reply"
              showCancel={true}
              onCancel={() => {
                setIsReplying(false);
                setMediaUri(null);
              }}
            />
          )}

          <View style={styles.inputContainer}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#00abd2',
                width: '85%',
              }}
            >
              <TextInput
                style={styles.textInput}
                ref={inputRef}
                placeholder="Message"
                placeholderTextColor="#fff"
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
              />
              <TouchableOpacity
                style={styles.photoButton}
                onPress={handlePhotoButtonPress}
              >
                <CreatePostCommentSvgIcon />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleAddComment}
            >
              {isLoading ? (
                <CustomLoader />
              ) : (
                <Image
                  source={SendIcon}
                  style={{ width: 20, height: 20, tintColor: '#fff' }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
  photoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(13),
    opacity: 0.8,
  },
});

export default CommentsScreen;
