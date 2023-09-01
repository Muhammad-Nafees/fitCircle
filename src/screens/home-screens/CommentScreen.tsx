import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  BackHandler,
} from 'react-native';
import {Comment} from '../../components/home-components/Comment';
import {CustomPost} from '../../components/home-components/CustomPost';
import axiosInstance from '../../api/interceptor';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import Modal from 'react-native-modal';
import {ImageZoom} from '@thaihuynhquang/react-native-image-zoom-next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import CreatePostCommentSvgIcon from '../../../assets/icons/CreatePostIconComment';
import {launchImageLibrary} from 'react-native-image-picker';
const SendIcon = require('../../../assets/icons/send.png');
const CancelIcon = require('../../../assets/icons/cancel.png');

const width = Dimensions.get('window').width;

const CommentsScreen = ({route, navigation}: any) => {
  const selectedPost = useSelector(
    (state: RootState) => state.post.selectedPost,
  );
  console.log(selectedPost);
  const {userId} = route.params;
  const profileScreen = route?.params?.profileScreen;
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState('Loading');
  const [loading, setLoading] = useState(false);
  const [commentScreenActive, setCommentScreenActive] = useState(false);
  const [isImageFullscreen, setImageFullscreen] = useState(false);
  const [media, setMedia] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [mediaUri, setMediaUri] = useState(null);
  const [availableToComment, setAvailableToComment] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const handlePhotoButtonPress = () => {
    setMediaUri(null);
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.errorMessage && response.assets) {
        setMediaUri(response.assets[0].uri);
      }
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      setCommentsCount('Loading');
      setCommentScreenActive(true);
      setLoading(true);
      fetchComments();
    }, [selectedPost]),
  );

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => {
      backHandler.remove();
    };
  }, [comments]);

  const fetchComments = () => {
    axiosInstance
      .get(`posts/comments/${selectedPost._id}`)
      .then(res => {
        setComments(res.data);
        setCommentsCount(res.data.length);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error while fetching comments:', error);
        setLoading(false);
      });
  };

  const handleImageOpen = (imageUri: any) => {
    setMedia(imageUri);
    setImageFullscreen(true);
  };

  const handleCommentPostPress = (commentText: string, mediaUri: any) => {
    console.log(commentText);
    if (!commentText.trim()) {
      return;
    }

    const formData = new FormData();
    formData.append('text', commentText);
    if (mediaUri) {
      const mediaFile = {
        uri: mediaUri,
        type: 'image/jpeg',
        name: 'comment_media.jpg',
      };
      formData.append('commentMedia', mediaFile);
    }

    const apiEndpoint = `posts/comments/${selectedPost._id}`;
    axiosInstance
      .patch(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Comment Posted successfully!');
        setCommentsCount(commentsCount + 1);
        fetchComments();
      })
      .catch(error => {
        console.error('Error while commenting on the post:', error);
      });
  };

  const handleReplyPostPress = (
    commentText: string,
    mediaUri: any,
    commentId: any,
  ) => {
    setIsReplying(false);
    if (!commentText.trim()) {
      return;
    }
    console.log('Reply', commentId);
    const formData = new FormData();
    formData.append('text', commentText);
    if (mediaUri) {
      const mediaFile = {
        uri: mediaUri,
        type: 'image/jpeg',
        name: 'comment_media.jpg',
      };
      formData.append('commentMedia', mediaFile);
    }
    const apiEndpoint = `/posts/${selectedPost._id}/comments/${commentId}/replies`;
    axiosInstance
      .post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log('Comment Posted successfully!');
        fetchComments();
      })
      .catch(error => {
        console.error('Error while commenting on the post:', error);
      });
  };

  const handleImageClose = () => {
    setImageFullscreen(false);
    setMedia(null);
  };

  const handleBackPress = async () => {
    setCommentScreenActive(false);
    await setComments([]);
    if (profileScreen) {
      navigation.navigate('Profile');
    } else {
      navigation.goBack();
    }
    return true;
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      {selectedPost !== null && (
        <View style={{backgroundColor: '#353535', zIndex: -1}}>
          <CustomPost
            post={selectedPost}
            countComment={commentsCount}
            userId={userId}
            isCommentsScreenActive={commentScreenActive}
            handleBackPress={handleBackPress}
          />
        </View>
      )}
      <KeyboardAwareScrollView>
        <ScrollView>
          {loading ? (
            <View>
              <CustomLoader />
            </View>
          ) : (
            <View
              style={{
                height: '100%',
                width: '100%',
              }}>
              <Comment
                available={availableToComment}
                setAvailable={setAvailableToComment}
                commentTxt={commentText}
                media={mediaUri}
                comments={comments}
                setmedia={setMediaUri}
                setcomment={setCommentText}
                handleCommentPostSubmit={handleCommentPostPress}
                handleBackPress={handleBackPress}
                handleReplyPostPress={handleReplyPostPress}
                handleImageOpen={handleImageOpen}
                setIsReplying={setIsReplying}
                isReplying={isReplying}
              />
              <View style={{height: 120}} />
            </View>
          )}
        </ScrollView>
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
      </KeyboardAwareScrollView>
      <View style={{backgroundColor: 'black', position: 'absolute', bottom: 0}}>
        {mediaUri && !isReplying && (
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
        {isReplying && !mediaUri && (
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
                <Text style={{color: '#fff', marginRight: 20}}>Replying</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsReplying(false)}
                style={{marginRight: 8}}>
                <Image
                  source={CancelIcon}
                  style={{tintColor: '#fff', width: 18, height: 18}}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {isReplying && mediaUri && (
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
                  Photo Attached in Reply
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setIsReplying(false);
                  setMediaUri(null);
                }}
                style={{marginRight: 8}}>
                <Image
                  source={CancelIcon}
                  style={{tintColor: '#fff', width: 18, height: 18}}
                />
              </TouchableOpacity>
            </View>
          </View>
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
            onPress={() => setAvailableToComment(prevState => !prevState)}>
            <Image
              source={SendIcon}
              style={{width: 20, height: 20, tintColor: '#fff'}}
            />
          </TouchableOpacity>
        </View>
      </View>
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
});

export default CommentsScreen;
