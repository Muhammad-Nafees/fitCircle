import React, {useRef, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MealPlanStarIcon} from '../../../assets/icons/MealPlanStar';
import {useNavigation} from '@react-navigation/core';
import {Swipeable} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import DeleteMessageIcon from '../../../assets/icons/DeleteMessage';
const PlayIcon = require('../../../assets/icons/playIcon.png');
const ImagePreview = require('../../../assets/images/TestMealPlanImage.png');
import Icon from 'react-native-vector-icons/Feather';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import {IPackage} from '../../interfaces/package.interface';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from 'interfaces/navigation.type';
import {s3bucketReference} from '../../api';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'PackageDetail'
>;

interface Props {
  myPackage?: IPackage;
  hidePriceAndPackage?: any;
  onDeletePackage?: (id: string) => void;
  onEditPackage?: (myPackage: IPackage) => void;
  hidePackageButton?: any;
  videoEnabled?: any;
  isCreatingPackage?: boolean;
  handleEditButton?: any;
}

export const CustomTrainerPackage = ({
  myPackage,
  hidePriceAndPackage,
  onDeletePackage,
  onEditPackage,
  hidePackageButton = false,
  videoEnabled,
  isCreatingPackage,
}: Props) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [isSwiped, setIsSwiped] = useState(false);
  const swipeableRef: any = useRef(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();

  const onPressHandler = () => {
    // if (userData?.role !== 'trainer' || isTrainerView) {
    navigation.navigate('PackageDetail', {packageDetails: myPackage});
    // }
  };
  const handleDeletePackage = (id: string) => {
    swipeableRef.current.close();
    if (onDeletePackage) {
      onDeletePackage(id);
    }
  };
  const handleEditPackage = (myPackage: IPackage) => {
    swipeableRef.current.close();
    if (onEditPackage) {
      onEditPackage(myPackage);
    }
  };

  const renderRightActions = () => {
    if (route.name === 'PackagesScreen') {
      return (
        <View
          style={[
            styles.rightActionsContainer,
            isSwiped && {backgroundColor: 'rgba(0, 0, 0, 0.2)'},
          ]}>
          <TouchableOpacity
            style={[
              styles.rightAction,
              {backgroundColor: 'rgba(222, 49, 49, 1)'},
            ]}
            onPress={() => handleDeletePackage(myPackage?._id as string)}>
            <DeleteMessageIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rightAction,
              {backgroundColor: 'rgba(32, 155, 204, 1)'},
            ]}
            onPress={() => handleEditPackage(myPackage as IPackage)}>
            <Icon name="edit-3" color={'white'} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        overshootRight={false}
        friction={2.7}
        onSwipeableWillOpen={() => setIsSwiped(true)}
        onSwipeableWillClose={() => setIsSwiped(false)}>
        <TouchableOpacity
          onPress={onPressHandler}
          style={[
            styles.container,
            hidePriceAndPackage && {backgroundColor: 'transparent'},
            isSwiped && {borderRadius: 0},
          ]}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={videoEnabled}>
            <Image
              source={{
                uri: isCreatingPackage
                  ? (myPackage?.thumbnail && myPackage?.thumbnail.uri) ||
                    `${s3bucketReference}/${myPackage?.thumbnail}`
                  : `${s3bucketReference}/${myPackage?.thumbnail}`,
              }}
              style={styles.image}
            />
            {hidePriceAndPackage && (
              <View style={styles.playIconContainer}>
                <View
                  style={{
                    backgroundColor: 'rgba(141, 156, 152, 0.8)',
                    borderRadius: 30,
                    padding: 3,
                  }}>
                  <Image source={PlayIcon} style={styles.playIcon} />
                </View>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.packageInfo}>
            <View style={styles.topInfo}>
              <Text
                style={[
                  styles.packageTitle,
                  hidePriceAndPackage && {fontSize: 16},
                ]}>
                {myPackage?.title}
              </Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <MealPlanStarIcon key={index} />
                ))}
                <Text
                  style={[
                    styles.ratingCount,
                    hidePriceAndPackage && {fontSize: 12},
                  ]}>
                  ({myPackage?.reviewsCount})
                </Text>
              </View>
              <Text
                style={[
                  styles.packageDuration,
                  hidePriceAndPackage && {fontSize: 14},
                ]}>
                {myPackage?.hours}{' '}
                {myPackage?.hours && myPackage?.hours > 1 ? 'hours' : 'hour'}
              </Text>
            </View>
            {!hidePriceAndPackage ? (
              <View style={styles.priceContainer}>
                <Text style={styles.price}>${myPackage?.cost}</Text>
                {!hidePackageButton && (
                  <View>
                    {userData?.role !== 'user' ? (
                      <Text style={styles.getPackage}>Edit this package</Text>
                    ) : (
                      <Text style={styles.getPackage}>Get this package</Text>
                    )}
                  </View>
                )}
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 86,
    borderRadius: 10,
  },
  packageInfo: {
    flex: 1,
    gap: 18,
  },
  topInfo: {
    justifyContent: 'space-between',
  },
  packageTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    gap: 2,
  },
  ratingCount: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 5,
  },
  packageDuration: {
    fontWeight: '400',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontWeight: '400',
    fontSize: 14,
    color: 'rgba(48, 210, 152, 1)',
  },
  getPackage: {
    fontWeight: '500',
    fontSize: 10,
    color: 'rgba(32, 155, 204, 1)',
  },
  playIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: horizontalScale(12),
    height: verticalScale(12),
    tintColor: '#fff',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    paddingLeft: horizontalScale(50),
    marginBottom: 10,
    alignItems: 'center',
    paddingRight: 20,
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(43),
    height: verticalScale(52),
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
