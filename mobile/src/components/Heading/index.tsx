import { View, ViewProps, Text } from 'react-native';

import { styles } from './styles';

interface HandingProps extends ViewProps {
  title: string;
  subtitle: string;
}

export function Heading({ title, subtitle, ...rest }: HandingProps) {
  return (
    <View style={styles.container} { ...rest }>
      <Text style={ styles.title }>
        { title }
      </Text>

      <Text style={ styles.subtitle }>
        { subtitle }
      </Text>
    </View>
  );
}