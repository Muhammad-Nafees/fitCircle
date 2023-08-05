import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utils/metrics';
import {STYLES} from '../../styles/globalStyles';

const DropdownTextInput = ({
  value,
  options,
  defaultOption,
  error,
  touched,
  initialTouched,
  handleChange,
  setFieldError,
  fieldName,
}: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [textInputValue, setTextInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleDropdownSelection = (option: any) => {
    setShowDropdown(false);
    setSelectedOption(option);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleTextInputChange = (text: string) => {
    setTextInputValue(text);
    handleChange(text);
    if (touched && error) {
      setFieldError(fieldName, '');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          value={textInputValue}
          onChangeText={handleTextInputChange}
          style={styles.textInput}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          keyboardType="numeric"
        />
        <View style={styles.dropdownContainer}>
          <TouchableOpacity onPress={toggleDropdown}>
            <View style={styles.dropdownIconContainer}>
              <Text style={styles.selectedOptionText}>{selectedOption}</Text>
              <Icon
                name="chevron-down-outline"
                size={18}
                color="white"
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownContent}>
              {options.map((option: any) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => handleDropdownSelection(option)}
                  style={[
                    styles.dropdownOption,
                    selectedOption === option && styles.selectedOption,
                  ]}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: selectedOption === option ? 'black' : '#9c9c9c',
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      {error && ((touched && !value) || (error && value) || isFocused) ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            marginTop: verticalScale(7),
            marginBottom: verticalScale(4),
          }}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{error}</Text>
        </View>
      ) : (
        <View style={{height: 35}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    marginTop: verticalScale(10),
    zIndex: 1000,
    height: verticalScale(47),
  },
  textInput: {
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    color: 'black',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: verticalScale(47),
  },
  dropdownIconContainer: {
    backgroundColor: '#019acd',
    height: '100%',
    width: horizontalScale(51),
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedOptionText: {
    color: 'white',
    fontSize: 15,
    marginRight: horizontalScale(5),
  },
  dropdownContent: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FBFBFB',
  },
  dropdownOption: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#F3F3F3',
  },
});

export default DropdownTextInput;
