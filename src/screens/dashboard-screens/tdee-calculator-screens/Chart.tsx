import {View, Text, StyleSheet} from 'react-native';
import PieChart from 'react-native-pie-chart';
import {STYLES} from '../../../styles/globalStyles';
import CustomButton from '../../../components/shared-components/CustomButton';
import ColorChart from '../../../../assets/icons/ColorChart';

const legends = [
  {color: '#24A3CC', label: 'Protein'},
  {color: '#209BCC', label: 'Fat'},
  {color: '#21334E', label: 'Carb'},
];

export const ChartScreen = () => {
  const widthAndHeight = 290;
  const series = [82, 64, 185];
  const sliceColor = ['#21334E', '#209BCC', '#24A3CC'];
  return (
    <View style={styles.container}>
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
        <Text style={{fontSize: 12, fontWeight: '700', color: 'white'}}>
          For your daily calories
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
            text1="Protein: 64 g"
            text2="Carb: 82 g"
            text3="Protein: 185 g"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 30,
              marginVertical: 24,
            }}>
            {legends.map((legend, index) => (
              <View key={index} style={{flexDirection: 'row', gap: 5}}>
                <ColorChart color={legend.color} />
                <Text style={{fontSize: 12, fontWeight: '500', color: 'white'}}>
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
