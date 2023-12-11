import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292A2C',
    paddingHorizontal: horizontalScale(14),
  },
  text12: {
    fontSize: moderateScale(12),
    // lineHeight: verticalScale(15),
    // fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Gilroy-Bold',
  },
  text14: {
    fontSize: moderateScale(14),
    // lineHeight: verticalScale(24),
    // fontWeight: '500',
    color: '#ffffff',
    fontFamily: 'Gilroy-Medium',
  },
  text16: {
    fontSize: moderateScale(16),
    // lineHeight: verticalScale(19),
    // fontWeight: '400',
    color: '#fff',
    fontFamily: 'Gilroy-Regular',
  },
  text32: {
    fontSize: moderateScale(32),
    // lineHeight: verticalScale(39),
    // fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'Gilroy-Bold',
  },
  text40: {
    fontSize: moderateScale(40),
    // lineHeight: verticalScale(49),
    // fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'Gilroy-ExtraBold',
  },
});
