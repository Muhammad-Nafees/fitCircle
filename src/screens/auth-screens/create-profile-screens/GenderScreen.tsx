import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import GenderForm from '../../../components/auth-components/create-profile/GenderForm';

const GenderScreen = ({route}: any) => {
  return (
    <View style={[STYLES.container, {paddingHorizontal: 0}]}>
      <ScrollView>
        <View style={styles.imageContainer}>
          {route.params?.profilePicture == undefined ? (
            <View style={styles.image} />
          ) : (
            <Image
              source={{
                uri: route.params.profilePicture.uri,
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
