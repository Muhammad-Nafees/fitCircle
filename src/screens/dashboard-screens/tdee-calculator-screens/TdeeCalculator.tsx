import {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {Formik} from 'formik';
// ---------------------------------------------------------------------------------------//
import CustomButton from '../../../components/shared-components/CustomButton';
import {STYLES} from '../../../styles/globalStyles';
import {TdeeCalculatorSchema} from '../../../validations';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import DropdownTextInput from '../../../components/shared-components/CustomDropdownInput';
import {activityFactors} from '../../../../data/data';
import CustomHeader from '../../../components/shared-components/CustomHeader';
import {Unit} from '../../../components/auth-components/create-profile/GenderForm';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {format, parse, parseISO} from 'date-fns';
import {ITDEE} from '../../../interfaces/user.interface';
import {calculateTdee} from '../../../api/dashboard-module';
import Toast from 'react-native-toast-message';
import CustomLoader from '../../../components/shared-components/CustomLoader';
import {useFocusEffect} from '@react-navigation/native';

export const TdeeCalculator = ({navigation, disabled}: any) => {
  const [weightUnit, setWeightUnit] = useState<Unit['kg']>('kg');
  const [heightUnit, setHeightUnit] = useState<Unit['ft']>('ft');
  const [goalWeightUnit, setGoalWeightUnit] = useState<Unit['kg']>('kg');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelectUnit = (unit: keyof Unit, type: string) => {
    if (type == 'kg') {
      setWeightUnit(unit);
    } else if (type == 'ft') {
      setHeightUnit(unit);
    } else {
      setGoalWeightUnit(unit);
    }
  };

  const formikRef: any = useRef();
  const handleSubmit = async (values: any) => {
    const parsedDate = parse(values.startDate, 'dd/MM/yyyy', new Date());
    const formattedDate = format(parsedDate, 'yyyy-MM-dd');

    try {
      const reqData: ITDEE = {
        age: values.age,
        gender: values.gender.toLowerCase(),
        goal: values.goal,
        startDate: new Date(formattedDate),
        height: {
          value: values.height,
          unit: heightUnit,
        },
        weight: {
          value: values.weight,
          unit: weightUnit,
        },
        goalWeight: {
          value: values.goalWeight,
          unit: goalWeightUnit,
        },
        calorieDeficitFactor: values.calorieDeficit.includes('10')
          ? 0.1
          : values.calorieDeficit.includes('15')
          ? 0.15
          : 0.2,
        activityFactor:
          activityFactors[values.activityFactor as keyof typeof activityFactors]
            .value,
      };
      setIsLoading(true);
      console.log(reqData, 'reqData from tdee!');
      const response = await calculateTdee(reqData);
      const data = response?.data?.data;
      navigation.navigate('Results', {
        data: data,
      });
      setIsLoading(false);
    } catch (error: any) {
      console.log(error?.response, 'from calculate tdee');
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    formikRef.current?.resetForm();
  }, []);
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <View style={{paddingBottom: 10}}>
        <CustomHeader onPress={() => navigation.goBack()} />
      </View>
      <ScrollView keyboardShouldPersistTaps="always">
        <Formik
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
              <Text style={[STYLES.text16, styles.heading]}>
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
                  extraDropdownStyle={styles.dropdownStyle}
                  extraSelectedRowStyle={styles.dropdownSelectedRowStyle}
                />
                <CustomInput
                  label="Age"
                  starlabel={true}
                  placeholder="Type here"
                  value={values.age}
                  error={errors.age as string}
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
                    editable={true}
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
                    onSelectUnit={handleSelectUnit}
                  />
                </View>
                <View style={{width: '85%', marginTop: 2}}>
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
                    onSelectUnit={handleSelectUnit}
                  />
                </View>
                <CustomSelect
                  label="Goal"
                  placeholder="Choose here"
                  starlabel={true}
                  values={['Muscle Gain', 'Weight Loss/Cutting', 'Maintain']}
                  selectedValue={values.goal}
                  error={errors.goal}
                  initialTouched={true}
                  touched={touched.goal}
                  setFieldValue={setFieldValue}
                  setFieldError={setFieldError}
                  fieldName="goal"
                  extraRowTextStyle={{color: 'white', fontSize: 12}}
                  extraRowStyle={{backgroundColor: 'rgba(68, 68, 68, 1)'}}
                  extraDropdownStyle={styles.dropdownStyle}
                  extraSelectedRowStyle={styles.dropdownSelectedRowStyle}
                />

                <TouchableWithoutFeedback
                  onPress={() => setDatePickerVisible(true)}>
                  <View style={{position: 'relative'}}>
                    <CustomInput
                      label="Start Date (dd/mm/yyyy)"
                      placeholder="Type here"
                      value={values.startDate}
                      error={errors.startDate as string}
                      touched={touched.startDate}
                      initialTouched={true}
                      handleChange={handleChange('dob')}
                      setFieldError={setFieldError}
                      fieldName="startDate"
                      editable={false}
                    />
                    <Icon
                      name="calendar-outline"
                      size={23}
                      color="black"
                      style={{
                        position: 'absolute',
                        right: horizontalScale(12),
                        top: 32,
                      }}
                    />
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={(e: any) => {
                        const formattedDate = format(e, 'dd/MM/yyyy');
                        setFieldValue('startDate', formattedDate);
                        setFieldError('startDate', '');
                        setDatePickerVisible(false);
                      }}
                      onCancel={() => setDatePickerVisible(false)}
                    />
                  </View>
                </TouchableWithoutFeedback>
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>Goal Weight</Text>
                  <DropdownTextInput
                    value={values.goalWeight}
                    placeholder="Type here"
                    options={['kg', 'lb']}
                    defaultOption="Kg"
                    handleChange={handleChange('goalWeight')}
                    error={errors.goalWeight}
                    touched={touched.goalWeight}
                    initialTouched={true}
                    setFieldError={setFieldError}
                    fieldName="goalWeight"
                    tdee={true}
                    onSelectUnit={handleSelectUnit}
                  />
                </View>
                <CustomSelect
                  label="Calorie Deficit"
                  starlabel={true}
                  values={[
                    `Slow${' '.padEnd(68)}TDEE (.10)`,
                    `Moderate${' '.padEnd(60)}TDEE (.15)`,
                    `Aggressive${' '.padEnd(57)}TDEE (.20)`,
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
                  extraDropdownStyle={styles.dropdownStyle}
                  extraSelectedRowStyle={styles.dropdownSelectedRowStyle}
                />
                <CustomSelect
                  placeholder="Choose here"
                  label="Activity Factor"
                  starlabel={true}
                  values={Object.keys(activityFactors)}
                  selectedValue={values.activityfactor}
                  error={errors.activityfactor}
                  initialTouched={true}
                  touched={touched.activityfactor}
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
                  extraDropdownStyle={styles.dropdownStyle}
                  extraSelectedRowStyle={styles.dropdownSelectedRowStyle}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit} isDisabled={isLoading}>
                  {isLoading ? <CustomLoader /> : 'Continue'}{' '}
                </CustomButton>
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
  heading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  button: {
    marginTop: verticalScale(100),
    marginHorizontal: verticalScale(41),
    marginBottom: verticalScale(35),
  },
  label: {
    fontSize: moderateScale(12),
    // lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  dropdownStyle: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dropdownSelectedRowStyle: {
    backgroundColor: 'rgba(68, 68, 68, 1)',
    marginVertical: 0,
    borderRadius: 0,
  },
  inputContainer: {
    flex: 1,
    marginTop: 3,
  },
});
