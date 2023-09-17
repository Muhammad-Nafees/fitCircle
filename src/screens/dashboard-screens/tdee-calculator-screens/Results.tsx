import {View, Text, ScrollView, StyleSheet, BackHandler} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import CustomInput from '../../../components/shared-components/CustomInput';
import {verticalScale} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useEffect} from 'react';

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
                Results
              </Text>
              <View style={styles.formContainer}>
                <CustomInput
                  label="Your BMI score"
                  placeholder="Something"
                  value={values.bmi}
                  fieldName="bmi"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Your BMR is"
                  placeholder=""
                  value={values.bmr}
                  fieldName="bmr"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Deficit Calories"
                  placeholder=""
                  value={values.deficitCalories}
                  fieldName="deficitCalories"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Daily Calories"
                  placeholder=""
                  value={values.dailyCalories}
                  fieldName="dailyCalories"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Days to reach your goal"
                  placeholder=""
                  value={values.daysToReachGoal}
                  fieldName="daysToReachGoal"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Target Date (dd/mm/yyyy)"
                  placeholder=""
                  value={values.targetDate}
                  fieldName="targetDate"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                />
                <CustomInput
                  label="Your TDEE is"
                  placeholder=""
                  value={values.tdee}
                  fieldName="tdee"
                  editable={false}
                  extraStyles={{
                    backgroundColor: 'rgba(68, 68, 68, 0.5)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
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
});
