import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import {CustomPost} from '../../components/home-components/CustomPost';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Modal from 'react-native-modal';
import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
import {Image as ImageCompress} from 'react-native-compressor';
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
import {addComment, getAllCommentsByPosts} from '../../api/home-module';
import NoComment from './NoComment';
import {stat} from 'react-native-fs';
import Comment from '../../components/home-components/Comment';
import {FileData, IComment} from '../../interfaces/user.interface';
import {setCommentCount} from '../../redux/postSlice';
import Toast from 'react-native-toast-message';
const SendIcon = require('../../../assets/icons/send.png');

const width = Dimensions.get('window').width;

const CommentsScreen = ({route, navigation}: any) => {
  const selectedPost = useSelector(
    (state: RootState) => state.post.selectedPost,
  );
  const profileScreen = route?.params?.profileScreen;
  const [comments, setComments] = useState<IComment[]>();
  const [allComments, setAllComments] = useState<IComment[]>();

  const [commentsCount, setCommentsCount] = useState<null | number>(0);
  const [loading, setLoading] = useState(false);
  const [commentScreenActive, setCommentScreenActive] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const [media, setMedia] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [mediaUri, setMediaUri] = useState<FileData | null | any>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyId, setReplyId] = useState<string>('');
  const inputRef = useRef<any>();
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false);
  const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(false);

  const [noComments, setNoComments] = useState<boolean>(false);

  const commentRef = useRef();

  const handlePhotoButtonPress = async () => {
    setMediaUri(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
    };
    await launchImageLibrary(options, (response: any) => {
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
            selectedPost._id as string,
            limit,
            page,
          );
          const data = response?.data?.data;

          const sortedData = data?.sort((sortA: any, sortB: any) => {
            const dateA: any = new Date(sortA.createdAt);
            const dateB: any = new Date(sortB.createdAt);
            return dateA - dateB;
          });

          const organizedComments: any = [];

          sortedData?.forEach((comment, index) => {
            if (!comment.parent) {
              // This comment does not have a parent, add it to the organized list
              comment.nestedComments = [];
              organizedComments.push(comment);
            } else {
              const parentComment = organizedComments.find(
                c => c._id === comment.parent,
              );

              if (parentComment) {
                parentComment.nestedComments =
                  parentComment.nestedComments || [];
                parentComment.nestedComments.push(comment);
              }
            }
          });
          if (comments && loadMore) {
            setLoadMore(true);
            setComments(organizedComments);
          } else {
            setComments(organizedComments.slice(-2));
          }

          setAllComments(organizedComments);
          setCommentsCount(data?.length);
        } catch (error: any) {
          console.log('errorfrom fetching comments', error);
        }
        setIsCommentsLoading(false);
      };
      getComments();
    }, [isLoading]),
  );

  const handleLoadMoreComments = () => {
    setLoadMore(true);
    const sortedData = allComments?.sort((sortA: any, sortB: any) => {
      const dateA: any = new Date(sortA.createdAt);
      const dateB: any = new Date(sortB.createdAt);
      return dateA - dateB;
    });
    setComments(sortedData);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
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
        const result = await ImageCompress.compress(mediaUri.uri, {
          quality: 0.8,
        });
        compressedImage = {
          name: mediaUri?.name as string,
          type: mediaUri?.type as string,
          uri: result,
        };
      }
      const reqData: Partial<IComment> = {
        post: selectedPost?._id,
        text: commentText,
        media: mediaUri,
        ...(replyId !== '' && {parent: replyId}),
      };
      setIsLoading(true);
      console.log(reqData, 'REQDATA');
      const response = await addComment(reqData);
      const data = response?.data.data;
      console.log(data, 'response from add comment');
      if (isReplying) {
        setIsScrollToBottom(false);
      } else {
        setIsScrollToBottom(true);
      }
    } catch (error: any) {
      console.log(error, 'error from add comment');
    }
    setIsLoading(false);
    setMediaUri(null);
    setCommentText('');
    setIsReplying(false);
    setReplyId('');
  };

  const handleReply = (id: string) => {
    setReplyId(id);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsReplying(true);
  };

  return (
    <View
      style={{flex: 1, justifyContent: 'space-between', position: 'relative'}}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        nestedScrollEnabled={true}
        style={{position: 'relative'}}>
        <View style={{backgroundColor: '#353535'}}>
          <CustomPost
            post={selectedPost}
            commentCount={commentsCount}
            isCommentsScreenActive={commentScreenActive}
            // handleBackPress={handleBackPress}
            heightFull={!selectedPost?.media}
            isEditing={route?.params?.isEdit}
          />
        </View>
        <View
          style={{
            height: verticalScale(350),
            width: '100%',
            backgroundColor: '#ffffff',
          }}>
          <ScrollView
            ref={commentRef}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="always"
            onContentSizeChange={() =>
              allComments &&
              allComments?.length > 0 &&
              isScrollToBottom &&
              commentRef?.current.scrollToEnd({animated: true})
            }>
            {comments && comments?.length > 0 ? (
              <Comment
                isLoadMore={loadMore}
                allComments={comments}
                commentsCount={commentsCount}
                onLoadComments={handleLoadMoreComments}
                onReply={handleReply}
              />
            ) : isCommentsLoading ? (
              <CustomLoader extraStyles={{marginTop: 30}} />
            ) : (
              <NoComment />
            )}
            {/* {comments && comments.length > 0 ? (
              <View
                style={{
                  height: comments.length < 2 ? 120 : 70,
                  backgroundColor: '#ffffff',
                }}
              />
            ) : null} */}
          </ScrollView>
        </View>
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
              uri={media}
              minScale={1}
              maxScale={10}
              style={styles.imageZoom}
              isPinchEnabled={true}
            />
          </TouchableOpacity>
        </Modal>

        <View
          style={{backgroundColor: 'black', position: 'absolute', bottom: 0}}>
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
              }}>
              <TextInput
                style={styles.textInput}
                ref={inputRef}
                placeholder="Message"
                placeholderTextColor="#fff"
                value={commentText}
                onChangeText={text => setCommentText(text)}
              />
              <TouchableOpacity
                style={styles.photoButton}
                onPress={handlePhotoButtonPress}>
                <CreatePostCommentSvgIcon />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.commentButton}
              onPress={handleAddComment}>
              {isLoading ? (
                <CustomLoader />
              ) : (
                <Image
                  source={SendIcon}
                  style={{width: 20, height: 20, tintColor: '#fff'}}
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
  attachmentDialog: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 10,
  },
  photoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(13),
    opacity: 0.8,
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
});

export default CommentsScreen;
