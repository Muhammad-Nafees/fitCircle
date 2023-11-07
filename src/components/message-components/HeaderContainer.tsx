import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Userpic} from 'react-native-userpic';
import ChatCallIcon from '../../../assets/icons/ChatCall';
import VideoSvgIcon from '../../../assets/icons/VideoIcon';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
const Option = require('../../../assets/icons/customPostOption.png');
import {dummyDataProfile} from '../../screens/dummyData';
import {setUserProfile} from '../../redux/authSlice';
import {useDispatch} from 'react-redux';
import {setTrainerView} from '../../redux/profileSlice';

export const MessageHeaderContainer = ({username}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSeeUserProfile = () => {
    dispatch(setUserProfile(dummyDataProfile));
    dispatch(setTrainerView(true));
    navigation.navigate('Profile', {
      isFollowing: true,
    });
  };

  return (
    <View style={styles.contentContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <TouchableOpacity
          style={styles.arrowBack}
          onPress={() => navigation.navigate('MessagesOne')}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userDetailStatus}
          onPress={handleSeeUserProfile}>
          <Userpic
            name={username[0]}
            size={40}
            color="#5e01a9"
            badge={true}
            badgeColor="green"
            badgeProps={{position: 'bottom-right'}}
            textStyle={{fontSize: 19, fontWeight: '400'}}
          />
          <View>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.status}>Online</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('VoiceCall', {
              username: username,
            })
          }>
          <ChatCallIcon />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('VideoCall', {
              username: username,
            })
          }>
          <VideoSvgIcon color={'#ffffff'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={Option} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#209BCC',
    paddingBottom: verticalScale(10),
    zIndex: 10,
  },
  arrowBack: {
    paddingTop: verticalScale(24),
    paddingBottom: verticalScale(16),
    paddingHorizontal: horizontalScale(12),
    bottom: 9,
  },
  icon: {
    width: horizontalScale(24),
    height: verticalScale(24),
    tintColor: 'white',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: moderateScale(15),
    alignItems: 'center',
    marginRight: horizontalScale(10),
    marginTop: 6,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  status: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
  },
  userDetailStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    top: 8,
  },
});
