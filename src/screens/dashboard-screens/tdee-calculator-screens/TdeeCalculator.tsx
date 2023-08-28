import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import {STYLES} from '../../../styles/globalStyles';
import {TdeeCalculatorSchema} from '../../../validations';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import {moderateScale, verticalScale} from '../../../utils/metrics';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import CustomHeader from '../../../components/shared-components/CustomHeader';

export const TdeeCalculator = ({navigation}: any) => {
  const handleSubmit = () => {
    navigation.navigate('Results');
  };
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <View style={{paddingBottom: 10}}>
        <CustomHeader
          onPress={() =>
            navigation.navigate('DashboardScreen', {screen: 'Dashboard'})
          }
        />
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
          initialValues={{
            gender: '',
            age: '',
            height: '',
            weight: '',
            goal: '',
            startDate: '',
            goalWeight: '',
            caloriedeficit: '',
            activityfactor: '',
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
                  placeholder="Gender"
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
                  starlabel={true}
                  placeholder="Type here"
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
                  <Text style={styles.label}>
                    Height
                    <Text style={{color: 'rgba(255, 145, 145, 1)'}}>*</Text>
                  </Text>
                  <DropdownTextInput
                    value={values.height}
                    options={['ft', 'm']}
                    placeholder="Type here"
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
                  <Text style={styles.label}>
                    Weight
                    <Text style={{color: 'rgba(255, 145, 145, 1)'}}>*</Text>
                  </Text>
                  <DropdownTextInput
                    value={values.weight}
                    options={['kg', 'lb']}
                    placeholder="Type here"
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
                  placeholder="Choose here"
                  starlabel={true}
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
                <CustomInput
                  label="Start Date (dd/mm/yyyy)"
                  placeholder="Type here"
                  value={values.startDate}
                  error={errors.startDate}
                  touched={touched.startDate}
                  initialTouched={true}
                  handleChange={handleChange('startDate')}
                  setFieldError={setFieldError}
                  fieldName="startDate"
                />
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>Goal Weight</Text>
                  <DropdownTextInput
                    value={values.weight}
                    placeholder="Type here"
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
                  placeholder="Choose here"
                  starlabel={false}
                  values={[
                    'Slow                                                                              TDEE (.10)',
                    'Moderate                                                                     TDEE (.15)',
                    'Aggressive                                                                  TDEE (.15)',
                  ]}
                  selectedValue={values.goal}
                  error={errors.caloriedeficit}
                  initialTouched={true}
                  touched={touched.caloriedeficit}
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
                  placeholder="Choose here"
                  values={[
                    'Sedentary (Little or no exercise)',
                    'Lightly active (Light exercise/sports 3-5 days a week)',
                    'Moderately active (Moderate exercise/sports 3-5 days aweek)',
                    'Very active (Hard exercise/sports 6-7 days a week)',
                    'Extra active (Hard exercise/sports 6-7 days a week, plus physical job)',
                  ]}
                  selectedValue={values.activityfactor}
                  error={errors.activityfactor}
                  initialTouched={true}
                  touched={touched.activityfactor}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="activityFactor"
                  extraRowTextStyle={{
                    color: 'white',
                    fontSize: 10,
                  }}
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
