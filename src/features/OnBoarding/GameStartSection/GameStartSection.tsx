import React from 'react';
import { Image, View } from 'react-native';

import { images } from '../../../utils/images';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { colors } from '../../../utils/colors';
import styles from './gameStartSectionStyles.phone';
import { SafeAreaView } from 'react-native-safe-area-context';
/**
 * Represents GameStartSection screen ui
 * @returns JSX.Element
 */
interface GameStartSectionProps {
  onPress: () => void;
}

const GameStartSection: React.FC<GameStartSectionProps> = ({
  onPress
}): JSX.Element => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={images.SEVEN} style={styles.imageStyle} />
          <Image source={images.JOKER} style={styles.imageStyle} />
        </View>
        <CustomButton
          onPress={onPress}
          title="Nouvelle partie"
          titleColor={colors.WHITE}
          buttonBackgroundColor={colors.PRIMARY}
          containerStyle={styles.buttonContent}
          titleSize={20}
          gradientColors={[colors.RED, colors.RED]}
        />
      </View>
    </SafeAreaView>
  );
};

export default GameStartSection;
