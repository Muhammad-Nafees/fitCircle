import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import MealPlanImage from '../../../../assets/icons/MealPlanImage';
import CustomButton from '../../../components/shared-components/CustomButton';
import {CustomMealPlan} from '../../../components/dashboard-components/CustomMealPlan';
const ArrowBack = require('../../../../assets/icons/arrow-back.png');

export const MealPlanTwo = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{paddingTop: 24, paddingBottom: 16, paddingHorizontal: 12}}
        onPress={() => navigation.goBack()}>
        <Image
          source={ArrowBack}
          style={{width: 24, height: 24, tintColor: 'white'}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: 'white',
          marginHorizontal: 14,
        }}>
        My Meal Plan
      </Text>
      <TouchableOpacity style={{flex: 1, marginLeft: 5}}>
        <CustomMealPlan name="Meal Plan ..." />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate('MealPlanThree')}>
          Request a Meal Plan
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  buttonContainer: {
    flex: 0.19,
    marginHorizontal: 40,
  },
});
