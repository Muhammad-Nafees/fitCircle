import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {Formik} from 'formik';
import {verticalScale} from '../../../utils/metrics';
import {CustomSelect} from '../../../components/shared-components/CustomSelect';
import CustomInput from '../../../components/shared-components/CustomInput';
import GenderForm from '../../../components/auth-components/create-profile/GenderForm';
import {useSelector} from 'react-redux';

const GenderScreen = ({navigation, route}: any) => {

  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {route.params?.profilePicture == undefined ? (
            <View style={styles.image} />
          ) : (
            <Image
              source={{
                uri: route.params.profilePicture.resourcePath,
              }}
              resizeMode="cover"
              style={{width: 142, height: 142, borderRadius: 71}}
            />
          )}
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
