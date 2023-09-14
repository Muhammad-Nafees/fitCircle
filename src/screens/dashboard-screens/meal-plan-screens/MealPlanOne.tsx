import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import MealPlanImage from '../../../../assets/icons/MealPlanImage';
import CustomButton from '../../../components/shared-components/CustomButton';
import {useEffect} from 'react';
const ArrowBack = require('../../../../assets/icons/arrow-back.png');

export const MealPlanOne = ({navigation}: any) => {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
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
      <Text style={{color: 'white'}}>Meal Plan coming soon!</Text>
      {/* <TouchableOpacity
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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            marginHorizontal: 120,
            textAlign: 'center',
            color: 'white',
            fontWeight: '500',
            fontSize: 16,
          }}>
          You dont have any meal plans today
        </Text>
        <View style={{marginVertical: 40}}>
          <MealPlanImage />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={() => navigation.navigate('MealPlanTwo')}>
          Request a Meal Plan
        </CustomButton>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.19,
    marginHorizontal: 40,
  },
});
