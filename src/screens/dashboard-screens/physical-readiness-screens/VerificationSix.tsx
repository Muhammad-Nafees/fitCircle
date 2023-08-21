import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';

const VerificationSix = ({navigation, disabled}: any) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    'Increase Lean Muscle',
    'Lose Body Fat',
    'Increase Stamina',
    'Increase Strength',
    'Improve Overall Health',
    'Lose Weight',
  ];

  const handleSelectOption = (option: string) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(prevOptions =>
        prevOptions.filter(item => item !== option),
      );
    } else {
      setSelectedOptions(prevOptions => [...prevOptions, option]);
    }
  };

  return (
    <View
      style={[
        STYLES.container,
        {justifyContent: 'space-between', paddingHorizontal: 35},
      ]}>
      <View>
        {disabled !== true && (
          <View style={{marginTop: 16}}>
            <Text
              style={[
                STYLES.text16,
                {
                  fontWeight: '700',
                  paddingBottom: 28,
                },
              ]}>
              Physical Activity Readiness
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: 'white',
              }}>
              I would like to: Check Below of all that may apply.
            </Text>
          </View>
        )}
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => handleSelectOption(option)}>
              <Text style={styles.optionText}>{option}</Text>
              <View
                style={[
                  styles.optionCheckbox,
                  {
                    backgroundColor: selectedOptions.includes(option)
                      ? '#209BCC'
                      : 'transparent',
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {disabled !== true && (
        <View style={styles.buttonContainer}>
          <CustomButton
            isDisabled={selectedOptions.length === 0}
            onPress={() => navigation.navigate('NextScreen')}>
            Submit
          </CustomButton>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    marginTop: 27,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  optionCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonContainer: {
    marginBottom: 40,
    marginHorizontal: 20,
  },
});

export default VerificationSix;
