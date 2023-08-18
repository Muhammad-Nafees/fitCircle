import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../shared-components/CustomButton';
import { horizontalScale, verticalScale } from '../../utils/metrics';

const RadioUncheckedIcon = require('../../../assets/icons/radio-button-uncheck.png');
const RadioCheckedIcon = require('../../../assets/icons/radio-button-checked.png');

export const Boost = ({
  selectedOptionInternal,
  handleBoostOptionSelect,
  options,
  handleDateConfirm,
  selectedDate,
  setDatePickerVisible,
  isDatePickerVisible,
  handleDialog,
  onBackdropPress,
}: any) => {
  const renderRadioButton = (option: any) => {
    const isChecked = selectedOptionInternal.label === option.label;
    const radioIcon = isChecked ? RadioCheckedIcon : RadioUncheckedIcon;
    return (
      <TouchableOpacity onPress={() => handleBoostOptionSelect(option)}>
        <Image source={radioIcon} style={styles.icon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onBackdropPress}
        style={styles.topLine}></TouchableOpacity>
      <Text style={styles.title}>Choose A Boost</Text>
      {options.map((option: any) => (
        <TouchableOpacity
          style={styles.row}
          key={option.label}
          onPress={() => handleBoostOptionSelect(option)}>
          {renderRadioButton(option)}
          <Text style={styles.boostText}>{option.label}</Text>
          <Text style={styles.price}>{option.price}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.horizontalLine} />
      <Text style={styles.startDateText}>Start A Date</Text>
      <TouchableOpacity
        style={{position: 'relative', width: '100%'}}
        onPress={() => setDatePickerVisible(true)}>
        <TextInput
          placeholder="01/01/2023"
          placeholderTextColor="#fff"
          value={selectedDate}
          editable={false}
          style={styles.input}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisible(false)}
        />
      </TouchableOpacity>
      <View style={{width: '100%'}}>
        <CustomButton onPress={handleDialog}>Continue</CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingBottom: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  boostText: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: '#fff',
  },
  price: {
    fontSize: 15,
    color: '#fff',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: '#fff',
  },
  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(58),
    backgroundColor: 'white',
    marginTop: verticalScale(10),
    alignSelf: 'center',
    borderRadius: 3,
  },
  startDateText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  input: {
    borderRadius: 10,
    marginVertical: 20,
    paddingHorizontal: 13,
    backgroundColor: '#525154',
    opacity: 0.2,
    color: '#fff',
  },
});
