import {useCallback, useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, BackHandler} from 'react-native';
import {Formik} from 'formik';
// ---------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {format} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';

export const Results = ({navigation, route}: any) => {
  const [targetDate, setTargetDate] = useState<Date | null | string>(null);
  const {data, weight} = route.params;

  useFocusEffect(
    useCallback(() => {
      const date = new Date(data?.targetDate);
      const formattedDate = format(date, 'dd-MM-yyyy');
      setTargetDate(formattedDate);
    }, []),
  );
  console.log(targetDate, 'target');

  const handleSubmit = () => {
    navigation.navigate('MacroCalculator', {data});
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            bmi: data?.bmi.toFixed(1),
            bmr: `${data?.bmr} Calories`,
            deficitCalories: `${data?.calorieDeficit} Calories`,
            dailyCalories: `${data?.dailyCaloriesIntake} Calories`,
            daysToReachGoal: `${data?.daysToReachGoal.toFixed(1)} days`,
            targetDate: targetDate,
            tdee: `${data?.tdee.toFixed(1)} Calories`,
          }}
          onSubmit={handleSubmit}>
          {({handleSubmit, values, handleChange, setFieldError}) => (
            <>
              <Text style={[STYLES.text16, styles.heading]}>Results</Text>
              <View style={styles.formContainer}>
                <CustomInput
                  label="Your BMI score"
                  placeholder="Something"
                  value={values.bmi}
                  fieldName="bmi"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Your BMR is"
                  placeholder=""
                  value={values.bmr}
                  fieldName="bmr"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Deficit Calories"
                  placeholder=""
                  value={values.deficitCalories}
                  fieldName="deficitCalories"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Daily Calories"
                  placeholder=""
                  value={values.dailyCalories}
                  fieldName="dailyCalories"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Days to reach your goal"
                  placeholder=""
                  value={values.daysToReachGoal}
                  fieldName="daysToReachGoal"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Target Date (dd/mm/yyyy)"
                  placeholder=""
                  value={targetDate || values.targetDate}
                  fieldName="targetDate"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
                <CustomInput
                  label="Your TDEE is"
                  placeholder=""
                  value={values.tdee}
                  fieldName="tdee"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                  handleChange={handleChange}
                  setFieldError={setFieldError}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Next</CustomButton>
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
  heading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  textInputExtraStyles: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    color: 'rgba(255, 255, 255, 0.5)',
  },
});
