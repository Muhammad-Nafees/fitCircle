import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { STYLES } from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import ColorChart from '../../../../assets/icons/ColorChart';
import { NutritionData } from '../../../interfaces/extra.interface';
import { useState } from 'react';

const legends = [
  { color: '#24A3CC', label: 'Protein' },
  { color: '#209BCC', label: 'Carb' },
  { color: '#21334E', label: 'Fat' },
];

export const ChartScreen = ({ navigation, route }: any) => {
  const chartData: NutritionData = route.params.chartData;
  const [dailyCalories, setDailyCalories] = useState(route.params.dailyCalories);

  const widthAndHeight = 290;
  const series = [
    chartData.fatGrams,
    chartData.carbGrams,
    chartData.proteinGrams,
  ];
  const sliceColor = ['#21334E', '#209BCC', '#24A3CC'];

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text
          style={[
            STYLES.text16,
            {
              fontWeight: '700',
              marginTop: 16,
              paddingHorizontal: 16,
              paddingBottom: 28,
            },
          ]}>
          Macro Split Chart
        </Text>
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 12, fontWeight: '700', color: 'white' }}>
            For your daily calories ({dailyCalories} Calories)
          </Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
              marginBottom: 90,
            }}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              text1={`Fat: ${chartData.fatGrams} g`}
              text2={`Carb: ${chartData.carbGrams} g`}
              text3={`Protein: ${chartData.proteinGrams} g`}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 30,
                marginVertical: 24,
              }}>
              {legends.map((legend, index) => (
                <View key={index} style={{ flexDirection: 'row', gap: 5 }}>
                  <ColorChart color={legend.color} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: 'white',
                    }}>
                    {legend.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <CustomButton onPress={() => navigation.navigate('MealPlan')}>
            Continue to Meal Plan
          </CustomButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 60,
    marginVertical: 16,
  },
});
