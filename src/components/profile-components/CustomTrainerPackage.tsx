import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {MealPlanStarIcon} from '../../../assets/icons/MealPlanStar';
import {useNavigation} from '@react-navigation/core';

const ImagePreview = require('../../../assets/images/TestMealPlanImage.png');

export const CustomTrainerPackage = ({hidePriceAndPackage}: boolean) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PackageDetail')}
      style={[
        styles.container,
        hidePriceAndPackage && {backgroundColor: 'transparent'},
      ]}>
      <View style={styles.imageContainer}>
        <Image source={ImagePreview} style={styles.image} />
      </View>
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
            <Text style={styles.getPackage}>Get this package</Text>
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
});
