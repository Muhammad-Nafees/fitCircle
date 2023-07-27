import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {horizontalScale, verticalScale} from '../../utils/metrics';

const ColorSelectionSlider = ({colors, onColorSelected}: any) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleColorSelection = (color: string) => {
    setSelectedColor(color);
    onColorSelected(color);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.colorDot,
        {backgroundColor: item, borderWidth: item === selectedColor ? 2 : 0},
      ]}
      onPress={() => handleColorSelection(item)}
    />
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
  },
  colorDot: {
    width: horizontalScale(36),
    height: verticalScale(36),
    borderRadius: 5,
    marginHorizontal: horizontalScale(8),
  },
});

export default ColorSelectionSlider;
