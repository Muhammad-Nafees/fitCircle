import {useRef, useState} from 'react';
import {Image, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
// -------------------------------------------------------------------------//
import MealPlanPdf from '../../../assets/icons/MealPlanPdf';
import MessageSvgIcon from '../../../assets/icons/MessageSvgIcon';
import DeleteMessageIcon from '../../../assets/icons/DeleteMessage';
import {Swipeable} from 'react-native-gesture-handler';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {s3bucketReference} from '../../api';

interface Props {
  plan: any;
  extraStyles?: any;
  handleDeleteButton?: () => void;
  handleEditButton?: () => void;
}

export const CustomPlanDescription = ({
  plan,
  extraStyles,
  handleDeleteButton,
  handleEditButton,
}: Props) => {
  const [isSwiped, setIsSwiped] = useState(false);
  const swipeableRef: any = useRef(null);
  const route = useRoute();

  const renderRightActions = () => {
    if (route.name === 'CreateMealPlan') {
      return (
        <View style={[styles.rightActionsContainer]}>
          <TouchableOpacity
            style={[
              styles.rightAction,
              {backgroundColor: 'rgba(222, 49, 49, 1)'},
            ]}
            onPress={() => {
              swipeableRef.current.close();
              handleDeleteButton();
            }}>
            <DeleteMessageIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rightAction,
              {backgroundColor: 'rgba(32, 155, 204, 1)'},
            ]}
            onPress={() => {
              swipeableRef.current.close();
              handleEditButton();
            }}>
            <Icon name="edit-3" color={'white'} />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2.8}
      onSwipeableWillOpen={() => setIsSwiped(true)}
      onSwipeableWillClose={() => setIsSwiped(false)}>
      <View
        style={[
          styles.mappingContainer,
          extraStyles,
          isSwiped && {borderRadius: 0},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <MealPlanPdf width={27} height={36} />
          <View style={{marginHorizontal: 10}}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: 'white',
                width: 127,
              }}>
              {plan?.title || plan?.planName}
            </Text>
            <Text style={styles.price}>
              {plan?.cost ? '$' : null}
              {plan?.cost || plan?.price}
            </Text>
          </View>
        </View>
        <View style={{flex: 1, marginLeft: 13, marginRight: 5}}>
          <Text style={styles.description}>{plan?.description}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export const CustomNutritionistPlan = ({
  plans,
  nutritionistInfo,
  key,
  handleModalOpen,
}: any) => {
  const navigation = useNavigation();
  const route = useRoute();
  const showRequestText = route.name === 'MealPlanFour';
  return (
    <View style={styles.container} key={key}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: `${s3bucketReference}/${nutritionistInfo?.profileImage}`,
          }}
          style={{width: 78, height: 80, borderRadius: 10}}
        />
        <View style={{justifyContent: 'flex-start', marginHorizontal: 10}}>
          <Text style={{fontSize: 14, fontWeight: '600', color: 'white'}}>
            {nutritionistInfo?.firstName} {nutritionistInfo?.lastName}
          </Text>
          <Text style={styles.username}>@{nutritionistInfo?.username}</Text>
          <Text style={styles.role}>
            {nutritionistInfo?.role.charAt(0).toUpperCase() +
              nutritionistInfo?.role.slice(1)}
          </Text>
        </View>
      </View>
      {plans.map((plan: any, index: any) => (
        <TouchableOpacity
          onPress={() => handleModalOpen(plan.planName, plan.price)}>
          <CustomPlanDescription plan={plan} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          showRequestText
            ? navigation.navigate('RequestMealPlan' as never)
            : navigation.navigate('MealPlanFour' as never, {
                nutritionistInfo: nutritionistInfo,
              });
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
    // height: verticalScale(52),
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
    // width: 88,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(48, 210, 152, 1)',
  },
  rightActionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  rightAction: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(43),
    height: verticalScale(62),
  },
  rightActionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
