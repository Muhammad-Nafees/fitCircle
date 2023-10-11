import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const DashboardCarouselItem = ({
  item,
  onPress,
  isDropdownVisible,
}: any) => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={onPress} style={styles.carouselItem}>
        {item.icon}
        <Text style={styles.carouselItemText}>{item.text}</Text>
      </TouchableOpacity>
      {item.text === 'Packages / Meal Plan' &&
        item.dropdown &&
        isDropdownVisible && (
          <View style={styles.dropdown}>
            <Text
              onPress={() => item.selectOption('Packages')}
              style={styles.dropdownOption}>
              Packages
            </Text>
            <View style={styles.horizontalLine} />
            <TouchableOpacity>
              <Text
                onPress={() => item.selectOption('Meal Plan')}
                style={styles.dropdownOption}>
                Meal Plan
              </Text>
            </TouchableOpacity>
          </View>
        )}
    </View>
  );
};

const styles = {
  carouselItem: {
    backgroundColor: '#209BCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(106),
    height: verticalScale(115),
    borderRadius: 10,
  },
  carouselItemText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlign: 'center',
    lineHeight: 11.77,
  },
  dropdown: {
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(68, 68, 68, 1)',
    borderRadius: 5,
    width: horizontalScale(106),
    zIndex: 9999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownOption: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 10,
    color: 'white',
  },
  horizontalLine: {
    width: '75%',
    height: 1,
    backgroundColor: 'gray',
  },
};
