import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import {verticalScale} from '../../../utils/metrics';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import GenderForm from '../../../components/auth-components/create-profile/GenderForm';

const GenderScreen = ({navigation}: any) => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.image} />
        </View>

        <GenderForm />
      </ScrollView>
    </View>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 142,
    height: 142,
    borderRadius: 71,
    backgroundColor: 'white',
  },
});
