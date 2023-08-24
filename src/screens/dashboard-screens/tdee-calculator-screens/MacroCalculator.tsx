import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import Slider from '@react-native-community/slider';
import SliderThumb from '../../../../assets/icons/ColorChart';

export const MacroCalculator = () => {
  const handleSubmit = () => {
    console.log('Submit');
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            preset: '',
            carbohydrates: 20,
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
                <Slider
                  value={0.1}
                  lowerLimit={0}
                  upperLimit={100}
                  style={{width: '85%'}}
                  thumbTintColor="#209BCC"
                  minimumTrackTintColor="#209BCC"
                  maximumTrackTintColor="#ffffff"
                  disabled={true}
                  thumbImage={{
                    uri: '../../../../assets/Ellipse.png',
                  }}
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
});
