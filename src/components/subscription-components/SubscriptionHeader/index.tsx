import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SubscriptionIcon from '../../../../assets/icons/SubscriptionIcon';

interface Props {
  title: string;
}

const SubscriptionHeader = ({title}: Props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.iconCard}>
        <SubscriptionIcon />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: '700',
          color: 'white',
          marginTop: 40,
        }}>
        {title}
      </Text>
    </View>
  );
};

export default SubscriptionHeader;

const styles = StyleSheet.create({
  iconCard: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#209BCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
