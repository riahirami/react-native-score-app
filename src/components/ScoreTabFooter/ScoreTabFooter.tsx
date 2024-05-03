import React from 'react';
import { Text, View } from 'react-native';
import styles from './scoreTabFooterStyles.phone';
import { Game } from 'src/types/interfaces/game';
interface ScoreTabFooterProps {
  game: Game;
}

const ScoreTabFooter: React.FC<ScoreTabFooterProps> = ({ game }) => {
  console.log('ScoreTabFooter > game', game);
  return (
    <View style={styles.gameResultsContainer}>
      <View style={styles.emptyContainer} />
      {game.players.map((player, index) => (
        <>
          <Text key={player.playerIndex} style={styles.scoreText}>
            {player.score}
          </Text>
          {index + 1 < game.players.length && (
            <Text key={player.playerIndex} style={styles.scoreText}>
              {' '}
              -{' '}
            </Text>
          )}
        </>
      ))}
      <View style={styles.emptyContainer} />
    </View>
  );
};

export default ScoreTabFooter;
