import React, {useEffect, useState} from 'react';
import {View, Dimensions, AppState} from 'react-native';
import Sound from 'react-native-sound';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import ReelsComponent from './Reels';

interface CreatorPostsProps {
  data: never[];
  userId: string;
  tabBarHeight: any;
  isProfile: boolean;
  handleRefresh: () => void;
  onDeletePost: (postId: string) => void;
}

const CreatorPosts = ({
  data,
  userId,
  tabBarHeight,
  isProfile,
  handleRefresh,
  onDeletePost,
}: CreatorPostsProps) => {
  const [play, setPlay] = useState<boolean>(false);
  const [id, setId] = useState<string | null>(null);
  const [sound, setSound] = useState<any>();

  useEffect(() => {
    if (sound) {
      const subscription = AppState.addEventListener(
        'change',
        (nextAppState: any) => {
          if (nextAppState === 'background') {
            onPause();
          } else if (nextAppState === 'active' && id) {
            onPlayPause(id);
          }
        },
      );

      return () => {
        subscription.remove();
      };
    }
  }, [sound]);

  const getMusic = (postId: string) => {
    try {
      if (sound) {
        sound.stop();
        sound.release();
      }
      let post = data?.find((item: never) => item?._id == postId);
      if (post?.musicUrl) {
        let music = new Sound(post?.musicUrl, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.log('failed to load the music', error);
            return;
          }
          music.setNumberOfLoops(-1);
          setSound(music);
          music?.play();
        });
      }
    } catch (error: any) {
      console.log(error?.response, 'Error fetching music list!');
    }
  };

  const onPlayPause = (vid: string) => {
    if (play) {
      if (!vid || id == vid) {
        setPlay(false);
        sound?.pause();
      } else {
        getMusic(vid);
        setId(vid);
      }
    } else {
      if (id == vid) {
        console.log('3');
        setPlay(true);
        sound?.play();
      } else {
        getMusic(vid);
        setId(vid);
        setPlay(true);
      }
    }
  };

  const onPause = () => {
    setPlay(true);
    sound?.pause();
  };

  const onVideoEnd = () => {
    sound?.setCurrentTime(0);
  };

  return (
    <View
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 120 - tabBarHeight,
      }}>
      <SwiperFlatList
        vertical={true}
        data={data}
        keyExtractor={(item, index) => item._id + index + 1}
        refreshing={false}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0}
        renderItem={({item, index}) => (
          <ReelsComponent
            isFavoriteVideo={true}
            post={item}
            index={index}
            userId={userId}
            tabBarHeight={tabBarHeight}
            isProfile={isProfile}
            onDeletePost={onDeletePost}
            onPlayPause={onPlayPause}
            play={play}
            id={id}
            onVideoEnd={onVideoEnd}
          />
        )}
      />
    </View>
  );
};

export default CreatorPosts;
