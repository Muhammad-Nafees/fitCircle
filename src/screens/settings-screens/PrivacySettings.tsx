import {View, Text, StyleSheet} from 'react-native';
import CustomToggleButton from '../../components/settings-components/CustomToggleButton';

export const PrivacySettingsScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>Privacy Settings</Text>
      </View>
      <View>
        <CustomToggleButton text="Don’t show my name" />
        <CustomToggleButton text="Don’t show my email address" />
        <CustomToggleButton text="Don’t show my age" />
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
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
});
