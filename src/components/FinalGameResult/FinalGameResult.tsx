import { images } from '_utils/images';
import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './finalGameResultStyles.phone';
import { Game, Player } from 'src/types/interfaces/game';
import { colors } from '_utils/colors';
import CustomButton from '_components/CustomButton/CustomButton';
interface FinalGameResultProps {
  game: Game;
  checkIfPlayerWin: (player: Player) => boolean;
  replayGameAction: () => void;
  title: string;
}

const FinalGameResult: React.FC<FinalGameResultProps> = ({
  title,
  game,
  checkIfPlayerWin,
  replayGameAction
}) => {
  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.imageDineriContainer}>
        <Image source={images.EDINERI} style={styles.imageStyle} />
      </View>
      <View>
        {game.players?.map(
          (player, index) =>
            checkIfPlayerWin(player) && (
              <Text key={index} style={styles.winText}>
                {player.name} gagne avec un score: {player.score}
              </Text>
            )
        )}
        <CustomButton
          onPress={replayGameAction}
          title="Rejouer ?"
          buttonBackgroundColor={colors.PRIMARY}
          titleSize={16}
          hasButtonWidth
          buttonWidth={150}
        />
      </View>
    </View>
  );
};

export default FinalGameResult;
