import {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  BackHandler,
} from 'react-native';
// ------------------------------------------------------------------------------------------------//
import {CustomTrainerPackage} from '../../components/profile-components/CustomTrainerPackage';
import {CustomPackageReview} from '../../components/profile-components/CustomPackageReview';
import {horizontalScale, verticalScale} from '../../utils/metrics';
const ArrowBack = require('../../../assets/icons/arrow-back.png');

const reviewData = Array.from({length: 5});

export const PackageDetailScreen = ({navigation}: any) => {
  const renderCustomPackageReview = () => {
    return <CustomPackageReview />;
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Profile');
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <TouchableOpacity
          style={{paddingTop: 24, paddingBottom: 16}}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            source={ArrowBack}
            style={{width: 24, height: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Details</Text>
        <View style={{marginHorizontal: -10}}>
          <CustomTrainerPackage hidePriceAndPackage={true} />
        </View>
        <View style={[styles.horizontalLine, {marginTop: 0}]} />
        <View>
          <Text style={styles.heading2}>Description</Text>
          <Text
            style={[styles.paragraph1, {paddingVertical: verticalScale(16)}]}>
            A great routine for biceps and triceps workout!
          </Text>
          <Text style={styles.heading2}>Duration</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.paragraph1}>Length</Text>
            <Text style={styles.duration}>1 HOUR</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <Text style={styles.heading2}>Service Cost</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.paragraph1}>Package Cost</Text>
          <Text style={styles.duration}>$100.00</Text>
        </View>
        <View style={styles.horizontalLine} />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomContainerHeading}>Review ( 1,515)</Text>
        <FlatList
          data={reviewData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => renderCustomPackageReview()}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
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
});
