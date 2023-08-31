import {View, Text, ScrollView, StyleSheet} from 'react-native';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import {STYLES} from '../../../styles/globalStyles';
import {TdeeCalculatorSchema} from '../../../validations';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import {moderateScale, verticalScale} from '../../../utils/metrics';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import axiosInstance from '../../../api/interceptor';
import {useEffect, useRef} from 'react';
import {format} from 'date-fns';

const activityFactors = {
  'Sedentary (Little or no exercise)': {
    value: 1.2,
  },
  'Lightly active (Light exercise/sports 1-3 days a week)': {
    value: 1.3,
  },
  'Moderately active (Moderate exercise/sports 3-5 days aweek)': {
    value: 1.5,
  },
  'Very active (Hard exercise/sports 6-7 days a week)': {
    value: 1.7,
  },
  'Extra active (Hard exercise/sports 6-7 days a week, plus physical job)': {
    value: 1.9,
  },
};
import CustomHeader from '../../../components/shared-components/CustomHeader';

export const TdeeCalculator = ({navigation}: any) => {
  const formikRef: any = useRef();

  const handleSubmit = async (values: any) => {
    try {
      const currentDate = format(new Date(), 'dd/LL/Y');
      const reqObj = {
        gender: values.gender.toLowerCase(),
        age: values.age,
        height: values.height,
        weight: values.weight,
        goal:
          values.goal === 'Muscle Gain'
            ? 'slow'
            : values.goal === 'Weight loss/cutting'
            ? 'moderate'
            : 'aggressive',
        calorieDeficit: values.calorieDeficit.includes('10')
          ? 0.1
          : values.calorieDeficit.includes('15')
          ? 0.15
          : 0.2,
        startDate: currentDate,
        goalWeight: values.goalWeight,
        activityFactor:
          activityFactors[values.activityFactor as keyof typeof activityFactors]
            .value,
      };

      const response = await axiosInstance.post(`tdee/result`, reqObj);

      formikRef.current?.resetForm();
      if (response.status === 200)
        navigation.navigate('Results', {
          data: response.data,
          weight: values.weight,
        });
    } catch (error) {
      console.log('🚀 ~ handleFormSave ~ error:', error);
    }
  };

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);
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
          // const
          innerRef={formikRef}
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
                    value={values.goalWeight}
                    placeholder="Type here"
                    options={['kg', 'lb']}
                    defaultOption="kg"
                    handleChange={handleChange('goalWeight')}
                    error={errors.goalWeight}
                    touched={touched.goalWeight}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="goalWeight"
                    tdee={true}
                  />
                </View>
                <CustomSelect
                  label="Calorie Deficit"
                  starlabel={true}
                  values={[
                    'Slow                                                                              TDEE (.10)',
                    'Moderate                                                                     TDEE (.15)',
                    'Aggressive                                                                  TDEE (.20)',
                  ]}
                  selectedValue={values.goal}
                  error={errors.caloriedeficit}
                  initialTouched={true}
                  touched={touched.caloriedeficit}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  handleChange={handleChange('calorieDeficit')}
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
                  placeholder="Choose here"
                  label="Activity Factor"
                  starlabel={true}
                  values={Object.keys(activityFactors)}
                  selectedValue={values.activityFactor}
                  error={errors.activityFactor}
                  initialTouched={true}
                  touched={touched.activityFactor}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  handleChange={handleChange('activityFactor')}
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
