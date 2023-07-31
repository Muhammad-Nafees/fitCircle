import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {STYLES} from '../../../styles/globalStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import React, {Children, ReactNode, useState} from 'react';
import {BlurView} from '@react-native-community/blur';

interface Props {
  children?: ReactNode;
  screen?: number;
}

const SigninContent = ({children, screen}: Props) => {
  return (
    <ImageBackground
      source={require('../../../../assets/images/backgroundImage.jpg')}
      alt="bgImage"
      resizeMode="cover"
      style={styles.container}>
      <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <View
          style={{
            gap: 12,
            paddingHorizontal: horizontalScale(28),
          }}>
          <Text style={[STYLES.text40, {width: horizontalScale(238)}]}>
            Find the best gyms and coaches
          </Text>
          <Text style={STYLES.text16}>
            Gym buddies, New friends, Advise & Tips, Community, Inspiration,
            Motivation
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.linesContainer}>
            <View
              style={[
                styles.lines,
                {backgroundColor: screen == 2 ? '#444444' : 'white'},
              ]}></View>
            <View
              style={[
                styles.lines,
                {backgroundColor: screen == 2 ? 'white' : '#444444'},
              ]}></View>
            <View style={[styles.lines, {backgroundColor: '#444444'}]}></View>
          </View>
          <View style={{marginTop: verticalScale(31)}}>{children}</View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SigninContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  card: {
    marginTop: horizontalScale(22),
    height: verticalScale(210),
    backgroundColor: '#0D0D0D',
    paddingHorizontal: horizontalScale(25),
    paddingBottom: verticalScale(35),
    justifyContent: 'center',
  },
  linesContainer: {
    marginTop: verticalScale(20),
    flexDirection: 'row',
    gap: 4,
  },
  lines: {
    width: horizontalScale(20),
    height: 2,
    borderRadius: moderateScale(20),
  },
});
