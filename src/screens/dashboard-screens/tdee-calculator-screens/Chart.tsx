import {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import PieChart from 'react-native-pie-chart';
// ---------------------------------------------------------------------------//
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import ColorChart from '../../../../assets/icons/ColorChart';
import {NutritionData} from '../../../interfaces/extra.interface';

const legends = [
  {color: '#24A3CC', label: 'Protein'},
  {color: '#209BCC', label: 'Carb'},
  {color: '#21334E', label: 'Fat'},
];

export const ChartScreen = ({navigation, route}: any) => {
  const chartData: NutritionData = route.params.chartData;
  const [dailyCalories, setDailyCalories] = useState(
    route.params.dailyCalories,
  );

  const widthAndHeight = 290;
  const series = [
    chartData?.fats,
    chartData?.carbohydrates,
    chartData?.proteins,
  ];
  const sliceColor = ['#209BCC', '#21334E', '#24A3CC'];
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[STYLES.text16, styles.heading]}>Macro Split Chart</Text>
        <View style={styles.contentContainer}>
          <Text style={styles.subTextContent}>
            For your daily calories ({dailyCalories} Calories)
          </Text>
          <View style={styles.chartContainer}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              text1={`Fat: ${chartData?.fats.toFixed(0)} g`}
              text2={`Carb: ${chartData?.carbohydrates.toFixed(0)} g`}
              text3={`Protien: ${chartData?.proteins.toFixed(0)} g`}
            />
            <View style={styles.iconText}>
              {legends.map((legend, index) => (
                <View key={index} style={{flexDirection: 'row', gap: 5}}>
                  <ColorChart color={legend.color} />
                  <Text
                    style={{fontSize: 12, fontWeight: '500', color: 'white'}}>
                    {legend.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <CustomButton onPress={() => console.log('Something')}>
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
  heading: {
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  subTextContent: {fontSize: 12, fontWeight: '700', color: 'white'},
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 90,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
    marginVertical: 24,
  },
});
