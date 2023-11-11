import React, {useCallback, useMemo, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'redux/store';

import CustomLoader from './CustomLoader';
import MusicRemoveIcon from '../../../assets/icons/MusicRemoveIcon';
import MusicBookmarkRemoveIcon from '../../../assets/icons/MusicBookmarkRemoveIcon';
import MusicPlayIcon from '../../../assets/icons/MusicPlayIcon';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {addRemoveMusic} from '../../api/home-module';
import {setUserData} from '../../redux/authSlice';
import {IUser} from '../../interfaces/user.interface';

const CustomBottomSheet = ({
  musicModal,
  setMusicModal,
  musicList,
  onMusicSelect,
  title,
  setTitle,
  loader,
}: any) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const [musicIndex, setMusicIndex] = useState<number | null>(null);
  const [sound, setSound] = useState<any>();

  const playMusic = (index: number, id: number) => {
    handleStopMusic();
    setSound(null);
    let whoosh = new Sound(
      musicList[index]?.preview,
      Sound.MAIN_BUNDLE,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        setMusicIndex(index);
        setIsMusicPlay(true);
        whoosh.play();
        whoosh.setNumberOfLoops(-1);
        setSound(whoosh);
      },
    );
  };

  const handleStopMusic = () => {
    if (sound) {
      sound.stop(() => {
        setIsMusicPlay(false);
        setMusicIndex(null);
        setSound('');
      });
    }
  };

  const musicHandler = (id: number, title: string, url: string) => {
    handleStopMusic();
    onMusicSelect(id, title, url);
  };

  const onAddRemoveMusic = async (id: number, title: string) => {
    try {
      const musicResponse = await addRemoveMusic(id, title);
      console.log(musicResponse?.data?.data, 'FROM VIDEO POST');

      Toast.show({
        type: 'success',
        text1: `${musicResponse?.data?.message}`,
      });
      dispatch(setUserData({...musicResponse?.data?.data} as IUser));
    } catch (error: any) {
      console.log(error?.response.data, 'FROM VIDEO POST');
      if (error?.response?.data?.message) {
        Toast.show({
          type: 'error',
          text1: `${error?.response?.data.message}`,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: `${error.message}!`,
        });
      }
    }
  };

  const RenderItem = ({index, item}: any) => {
    return (
      <TouchableOpacity
        key={item?.id}
        style={styles.musicListWrapper}
        onPress={() => musicHandler(item?.id, item?.title, item.preview)}>
        <View style={styles.musicListLeft}>
          <Image
            source={{uri: item?.artist?.picture_small}}
            alt="img"
            style={styles.musicListImage}
          />
          <View style={styles.musicListTitleWrapper}>
            <Text style={styles.musicListTitle} numberOfLines={1}>
              {item?.title}
            </Text>
            <Text style={styles.musicListArtist}>{item?.artist?.name}</Text>
          </View>
        </View>
        <View style={styles.musicListRight}>
          <TouchableOpacity
            onPress={() => onAddRemoveMusic(item?.id, item?.title)}>
            {userData?.musics?.find(music => music?.musicId === item?.id) ? (
              <MusicBookmarkRemoveIcon />
            ) : (
              <MusicRemoveIcon />
            )}
          </TouchableOpacity>
          {isMusicPlay && index === musicIndex ? (
            <TouchableOpacity onPress={handleStopMusic}>
              <Icon name="pause-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => playMusic(index, item.id)}>
              <MusicPlayIcon />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      onBackButtonPress={() => setMusicModal(false)}
      isVisible={musicModal}
      style={styles.bottomModal}
      backdropOpacity={0.3}>
      <View style={styles.modal}>
        <View style={styles.bottomOptions}>
          <TouchableOpacity style={styles.topLine}></TouchableOpacity>
          <View>
            <TextInput
              placeholder="Search music..."
              value={title}
              placeholderTextColor="#fff"
              style={styles.searchInput}
              multiline={true}
              onChangeText={setTitle}
            />
          </View>
          <View style={{height: verticalScale(270)}}>
            <ScrollView>
              {!loader && !musicList.length ? (
                <Text style={styles.notFoundText}>No music found</Text>
              ) : null}
              {loader ? (
                <CustomLoader />
              ) : musicList.length ? (
                musicList.map((item: any, index: number) => (
                  <RenderItem key={item?.id} index={index} item={item} />
                ))
              ) : null}
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: '100%',
  },
  bottomOptions: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(30),
    paddingTop: verticalScale(15),
    height: '45%',
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(48),
    backgroundColor: 'white',
    marginBottom: verticalScale(20),
    alignSelf: 'center',
    borderRadius: 3,
  },
  searchInput: {
    color: '#fff',
  },
  bottomContainerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
    marginHorizontal: horizontalScale(8),
  },
  options: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: horizontalScale(8),
  },
  musicListWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  musicListLeft: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  musicListImage: {
    width: 60,
    height: 50,
  },
  musicListTitleWrapper: {
    flexDirection: 'column',
    gap: 1,
  },
  musicListTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    width: horizontalScale(220),
  },
  musicListArtist: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
  },
  musicListRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  notFoundText: {
    fontSize: 13,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
});

export default CustomBottomSheet;
