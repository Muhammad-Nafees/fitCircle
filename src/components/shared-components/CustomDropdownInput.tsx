import React, {useState, useEffect} from 'react';
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
import {useRoute} from '@react-navigation/native';

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
  placeholder,
  tdee,
  editable = true,
  onSelectUnit,
  extraStyles,
  textInputStyle,
}: any) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [textInputValue, setTextInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const route = useRoute();

  const handleDropdownSelection = (option: any) => {
    console.log('clicked!');
    setShowDropdown(false);
    setSelectedOption(option);
    onSelectUnit(option, defaultOption);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    setShowDropdown(false);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setShowDropdown(false);
  };

  const handleTextInputChange = (text: string) => {
    setTextInputValue(text);
    handleChange(text);
    if (touched && error) {
      setFieldError(fieldName, '');
    }
  };

  useEffect(() => {
    if (!value) {
      setTextInputValue('');
    }
  }, [value]);

  return (
    <View>
      <View style={[styles.container, extraStyles]}>
        <TextInput
          editable={editable}
          value={textInputValue}
          onChangeText={handleTextInputChange}
          style={[styles.textInput, textInputStyle]}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          onBlur={handleInputBlur}
          keyboardType="numeric"
        />
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            onPress={() => editable && setShowDropdown(!showDropdown)}
            style={[
              styles.dropdownIconContainer,
              tdee && {backgroundColor: '#fff'},
              route.name === 'VerificationOne' && {
                width: 48,
              },
            ]}>
            <Text
              style={[
                styles.selectedOptionText,
                tdee && {color: 'rgba(68, 68, 68, 0.5)'},
              ]}>
              {selectedOption}
            </Text>
            <Icon
              name="chevron-down-outline"
              size={18}
              color={tdee ? 'rgba(68, 68, 68, 0.5)' : 'white'}
              style={styles.icon}
            />
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
                    {zIndex: 10, position: 'relative'},
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
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              marginTop: verticalScale(7),
              marginBottom: verticalScale(4),
              height: 27,
            },
            route.name === 'VerificationOne' && {width: horizontalScale(60)},
          ]}>
          <Icon name="alert-circle" size={22} color="red" />
          <Text style={[STYLES.text12, {color: 'red'}]}>{error}</Text>
        </View>
      ) : (
        <View
          style={[
            {height: 35},
            route.name === 'VerificationOne' && {height: verticalScale(40)},
          ]}
        />
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
    marginTop: verticalScale(8),
    zIndex: 1000,
    height: 45,
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
    height: 45,
    zIndex: 9999,
  },
  dropdownIconContainer: {
    backgroundColor: '#019acd',
    height: '100%',
    width: horizontalScale(51),
    paddingHorizontal: horizontalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
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
    zIndex: 99999,
  },
  dropdownOption: {
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    borderBottomWidth: 1,
    borderColor: '#fff',
    zIndex: 99999,
  },
  selectedOption: {
    backgroundColor: '#F3F3F3',
  },
});

export default DropdownTextInput;
