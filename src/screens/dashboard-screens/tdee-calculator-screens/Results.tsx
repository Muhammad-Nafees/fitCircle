import {useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, BackHandler} from 'react-native';
import {Formik} from 'formik';
// ---------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';

export const Results = ({navigation, route}: any) => {
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
  const {data, weight} = route.params;

  const handleSubmit = () => {
    navigation.navigate('MacroCalculator', {data, weight});
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            bmi: data.bmi.toFixed(1),
            bmr: `${data.bmr} Calories`,
            deficitCalories: `${data.calorieDeficit} Calories`,
            dailyCalories: `${data.dailyCalories} Calories`,
            daysToReachGoal: `${data.daysToReachGoal} days`,
            targetDate: data.targetDate,
            tdee: `${data.tdee.toFixed(1)} Calories`,
          }}
          onSubmit={handleSubmit}>
          {({handleSubmit, values}) => (
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
                />
                <CustomInput
                  label="Your BMR is"
                  placeholder=""
                  value={values.bmr}
                  fieldName="bmr"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                />
                <CustomInput
                  label="Deficit Calories"
                  placeholder=""
                  value={values.deficitCalories}
                  fieldName="deficitCalories"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                />
                <CustomInput
                  label="Daily Calories"
                  placeholder=""
                  value={values.dailyCalories}
                  fieldName="dailyCalories"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                />
                <CustomInput
                  label="Days to reach your goal"
                  placeholder=""
                  value={values.daysToReachGoal}
                  fieldName="daysToReachGoal"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                />
                <CustomInput
                  label="Target Date (dd/mm/yyyy)"
                  placeholder=""
                  value={values.targetDate}
                  fieldName="targetDate"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
                />
                <CustomInput
                  label="Your TDEE is"
                  placeholder=""
                  value={values.tdee}
                  fieldName="tdee"
                  editable={false}
                  extraStyles={styles.textInputExtraStyles}
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
