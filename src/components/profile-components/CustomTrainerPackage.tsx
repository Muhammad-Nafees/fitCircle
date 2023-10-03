import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MealPlanStarIcon} from '../../../assets/icons/MealPlanStar';
import {useNavigation} from '@react-navigation/core';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
const PlayIcon = require('../../../assets/icons/playIcon.png');
const ImagePreview = require('../../../assets/images/TestMealPlanImage.png');

export const CustomTrainerPackage = ({
  hidePriceAndPackage,
  isTrainerView,
  hidePackageButton = false,
  videoEnabled,
}: any) => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const navigation = useNavigation();

  const onPressHandler = () => {
    // if (userData?.role !== 'trainer' || isTrainerView) {
    navigation.navigate('PackageDetail', {hidePackageButton});
    // }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[
        styles.container,
        hidePriceAndPackage && {backgroundColor: 'transparent'},
      ]}>
      <TouchableOpacity style={styles.imageContainer} onPress={videoEnabled}>
        <Image source={ImagePreview} style={styles.image} />
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
            30 Days New Year Challenge
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
              (1,515)
            </Text>
          </View>
          <Text
            style={[
              styles.packageDuration,
              hidePriceAndPackage && {fontSize: 14},
            ]}>
            1 hour
          </Text>
        </View>
        {!hidePriceAndPackage ? (
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$100</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    resizeMode: 'cover',
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
    color: 'white',
    marginLeft: 5,
  },
  packageDuration: {
    fontWeight: '400',
    fontSize: 10,
    color: 'white',
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
});
