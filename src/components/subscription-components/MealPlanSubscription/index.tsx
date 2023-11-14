import React from 'react';
import {Text, View} from 'react-native';
import SubscriptionCard from '../SubscriptionCard';
import {STYLES} from '../../../styles/globalStyles';

interface Props {
  subscriptionTitle: string;
  styles?: any;
  onPress: (type: string) => void;
}

const MealPlanSubscription = ({subscriptionTitle, styles, onPress}: Props) => {
  return (
    <SubscriptionCard
      subscriptionTitle={subscriptionTitle}
      styles={styles}
      onPress={(type: string) => onPress(type)}>
      <View style={{gap: 4}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <View
            style={{
              width: 4,
              height: 4,
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
          <Text style={STYLES.text12}>unlimited meal plan request</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <View
            style={{
              width: 4,
              height: 4,
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
          <Text style={STYLES.text12}>
            unlimited access to message board's paid content
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}>
          <View
            style={{
              width: 4,
              height: 4,
              backgroundColor: 'white',
              borderRadius: 100,
            }}
          />
          <Text style={STYLES.text12}>unlimited access to TDEE calculator</Text>
        </View>
      </View>
    </SubscriptionCard>
  );
};

export default MealPlanSubscription;
