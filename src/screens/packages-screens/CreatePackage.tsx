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
} from 'react-native';
const ArrowBack = require('../../../assets/icons/arrow-back.png');
import UploadIcon from '../../../assets/icons/UploadIcon';
const CancelIcon = require('../../../assets/icons/cancel.png');
const PlayIcon = require('../../../assets/icons/playIcon.png');
import Modal from 'react-native-modal';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useState, useCallback, useEffect} from 'react';
import Video from 'react-native-video';
import {createPackageSchema} from '../../validations';
import {IPackage} from '../../interfaces/package.interface';
import {FileData} from '../../interfaces/user.interface';
import {createThumbnail} from 'react-native-create-thumbnail';
import {useFocusEffect} from '@react-navigation/native';
import {s3bucketReference} from '../../api';

const CreatePackage = ({navigation, route}: any) => {
  const myPackage = route?.params?.myPackage;
  const [selectedVideoUri, setSelectedVideoUri] = useState<
    FileData | undefined | any
  >(undefined);
  const [video, setVideo] = useState<FileData | undefined | any>(undefined);
  const [videoThumbnail, setVideoThumbnail] = useState<FileData | undefined>(
    undefined,
  );
  const [videoVisible, setVideoVisible] = useState(false);
  const [isEditingPackage, setIsEditingPackage] = useState<boolean>(false);

  const fetchThumbnail = async () => {
    if (selectedVideoUri) {
      try {
        const response = await createThumbnail({
          url: selectedVideoUri.uri,
          timeStamp: 1000,
          format: 'jpeg',
        });
        setVideoThumbnail({
          uri: response.path,
          name: 'thumbnail',
          type: 'image/jpeg',
        });
      } catch (err) {
        console.log('err', err);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (selectedVideoUri) {
        fetchThumbnail();
      }
    }, [selectedVideoUri]),
  );

  useEffect(() => {
    if (myPackage) {
      const video = `${s3bucketReference}/${myPackage?.media}`;
      setVideo(video);
      setIsEditingPackage(true);
    }
  }, []);

  const handleSubmit = (values: any) => {
    const myPackageData: Partial<IPackage> = {
      title: values.packageTitle,
      description: values.packageDescription,
      cost: values.cost,
      hours: values.hours,
      media: (selectedVideoUri as FileData) || video,
      thumbnail: videoThumbnail || myPackage?.thumbnail,
    };
    navigation.navigate('PackageDetail', {
      packageDetails: myPackageData,
      isCreatingPackage: true,
      isEditingPackage: isEditingPackage,
      packageId: myPackage?._id,
    });
  };

  const handleVideoLibrary = async () => {
    setSelectedVideoUri(undefined);
    const options: ImageLibraryOptions = {
      mediaType: 'video',
    };
    await launchImageLibrary(options, (response: any) => {
      if (response.assets) {
        setSelectedVideoUri({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      }
    });
  };

  const initialValues = {
    packageTitle: myPackage?.title || '',
    packageDescription: myPackage?.description || '',
    cost: myPackage?.cost ? String(myPackage?.cost) : '',
    hours: myPackage?.hours ? String(myPackage?.hours) : '',
    username: myPackage?.username || '',
  };

  const handlePlayIconPress = () => {
    setVideoVisible(true);
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
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={createPackageSchema}
          validateOnChange={false}>
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
              <View style={{alignItems: 'center', marginTop: 40}}>
                <CustomInput
                  label="Package Title"
                  placeholder="Enter here"
                  value={values.packageTitle}
                  error={errors.packageTitle as string}
                  touched={touched.packageTitle as boolean}
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
                  error={errors.packageDescription as string}
                  touched={touched.packageDescription as boolean}
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
                  {selectedVideoUri || video ? ( // Render the play icon if a video is selected
                    <TouchableOpacity
                      style={styles.uploadContainer}
                      onPress={handlePlayIconPress}>
                      <Image
                        source={PlayIcon}
                        style={{
                          width: 24,
                          height: 24,
                          tintColor: 'rgba(0, 0, 0, 0.2)',
                        }}
                      />
                      <Text
                        style={{
                          fontWeight: '600',
                          fontSize: 14,
                          color: 'rgba(0, 0, 0, 0.2)',
                        }}>
                        Play Video
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.uploadContainer}
                      onPress={handleVideoLibrary}>
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
                  placeholder="  $0.00"
                  value={values.cost}
                  error={errors.cost as string}
                  labelStyles={styles.label}
                  touched={touched.cost as boolean}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="cost"
                  handleChange={handleChange('cost')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Hours"
                  placeholder="  1"
                  value={values.hours}
                  error={errors.hours as string}
                  touched={touched.hours as boolean}
                  labelStyles={styles.label}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="hours"
                  handleChange={handleChange('hours')}
                  keyboardType="numeric"
                />
                <CustomInput
                  label="Username  (only the username listed will see this Meal plan)"
                  placeholder="  @linconsmith"
                  value={values.username}
                  error={errors.username as string}
                  touched={touched.username as boolean}
                  labelStyles={[styles.label, {width: horizontalScale(320)}]}
                  initialTouched={true}
                  extraStyles={styles.textInput}
                  setFieldError={setFieldError}
                  fieldName="username"
                  handleChange={handleChange('username')}
                />
              </View>
              <View style={styles.button}>
                <CustomButton onPress={handleSubmit}>
                  {myPackage ? 'Edit' : 'Create'}
                </CustomButton>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
      <Modal
        isVisible={videoVisible}
        onBackButtonPress={() => setVideoVisible(false)}
        style={{
          backgroundColor: 'black',
          width: '100%',
          height: '100%',
          margin: 0,
        }}>
        <View style={styles.videoContainer}>
          <Video
            source={{
              uri:
                selectedVideoUri?.uri ||
                video ||
                `${s3bucketReference}/${myPackage?.media}`,
            }}
            style={styles.video}
            resizeMode="contain"
            onEnd={() => setVideoVisible(false)}
            controls={true}
          />
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setVideoVisible(false)}>
            <Image source={CancelIcon} style={styles.cancelIcon} />
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingHorizontal: horizontalScale(14),
    width: horizontalScale(340),
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    color: 'white',
    marginBottom: 7,
  },
  uploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(340),
    height: verticalScale(155),
    borderRadius: 10,
    marginBottom: 16,
    gap: 10,
    backgroundColor: 'rgba(222, 222, 222, 1)',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  video: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cancelButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  cancelIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  button: {
    marginVertical: 35,
    marginHorizontal: 30,
  },
});

export default CreatePackage;
