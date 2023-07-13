import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import SigninContent from '../../../components/auth-components/login/SigninContent';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import LoginForm from '../../../components/auth-components/login/LoginForm';
import {BlurView} from '@react-native-community/blur';

const LoginFormScreen = () => {
  return (
    <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../../../assets/images/backgroundImage2.jpg')}
        style={{flex: 1}}>
        <View style={{marginTop: verticalScale(111)}}>
          <Text
            style={[
              STYLES.text32,
              {
                // position: 'absolute',
                // top: verticalScale(111),
                paddingLeft: horizontalScale(14),
                marginBottom: verticalScale(0),
                paddingTop:3,
              },
            ]}>
            LOGIN
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
    // overflow: 'scroll',
    // zIndex: 1,
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(42),
  },
});
