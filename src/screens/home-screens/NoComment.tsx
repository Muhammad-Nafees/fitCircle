import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const NoComment = () => {
  return (
    <View style={{alignItems: 'center', marginTop: 40,height: 200}}>
      <Entypo name="chat" color={'#898c93'} size={120} />
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
