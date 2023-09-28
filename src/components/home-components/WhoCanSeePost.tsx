import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
const GlobeIcon = require('../../../assets/icons/globe.png');
const LockIcon = require('../../../assets/icons/lock.png');
const RadioUncheckedIcon = require('../../../assets/icons/radio-button-uncheck.png');
const RadioCheckedIcon = require('../../../assets/icons/radio-button-checked.png');
import CustomButton from '../shared-components/CustomButton';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {horizontalScale, verticalScale} from '../../utils/metrics';

export const WhoCanSeeThisPost = ({
  selectedOption,
  onSelectOption,
  modalClose,
  onSelectCost,
}: any) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const isCostAvailable = userData?.role !== 'user';
  const [cost, setCost] = useState(0);
  const [selectedOptionInternal, setSelectedOptionInternal] =
    useState(selectedOption);
  const handleOptionSelect = (option: string) => {
    setSelectedOptionInternal(option);
  };

  const handleCostChange = (text: string) => {
    const numericValue = parseInt(text);
    setCost(numericValue);
  };

  const renderRadioButton = (option: any) => {
    const isChecked = selectedOptionInternal === option;
    const radioIcon = isChecked ? RadioCheckedIcon : RadioUncheckedIcon;
    return (
      <TouchableOpacity onPress={() => handleOptionSelect(option)}>
        <Image source={radioIcon} style={styles.icon} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => modalClose()}
        style={styles.topLine}></TouchableOpacity>
      <View style={styles.headingText}>
        <Text style={styles.heading1}>Who can see your post?</Text>
        <Text style={styles.paragraph1}>
          Your post will be visible on the feed, on your profile, and in search
          results
        </Text>
      </View>
      <View style={styles.line} />
      <View
        style={[
          styles.optionContainer,
          {backgroundColor: '#005771', borderRadius: 10},
        ]}>
        <Text style={styles.optionTitle}>Privacy About me</Text>
        <View style={styles.option}>
          <Image source={GlobeIcon} style={styles.icon} />
          <TouchableOpacity
            style={styles.bulletContainer}
            onPress={() => handleOptionSelect('Public')}>
            <Text style={styles.optionText}>Public</Text>
            <Text style={styles.optionDescription}>
              Anyone can see your post
            </Text>
          </TouchableOpacity>
          {renderRadioButton('Public')}
        </View>
        <View style={styles.option}>
          <Image source={LockIcon} style={styles.icon} />
          <TouchableOpacity
            style={styles.bulletContainer}
            onPress={() => handleOptionSelect('Subscribers')}>
            <Text style={styles.optionText}>Subscribers only</Text>
            <Text style={styles.optionDescription}>
              Anyone subscribed to you
            </Text>
          </TouchableOpacity>
          {renderRadioButton('Subscribers')}
        </View>
        {isCostAvailable && (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Cost"
              placeholderTextColor="#fff"
              keyboardType="numeric"
              value={cost > 0 ? cost.toString() : ''}
              onChangeText={handleCostChange}
            />
          </View>
        )}
      </View>
      <CustomButton
        extraStyles={{marginTop: 15}}
        onPress={() => {
          onSelectOption(selectedOptionInternal);
          onSelectCost(cost);
          modalClose();
        }}>
        Continue
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: horizontalScale(30),
    paddingBottom: verticalScale(40),
    paddingVertical: verticalScale(10),
  },
  headingText: {
    marginTop: verticalScale(30),
  },
  heading1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  paragraph1: {
    fontSize: 14,
    fontWeight: '400',
    color: '#747476',
    marginTop: verticalScale(8),
  },
  line: {
    width: horizontalScale(295),
    height: verticalScale(1),
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 16,
  },
  optionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginHorizontal: horizontalScale(10),
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(8),
  },
  bulletContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  optionDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6097a5',
  },
  icon: {
    width: horizontalScale(29),
    height: verticalScale(29),
    tintColor: '#fff',
  },
  input: {
    backgroundColor: '#1ca0b8',
    marginHorizontal: horizontalScale(40),
    paddingHorizontal: horizontalScale(10),
    color: '#fff',
  },
  textInputContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  topLine: {
    height: verticalScale(5),
    width: horizontalScale(58),
    backgroundColor: 'white',
    marginTop: verticalScale(5),
    alignSelf: 'center',
    borderRadius: 3,
  },
});