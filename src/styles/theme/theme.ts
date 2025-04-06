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
  primary100: '#2E2C5F',
  primary80: '#524DA0',
  primary60: '#736DDF',
  primary40: '#A09BFF',
  primary20: '#DCDAFF',

  secondary100: '#484A22',
  secondary80: '#858945',
  secondary60: '#D9DF6D',
  secondary40: '#F8FCA1',
  secondary20: '#FDFFD4',

  neutral100: '#131218',
  neutral90: '#1D1C25',
  neutral80: '#272631',
  neutral70: '#343341',
  neutral60: '#3E3D4D',
  neutral50: '#53526A',
  neutral40: '#757494',
  neutral30: '#9C9AC1',
  neutral20: '#CBC9EF',
  neutral10: '#E8E7FF',
  white: '#fff',
  black: '#222',

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
