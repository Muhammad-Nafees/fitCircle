import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
// ---------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
const options = [
  {
    id: 'increaseLeanMuscle',
    name: 'Increase Lean Muscle',
  },
  {
    id: 'loseBodyFat',
    name: 'Lose Body Fat',
  },
  {
    id: 'increaseStamina',
    name: 'Increase Stamina',
  },
  {
    id: 'increaseStrength',
    name: 'Increase Strength',
  },
  {
    id: 'improveHealth',
    name: 'Improve Overall Health',
  },
  {
    id: 'loseWeight',
    name: 'Lose Weight',
  },
];

const VerificationSix = ({navigation, disabled, route, data}: any) => {
  const [selectedOptions, setSelectedOptions] = useState<any[]>(options);
  const [selectedData, setSelectedData] = useState({
    increaseLeanMuscle: false,
    loseBodyFat: false,
    increaseStamina: false,
    increaseStrength: false,
    improveHealth: false,
    loseWeight: false,
  });
  const formdata: null | any = data;
  console.log(data, 'data');

  const handleSelectOption = (option: any) => {
    setSelectedData((prev: any) => {
      return {...prev, [option.id]: !prev[option.id]};
    });
  };

  useEffect(() => {
    if (formdata) setSelectedData(formdata);
  }, [formdata]);

  const handleSubmit = () => {
    console.log(selectedOptions, 'selected');
    navigation.navigate('VerificationSeven', {
      ...route.params,
      verificationSix: selectedData,
    });
  };

  return (
    <View
      style={[
        STYLES.container,
        {justifyContent: 'space-between', paddingHorizontal: 25},
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
              disabled={disabled}
              key={index}
              style={styles.optionItem}
              onPress={() => !disabled && handleSelectOption(option)}>
              <Text style={styles.optionText}>{option.name}</Text>
              <View
                style={[
                  styles.optionCheckbox,
                  {
                    backgroundColor: selectedData[
                      option.id as keyof typeof selectedData
                    ]
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
            // isDisabled={selectedOptions.length === 0}
            onPress={handleSubmit}>
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
