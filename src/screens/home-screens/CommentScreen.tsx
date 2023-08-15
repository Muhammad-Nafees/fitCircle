import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, KeyboardAvoidingView} from 'react-native';
import {Comment} from '../../components/home-components/Comment';
import {CustomPost} from '../../components/home-components/CustomPost';
import axiosInstance from '../../api/interceptor';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const CommentsScreen = ({route, navigation}: any) => {
  const selectedPost = useSelector(
    (state: RootState) => state.post.selectedPost,
  );
  console.log(selectedPost);
  const {userId} = route.params;
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState('Loading');
  const [loading, setLoading] = useState(false);
  const [commentScreenActive, setCommentScreenActive] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setCommentsCount('Loading');
      setCommentScreenActive(true);
      setLoading(true);
      fetchComments();
    }, [selectedPost]),
  );

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

  const handleBackPress = async () => {
    setCommentScreenActive(false);
    await setComments([]);
    navigation.goBack();
  };

  return (
      <View style={{flex: 1, justifyContent: "space-between"}}>
        {selectedPost !== null && (
          <View style={{backgroundColor: '#353535', zIndex: 10}}>
            <CustomPost
              post={selectedPost}
              countComment={commentsCount}
              userId={userId}
              isCommentsScreenActive={commentScreenActive}
            />
          </View>
        )}
        {loading ? (
          <View style={{marginTop: '50%'}}>
            <CustomLoader />
          </View>
        ) : (
          <View
            style={{
              height: '100%',
              flex: 1,
              // backgroundColor: 'purple',
              // position: 'absolute',
              // bottom: 0,
            }}>
            <Comment
              comments={comments}
              handleCommentPostSubmit={handleCommentPostPress}
              handleBackPress={handleBackPress}
              handleReplyPostPress={handleReplyPostPress}
            />
          </View>
        )}
      </View>
  );
};

export default CommentsScreen;
