import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import {STYLES} from '../../../styles/globalStyles';
import {TdeeCalculatorSchema} from '../../../validations';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import {moderateScale, verticalScale} from '../../../utils/metrics';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';

export const TdeeCalculator = () => {
  const handleSubmit = () => {
    console.log('Something');
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          const
          initialValues={{
            gender: '',
            age: '',
            height: '',
            weight: '',
            goal: '',
            startDate: '',
            goalWeight: '',
            calorieDeficit: '',
            activityFactor: '',
          }}
          validateOnChange={false}
          validationSchema={TdeeCalculatorSchema}
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
                TDEE Calculator
              </Text>
              <View style={styles.formContainer}>
                <CustomSelect
                  label="Gender"
                  values={['Male', 'Female']}
                  selectedValue={values.gender}
                  error={errors.gender}
                  initialTouched={true}
                  touched={touched.gender}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="gender"
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
                <CustomInput
                  label="Age"
                  placeholder=""
                  value={values.age}
                  error={errors.age}
                  touched={touched.age}
                  initialTouched={true}
                  keyboardType="numeric"
                  handleChange={handleChange('age')}
                  setFieldError={setFieldError}
                  fieldName="age"
                />
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>Height</Text>
                  <DropdownTextInput
                    value={values.height}
                    options={['ft', 'm']}
                    defaultOption="ft"
                    handleChange={handleChange('height')}
                    error={errors.height}
                    touched={touched.height}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="height"
                    tdee={true}
                  />
                </View>
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>Weight</Text>
                  <DropdownTextInput
                    value={values.weight}
                    options={['kg', 'lb']}
                    defaultOption="kg"
                    handleChange={handleChange('weight')}
                    error={errors.weight}
                    touched={touched.weight}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="weight"
                    tdee={true}
                  />
                </View>
                <CustomSelect
                  label="Goal"
                  values={['Muscle Gain', 'Weight loss/cutting', 'Maintain']}
                  selectedValue={values.goal}
                  error={errors.goal}
                  initialTouched={true}
                  touched={touched.goal}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="goal"
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
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>Goal Weight</Text>
                  <DropdownTextInput
                    value={values.weight}
                    options={['kg', 'lb']}
                    defaultOption="kg"
                    handleChange={handleChange('weight')}
                    error={errors.weight}
                    touched={touched.weight}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="weight"
                    tdee={true}
                  />
                </View>
                <CustomSelect
                  label="Calorie Deficit"
                  values={['Slow TDEE (.10)', 'Moderate', 'Aggressive']}
                  selectedValue={values.calorieDeficit}
                  error={errors.calorieDeficit}
                  initialTouched={true}
                  touched={touched.calorieDeficit}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="calorieDeficit"
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
                <CustomSelect
                  label="Activity Factor"
                  values={[
                    'Sedentary (Little or no exercise)',
                    'Lightly active (Light exercise/sports 3-5 days a week)',
                    'Moderately active (Moderate exercise/sports 3-5 days aweek)',
                    'Very active (Hard exercise/sports 6-7 days a week)',
                    'Extra active (Hard exercise/sports 6-7 days a week, plus physical job)',
                  ]}
                  selectedValue={values.calorieDeficit}
                  error={errors.calorieDeficit}
                  initialTouched={true}
                  touched={touched.calorieDeficit}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="calorieDeficit"
                  extraRowTextStyle={{color: 'white', fontSize: 12}}
                  extraRowStyle={{
                    backgroundColor: 'rgba(68, 68, 68, 1)',
                  }}
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
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Continue</CustomButton>
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
  label: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
});
