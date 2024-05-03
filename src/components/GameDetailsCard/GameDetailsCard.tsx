import React from 'react';
import { Text, View } from 'react-native';
import styles from './gameDetailsCardStyles.phone';
import { images } from '_utils/images';
import { Game } from 'src/types/interfaces/game';
interface GameDetailsCardProps {
  game: Game;
}

const GameDetailsCard: React.FC<GameDetailsCardProps> = ({ game }) => {
  return (
    <View style={styles.gameDetailsContainer}>
      <View style={styles.inlineTextContainer}>
        <Text style={styles.gameDetailsText}>
          Partie : {game.gameType} - Nombre des joueurs : {game.players.length}
        </Text>
      </View>
      {game.team && (
        <View style={styles.gameTypeContainer}>
          <Text style={styles.gameDetailsText}>Mode équipe activé</Text>
          <img src={images.TEAMWORK} alt="team" width="50" />
        </View>
      )}
      <View style={styles.gameTypeContainer}>
        <Text style={styles.gameDetailsText}>
          Score à atteindre : {''}
          {game.finalScore}
        </Text>
      </View>
    </View>
  );
};

export default GameDetailsCard;
