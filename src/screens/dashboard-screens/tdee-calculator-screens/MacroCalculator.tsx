import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import Slider from '@react-native-community/slider';
import SliderThumb from '../../../../assets/icons/ColorChart';

export const MacroCalculator = ({navigation}: any) => {
  const handleSubmit = () => {
    navigation.navigate('Chart');
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
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
                <CustomSelect
                  label="Select a Preset (Carb % / Protein % / Fat %)"
                  values={[
                    'High Card',
                    'High Protein',
                    'Recommended',
                    'Low Carb',
                    'Ketogenic',
                  ]}
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
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(100),
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
