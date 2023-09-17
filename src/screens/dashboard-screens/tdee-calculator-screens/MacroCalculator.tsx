import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, BackHandler} from 'react-native';
import Slider from '@react-native-community/slider';
//-------------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import {NutritionData} from '../../../interfaces/extra.interface';

const presets = {
  'High Card': {value: 'high-carb'},
  'High Protein': {value: 'high-protein'},
  Recommended: {value: 'recommended'},
  'Low Carb': {value: 'low-carb'},
  Ketogenic: {value: 'ketogenic'},
};

export const MacroCalculator = ({navigation, route}: any) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);
  const [preset, setPreset] = useState('');
  const [chartData, setChartData] = useState<NutritionData>({
    user: '',
    goal: '',
    carbRatio: 0,
    proteinRatio: 0,
    fatRatio: 0,
    carbGrams: 0,
    _id: '',
    __v: 0,
    fatGrams: 0,
    proteinGrams: 0,
  });

  const handleSubmit = () => {
    if (chartData._id === '') {
      navigation.navigate('TdeeCalculatorScreen');
    } else {
      console.log(route.params.data.dailyCalories);
      navigation.navigate('Chart', {
        chartData: chartData,
        dailyCalories: route.params.data.dailyCalories,
      });
    }
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={[STYLES.text16, styles.titleHeading]}>
          Macro Calculator
        </Text>
        <View style={styles.formContainer}>
          <View style={styles.dropdownContainer}>
            <CustomSelect
              label="Select a Preset (Carb % / Protein % / Fat %)"
              values={Object.keys(presets)}
              selectedValue={preset}
              initialTouched={true}
              handleChange={setPreset}
              setFieldValue={() => null}
              setFieldError={() => null}
              width={'100%'}
              fieldName="preset"
              extraRowTextStyle={{color: 'white', fontSize: 12}}
              extraRowStyle={{backgroundColor: 'rgba(68, 68, 68, 1)'}}
              extraDropdownStyle={{
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
              }}
              extraSelectedRowStyle={{
                backgroundColor: 'rgba(68, 68, 68, 1)',
                marginVertical: 0,
                borderRadius: 0,
              }}
            />
            <Text style={styles.textNote}>
              Note: To use a custom Macro setting, please visit our new and
              improved Macro Calculator
            </Text>
          </View>
          <View style={{marginVertical: 20, marginRight: '60%'}}>
            <Text style={styles.heading}>Carbohydrates</Text>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.data}>
              {(chartData?.carbRatio).toFixed(0)}%
            </Text>
            <Text style={styles.data}>
              {chartData.carbGrams.toFixed(0)} grams
            </Text>
          </View>
          <Slider
            value={chartData?.carbRatio}
            maximumValue={100}
            onValueChange={() => null}
            style={{width: '85%'}}
            thumbTintColor="#209BCC"
            minimumTrackTintColor="#209BCC"
            maximumTrackTintColor="#ffffff"
            disabled={true}
          />
          <View style={{marginVertical: 20, marginRight: '70%'}}>
            <Text style={styles.heading}>Protein</Text>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.data}>
              {chartData.proteinRatio.toFixed(0)}%
            </Text>
            <Text style={styles.data}>
              {chartData.proteinGrams.toFixed(0)} grams
            </Text>
          </View>
          <Slider
            value={chartData.proteinRatio}
            maximumValue={100}
            onValueChange={() => null}
            style={{width: '85%'}}
            thumbTintColor="#209BCC"
            minimumTrackTintColor="#209BCC"
            maximumTrackTintColor="#ffffff"
            disabled={true}
          />
          <View style={{marginVertical: 20, marginRight: '75%'}}>
            <Text style={styles.heading}>Fat</Text>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.data}>{chartData.fatRatio.toFixed(0)}%</Text>
            <Text style={styles.data}>
              {chartData.fatGrams.toFixed(0)} grams
            </Text>
          </View>
          <Slider
            value={chartData.fatRatio}
            maximumValue={100}
            onValueChange={() => null}
            style={{width: '85%'}}
            thumbTintColor="#209BCC"
            minimumTrackTintColor="#209BCC"
            maximumTrackTintColor="#ffffff"
            disabled={true}
          />
        </View>
        <View style={styles.button}>
          {chartData._id !== '' && (
            <CustomButton onPress={handleSubmit}>{'Show Chart'}</CustomButton>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(70),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
  data: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(32, 155, 204, 1)',
  },
  heading: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  titleHeading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  textNote: {
    color: 'white',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: -18,
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  dropdownContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
});
