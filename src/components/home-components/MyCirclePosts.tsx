import React from 'react';
import {FlatList} from 'react-native';
import {CustomPost} from './CustomPost';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {View} from 'react-native';

interface MyCirclePostsProps {
  data: any;
  // userId: string;
  isLoading: boolean;
  isRefreshing: any;
  handleRefresh: () => void;
  handleCommentButtonPress: any;
  loadMoreItems: () => void;
}

const MyCirclePosts = ({
  data,
  // userId,
  isLoading,
  isRefreshing,
  handleRefresh,
  loadMoreItems,
  handleCommentButtonPress,
}: MyCirclePostsProps) => {
  const renderCustomPost = ({item}: any) => {
    return (
      <CustomPost
        key={item?._id}
        post={item}
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
      ListFooterComponent={
        isLoading ? (
          <CustomLoader extraStyles={{marginVertical: 20}} isStyle={true} />
        ) : null
      }
      onEndReached={loadMoreItems}
      onEndReachedThreshold={0}
    />
  );
};

export default MyCirclePosts;
