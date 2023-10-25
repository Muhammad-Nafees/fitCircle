import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
// ------------------------------------------------------------------------------------------------//
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {CustomPackageReview} from '../../components/profile-components/CustomPackageReview';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import CustomButton from '../../components/shared-components/CustomButton';
import {s3bucketReference} from '../../api';
import CustomLoader from '../../components/shared-components/CustomLoader';
const CancelIcon = require('../../../assets/icons/cancel.png');
const ArrowBack = require('../../../assets/icons/arrow-back.png');
import {Image as ImageCompress} from 'react-native-compressor';
import {createPackage} from '../../api/packages-module';
import {IPackage} from '../../interfaces/package.interface';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';
import {RootState} from 'redux/store';

const reviewData = Array.from({length: 5});

export const PackageDetailScreen = ({navigation, route}: any) => {
  const [videoVisible, setVideoVisible] = useState(false);
  const {packageDetails} = route?.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.auth.user);

  const renderCustomPackageReview = () => {
    return <CustomPackageReview />;
  };

  const videoEnabled = () => {
    setVideoVisible(!videoVisible);
  };
  const handleCreatePackage = async () => {
    setIsLoading(true);
    try {
      let compressedThumbnail = null;

      if (packageDetails?.thumbnail) {
        const result = await ImageCompress.compress(
          packageDetails.thumbnail?.uri,
          {
            quality: 0.8,
          },
        );
        compressedThumbnail = {
          name: packageDetails?.thumbnail?.name as string,
          type: packageDetails?.thumbnail?.type as string,
          uri: result,
        };
      }
      const reqData: Partial<IPackage> = {
        ...packageDetails,
        thumbnail: compressedThumbnail,
      };
      const response = await createPackage(reqData);
      console.log(response?.data);
      Toast.show({
        type: 'success',
        text1: `${response?.data?.message}`,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `${error?.response?.data?.message}`,
      });
      console.log(error, 'From Creating Package!');
    }
    setIsLoading(false);
    navigation.navigate('PackagesScreen');
    console.log(packageDetails, 'from handle CreatePackage!!');
  };
  console.log(packageDetails.media, 'FROM PACKAGE DETAILS');

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{paddingHorizontal: 16}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{paddingTop: 24, paddingBottom: 10}}
              onPress={() => navigation.goBack()}>
              <Image
                source={ArrowBack}
                style={{width: 24, height: 24, tintColor: 'white'}}
              />
            </TouchableOpacity>
            {userData?.role === 'user' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ScheduleScreen', {
                    screen: 'Slot',
                    params: {
                      packageView: true,
                    },
                  })
                }>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 10,
                    color: 'rgba(32, 155, 204, 1)',
                  }}>
                  Get this package
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={[styles.heading, route.params.packageData]}>
            Details
          </Text>
          <View style={{marginHorizontal: -10}}>
            <CustomTrainerPackage
              hidePriceAndPackage={true}
              videoEnabled={videoEnabled}
              myPackage={packageDetails}
              isCreatingPackage={route?.params?.isCreatingPackage}
            />
          </View>
          <View style={[styles.horizontalLine, {marginTop: 0}]} />
          <View>
            <Text style={styles.heading2}>Description</Text>
            <Text
              style={[styles.paragraph1, {paddingVertical: verticalScale(16)}]}>
              {packageDetails?.description}
            </Text>
            <Text style={styles.heading2}>Duration</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.paragraph1}>Length</Text>
              <Text style={styles.duration}>
                {packageDetails?.hours}{' '}
                {packageDetails?.hours > 1 ? 'HOURS' : 'HOUR'}
              </Text>
            </View>
          </View>
          <View style={styles.horizontalLine} />
          <Text style={styles.heading2}>Service Cost</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.paragraph1}>Package Cost</Text>
            <Text style={styles.duration}>${packageDetails?.cost}</Text>
          </View>
          <View style={styles.horizontalLine} />
        </View>
        {!route?.params?.isCreatingPackage && (
          <View
            style={[
              styles.bottomContainer,
              {
                borderRadius:
                  packageDetails?.reviews?.length === 0 ? 30 : undefined,
              },
            ]}>
            <Text style={styles.bottomContainerHeading}>
              Review ({packageDetails?.reviewsCount})
            </Text>
            {packageDetails?.reviews?.length === 0 ? (
              <Text style={{color: 'white', paddingBottom: 15}}>
                No Reviews Yet!
              </Text>
            ) : (
              <FlatList
                data={reviewData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => renderCustomPackageReview()}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparator} />
                )}
              />
            )}
          </View>
        )}
      </ScrollView>
      {route?.params?.isCreatingPackage && (
        <View style={styles.buttonContainer}>
          <CustomButton isDisabled={isLoading} onPress={handleCreatePackage}>
            {isLoading ? (
              <CustomLoader />
            ) : route?.params?.isEditingPackage ? (
              'Update'
            ) : (
              'Create'
            )}
          </CustomButton>
        </View>
      )}
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
              uri: route?.params?.isCreatingPackage
                ? packageDetails?.media?.uri ||
                  `${s3bucketReference}/${packageDetails?.media}`
                : `${s3bucketReference}/${packageDetails?.media}`,
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
    backgroundColor: '#363639',
  },
  heading: {
    fontWeight: '600',
    fontSize: 14,
    color: 'white',
    paddingBottom: verticalScale(12),
  },
  horizontalLine: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)',
    marginVertical: verticalScale(15),
  },
  heading2: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  paragraph1: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  itemSeparator: {
    height: verticalScale(8),
  },
  duration: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 1)',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: horizontalScale(16),
  },
  bottomContainerHeading: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginTop: verticalScale(16),
    marginBottom: verticalScale(20),
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(14),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: verticalScale(14),
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
  buttonContainer: {
    paddingBottom: verticalScale(30),
    marginHorizontal: horizontalScale(40),
  },
});
