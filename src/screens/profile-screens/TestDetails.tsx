import CustomButton from '../../components/shared-components/CustomButton';
import CustomHeader from '../../components/shared-components/CustomHeader';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const TestDetailScreen = ({navigation, route}: any) => {
  const isTestDetails2 = route.name === 'TestDetails2';
  const data = [
    {label: 'Date', value: '02/28/2023'},
    {label: 'Email', value: 'lincolnsmith@gmail.com'},
    {label: 'First name', value: 'Lincoln'},
    {label: 'Last name', value: 'Smith'},
    {label: 'Address', value: '123 Main St'},
    {label: 'City', value: 'Example City'},
    {label: 'Zip', value: '12345'},
    {label: 'Home Phone', value: '555-123-4567'},
    {label: 'Cell Phone', value: '555-987-6543'},
    {label: 'Age', value: '25'},
    {label: 'Height', value: '175 cm'},
    {label: 'Weight', value: '70 kg'},
    {
      label: 'Do you have high cholesterol?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Has your doctor ever said that you have heart trouble?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Has your doctor ever told you that you have a bone or joint problem (such as arthritis) that has been or may be exacerbated by physical activity?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Has your doctor ever told you that your blood pressure was too high?',
      value: 'Yes',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'Are you over 65 years of age and not accustomed to vigorous exercise?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Is there any reason, not mentioned thus far, that would not allow you to participate in a physical fitness program?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Do you ever feel weak, fatigued, or sluggish?',
      value: 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
  ];

  const additionalData = [
    {label: 'How many meals do you eat each day?', value: '3'},
    {
      label: 'Do you know how many calories you eat in a day?',
      value: 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label: 'Do you eat breakfast?',
      value: 'Yes',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Are you taking supplements? (i.e. vitamins, amino acids, protein shakes, etc.)',
      value: 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'Do you need several cups of coffee to keep you going throughout the day?',
      value: 'Yes',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Do you often experience digestive difficulties?',
      value: 'Yes',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Proper nutrition can increase the body’s ability to enhance physical and mental performance by up to 80%. Do you feel that a properly structured nutrition and exercise program would benefit you?',
      value: 'Yes',
      color: 'rgba(32, 155, 204, 1)',
    },
    {label: 'How long have you been exercising?', value: '1 month'},
    {
      label: 'Have you reached and maintained your goals?',
      value: 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label: 'Are you happy with the way you look and your health?',
      value: 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'On a scale of 1 to 10, how serious are you about achieving your goals? (least: 1, most: 10)',
      value: '9',
      color: 'rgba(32, 155, 204, 1)',
    },
    {label: 'Desired Body Fat', value: '19%', color: 'rgba(32, 155, 204, 1)'},
    {label: 'Desired Weight', value: '61 kg', color: 'rgba(32, 155, 204, 1)'},
    {
      label: 'Desired Lean Muscle',
      value: '70 - 90%',
      color: 'rgba(32, 155, 204, 1)',
    },
    {label: 'I plan to exercise', value: '6', color: 'rgba(32, 155, 204, 1)'},
    {label: 'Increase Lean Muscle'},
    {label: 'Lose Body Fat'},
    {label: 'Increase Lean Muscle'},
    {label: 'Increase Stamina'},
    {label: 'Increase Strength'},
    {label: 'Lose Weight'},
  ];

  const dataArrayToMap = isTestDetails2 ? additionalData : data;

  const handleNavigation = () => {
    if (isTestDetails2) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('TestDetails2');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.navigate('Profile')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.heading}>Physical Activity Readiness</Text>
          {dataArrayToMap.map((data, index) => (
            <View key={index} style={styles.attributeContainer}>
              <Text style={[styles.text, {fontWeight: '600'}]}>
                {data.label}
                {data.value && ' :'}
                <Text
                  style={[
                    styles.text,
                    {fontWeight: '400'},
                    data.color && {color: data.color},
                  ]}>
                  {' '}
                  {data.value}
                </Text>
              </Text>
            </View>
          ))}
        </View>
        <View style={{marginHorizontal: 40, marginTop: 20, marginBottom: 30}}>
          <CustomButton onPress={handleNavigation}>
            {isTestDetails2 ? 'Close' : 'Next'}
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginVertical: 20,
  },
  text: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 1)',
  },
  attributeContainer: {
    marginBottom: 10,
  },
});

export default TestDetailScreen;
