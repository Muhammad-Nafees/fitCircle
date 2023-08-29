import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import HeaderBackArrow from '../../../components/shared-components/HeaderBackArrow';
import {STYLES} from '../../../styles/globalStyles';
import SignupForm from '../../../components/auth-components/signup/SignupForm';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignupFormScreen = ({navigation}: any) => {
  return (
    <KeyboardAwareScrollView>
      <ImageBackground
        source={require('../../../../assets/images/backgroundImage2.jpg')}
        style={{flex: 1}}
        blurRadius={10}>
        <View style={{top: 40, left: 14}}>
          <HeaderBackArrow onPress={() => navigation.goBack()} />
        </View>
        <View style={{marginTop: verticalScale(70)}}>
          <Text
            style={[
              STYLES.text32,
              {
                // position: 'absolute',
                // top: verticalScale(111),
                paddingLeft: horizontalScale(14),
                marginBottom: verticalScale(0),
              },
            ]}>
            Sign up
          </Text>
          <View style={styles.container}>
            <SignupForm />
          </View>
          {/* </BlurView> */}
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
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
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(30),
    paddingTop: verticalScale(42),
  },
});
