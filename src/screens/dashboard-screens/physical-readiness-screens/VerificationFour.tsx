import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {Formik} from 'formik';
// ---------------------------------------------------------------------------------------//
import CustomButton from '../../../components/shared-components/CustomButton';
import {STYLES} from '../../../styles/globalStyles';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {PhysicalReadinessFourSchema} from '../../../validations';
import {verticalScale} from '../../../utils/metrics';
import CustomInput from '../../../components/shared-components/CustomInput';
import {
  question7,
  questionDurationExercise,
  questionMealsEat,
  questionSeriousness,
  questionTexts,
  questionTexts2,
} from '../../../../data/data';

interface FormValues {
  isFeelWeakEver: string;
  mealsPerDay: string;
  isKnownCalorieConsumptionPerDay: string;
  isEatBreakfast: string;
  isTakingSupplements: string;
  isTakingSeveralCupsOfCoffee: string;
  isDigestiveProblems: string;
  isNutritionOrExerciseBenefits: string;
  exerciseSince: string;
  isMaintainGoals: string;
  isOkYourLookAndHealth: string;
  goalScale: string;
}

const VerificationFour = ({disabled, navigation, route, data}: any) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const formdata: null | any = data;

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

  const handleSubmit = async (values: FormValues) => {
    console.log(values, 'vvvv');
    navigation.navigate('VerificationFive', {
      ...route.params,
      verificationFour: values,
    });
  };
  console.log(formdata, 'ssssss');

  const initialValues: FormValues = {
    isFeelWeakEver: formdata?.isFeelWeakEver ?? '',
    mealsPerDay: formdata?.mealsPerDay ?? '',
    isKnownCalorieConsumptionPerDay:
      formdata?.isKnownCalorieConsumptionPerDay ?? '',
    isEatBreakfast: formdata?.isEatBreakfast ?? '',
    isTakingSupplements: formdata?.isTakingSupplements ?? '',
    isTakingSeveralCupsOfCoffee: formdata?.isTakingSeveralCupsOfCoffee ?? '',
    isDigestiveProblems: formdata?.isDigestiveProblems ?? '',
    isNutritionOrExerciseBenefits:
      formdata?.isNutritionOrExerciseBenefits ?? '',
    exerciseSince: formdata?.exerciseSince ?? '',
    isMaintainGoals: formdata?.isMaintainGoals ?? '',
    isOkYourLookAndHealth: formdata?.isOkYourLookAndHealth ?? '',
    goalScale: formdata?.goalScale ?? '',
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={initialValues}
          validationSchema={PhysicalReadinessFourSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => {
            return (
              <>
                {disabled !== true && (
                  <Text style={[STYLES.text16, styles.heading]}>
                    Physical Activity Readiness
                  </Text>
                )}
                <View style={styles.formContainer}>
                  <CustomRadioButton
                    disabled={disabled}
                    text={question7}
                    value={values.isFeelWeakEver}
                    setFieldValue={setFieldValue}
                    name="isFeelWeakEver"
                    error={errors.isDigestiveProblems}
                    isFormSubmitted={isFormSubmitted}
                  />
                  <View style={{alignItems: 'center'}}>
                    <CustomInput
                      editable={
                        typeof disabled === 'boolean' ? !disabled : disabled
                      }
                      touched={touched.mealsPerDay}
                      label={questionMealsEat}
                      error={errors.mealsPerDay}
                      placeholder="3"
                      value={values.mealsPerDay}
                      initialTouched={true}
                      keyboardType="numeric"
                      handleChange={handleChange('mealsPerDay')}
                      setFieldError={setFieldError}
                      fieldName="mealsPerDay"
                      labelStyles={styles.labelStyles}
                    />
                  </View>
                  {questionTexts.map(question => (
                    <View key={question.id}>
                      <CustomRadioButton
                        disabled={disabled}
                        text={question.question}
                        value={values[question.id as keyof FormValues]}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        name={question.id}
                        error={errors[question.id as keyof FormValues]}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </View>
                  ))}

                  <View style={{alignItems: 'center', position: 'relative'}}>
                    <CustomInput
                      editable={
                        typeof disabled === 'boolean' ? !disabled : disabled
                      }
                      touched={touched.exerciseSince}
                      label={questionDurationExercise}
                      error={errors.exerciseSince}
                      placeholder="1 month"
                      value={values.exerciseSince}
                      initialTouched={true}
                      keyboardType="default"
                      handleChange={handleChange('exerciseSince')}
                      setFieldError={setFieldError}
                      fieldName="exerciseSince"
                      labelStyles={styles.labelStyles}
                    />
                  </View>
                  {questionTexts2.map(question => (
                    <View key={question.id}>
                      <CustomRadioButton
                        disabled={disabled}
                        text={question.question}
                        value={values[question.id as keyof FormValues]}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        name={question.id}
                        error={errors[question.id as keyof FormValues]}
                        isFormSubmitted={isFormSubmitted}
                      />
                    </View>
                  ))}
                  <View style={{alignItems: 'center'}}>
                    <CustomInput
                      editable={
                        typeof disabled === 'boolean' ? !disabled : disabled
                      }
                      touched={touched.goalScale}
                      label={questionSeriousness}
                      error={errors.goalScale}
                      placeholder="9"
                      value={values.goalScale}
                      initialTouched={true}
                      keyboardType="numeric"
                      handleChange={handleChange('goalScale')}
                      setFieldError={setFieldError}
                      fieldName="goalScale"
                      labelStyles={styles.labelStyles}
                    />
                  </View>
                </View>
                {disabled !== true && (
                  <View style={styles.button}>
                    <CustomButton
                      onPress={() => {
                        setIsFormSubmitted(true), handleSubmit();
                      }}>
                      Continue
                    </CustomButton>
                  </View>
                )}
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyles: {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
  },
  formContainer: {paddingHorizontal: 40},
  button: {
    marginTop: verticalScale(60),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
  heading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
});

export default VerificationFour;
