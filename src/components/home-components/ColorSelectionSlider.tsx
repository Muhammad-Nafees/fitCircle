import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';
const BackIcon = require('../../../assets/icons/arrow-back.png');
const RightIcon = require('../../../assets/icons/right-arrow.png');

const ColorSelectionSlider = ({colors, onColorSelected}: any) => {
  const [selectedColor, setSelectedColor] = useState<any>();

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    onColorSelected(color);
  };

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      style={[
        styles.colorDot,
        {
          backgroundColor: item,
          borderWidth: item === selectedColor ? 1 : 0,
          borderColor: '#209BCC',
        },
        index === 0 && styles.firstColorDot,
        index === colors.length - 1 && styles.lastColorDot,
      ]}
      onPress={() => handleColorSelection(item)}>
      {index === 0 && <Image source={BackIcon} style={styles.backIcon} />}
      {index === colors.length - 1 && (
        <Image source={RightIcon} style={styles.rightIcon} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: verticalScale(16),
    marginVertical: -30,
  },
  colorDot: {
    width: horizontalScale(36),
    height: verticalScale(36),
    borderRadius: 5,
    marginHorizontal: horizontalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstColorDot: {},
  lastColorDot: {},
  backIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
  },
  rightIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
  },
});

export default ColorSelectionSlider;
