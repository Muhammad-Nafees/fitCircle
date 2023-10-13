import {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
//-------------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import {NutritionData} from '../../../interfaces/extra.interface';
import {calculateMacro} from '../../../api/dashboard-module';
import Toast from 'react-native-toast-message';

const highCarbs = `High Carb${''.padEnd(49)}50c-30p-20f`;
const highProtein = `High Protein${''.padEnd(45)}40c-30p-30f`;
const recommended = `Recommended${''.padEnd(40)}40c-30p-30f`;
const lowCarbs = `Low Carb${''.padEnd(51)}40c-30p-30f`;
const ketogenic = `Ketogenic${''.padEnd(50)}40c-30p-30f`;

const presets = {
  [highCarbs]: {value: 'HIGH_CARB'},
  [highProtein]: {value: 'HIGH_PROTEIN'},
  [recommended]: {value: 'RECOMMENDED'},
  [lowCarbs]: {value: 'LOW_CARB'},
  [ketogenic]: {value: 'KETOGENIC'},
};

export const MacroCalculator = ({navigation, route}: any) => {
  const {data} = route?.params;
  const [preset, setPreset] = useState('');
  const [chartData, setChartData] = useState<NutritionData>({
    carbohydrates: 0,
    fats: 0,
    proteins: 0,
    carbRatio: 0,
    fatRatio: 0,
    proteinRatio: 0,
  });
  const [percentageData, setPercentageData] = useState({
    carbsPercentage: 0,
    proteinPercentage: 0,
    fatsPercentage: 0,
  });

  const handleSubmit = () => {
    navigation.navigate('Chart', {
      chartData: chartData,
      dailyCalories: route.params.data.dailyCalories,
    });
  };

  const calculateMacros = async () => {
    try {
      const reqObj = {
        goal: presets[preset as keyof typeof presets].value,
        tdee: data?.tdee,
        calorieDeficit: Math.abs(data?.calorieDeficit),
      };
      const response = await calculateMacro(reqObj);
      const responseData = response?.data?.data;
      if (reqObj.goal === 'HIGH_CARB') {
        setPercentageData({
          carbsPercentage: 50,
          proteinPercentage: 30,
          fatsPercentage: 20,
        });
      } else if (reqObj.goal === 'HIGH_PROTEIN') {
        setPercentageData({
          carbsPercentage: 40,
          proteinPercentage: 40,
          fatsPercentage: 20,
        });
      } else {
        setPercentageData({
          carbsPercentage: 40,
          proteinPercentage: 30,
          fatsPercentage: 30,
        });
      }
      console.log(presets[preset as keyof typeof presets].value);
      setChartData(responseData);
    } catch (error: any) {
      console.log('error from calculate macros:', error?.response?.data);
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
    }
  };

  useEffect(() => {
    if (preset) calculateMacros();
  }, [preset]);

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
              improved{' '}
              <Text style={{textDecorationLine: 'underline'}}>
                {' '}
                Macro Calculator
              </Text>
            </Text>
          </View>
          <View style={{marginVertical: 20, marginRight: '60%'}}>
            <Text style={styles.heading}>Carbohydrates</Text>
          </View>
          <View style={styles.chartContainer}>
            <Text style={styles.data}>{percentageData.carbsPercentage}%</Text>
            <Text style={styles.data}>
              {chartData?.carbohydrates.toFixed(0)} grams
            </Text>
          </View>
          <Slider
            value={percentageData.carbsPercentage}
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
            <Text style={styles.data}>{percentageData.proteinPercentage}%</Text>
            <Text style={styles.data}>
              {chartData?.proteins.toFixed(0)} grams
            </Text>
          </View>
          <Slider
            value={percentageData.proteinPercentage}
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
            <Text style={styles.data}> {percentageData.fatsPercentage}%</Text>
            <Text style={styles.data}>{chartData?.fats.toFixed(0)} grams</Text>
          </View>
          <Slider
            value={percentageData.fatsPercentage}
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
          {chartData.carbohydrates !== 0 && (
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
