import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useTheme} from '../hooks';
import RoundIconButton from './RoundIconButton';
import View from './View';
import images from '../constants/images';
import {moderateScale} from '../helpers/metrics';
import Text from './Text';

export default function ChatScreenHeader() {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <View
      flexDirection="row"
      alignItems="center"
      style={{borderBottomWidth: 1, borderColor: theme.colors.primary100}}
      p="xs"
      gap={8}>
      <RoundIconButton
        iconName="arrow-back"
        iconVector="Ionicons"
        onPress={() => navigation.goBack()}
        showBackgroundColor={false}
      />
      <View flexDirection="row" alignItems="center" gap={4}>
        <Image
          source={images.aiImage}
          style={{
            width: moderateScale(40),
            height: undefined,
            aspectRatio: 1,
            borderRadius: moderateScale(40) / 2,
          }}
        />
        <View>
          <Text size="sm" variant="bold">
            AIA -{' '}
            <Text size="xs" color="neutral50">
              Your AI Assistant
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
