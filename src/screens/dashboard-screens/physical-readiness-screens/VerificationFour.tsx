import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {Formik, Field, FormikValues} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import {STYLES} from '../../../styles/globalStyles';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {PhysicalReadinessFourSchema} from '../../../validations';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
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
  seriousness: string;
  durationExercise: string;
  mealsEat: string;
  answer7: string;
  answer8: string;
  answer9: string;
  answer10: string;
  answer11: string;
  answer12: string;
  answer13: string;
  answer14: string;
  answer15: string;
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
    navigation.navigate('VerificationFive', {
      ...route.params,
      verificationFour: {
        physicalAReadiness: [
          {
            answer: values.answer7,
            question: question7,
          },
          {
            answer: values.mealsEat,
            question: questionMealsEat,
          },
          {
            answer: values.answer8,
            question: questionTexts[0],
          },
          {
            answer: values.answer9,
            question: questionTexts[1],
          },
          {
            answer: values.answer10,
            question: questionTexts[2],
          },
          {
            answer: values.answer11,
            question: questionTexts[3],
          },
          {
            answer: values.answer12,
            question: questionTexts[4],
          },
          {
            answer: values.answer13,
            question: questionTexts[5],
          },
          {
            answer: values.answer14,
            question: questionTexts2[0],
          },
          {
            answer: values.answer15,
            question: questionTexts2[1],
          },
          {
            answer: values.durationExercise,
            question: questionDurationExercise,
          },
          {
            answer: values.seriousness,
            question: questionSeriousness,
          },
        ],
      },
    });
  };

  const initialValues: FormValues = {
    answer7:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[0]?.answer) ??
      '',
    mealsEat:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[1]?.answer) ??
      '',
    answer8:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[2]?.answer) ??
      '',
    answer9:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[3]?.answer) ??
      '',
    answer10:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[4]?.answer) ??
      '',
    answer11:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[5]?.answer) ??
      '',
    answer12:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[6]?.answer) ??
      '',
    answer13:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[7]?.answer) ??
      '',
    answer14:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[8]?.answer) ??
      '',
    answer15:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[9]?.answer) ??
      '',
    durationExercise:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[10]?.answer) ??
      '',
    seriousness:
      (formdata?.physicalAReadiness &&
        formdata?.physicalAReadiness[11]?.answer) ??
      '',
  };

  const labelStyles = {
    fontSize: 12,
    fontWeight: '400',
    color: 'white',
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
            console.log(values, 'valuesss');
            return (
              <>
                {disabled !== true && (
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
                    Physical Activity Readiness
                  </Text>
                )}
                <View style={styles.formContainer}>
                  <CustomRadioButton
                    disabled={disabled}
                    text={question7}
                    value={values.answer7}
                    setFieldValue={setFieldValue}
                    name="answer7"
                    error={errors.answer7}
                    isFormSubmitted={isFormSubmitted}
                  />
                  <View style={{alignItems: 'center'}}>
                    <CustomInput
                      editable={
                        typeof disabled === 'boolean' ? !disabled : disabled
                      }
                      touched={touched.mealsEat}
                      label={questionMealsEat}
                      error={errors.mealsEat}
                      placeholder="3"
                      value={values.mealsEat}
                      initialTouched={true}
                      keyboardType="numeric"
                      handleChange={handleChange('mealsEat')}
                      setFieldError={setFieldError}
                      fieldName="mealsEat"
                      labelStyles={labelStyles}
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
                      touched={touched.durationExercise}
                      label={questionDurationExercise}
                      error={errors.durationExercise}
                      placeholder="1 month"
                      value={values.durationExercise}
                      initialTouched={true}
                      keyboardType="default"
                      handleChange={handleChange('durationExercise')}
                      setFieldError={setFieldError}
                      fieldName="durationExercise"
                      labelStyles={labelStyles}
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
                      touched={touched.seriousness}
                      label={questionSeriousness}
                      error={errors.seriousness}
                      placeholder="9"
                      value={values.seriousness}
                      initialTouched={true}
                      keyboardType="numeric"
                      handleChange={handleChange('seriousness')}
                      setFieldError={setFieldError}
                      fieldName="seriousness"
                      labelStyles={labelStyles}
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
  label: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  formContainer: {paddingHorizontal: 40},
  button: {
    marginTop: verticalScale(60),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
});

export default VerificationFour;
