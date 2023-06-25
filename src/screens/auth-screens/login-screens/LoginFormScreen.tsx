import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SigninContent from '../../../components/auth-components/login/SigninContent';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import {STYLES} from '../../../styles/globalStyles';
import LoginForm from '../../../components/auth-components/login/LoginForm';

const LoginFormScreen = () => {
  return (
    <ScrollView>
      <SigninContent />
      <Text
        style={[
          STYLES.text32,
          {
            position: 'absolute',
            top: verticalScale(111),
            left: horizontalScale(14),
          },
        ]}>
        LOGIN
      </Text>
      <LoginForm />
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
});
