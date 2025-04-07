// This file defines the app's design system (colors, font sizes, spacings).

import {moderateScale} from '../../helpers/metrics';
export const FontFamily = {
  bold: 'Poppins-Bold',
  semibold: 'Poppins-SemiBold',
  medium: 'Poppins-Medium',
  regular: 'Poppins-Regular',
  thin: 'Poppins-Thin',
};

const colors = {
  primary100: '#0d1919',
  primary80: '#284c4b',
  primary60: '#427f7d',
  primary40: '#8eb2b1',
  primary20: '#d9e5e5',

  neutral100: '#070d0c',
  neutral90: '#202524',
  neutral80: '#393d3d',
  neutral70: '#515655',
  neutral60: '#6a6e6d',
  neutral50: '#838686',
  neutral40: '#9c9e9e',
  neutral30: '#b5b6b6',
  neutral20: '#cdcfce',
  neutral10: '#e6e7e7',

  white: '#fff',
  black: '#000',

  error: '#E7002A',
  success: '#3EC55F',
  warning: '#FECB2F',
  info: '#157EFB',
};

const theme = {
  colors,
  fontSizes: {
    xxl: moderateScale(32),
    xl: moderateScale(28),
    lg: moderateScale(24),
    md: moderateScale(20),
    body: moderateScale(17),
    sm: moderateScale(14),
    xs: moderateScale(12),
    xxs: moderateScale(10),
    xxxs: moderateScale(8),
  },
  spacing: {
    none: 0,
    xxs: moderateScale(4),
    xs: moderateScale(8),
    md: moderateScale(12),
    lg: moderateScale(16),
    xl: moderateScale(20),
    xxl: moderateScale(24),
    xxxl: moderateScale(28),
  },
};

export default theme;
