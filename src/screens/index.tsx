import {
  Image,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {verticalScale} from '../utils/metrics';
import {STYLES} from '../styles/globalStyles';

const SplashScreen = ({navigation}: any) => {
  return (
    <ImageBackground
      source={require('../../assets/images/backgroundImage.jpg')}
      alt="bgImage"
      resizeMode="cover"
      style={styles.container}>
      <View style={{flex: 8, justifyContent: 'center'}}>
        <Image source={require('../../assets/images/logo.png')} alt="logo" />
      </View>
      <TouchableOpacity
        style={{flex: 1, width: '70%', alignItems: 'center'}}
        onPress={() => navigation.navigate('SigninScreenOne')}>
        <Text style={[STYLES.text12]}>GET STARTED</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
