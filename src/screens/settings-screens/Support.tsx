import CustomButton from '../../components/shared-components/CustomButton';
import CustomSupport from '../../components/settings-components/CustomSupport';
import {View, Text, StyleSheet} from 'react-native';

const SupportOne = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.heading}>Support</Text>
        <CustomSupport />
      </View>
      <View style={{paddingVertical: 30, marginHorizontal: 24}}>
        <CustomButton onPress={() => navigation.navigate('SupportMessage')}>
          Send New Message
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
    marginBottom: 16,
  },
});

export default SupportOne;
