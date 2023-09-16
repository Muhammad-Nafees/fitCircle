import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MealPlanPdf from '../../../assets/icons/MealPlanPdf';

export const CustomMealPlan = ({name}: any) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
        <MealPlanPdf width={48} height={64} />
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'flex-end',
          flex: 0.3,
        }}>
        <View style={styles.name}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#000000',
              textAlign: 'center',
            }}>
            {name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 105,
    height: 125,
    borderRadius: 10,
  },
  name: {
    backgroundColor: '#EBEBEB',
    width: '100%',
    paddingVertical: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
