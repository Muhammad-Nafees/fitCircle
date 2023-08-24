import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Formik, Field} from 'formik';
import CustomButton from '../../../components/shared-components/CustomButton';
import {STYLES} from '../../../styles/globalStyles';
import CustomRadioButton from '../../../components/dashboard-components/CustomRadioButton';
import {PhysicalReadinessTestSchema} from '../../../validations';
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

const VerificationFour = ({disabled, navigation}: any) => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            answer7: '',
            mealsEat: '',
            answer8: '',
            answer9: '',
            answer10: '',
            answer11: '',
            answer12: '',
            answer13: '',
            answer14: '',
            answer15: '',
            durationExercise: '',
            seriousness: '',
          }}
          validateOnChange={false}
          validationSchema={PhysicalReadinessTestSchema}
          onSubmit={values => {
            console.log('Form values:', values);
          }}>
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
                      text="Do you ever feel weak, fatigued, or sluggish?"
                      value={field.value}
                      selectedValue={values['answer7']}
                      setFieldValue={setFieldValue}
                      name="answer7"
                    />
                  )}
                </Field>
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    label="How many meals do you eat each day?"
                    placeholder="3"
                    value={values.mealsEat}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('mealsEat')}
                    setFieldError={setFieldError}
                    fieldName="mealsEat"
                  />
                </View>
                {questionTexts.map((text, index = 7) => (
                  <Field key={`answer${index + 1}`} name={`answer${index + 1}`}>
                    {({field}: any) => (
                      <CustomRadioButton
                        text={text}
                        value={field.value}
                        selectedValue={values[`answer${index + 1}`]}
                        setFieldValue={setFieldValue}
                        name={`answer${index + 1}`}
                      />
                    )}
                  </Field>
                ))}
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    label="How long have you been exercising?"
                    placeholder="1 month"
                    value={values.durationExercise}
                    initialTouched={true}
                    keyboardType="default"
                    handleChange={handleChange('durationExercise')}
                    setFieldError={setFieldError}
                    fieldName="durationExercise"
                  />
                </View>
                {questionTexts2.map((text, index = 13) => (
                  <Field key={`answer${index + 1}`} name={`answer${index + 1}`}>
                    {({field}: any) => (
                      <CustomRadioButton
                        text={text}
                        value={field.value}
                        selectedValue={values[`answer${index + 1}`]}
                        setFieldValue={setFieldValue}
                        name={`answer${index + 1}`}
                      />
                    )}
                  </Field>
                ))}
                <View style={{alignItems: 'center'}}>
                  <CustomInput
                    label="On a scale of 1 to 10, how serious are you about achieving your goals? least 1 2 3 4 5 6 7 8 9 10 most"
                    placeholder="9"
                    value={values.seriousness}
                    initialTouched={true}
                    keyboardType="numeric"
                    handleChange={handleChange('seriousness')}
                    setFieldError={setFieldError}
                    fieldName="seriousness"
                  />
                </View>
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton
                    onPress={() => navigation.navigate('VerificationFive')}>
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
