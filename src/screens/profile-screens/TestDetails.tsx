import {getUserPhysicalReadiness} from '../../api/dashboard-module';
import CustomButton from '../../components/shared-components/CustomButton';
import CustomHeader from '../../components/shared-components/CustomHeader';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {useEffect, useState} from 'react';
import {IPhysicalActivity} from '../../interfaces/user.interface';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {format} from 'date-fns';

const TestDetailScreen = ({navigation, route}: any) => {
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const [physicalActivityData, setPhysicalActivyData] =
    useState<IPhysicalActivity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPhysicalActivyData = async () => {
    setIsLoading(true);
    try {
      const response = await getUserPhysicalReadiness(userId as string);
      const data = response?.data?.data;
      setPhysicalActivyData(data);
    } catch (error: any) {
      console.log(
        error?.response?.data,
        'ERROR FROM  GETTING PHYISCAL ACTIVITY READINESS!',
      );
    }
    setIsLoading(false);
  };
  console.log(physicalActivityData, 'DDD');

  useEffect(() => {
    fetchPhysicalActivyData();
  }, []);

  const isTestDetails2 = route.name === 'TestDetails2';
  let formatDate;
  if (physicalActivityData?.date) {
    const originalDate = new Date(physicalActivityData?.date);
    formatDate = format(originalDate, 'MM/dd/yyyy');
  }
  const data = [
    {label: 'Date', value: formatDate},
    {
      label: 'Email',
      value: physicalActivityData?.email,
      color: 'rgba(32, 155, 204, 1)',
    },
    {label: 'First name', value: physicalActivityData?.firstName},
    {label: 'Last name', value: physicalActivityData?.lastName},
    {label: 'Address', value: physicalActivityData?.address},
    {label: 'City', value: physicalActivityData?.city},
    {label: 'Zip', value: physicalActivityData?.zip},
    {label: 'Home Phone', value: physicalActivityData?.homePhone},
    {label: 'Cell Phone', value: physicalActivityData?.cellPhone},
    {label: 'Age', value: physicalActivityData?.age},
    {
      label: 'Height',
      value: `${physicalActivityData?.height?.value} ${physicalActivityData?.height?.unit}`,
    },
    {
      label: 'Weight',
      value: `${physicalActivityData?.weight?.value} ${physicalActivityData?.weight?.unit}`,
    },
    {
      label: 'Do you have high cholesterol?',
      value: physicalActivityData?.isHighCholesterol ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Has your doctor ever said that you have heart trouble?',
      value: physicalActivityData?.isHeartTrouble ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Has your doctor ever told you that you have a bone or joint problem (such as arthritis) that has been or may be exacerbated by physical activity?',
      value: physicalActivityData?.isBoneTrouble ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Has your doctor ever told you that your blood pressure was too high?',
      value: physicalActivityData?.isHighBloodPressure ? 'Yes' : 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'Are you over 65 years of age and not accustomed to vigorous exercise?',
      value: physicalActivityData?.isOverAge ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Is there any reason, not mentioned thus far, that would not allow you to participate in a physical fitness program?',
      value: physicalActivityData?.isAnyReasonNotToParticipate ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Do you ever feel weak, fatigued, or sluggish?',
      value: physicalActivityData?.isFeelWeakEver ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
  ];

  const additionalData = [
    {
      label: 'How many meals do you eat each day?',
      value: physicalActivityData?.mealsPerDay,
    },
    {
      label: 'Do you know how many calories you eat in a day?',
      value: physicalActivityData?.isKnownCalorieConsumptionPerDay,
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label: 'Do you eat breakfast?',
      value: physicalActivityData?.isEatBreakfast ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Are you taking supplements? (i.e. vitamins, amino acids, protein shakes, etc.)',
      value: physicalActivityData?.isTakingSupplements ? 'Yes' : 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'Do you need several cups of coffee to keep you going throughout the day?',
      value: physicalActivityData?.isTakingSeveralCupsOfCoffee ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Do you often experience digestive difficulties?',
      value: physicalActivityData?.exercisesPerWeek ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label:
        'Proper nutrition can increase the body’s ability to enhance physical and mental performance by up to 80%. Do you feel that a properly structured nutrition and exercise program would benefit you?',
      value: physicalActivityData?.isNutritionOrExerciseBenefits ? 'Yes' : 'No',
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'How long have you been exercising?',
      value: physicalActivityData?.exerciseSince,
    },
    {
      label: 'Have you reached and maintained your goals?',
      value: physicalActivityData?.isMaintainGoals ? 'Yes' : 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label: 'Are you happy with the way you look and your health?',
      value: physicalActivityData?.isOkYourLookAndHealth ? 'Yes' : 'No',
      color: 'rgba(222, 49, 49, 1)',
    },
    {
      label:
        'On a scale of 1 to 10, how serious are you about achieving your goals? (least: 1, most: 10)',
      value: physicalActivityData?.goalScale,
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Desired Body Fat',
      value: physicalActivityData?.desiredBodyFat,
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Desired Weight',
      value: physicalActivityData?.desiredWeight,
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Desired Lean Muscle',
      value: physicalActivityData?.desiredLeanMuscle,
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'I plan to exercise',
      value: physicalActivityData?.exercisesPerWeek,
      color: 'rgba(32, 155, 204, 1)',
    },
    {
      label: 'Increase Lean Muscle',
      value: physicalActivityData?.increaseLeanMuscle ? 'Yes' : 'No',
    },
    {
      label: 'Lose Body Fat',
      value: physicalActivityData?.loseBodyFat ? 'Yes' : 'No',
    },
    {
      label: 'Increase Stamina',
      value: physicalActivityData?.increaseStamina ? 'Yes' : 'No',
    },
    {
      label: 'Increase Strength',
      value: physicalActivityData?.increaseStrength ? 'Yes' : 'No',
    },
    {
      label: 'Improve Overall Health',
      value: physicalActivityData?.improveHealth ? 'Yes' : 'No',
    },
    {
      label: 'Lose Weight',
      value: physicalActivityData?.loseWeight ? 'Yes' : 'No',
    },
  ];

  const dataArrayToMap = isTestDetails2 ? additionalData : data;

  const handleNavigation = () => {
    if (physicalActivityData === null) {
      navigation.navigate('PhysicalReadiness');
      return;
    }
    if (isTestDetails2) {
      navigation.navigate('Message', {
        screen: 'ChatDetails',
        params: {username: 'Sameer'},
      });
    } else {
      navigation.navigate('TestDetails2');
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader onPress={() => navigation.goBack()} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.heading}>Physical Activity Readiness</Text>
          {isLoading ? (
            <CustomLoader extraStyles={{marginTop: 20}} />
          ) : physicalActivityData === null ? (
            <Text style={{color: 'white'}}>
              No Physical Activity Readiness added yet!
            </Text>
          ) : (
            dataArrayToMap?.map((data, index) => (
              <View key={index} style={styles.attributeContainer}>
                <Text style={[styles.text, {fontWeight: '600'}]}>
                  {data.label}
                  {data.value && ' : '}
                  <Text
                    style={[
                      styles.text,
                      {
                        fontWeight: '400',
                        color:
                          data?.value == 'Yes' || data?.label == 'Email'
                            ? 'rgba(32, 155, 204, 1)'
                            : data?.value == 'No'
                            ? 'rgba(222, 49, 49, 1)'
                            : '#ffffff',
                      },
                    ]}>
                    {data.value}
                  </Text>
                </Text>
              </View>
            ))
          )}
        </View>
        <View style={{marginHorizontal: 40, marginTop: 20, marginBottom: 30}}>
          <CustomButton onPress={handleNavigation}>
            {physicalActivityData === null && !isLoading
              ? 'Add Physical Activity Readiness'
              : isTestDetails2
              ? 'Close'
              : 'Next'}
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
