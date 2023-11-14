import React from 'react';
import {Text, View} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import SubscriptionCard from '../SubscriptionCard';
interface Props {
  styles?: any;
  subscriptionTitle: string;
  onPress: (type: string) => void;
}

const TdeeSubscription = ({subscriptionTitle,styles, onPress}: Props) => {
  return (
    <SubscriptionCard
      subscriptionTitle={subscriptionTitle}
      onPress={(type: string) => onPress(type)}
      styles={styles}>
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
    </SubscriptionCard>
  );
};

export default TdeeSubscription;
