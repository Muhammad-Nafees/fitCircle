import CustomProfileAvatar from '../shared-components/CustomProfileAvatar';
import {View, Text, StyleSheet} from 'react-native';

const CustomSupport = () => {
  return (
    <View style={styles.container}>
      <CustomProfileAvatar username="Sameer" size={50} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.text, {color: 'rgba(255, 255, 255, 0.5)'}]}>
            02/10/2023
          </Text>
          <Text style={[styles.text, {color: 'rgba(234, 68, 68, 1)'}]}>
            Pending
          </Text>
        </View>
        <Text style={styles.id}>HFYEU38FGHS</Text>
        <Text style={styles.description}>
          I would like to report some issues that the app is facing right now.
          These issues are related to logging and ...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(68, 68, 68, 0.5)',
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontWeight: '400',
    fontSize: 10,
  },
  id: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(36, 163, 204, 1)',
  },
  description: {
    color: 'white',
    fontWeight: '400',
    fontSize: 12,
  },
});

export default CustomSupport;
