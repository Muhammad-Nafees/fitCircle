import React, {useCallback, useMemo, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import BookmarkIcon from '../../../assets/icons/BookmarkIcon';
import MusicRemoveIcon from '../../../assets/icons/MusicRemoveIcon';
import MusicPlayIcon from '../../../assets/icons/MusicPlayIcon';
import {MUSIC_LIST} from '../../../data/data';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomBottomSheet = ({setMusicModalVisible, setMusic}: any) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isMusicPlay, setIsMusicPlay] = useState(false);
  const [musicId, setMusicId] = useState('');

  // variables
  const snapPoints = useMemo(() => ['60%', '60%'], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const musicFile = require('../../../assets/audio/the-best-jazz-club-in-new-orleans-164472.mp3');
  const [sound, setSound] = useState<any>();

  const handleStopMusic = () => {
    setIsMusicPlay(false);

    if (sound) {
      sound.stop(() => {
        console.log('Sound stopped');
        setIsMusicPlay(false);
        setMusicId('');
        setSound('');
      });
    }
  };
  console.log(isMusicPlay, 'Ss');

  const renderItem = useCallback(({item}) => {
    console.log(item.file, 'item');
    return (
      <TouchableOpacity
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <Image
            source={require('../../../assets/images/backgroundImage.jpg')}
            alt="img"
            style={{width: 70, height: 55}}
          />
          <View style={{flexDirection: 'column', gap: 1}}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#fff'}}>
              Orb
            </Text>
            <Text style={{fontSize: 13, fontWeight: '400', color: '#fff'}}>
              Ichika Nito
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <TouchableOpacity>
            <MusicRemoveIcon />
          </TouchableOpacity>
          {isMusicPlay ? (
            <TouchableOpacity onPress={handleStopMusic}>
              <Icon name="pause-circle-outline" size={24} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => handlePlayMusic(item.id)}>
              <MusicPlayIcon />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BottomSheetModal
          backgroundStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          handleIndicatorStyle={{
            backgroundColor: '#ffffff',
            width: 50,
            height: 4,
            borderRadius: 2,
          }}
          onChange={handleSheetChanges}>
          <View
            style={{
              paddingLeft: 10,
              paddingBottom: 10,

              alignItems: 'center',
              gap: 4,
              flexDirection: 'row',
              width: '100%',
            }}>
            <TextInput
              placeholder="Search Music"
              style={{
                backgroundColor: '#ffffff',
                width: 280,
                height: 40,
                color: 'white',
              }}
            />

            <View
              style={{
                backgroundColor: '#fff',
                width: 40,
                height: 40,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <BookmarkIcon />
            </View>
          </View>

          <BottomSheetFlatList
            data={MUSIC_LIST}
            keyExtractor={(item: any) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 500,
  },
  contentContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingRight: 30,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee',
  },
});

export default CustomBottomSheet;
