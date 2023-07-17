import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SigninContent from '../../../components/auth-components/login/SigninContent';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import CustomButton from '../../../components/shared-components/CustomButton';
import {BlurView} from '@react-native-community/blur';
import {STYLES} from '../../../styles/globalStyles';
import CustomInput from '../../../components/shared-components/CustomInput';
import CustomDivider from '../../../components/shared-components/CustomDivider';
import SocialIcons from '../../../components/shared-components/SocialIcons';
import HeaderBackArrow from '../../../components/shared-components/HeaderBackArrow';

const SignupFormScreen = ({navigation}: any) => {
  return (
    <ScrollView>
      <SigninContent />
      <HeaderBackArrow onPress={() => navigation.goBack()} />
      <Text
        style={[
          STYLES.text32,
          {
            position: 'absolute',
            top: verticalScale(111),
            left: horizontalScale(14),
          },
        ]}>
        SIGNUP
      </Text>

      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              marginTop: verticalScale(42),
              gap: 17,
              alignItems: 'center',
            }}>
            <CustomInput label="Name" placeholder="Username" />
            <CustomInput label="Email" placeholder="Email@gmail.com" />
            <CustomInput label="Phone number" placeholder="+6312345678" />

            <CustomInput label="Password" placeholder="Password" />

          
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: verticalScale(30),
              }}>
              <Text style={STYLES.text14}>Already have an account? </Text>
              <Text
                style={[
                  STYLES.text14,
                  {
                    fontWeight: '700',
                    color: '#209BCC',
                    textDecorationLine: 'underline',
                  },
                ]} onPress={() => navigation.goBack()}>
                Log in
              </Text>
            </View>
            <View style={{marginTop: verticalScale(47)}}>
              <Text
                style={[STYLES.text12, {fontWeight: '500', color: '#979797'}]}>
                By clicking login, you agree to our{' '}
                <Text style={{color: '#219EBC'}}>Terms and Conditions </Text>{' '}
                and
                <Text style={{color: '#219EBC'}}> Privacy Policy </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default SignupFormScreen;

const styles = StyleSheet.create({
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: verticalScale(630),
    overflow: 'scroll',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.93)',
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(42),
  },
});
