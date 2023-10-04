import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';
import CustomInput from '../../components/shared-components/CustomInput';
import {Formik} from 'formik';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
import UploadIcon from '../../../assets/icons/UploadIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import {useState} from 'react';

const initialValues = {
  packageTitle: '',
  packageDescription: '',
  preview: '',
  cost: '',
  hours: '',
  username: '',
};

const CreatePackage = ({navigation}: any) => {
  const [selectedImageUri, setSelectedImageUri] = useState<any>(null);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        setSelectedImageUri(uri);
      }
    });
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
        <Text style={styles.heading}>Create a package</Text>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
                  label="Package Title"
                  placeholder="Enter here"
                  value={values.packageTitle}
                  error={errors.packageTitle}
                  touched={touched.packageTitle}
                  initialTouched={true}
                  labelStyles={styles.label}
                  extraStyles={styles.textInput}
                  handleChange={handleChange('packageTitle')}
                  setFieldError={setFieldError}
                  fieldName="packageTitle"
                />
                <CustomInput
                  label="Package Description"
                  placeholder="Description here"
                  value={values.packageDescription}
                  error={errors.packageDescription}
                  touched={touched.packageDescription}
                  initialTouched={true}
                  labelStyles={styles.label}
                  multiline
                  handleChange={handleChange('packageDescription')}
                  textAlignVertical="top"
                  extraStyles={[styles.textInput, {height: verticalScale(130)}]}
                  setFieldError={setFieldError}
                  fieldName="packageDescription"
                />
                <View>
                  <Text style={styles.label}>Preview</Text>
                  {selectedImageUri ? (
                    <ImageBackground
                      source={{uri: selectedImageUri}}
                      style={styles.uploadContainer}>
                      <TouchableOpacity
                        style={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          padding: 10,
                          borderRadius: 5,
                        }}
                        onPress={handleImageUpload}>
                        <Text style={{color: 'white'}}>Change Image</Text>
                      </TouchableOpacity>
                    </ImageBackground>
                  ) : (
                    <TouchableOpacity
                      style={styles.uploadContainer}
                      onPress={handleImageUpload}>
                      <UploadIcon />
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: 'rgba(0, 0, 0, 0.2)',
                        }}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <CustomInput
                  label="Cost"
                  placeholder="$0.00"
                  value={values.cost}
                  error={errors.cost}
                  labelStyles={styles.label}
                  touched={touched.cost}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="cost"
                  handleChange={handleChange('cost')}
                />
                <CustomInput
                  label="Hours"
                  placeholder="1"
                  value={values.hours}
                  error={errors.hours}
                  touched={touched.hours}
                  labelStyles={styles.label}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="hours"
                  handleChange={handleChange('housr')}
                />
                <CustomInput
                  label="Username  (only the username listed will see this Meal plan)"
                  placeholder="@linconsmith"
                  value={values.username}
                  error={errors.username}
                  touched={touched.username}
                  labelStyles={styles.label}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="username"
                  handleChange={handleChange('username')}
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
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  textInput: {
    borderRadius: 10,
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginBottom: 10,
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(320),
    height: verticalScale(155),
    borderRadius: 10,
    marginBottom: 16,
    gap: 10,
    backgroundColor: 'rgba(222, 222, 222, 1)',
  },
});

export default CreatePackage;
