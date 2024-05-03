import React from 'react';
import { Text, View } from 'react-native';
import { Game } from 'src/types/interfaces/game';
import styles from './scoreTabHeaderStyles.phone';
interface ScoreTabHeaderProps {
  game: Game;
}

const ScoreTabHeader: React.FC<ScoreTabHeaderProps> = ({ game }) => {
  return (
    <View style={styles.playerNameContainer}>
      <View></View>
      {game.players.map((player, index) => (
        <Text key={index}>{player.name}</Text>
      ))}
      <View></View>
    </View>
  );
};

export default ScoreTabHeader;
