import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, BackHandler} from 'react-native';
import {Formik, Field} from 'formik';
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

const questionTexts = [
  'Do you know how many calories you eat in a day?',
  'Do you eat breakfast?',
  'Are you taking supplements? (i.e. vitamins, amino acids, protein shakes, etc.)',
  'Do you need several cups of coffee to keep you going throughout the day?',
  'Do you often experience digestive difficulties?',
  'Proper nutrition can increase the body’s ability to enhance physical and mental performance by up to 80%. Do you feel that a properly structured nutrition and exercise program would benefit you?',
];

const questionTexts2 = [
  'Have you reached and maintained your goals?',
  'Are you happy with the way you look and your health?',
];

const question7 = 'Do you ever feel weak, fatigued, or sluggish?';
const questionMealsEat = 'How many meals do you eat each day?';
const questionDurationExercise = 'How long have you been exercising?';
const questionSeriousness =
  'On a scale of 1 to 10, how serious are you about achieving your goals? least 1 2 3 4 5 6 7 8 9 10 most';

const VerificationFour = ({disabled, navigation, route, data}: any) => {
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

  const [errorStates, setErrorStates] = useState({answer7: false});

  const [errorStates1, setErrorStates1] = useState({
    answer8: false,
    answer9: false,
    answer10: false,
    answer11: false,
    answer12: false,
    answer13: false,
  });

  const [errorStates2, setErrorStates2] = useState({
    answer14: false,
    answer15: false,
  });

  const handleSubmit = (values: {
    answer10: string;
    answer11: string;
    answer12: string;
    answer13: string;
    answer14: string;
    answer15: string;
    answer7: string;
    answer8: string;
    answer9: string;
    durationExercise: string;
    mealsEat: string;
    seriousness: string;
  }) => {
    console.log('Form values:', values);

    const answersArr = Object.values(values);
    const isRemainingField = answersArr.find(ans => ans === '') === '';
    for (let i = 7; i <= 7; i++) {
      const fieldName = `answer${i}`;
      if (!values[fieldName]) {
        setErrorStates(prevState => ({
          ...prevState,
          [fieldName]: true,
        }));
      } else {
        setErrorStates(prevState => ({
          ...prevState,
          [fieldName]: false,
        }));
      }
    }
    for (let i = 8; i <= 13; i++) {
      const fieldName = `answer${i}`;
      if (!values[fieldName]) {
        setErrorStates1(prevState => ({
          ...prevState,
          [fieldName]: true,
        }));
      } else {
        setErrorStates1(prevState => ({
          ...prevState,
          [fieldName]: false,
        }));
      }
    }
    for (let i = 14; i <= 15; i++) {
      const fieldName = `answer${i}`;
      if (!values[fieldName]) {
        setErrorStates2(prevState => ({
          ...prevState,
          [fieldName]: true,
        }));
      } else {
        setErrorStates2(prevState => ({
          ...prevState,
          [fieldName]: false,
        }));
      }
    }

    if (
      Object.values(errorStates1).some(error => error) ||
      Object.values(errorStates2).some(error => error)
    ) {
      return;
    }
    if (Object.values(errorStates).some(error => error)) {
      return;
    }
    if (isRemainingField) return;

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
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialTouched={true}
          initialValues={{
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
          }}
          validateOnChange={true}
          validationSchema={PhysicalReadinessFourSchema}
          onSubmit={values => console.log('Form values:', values)}>
          {({
            handleChange,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldError,
          }) => (
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
                <Field key={`answer7`} name={`answer7`}>
                  {({field}: any) => (
                    <CustomRadioButton
                      disabled={disabled}
                      text={question7}
                      value={field.value}
                      selectedValue={values['answer7']}
                      setFieldValue={setFieldValue}
                      name="answer7"
                      errorShow={errorStates[`answer7`]}
                      setErrorShow={value =>
                        setErrorStates(prevState => ({
                          ...prevState,
                          [`answer7`]: value,
                        }))
                      }
                    />
                  )}
                </Field>
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    editable={
                      typeof disabled === 'boolean' ? !disabled : disabled
                    }
                    touched={touched.mealsEat as boolean}
                    label={questionMealsEat}
                    error={errors.mealsEat as string}
                    placeholder="3"
                    value={values.mealsEat}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('mealsEat')}
                    setFieldError={setFieldError}
                    fieldName="mealsEat"
                  />
                </View>
                {questionTexts.map((text, index) => {
                  return (
                    <Field
                      key={`answer${index + 8}`}
                      name={`answer${index + 8}`}>
                      {({field}: any) => (
                        <CustomRadioButton
                          disabled={disabled}
                          text={text}
                          value={field.value}
                          selectedValue={values[`answer${index + 8}`]}
                          setFieldValue={setFieldValue}
                          name={`answer${index + 8}`}
                          errorShow={errorStates1[`answer${index + 8}`]}
                          setErrorShow={value =>
                            setErrorStates1(prevState => ({
                              ...prevState,
                              [`answer${index + 8}`]: value,
                            }))
                          }
                        />
                      )}
                    </Field>
                  );
                })}
                <View style={{alignItems: 'center', position: 'relative'}}>
                  <CustomInput
                    editable={
                      typeof disabled === 'boolean' ? !disabled : disabled
                    }
                    touched={touched.durationExercise as boolean}
                    label={questionDurationExercise}
                    error={errors.durationExercise as string}
                    placeholder="1 month"
                    value={values.durationExercise}
                    initialTouched={true}
                    keyboardType="default"
                    handleChange={handleChange('durationExercise')}
                    setFieldError={setFieldError}
                    fieldName="durationExercise"
                  />
                </View>
                {questionTexts2.map((text, indx) => {
                  return (
                    <Field
                      key={`answer${indx + 14}`}
                      name={`answer${indx + 14}`}>
                      {({field}: any) => (
                        <CustomRadioButton
                          disabled={disabled}
                          text={text}
                          value={field.value}
                          selectedValue={values[`answer${indx + 14}`]}
                          setFieldValue={setFieldValue}
                          name={`answer${indx + 14}`}
                          errorShow={errorStates2[`answer${indx + 14}`]}
                          setErrorShow={value =>
                            setErrorStates2(prevState => ({
                              ...prevState,
                              [`answer${indx + 14}`]: value,
                            }))
                          }
                        />
                      )}
                    </Field>
                  );
                })}
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    editable={
                      typeof disabled === 'boolean' ? !disabled : disabled
                    }
                    touched={touched.seriousness as boolean}
                    label={questionSeriousness}
                    error={errors.seriousness as string}
                    placeholder="9"
                    value={values.seriousness}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('seriousness')}
                    setFieldError={setFieldError}
                    fieldName="seriousness"
                    require={true}
                  />
                </View>
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton onPress={() => handleSubmit(values)}>
                    Continue
                  </CustomButton>
                </View>
              )}
            </>
          )}
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
