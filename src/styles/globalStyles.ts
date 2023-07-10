import {StyleSheet} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../utils/metrics';

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(3),
    backgroundColor: '#292A2C',
    paddingHorizontal: horizontalScale(14),
  },
  text12: {
    fontSize: moderateScale(12),
    lineHeight: verticalScale(17),
    fontWeight: '700',
    color: '#ffffff',
  },
  text14: {
    fontSize: moderateScale(14),
    lineHeight: verticalScale(26),
    fontWeight: '500',
    color: '#ffffff',
  },
  text16: {
    fontSize: moderateScale(16),
    lineHeight: verticalScale(23),
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  text32: {
    fontSize: moderateScale(32),
    lineHeight: verticalScale(39),
    fontWeight: '700',
    color: '#ffffff',
  },
  text40: {
    fontSize: moderateScale(40),
    lineHeight: verticalScale(49),
    fontWeight: '800',
    color: '#ffffff',
  },
});
