import CustomInput from '../../../components/shared-components/CustomInput';
import CustomButton from '../../../components/shared-components/CustomButton';
import {Formik} from 'formik';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import UploadMealPdf from '../../../../assets/icons/UploadMealPdf';
const ArrowBack = require('../../../../assets/icons/arrow-back.png');
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import MealPlanPdf from '../../../../assets/icons/MealPlanPdf';
import {useState} from 'react';
import {uploadPlanSchema} from '../../../validations';
import Toast from 'react-native-toast-message';

const UploadMealPlan = ({navigation, route}: any) => {
  const [result, setResult] = useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();
  const [fileName, setFileName] = useState<any>('');
  const dummyData = route.params.dummyData || {};

  const initialValues = {
    title: dummyData.title || '',
    description: dummyData.description || '',
    preview: dummyData.preview || '',
    cost: dummyData.cost || '',
    username: dummyData.username || '',
  };

  const handleSubmit = (values: any) => {
    if (result === null || result === undefined) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'You need to attach a Meal Plan PDF',
      });
    } else {
      console.log(values);
      navigation.navigate('CreateMealPlan');
    }
  };

  const openDocument = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: types.pdf,
      });
      console.log(res);
      if (!isCancel(res)) {
        const nameWithoutExtension = res.name.replace('.pdf', '');
        setResult(res);
        setFileName(nameWithoutExtension);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{paddingTop: 24, paddingBottom: 16}}
          onPress={() => navigation.goBack()}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Upload Meal Plan</Text>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validationSchema={uploadPlanSchema}>
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
              <View style={{alignItems: 'center'}}>
                <CustomInput
                  label="Title"
                  placeholder="Enter here"
                  value={values.title}
                  error={errors.title}
                  touched={touched.title}
                  initialTouched={true}
                  labelStyles={styles.label}
                  extraStyles={styles.textInput}
                  handleChange={handleChange('title')}
                  setFieldError={setFieldError}
                  fieldName="title"
                />
                <CustomInput
                  label="Description "
                  secondLabel={true}
                  placeholder="Description here"
                  value={values.description}
                  error={errors.description}
                  touched={touched.description}
                  initialTouched={true}
                  labelStyles={styles.label}
                  multiline
                  handleChange={handleChange('description')}
                  textAlignVertical="top"
                  extraStyles={[styles.textInput, {height: verticalScale(100)}]}
                  setFieldError={setFieldError}
                  fieldName="description"
                />
                <TouchableOpacity
                  onPress={openDocument}
                  style={styles.document}>
                  {fileName ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 5,
                        alignItems: 'center',
                      }}>
                      <MealPlanPdf width={33} height={43} />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '500',
                          color: 'rgba(255, 255, 255, 1)',
                        }}>
                        {fileName.length > 27
                          ? fileName.substring(0, 27 - 3) + '...'
                          : fileName}
                      </Text>
                    </View>
                  ) : (
                    <UploadMealPdf />
                  )}
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 10,
                      color: 'rgba(255, 255, 255, 0.5)',
                    }}>
                    Uploaded File
                  </Text>
                </TouchableOpacity>
                <CustomInput
                  label="Cost"
                  placeholder=" $0.00"
                  value={values.cost}
                  error={errors.cost}
                  labelStyles={styles.label}
                  touched={touched.cost}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="cost"
                  handleChange={handleChange('cost')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Username  (only the username listed will see this Meal plan)"
                  placeholder=" @linconsmith"
                  value={values.username}
                  error={errors.username}
                  touched={touched.username}
                  labelStyles={[styles.label, {width: horizontalScale(320)}]}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="username"
                  handleChange={handleChange('username')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>Create</CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: horizontalScale(16),
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 20,
  },
  textInput: {
    borderRadius: 10,
    paddingHorizontal: horizontalScale(14),
    width: horizontalScale(340),
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginBottom: 7,
  },
  button: {
    marginVertical: 35,
    marginHorizontal: 30,
  },
  document: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: horizontalScale(340),
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default UploadMealPlan;
