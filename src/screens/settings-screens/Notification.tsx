import CustomToggleButton from '../../components/settings-components/CustomToggleButton';
import {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Notifications</Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.text}>
            Control your notifications depending on your prefereces.
          </Text>
          <Text style={styles.text}>
            If you disable this notification, you will not get notify when
            someone messages you.
          </Text>
        </View>
        <View style={styles.toggleButtonContainer}>
          <CustomToggleButton text={'Deliver Notifications'} />
          <CustomToggleButton text={'System Notifications'} />
          <CustomToggleButton text={'In-App Notifications'} />
          <CustomToggleButton
            text={'Enable App Vibrations'}
            disableHorizontalLine={true}
            text2={'Vibrations'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  headingContainer: {
    marginHorizontal: 0,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  text: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
    paddingTop: 30,
  },
  toggleButtonContainer: {
    marginTop: 45,
  },
});
