import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {verticalScale} from '../../utils/metrics';

const NoComment = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        marginVertical: verticalScale(40),
        height: verticalScale(340),
        paddingBottom: 0,
      }}>
      <Entypo name="chat" color={'#898c93'} size={100} />
      <Text
        style={{
          fontSize: 14,
          color: '#898c93',
          fontWeight: '500',
          marginTop: 10,
        }}>
        No comments yet
      </Text>
      <Text style={{fontSize: 14, color: '#898c93'}}>
        Be the first to comment.
      </Text>
    </View>
  );
};

export default NoComment;
