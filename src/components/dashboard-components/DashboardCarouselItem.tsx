import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const DashboardCarouselItem = ({item, onPress}: any) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={onPress} style={styles.carouselItem}>
        {item.icon}
        <Text style={styles.carouselItemText}>{item.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  carouselItem: {
    backgroundColor: '#209BCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 106,
    height: 115,
    borderRadius: 10,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    // lineHeight: 11.77,
  },
};
