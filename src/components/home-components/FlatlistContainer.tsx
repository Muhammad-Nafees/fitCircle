import React from 'react';
import {FlatList} from 'react-native';
import {CustomPost} from './CustomPost';

interface FlatlistContainerProps {
  data: never[];
  userId: string;
  isRefreshing: any;
  handleRefresh: () => void;
  handleCommentButtonPress: any;
}

const FlatListContainer = ({
  data,
  userId,
  isRefreshing,
  handleRefresh,
  handleCommentButtonPress,
}: FlatlistContainerProps) => {
  const renderCustomPost = ({item}: any) => {
    if (item && item.media && item.media.endsWith('.mp4')) {
      return null;
    }
    return (
      <CustomPost
        key={item._id}
        post={item}
        userId={userId}
        countComment={item.comments.length}
        handleCommentButtonPress={handleCommentButtonPress}
      />
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderCustomPost}
      keyExtractor={(item: any) => item._id}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReachedThreshold={2.7}
    />
  );
};

export default FlatListContainer;
