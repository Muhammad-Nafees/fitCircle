import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MealPlanStarIcon} from '../../../assets/icons/MealPlanStar';
import {Avatar} from 'react-native-paper';

export const CustomPackageReview = () => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(<MealPlanStarIcon key={i} />);
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>{renderStars()}</View>
      <Text style={styles.review}>“I love this mentoring session!”</Text>
      <View style={styles.infoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar.Text
            size={22}
            label={'SA'}
            style={{backgroundColor: '#5e01a9'}}
          />
          <Text style={styles.nameText}>Sameer Ather</Text>
        </View>
        <Text style={styles.dateText}>12/13/2020</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363639',
    padding: 10,
    borderRadius: 8,
  },
  review: {
    fontSize: 14,
    color: 'white',
    marginVertical: 8,
  },
  starContainer: {
    flexDirection: 'row',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 5,
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 12,
    fontWeight: '500',
  },
  dateText: {
    marginLeft: 10,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    fontWeight: '400',
  },
});

export default CustomPackageReview;
