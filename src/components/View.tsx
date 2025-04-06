// Custom view component
import {View, type ViewProps, FlexAlignType, ViewStyle} from 'react-native';
import theme from '../styles/theme/theme';

// defining the types for quick common stylings through props and suggestions
export interface IBox extends ViewProps {
  backgroundColor?: keyof typeof theme.colors;
  p?: keyof typeof theme.spacing;
  pv?: keyof typeof theme.spacing;
  ph?: keyof typeof theme.spacing;
  pt?: keyof typeof theme.spacing;
  pb?: keyof typeof theme.spacing;
  pl?: keyof typeof theme.spacing;
  pr?: keyof typeof theme.spacing;
  m?: keyof typeof theme.spacing;
  mv?: keyof typeof theme.spacing;
  mh?: keyof typeof theme.spacing;
  mt?: keyof typeof theme.spacing;
  mb?: keyof typeof theme.spacing;
  ml?: keyof typeof theme.spacing;
  mr?: keyof typeof theme.spacing;
  gap?: number;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  rounded?: boolean;
}

export default function Box({
  backgroundColor,
  p,
  pv,
  ph,
  pt,
  pb,
  pr,
  pl,
  m,
  mv,
  mh,
  mt,
  mb,
  ml,
  mr,
  children,
  style,
  flex = 0,
  alignItems,
  justifyContent,
  flexDirection = 'column',
  rounded = false,
  gap = undefined,
  ...rest
}: IBox) {
  const getMargin = () => {
    const obj: any = {};

    if (m) {
      obj.margin = theme.spacing[m];
      return obj;
    }
    if (mt) obj.marginTop = mt ? theme.spacing[mt] : 0;
    if (mb) obj.marginBottom = mb ? theme.spacing[mb] : 0;
    if (ml) obj.marginLeft = ml ? theme.spacing[ml] : 0;
    if (mr) obj.marginRight = mr ? theme.spacing[mr] : 0;
    if (mv) obj.marginVertical = theme.spacing[mv];
    if (mh) obj.marginHorizontal = theme.spacing[mh];
    return obj;
  };

  const getPadding = () => {
    const obj: any = {};

    if (p) {
      obj.padding = theme.spacing[p];
      return obj;
    }

    if (pt) obj.paddingTop = pt ? theme.spacing[pt] : 0;
    if (pb) obj.paddingBottom = pb ? theme.spacing[pb] : 0;
    if (pl) obj.paddingLeft = pl ? theme.spacing[pl] : 0;
    if (pr) obj.paddingRight = pr ? theme.spacing[pr] : 0;
    if (pv) obj.paddingVertical = theme.spacing[pv];
    if (ph) obj.paddingHorizontal = theme.spacing[ph];

    return obj;
  };

  const boxStyles: ViewStyle[] = [
    {
      backgroundColor: backgroundColor
        ? theme.colors[backgroundColor]
        : undefined,
      flex,
      justifyContent,
      alignItems,
      flexDirection,
      borderRadius: rounded ? 10 : 0,
      gap,
    },
    getMargin(),
    getPadding(),
    style,
  ];

  return (
    <View style={boxStyles} {...rest}>
      {children}
    </View>
  );
}
