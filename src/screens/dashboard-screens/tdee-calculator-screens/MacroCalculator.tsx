import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import Slider from '@react-native-community/slider';
import SliderThumb from '../../../../assets/icons/ColorChart';
import axiosInstance from '../../../api/interceptor';
import {NutritionData} from '../../../interfaces/extra.interface';

const presets = {
  'High Card': {value: 'high-carb'},
  'High Protein': {value: 'high-protein'},
  Recommended: {value: 'recommended'},
  'Low Carb': {value: 'low-carb'},
  Ketogenic: {value: 'ketogenic'},
};

export const MacroCalculator = ({navigation, route}: any) => {
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
      navigation.navigate('Chart', chartData);
    }
  };

  const getMacros = async () => {
    try {
      const reqObj = {
        weight: route.params?.weight,
        goal: presets[preset as keyof typeof presets].value,
      };

      const response = await axiosInstance.post(`tdee/macros/result`, reqObj);

      if (response.status === 200) setChartData(response.data);
    } catch (error) {
      console.log('🚀 ~ handleFormSave ~ error:', error);
    }
  };

  useEffect(() => {
    if (preset) getMacros();
  }, [preset]);

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text
          style={[
            STYLES.text16,
            {
              fontWeight: '700',
              marginTop: 16,
              paddingHorizontal: 16,
              paddingBottom: 28,
            },
          ]}>
          Macro Calculator
        </Text>
        <View style={styles.formContainer}>
          <CustomSelect
            label="Select a Preset (Carb % / Protein % / Fat %)"
            values={Object.keys(presets)}
            selectedValue={preset}
            initialTouched={true}
            handleChange={setPreset}
            setFieldValue={() => null}
            setFieldError={() => null}
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
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontStyle: 'italic',
              marginHorizontal: 35,
              marginTop: -18,
              marginBottom: 50,
              textAlign: 'left',
            }}>
            Note: To use a custom Macro setting, please visit our new and
            improved Macro Calculator
          </Text>
          <View style={{marginVertical: 20, marginRight: '60%'}}>
            <Text style={styles.heading}>Carbohydrates</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
            }}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
            }}>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '80%',
            }}>
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

        {/* <Formik
          initialValues={{
            preset: '',
            carbohydrates: 0,
            protein: 0,
            fat: 0,
          }}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => (
            <>
              <Text
                style={[
                  STYLES.text16,
                  {
                    fontWeight: '700',
                    marginTop: 16,
                    paddingHorizontal: 16,
                    paddingBottom: 28,
                  },
                ]}>
                Macro Calculator
              </Text>
              <View style={styles.formContainer}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <CustomSelect
                    label="Select a Preset (Carb % / Protein % / Fat %)"
                    values={[
                      'High Carb                                                               50c-30p-20f',
                      'High Protein                                                          40c-40p-20f',
                      'Recommended                                                     40c-30p-30f',
                      'Low Carb                                                                40c-30p-30f',
                      'Ketogenic                                                               40c-30p-30f',
                    ]}
                    placeholder={
                      'Low Carb                                  20c-45p-35f'
                    }
                    selectedValue={values.preset}
                    error={errors.preset}
                    initialTouched={true}
                    touched={touched.preset}
                    setFieldValue={setFieldValue}
                    setFieldError={setFieldError}
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
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 12,
                      fontStyle: 'italic',
                      marginTop: -20,
                      width: '85%',
                      marginBottom: 30,
                      textAlign: 'left',
                    }}>
                    Note: To use a custom Macro setting, please visit our new
                    and improved Macro Calculator
                  </Text>
                </View>
                <View style={{marginBottom: 20, marginRight: '60%'}}>
                  <Text style={styles.heading}>Carbohydrates</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  <Text style={styles.data}>
                    {(values.carbohydrates * 100).toFixed(0)}%
                  </Text>
                  <Text style={styles.data}>
                    {(values.carbohydrates * 82).toFixed(0)} grams
                  </Text>
                </View>
                <Slider
                  value={values.carbohydrates}
                  onValueChange={newValue =>
                    setFieldValue('carbohydrates', newValue)
                  }
                  style={{width: '85%'}}
                  thumbTintColor="#209BCC"
                  minimumTrackTintColor="#209BCC"
                  maximumTrackTintColor="#ffffff"
                  disabled={false}
                />
                <View style={{marginVertical: 20, marginRight: '70%'}}>
                  <Text style={styles.heading}>Protein</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  <Text style={styles.data}>
                    {(values.protein * 100).toFixed(0)}%
                  </Text>
                  <Text style={styles.data}>
                    {(values.protein * 185).toFixed(0)} grams
                  </Text>
                </View>
                <Slider
                  value={values.protein}
                  onValueChange={newValue => setFieldValue('protein', newValue)}
                  style={{width: '85%'}}
                  thumbTintColor="#209BCC"
                  minimumTrackTintColor="#209BCC"
                  maximumTrackTintColor="#ffffff"
                  disabled={false}
                />
                <View style={{marginVertical: 20, marginRight: '75%'}}>
                  <Text style={styles.heading}>Fat</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}>
                  <Text style={styles.data}>
                    {(values.fat * 100).toFixed(0)}%
                  </Text>
                  <Text style={styles.data}>
                    {(values.fat * 64).toFixed(0)} grams
                  </Text>
                </View>
                <Slider
                  value={values.fat}
                  onValueChange={newValue => setFieldValue('fat', newValue)}
                  style={{width: '85%'}}
                  thumbTintColor="#209BCC"
                  minimumTrackTintColor="#209BCC"
                  maximumTrackTintColor="#ffffff"
                  disabled={false}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Show Chart</CustomButton>
              </View>
            </>
          )}
        </Formik> */}
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
});
