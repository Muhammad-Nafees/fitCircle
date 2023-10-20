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
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [noComments, setNoComments] = useState<boolean>(true);

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
      setPage(1);
    }, [comments]),
  );

  useFocusEffect(
    useCallback(() => {
      const getComments = async () => {
        setLoading(true);
        try {
          const response = await getAllCommentsByPosts(
            selectedPost._id as string,
            limit,
            page,
          );
          const data = response?.data?.data;
          setTimeout(() => {
            if (data?.comments?.length === 0) {
              setNoComments(true);
            } else {
              setNoComments(false);
            }
          }, 2000);

          const sortedData = data?.comments.sort((sortA: any, sortB: any) => {
            const dateA: any = new Date(sortA.createdAt);
            const dateB: any = new Date(sortB.createdAt);
            return dateA - dateB;
          });

          if (comments && loadMore) {
            setComments((prevComments: any) => {
              return [...sortedData];
            });
          } else {
            setComments(sortedData);
          }
          dispatch(setCommentCount(sortedData?.length));
          console.log(sortedData.length);
          setCommentsCount(data?.pagination?.totalItems);
          setLoadMore(false);
          setHasMoreComments(data?.pagination?.hasNextPage);
        } catch (error: any) {
          console.log('errorfrom fetching comments', error?.response?.data);
        }
        setLoading(false);
      };
      getComments();
    }, [isLoading, page]),
  );

  const handleLoadMoreComments = () => {
    if (hasMoreComments) {
      setLoadMore(true);
      setPage(prevPage => prevPage + 1);
      setLimit(prevLimit => prevLimit + 10);
    }
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

  const handleImageOpen = (imageUri: any) => {
    console.log(mediaUri, 'media');
    setMedia(imageUri);
    setImageFullscreen(true);
  };

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
        media: mediaUri || compressedImage,
        ...(replyId !== '' && {parent: replyId}),
      };
      setIsLoading(true);
      const response = await addComment(reqData);
      const data = response?.data.data;
      console.log(data, 'response from add comment');
      // if (commentRef) {
      //   commentRef?.current.scrollToEnd({animated: true});
      // }
    } catch (error: any) {
      console.log(error?.response?.data, 'error from add comment');
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
  const handleBackPress = () => {
    navigation.goBack();
  };
  // const scrollViewRef = useRef<any>();

  // useFocusEffect(
  //   useCallback(() => {
  //     if (scrollViewRef.current) {
  //       scrollViewRef.current.scrollToEnd({animated: true});
  //     }
  //   }, [comments]),
  // );

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
              commentRef?.current.scrollToEnd({animated: true})
            }>
            {
              // isLoading ? (
              //   <CustomLoader isStyle={true} extraStyles={{marginTop: 80}} />
              // ) :
              comments && comments?.length > 0 ? (
                <Comment
                  allComments={comments}
                  commentsCount={commentsCount}
                  onLoadComments={handleLoadMoreComments}
                  hasMoreComments={hasMoreComments}
                  onReply={handleReply}
                />
              ) : (
                noComments && <NoComment />
              )
            }
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
