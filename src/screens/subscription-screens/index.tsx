import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {horizontalScale} from '../../utils/metrics';
import SubscriptionHeader from '../../components/subscription-components/SubscriptionHeader';
import TdeeSubscription from '../../components/subscription-components/TdeeSubscription';
import MealPlanSubscription from '../../components/subscription-components/MealPlanSubscription';
import CustomButton from '../../components/shared-components/CustomButton';

const backgroundImage = require('../../../assets/images/backgroundImage.jpg');

const selectedItemStyles = {
  borderWidth: 1,
  borderColor: 'white',
};
const SubscriptionPlan = ({navigation}: any) => {
  const [seletedSubscriptionType, setSelectedSubscriptionType] =
    useState<string>('');
  const handleSelectSubscription = (type: string) => {
    if (type == seletedSubscriptionType) {
      setSelectedSubscriptionType('');
    } else {
      setSelectedSubscriptionType(type);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('TdeeCalculator');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <SubscriptionHeader title="Subscription plan" />
      <TdeeSubscription
        subscriptionTitle="$1.99 / month"
        styles={
          seletedSubscriptionType === '$1.99 / month' && selectedItemStyles
        }
        onPress={handleSelectSubscription}
      />
      <View style={{width: 300, marginTop: 150}}>
        <CustomButton
          isDisabled={seletedSubscriptionType === ''}
          onPress={handleSubmit}>
          Continue
        </CustomButton>
      </View>
    </ImageBackground>
  );
};

export default SubscriptionPlan;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(24),
  },
});
