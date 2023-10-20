import React from 'react';
import {FlatList} from 'react-native';
import {CustomPost} from './CustomPost';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {View} from 'react-native';

interface MyCirclePostsProps {
  data: any;
  isLoading: boolean;
  isRefreshing?: any;
  isSearchProfile?: boolean;
  handleRefresh?: () => void;
  handleCommentButtonPress: any;
  loadMoreItems: () => void;
  isPersonalProfile?: boolean;
  onEditDeletePost?: any;
}

const MyCirclePosts = ({
  data,
  // userId,
  isLoading,
  isRefreshing,
  isPersonalProfile,
  isSearchProfile,
  handleRefresh,
  loadMoreItems,
  handleCommentButtonPress,
  onEditDeletePost,
}: MyCirclePostsProps) => {
  const renderCustomPost = ({item, index}: any) => {
    return (
      <CustomPost
        key={item._id + index}
        post={item}
        isSearchProfile={isSearchProfile}
        handleCommentButtonPress={handleCommentButtonPress}
        isPersonalProfile={isPersonalProfile}
        onEditDeletePost={onEditDeletePost}
      />
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderCustomPost}
      keyExtractor={(item: any, index: any) => item._id + index}
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
