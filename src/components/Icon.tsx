import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import FontAwesome6Pro from 'react-native-vector-icons/FontAwesome6Pro';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IconProps} from 'react-native-vector-icons/Icon';

import {IconVector} from './types';

// defining the type to quickly create icons
interface IProps extends IconProps {
  vector?: IconVector;
}

export default function Icon({vector = 'Ionicons', ...rest}: IProps) {
  switch (vector) {
    case 'Entypo': {
      return <Entypo {...rest} />;
    }

    case 'EvilIcons': {
      return <EvilIcons {...rest} />;
    }

    case 'Feather': {
      return <Feather {...rest} />;
    }

    case 'FontAwesome': {
      return <FontAwesome {...rest} />;
    }

    case 'FontAwesome5': {
      return <FontAwesome5 {...rest} />;
    }

    case 'FontAwesome5Pro': {
      return <FontAwesome5Pro {...rest} />;
    }

    case 'FontAwesome6': {
      return <FontAwesome6 {...rest} />;
    }

    case 'FontAwesome6Pro': {
      return <FontAwesome6Pro {...rest} />;
    }

    case 'Fontisto': {
      return <Fontisto {...rest} />;
    }

    case 'Foundation': {
      return <Foundation {...rest} />;
    }

    case 'Ionicons': {
      return <Ionicons {...rest} />;
    }

    case 'MaterialCommunityIcons': {
      return <MaterialCommunityIcons {...rest} />;
    }

    case 'MaterialIcons': {
      return <MaterialIcons {...rest} />;
    }

    case 'Octicons': {
      return <Octicons {...rest} />;
    }
    case 'AntDesign': {
      return <AntDesign {...rest} />;
    }
  }
}
