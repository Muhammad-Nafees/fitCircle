import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Formik} from 'formik';
// -----------------------------------------------------------------------------//
import CustomButton from '../../../components/shared-components/CustomButton';
import CustomInput from '../../../components/shared-components/CustomInput';
import {STYLES} from '../../../styles/globalStyles';
import {
  verticalScale,
  moderateScale,
  horizontalScale,
} from '../../../utils/metrics';
import {PhysicalActivitySchema} from '../../../validations';

const VerificationFive = ({
  navigation,
  disabled,
  route,
  data,
  disabledStlyes,
}: any) => {
  const formdata: null | any = data;
  const handleSubmit = (values: any) => {
    const VALUES = {
      ...values,
      desiredBodyFat: `${values.desiredBodyFat}%`,
      desiredWeight: `${values.desiredWeight} kg`,
      desiredLeanMuscle: `${values.desiredLeanMuscle}%`,
    };
    navigation.navigate('VerificationSix', {
      ...route.params,
      verificationFive: VALUES,
    });
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            desiredBodyFat: formdata?.desiredBodyFat ?? '',
            desiredWeight: formdata?.desiredWeight ?? '',
            desiredLeanMuscle: formdata?.desiredLeanMuscle ?? '',
            exercisesPerWeek: formdata?.exercisesPerWeek ?? '',
          }}
          validateOnChange={false}
          validationSchema={PhysicalActivitySchema}
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
              {disabled !== true && (
                <View style={{marginTop: 16, paddingHorizontal: 16}}>
                  <Text
                    style={[
                      STYLES.text16,
                      {
                        fontWeight: '700',
                        paddingBottom: 28,
                      },
                    ]}>
                    Physical Activity Readiness
                  </Text>
                  <Text style={styles.subHeading}>
                    Please list your desired fitness goals:
                  </Text>
                </View>
              )}
              <View style={styles.formContainer}>
                <CustomInput
                  editable={!disabled}
                  label="Desired Body Fat"
                  placeholder="19%"
                  value={values.desiredBodyFat}
                  handleChange={handleChange('desiredBodyFat')}
                  keyboardType="numeric"
                  error={errors.desiredBodyFat as string}
                  touched={touched.desiredBodyFat as boolean}
                  setFieldError={setFieldError}
                  fieldName="desiredBodyFat"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  editable={!disabled}
                  label="Desired Weight"
                  placeholder="61 kg"
                  value={values.desiredWeight}
                  handleChange={handleChange('desiredWeight')}
                  keyboardType="numeric"
                  error={errors.desiredWeight as string}
                  touched={touched.desiredWeight as boolean}
                  setFieldError={setFieldError}
                  fieldName="desiredWeight"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  label="Desired Lean Muscle"
                  editable={!disabled}
                  placeholder="70-90%"
                  value={values.desiredLeanMuscle}
                  handleChange={handleChange('desiredLeanMuscle')}
                  error={errors.desiredLeanMuscle as string}
                  touched={touched.desiredLeanMuscle as boolean}
                  setFieldError={setFieldError}
                  fieldName="desiredLeanMuscle"
                  extraStyles={disabledStlyes}
                />
                <CustomInput
                  label="I plan to exercise ______ times of the week."
                  editable={!disabled}
                  placeholder="6"
                  value={values.exercisesPerWeek}
                  handleChange={handleChange('exercisesPerWeek')}
                  keyboardType="numeric"
                  error={errors.exercisesPerWeek as string}
                  touched={touched.exercisesPerWeek as boolean}
                  setFieldError={setFieldError}
                  fieldName="exercisesPerWeek"
                  extraStyles={disabledStlyes}
                />
              </View>
              {disabled !== true && (
                <View style={styles.button}>
                  <CustomButton onPress={handleSubmit}>Continue</CustomButton>
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(20),
    marginHorizontal: horizontalScale(30),
    zIndex: 1000,
  },
  inputContainer: {
    flex: 3,
  },
  label: {
    fontSize: moderateScale(12),
    // lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  formContainer: {
    alignItems: 'center',
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
  subHeading: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    paddingBottom: 28,
  },
});

export default VerificationFive;
