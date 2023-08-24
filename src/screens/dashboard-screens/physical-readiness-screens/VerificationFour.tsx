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

const questionTexts = [
  'Do you ever feel weak, fatigued, or sluggish?',
  'Do you know how many calories you eat in a day?',
  'Do you eat breakfast?',
  'Are you taking supplements? (i.e. vitamins, amino acids, protein shakes, etc.)',
  'Do you need several cups of coffee to keep you going throughout the day?',
  'Do you often experience digestive difficulties?',
  'Proper nutrition can increase the body’s ability to enhance physical and mental performance by up to 80%. Do you feel that a properly structured nutrition and exercise program would benefit you?',
  'Have you reached and maintained your goals?',
  'Are you happy with the way you look and your health?',
];

const VerificationFour = ({disabled}: any) => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            answer7: '',
            answer8: '',
            answer9: '',
            answer10: '',
            answer11: '',
            answer12: '',
            answer13: '',
            answer14: '',
            answer15: '',
          }}
          validateOnChange={false}
          validationSchema={PhysicalReadinessTestSchema}
          onSubmit={values => {
            console.log('Form values:', values);
          }}>
          {({handleSubmit, values, setFieldValue}) => (
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
                {questionTexts.map((text, index = 6) => (
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
