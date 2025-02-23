import {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {openCamera} from 'react-native-image-crop-picker';
import PickCertificateCard from '../../../components/auth-components/create-profile/PickCertificateCard';
import UploadCertificateCard from '../../../components/auth-components/create-profile/UploadCertificateCard';
import ImageCard from '../../../components/auth-components/create-profile/ImageCard';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {FileData, IUser} from '../../../interfaces/user.interface';
import {setUserData} from '../../../redux/authSlice';

const UploadCertificate = ({navigation}: any) => {
  const [selectedCameraImage, setSelectedCameraImage] =
    useState<FileData | null>(null);
  const [uploadImage, setUploadImage] = useState<FileData | null | any>(null);
  const [addMoreImages, setAddMoreImages] = useState<FileData[] | null | any>(
    null,
  );
  const previousUserData = useSelector((state: RootState) => state.auth.user);
  const [certificateImages, setCertificateImages] = useState<
    FileData[] | null | any
  >(null);
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate('InterestScreen');
  };

  const handleCapture = async (type: string) => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 10000,
      maxWidth: 10000,
    };
    if (type == 'camera') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera access to capture photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await openCamera({
          width: 10000,
          height: 10000,
          cropping: false,
        })
          .then((image: any) => {
            if (image.path) {
              console.log(image, 'image');
              setSelectedCameraImage({
                uri: image.path,
                name: 'camera',
                type: image.mime,
              });
            }
          })
          .catch((error: any) => {
            if (error.code === 'E_PICKER_CANCELLED') {
              return false;
            }
          });
      }
    } else if (type == 'upload') {
      await launchImageLibrary(options, (response: any) => {
        if (response.assets) {
          setUploadImage({
            uri: response.assets[0].uri,
            name: response.assets[0].fileName,
            type: response.assets[0].type,
          });
        }
      });
    } else {
      await launchImageLibrary(options, (response: any) => {
        if (response.assets) {
          setAddMoreImages((prev: FileData[] | null) => [
            ...(prev || []),
            {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: response.assets[0].type,
            },
          ]);
        }
      });
    }
  };

  const handleDelete = (img: any) => {
    const filterImages = addMoreImages?.filter(
      (image: any) => image.uri !== img.uri,
    );
    setAddMoreImages(filterImages);
  };
  const handleSubmit = () => {
    const combinedImages = [
      ...(selectedCameraImage ? [selectedCameraImage] : []),
      ...(uploadImage ? [uploadImage] : []),
      ...(addMoreImages ? [addMoreImages] : []),
    ].flat();

    setCertificateImages(combinedImages);

    const partialUserData: Partial<IUser> = {
      ...previousUserData,
      certificates: certificateImages,
    };
    dispatch(setUserData({...partialUserData} as IUser));
    navigation.navigate('CertificateVerified');
  };

  return (
    <View style={STYLES.container}>
      <ScrollView>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[STYLES.text16, {fontWeight: '700'}]}>
            Upload Certificates
          </Text>
          <TouchableOpacity onPress={handleNavigate}>
            <Text
              style={[STYLES.text12, {fontWeight: '700', color: '#209BCC'}]}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: 20, gap: 16}}>
          <PickCertificateCard
            iconName="camera-outline"
            text="camera"
            selectedCameraImage={selectedCameraImage?.uri}
            setSelectedCameraImage={setSelectedCameraImage}
            onPress={() => handleCapture('camera')}
          />
          <UploadCertificateCard
            iconName="cloud-upload-outline"
            text="Upload"
            uploadImage={uploadImage?.uri}
            setUploadImage={setUploadImage}
            onPress={() => handleCapture('upload')}
          />
          {addMoreImages?.map((image: any) => {
            return (
              <ImageCard
                key={image.uri}
                uri={image.uri}
                onPress={() => handleDelete(image)}
              />
            );
          })}
          {uploadImage !== null && (
            <TouchableOpacity
              style={[styles.container]}
              activeOpacity={0.6}
              onPress={() => handleCapture('addMore')}>
              <Icon name="add-circle-outline" size={30} color="white" />
              <Text style={[STYLES.text14, {fontWeight: '600'}]}>Add more</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            marginVertical: verticalScale(42),
            marginHorizontal: horizontalScale(30),
          }}>
          <CustomButton onPress={handleSubmit}>Continue</CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

export default UploadCertificate;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(298),
    height: verticalScale(204),
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(68, 68, 68, 0.50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
