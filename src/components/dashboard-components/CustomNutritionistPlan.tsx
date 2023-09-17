import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
// -------------------------------------------------------------------------//
import MealPlanPdf from '../../../assets/icons/MealPlanPdf';
import MessageSvgIcon from '../../../assets/icons/MessageSvgIcon';
const ImageSomething = require('../../../assets/images/backgroundImage.jpg');

export const CustomNutritionistPlan = ({
  name,
  role,
  plans,
  handleModalOpen,
}: any) => {
  const navigation = useNavigation();
  const route = useRoute();
  const showRequestText = route.name === 'MealPlanFour';
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={ImageSomething}
          style={{width: 78, height: 80, borderRadius: 10}}
        />
        <View style={{justifyContent: 'flex-start', marginHorizontal: 10}}>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
            {name}
          </Text>
          <Text style={styles.username}>@lindseymiddleton</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>
      {plans.map((plan: any, index: any) => (
        <TouchableOpacity
          onPress={() => handleModalOpen(plan.planName, plan.price)}
          style={styles.mappingContainer}>
          <View style={{flexDirection: 'row'}}>
            <MealPlanPdf width={27} height={36} />
            <View style={{marginHorizontal: 10}}>
              <Text style={{fontSize: 12, fontWeight: '500', color: 'white'}}>
                {plan.planName}
              </Text>
              <Text style={styles.price}>{plan.price}</Text>
            </View>
          </View>
          <View style={{flex: 1, marginLeft: 13, marginRight: 5}}>
            <Text style={styles.description}>{plan.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          showRequestText
            ? navigation.navigate('RequestMealPlan' as never)
            : navigation.navigate('MealPlanFour' as never);
        }}>
        {showRequestText ? (
          <View style={styles.buttonIconContainer}>
            <Text style={styles.button}>Request A Meal Plan</Text>
            <View style={{marginBottom: -15}}>
              <MessageSvgIcon color={'#209BCC'} widthAndHeight={22} />
            </View>
          </View>
        ) : (
          <Text style={styles.button}>View All Meal Plans</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212223',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 19,
    marginVertical: 8,
  },
  button: {
    textAlign: 'right',
    marginTop: 10,
    color: 'rgba(32, 155, 204, 1)',
    fontSize: 12,
  },
  buttonIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  mappingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 10,
    gap: 15,
  },
  username: {
    color: 'rgba(19, 114, 140, 1)',
    fontSize: 12,
    fontWeight: '400',
  },
  role: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 10,
    fontWeight: '400',
    textAlign: 'right',
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(48, 210, 152, 1)',
  },
});
