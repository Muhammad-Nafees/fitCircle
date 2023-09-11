import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import LoginForm from '../../../components/auth-components/login/LoginForm';

const LoginFormScreen = () => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../../../assets/images/backgroundImage2.jpg')}
        style={{flex: 1}}
        blurRadius={10}>
        <View style={{marginTop: verticalScale(111)}}>
          <Text
            style={[
              STYLES.text32,
              {
                paddingLeft: horizontalScale(14),
                marginBottom: verticalScale(0),
                paddingTop: 3,
              },
            ]}>
            Log in
          </Text>
          <View style={styles.container}>
            <LoginForm />
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default LoginFormScreen;

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: 'relative',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    maxHeight: verticalScale(630),
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    alignItems: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(42),
  },
});
