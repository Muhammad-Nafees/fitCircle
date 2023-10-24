import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
//----------------------------------------------------------------//
import {horizontalScale, verticalScale} from '../../utils/metrics';
const BackIcon = require('../../../assets/icons/arrow-back.png');
const RightIcon = require('../../../assets/icons/right-arrow.png');

const ColorSelectionSlider = ({colors, onColorSelected,isLoading}: any) => {
  const [selectedColor, setSelectedColor] = useState<any>();

  const handleColorSelection = (color: string | string[]) => {
    setSelectedColor(color);
    onColorSelected(color);
  };

  const solidColor = (item: string, index: number) => (
    <TouchableOpacity
    disabled={isLoading}
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

  const gradientColor = (item: string[], index: number) => (
    <TouchableOpacity
    disabled={isLoading}
      style={[
        styles.colorDot,
        index === 0 && styles.firstColorDot,
        index === colors.length - 1 && styles.lastColorDot,
        {overflow: 'hidden'},
      ]}
      onPress={() => handleColorSelection(item)}>
      <View style={styles.gradientContainer}>
        <LinearGradient colors={item} style={{width: '100%', height: '100%'}} />
      </View>
      {index === 0 && <Image source={BackIcon} style={styles.backIcon} />}
      {index === colors.length - 1 && (
        <Image source={RightIcon} style={styles.rightIcon} />
      )}
    </TouchableOpacity>
  );

  const renderItem = ({item, index}: any) =>
    !Array.isArray(item) ? solidColor(item, index) : gradientColor(item, index);

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
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
});

export default ColorSelectionSlider;
