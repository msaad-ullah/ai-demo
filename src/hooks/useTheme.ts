import {useContext} from 'react';
import {ThemeContext} from '../styles/theme/ThemeProvider';

// a custom hook we can use to quickly access our theme (design system) anywhere in the app
export default function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}
