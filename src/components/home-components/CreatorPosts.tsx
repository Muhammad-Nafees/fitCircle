import React from 'react';
import {View, Dimensions} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import ReelsComponent from './Reels';

interface CreatorPostsProps {
  data: never[];
  userId: string;
  tabBarHeight: any;
  isProfile: boolean;
  handleRefresh: () => void;
}

const CreatorPosts = ({
  data,
  userId,
  tabBarHeight,
  isProfile,
  handleRefresh,
}: CreatorPostsProps) => {
  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 120 - tabBarHeight,
      }}>
      <SwiperFlatList
        // vertical={true}
        data={data}
        keyExtractor={(item, index) => item._id + index + 1}
        refreshing={false}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0}
        onChangeIndex={i => console.log(i)}
        renderItem={({item, index}) => (
          <ReelsComponent
            post={item}
            index={index}
            userId={userId}
            tabBarHeight={tabBarHeight}
            isProfile={isProfile}
          />
        )}
      />
    </View>
  );
};

export default CreatorPosts;
