import {View, Text, StyleSheet} from 'react-native';

export const ProfileConfirmationDialog = (text: string) => {
  return (
    <View style={styles.container}>
      <View style={styles.dialog}>
        <Text>Please Confirm</Text>
        <Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dialog: {},
});
