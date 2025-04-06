import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const baseGuidelineWidth = 375;
const baseGuidelineHeight = 812;

// These functions scales the sizes to the size of the mobile device so that
// app remains responsive from the smallest device to the largest

const horizontalScale = (size: number) => (width / baseGuidelineWidth) * size;
const verticalScale = (size: number) => (height / baseGuidelineHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

const calculatedLineHeight = (
  baseFontSize: number,
  lineHeightPercentage: number,
) => moderateScale(baseFontSize) * (lineHeightPercentage / 100);

export {horizontalScale, verticalScale, moderateScale, calculatedLineHeight};
