import React, {ReactNode} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {horizontalScale} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';

interface Props {
  children: ReactNode;
  subscriptionTitle: string;
  styles?: any;
  onPress: (type: string) => void;
}

const SubscriptionCard = ({
  subscriptionTitle,
  styles,
  onPress,
  children,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress(subscriptionTitle)}>
      <LinearGradient
        colors={[
          'rgba(19, 114, 140, 1)',
          'rgba(19, 114, 140, 0)',
          'rgba(19, 114, 140, 0)',
          'rgba(19, 114, 140, 1)',
          'rgba(255, 255, 255, 0.2)',
        ]}
        style={[
          {
            padding: 12,
            borderRadius: 18,
            marginTop: 40,
            width: horizontalScale(318),
          },
          styles,
        ]}>
        <View style={{gap: 6}}>
          <Text style={[STYLES.text16, {fontWeight: '800'}]}>
            {subscriptionTitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
            }}>
            {children}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;
