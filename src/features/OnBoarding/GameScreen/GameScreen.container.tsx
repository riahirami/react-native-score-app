import React, { useCallback } from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { type OnBoardingStackParamList } from '_navigation/StackNavigation/OnBoardingStackNavigation';

import { type GAME_SCREEN } from '_utils/screenNames';

import GameScreen from './GameScreen';
import useModalAlert from '../../../hooks/useModalAlert';
import useGameActions from '../../../hooks/useGameActions';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { useAppDispatch } from '_store/hooks';
import { setGameOver } from '_store/features/gameSlice/gameSlice';

/**
 * Container used to separate GameScreen logic as a wrapper to GameScreen screen
 * @returns JSX.Element
 */
interface GameScreenContainerProps
  extends NativeStackScreenProps<
    OnBoardingStackParamList,
    typeof GAME_SCREEN
  > {}

const GameScreenContainer: React.FC<
  GameScreenContainerProps
> = (): JSX.Element => {
  const { handleAlertClose, handleAlertOpen, isAlertOpen } = useModalAlert();
  const formMethods = useForm({
    mode: 'onChange',
    shouldFocusError: true
  });
  const {
    setGame,
    getWinnersPlayers,
    checkIfPlayerWin,
    checkIfGameIsOver,
    isGameOverRef,
    game,
    resetGame
  } = useGameActions();

  const modalAlertType = {
    handleAlertClose,
    handleAlertOpen,
    isAlertOpen
  };

  const gameActions = {
    game,
    setGame,
    getWinnersPlayers,
    checkIfPlayerWin,
    checkIfGameIsOver,
    isGameOverRef
  };

  const dispatch = useAppDispatch();

  const endGameAction = () => {
    dispatch(setGameOver());
    handleAlertClose();
  };

  const handleSubmitNewRowScore = useCallback(
    (data: FieldValues) => {
      const rounds = game.rounds;
      const isGameOver = isGameOverRef.current;

      if (isGameOver) {
        console.log('Game is over');
        return;
      }

      rounds.push({
        roundNumber: rounds.length + 1,
        playersScore: game.players.map((player, index) => {
          return {
            playerIndex: index + 1,
            score: parseInt(data[`${player.name}round${rounds.length + 1}`])
          };
        })
      });

      setGame((prevState) => {
        return {
          ...prevState,
          players: prevState.players.map((player) => {
            return {
              name: player.name,
              playerIndex: player.playerIndex,
              score:
                player.score +
                parseInt(data[`${player.name}round${rounds.length}`])
            };
          }),
          rounds: rounds
        };
      });

      getWinnersPlayers(game.players);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [game, getWinnersPlayers, isGameOverRef]
  );

  const handleSubmit = formMethods.handleSubmit((data) => {
    handleSubmitNewRowScore(data);
  });
  const resetForm = formMethods.reset;

  const replayGameAction = () => {
    resetForm();
    resetGame();
  };
  return (
    <FormProvider {...formMethods}>
      <GameScreen
        modalAlertType={modalAlertType}
        gameActionsProps={gameActions}
        form={formMethods}
        endGameAction={endGameAction}
        handleSubmit={handleSubmit}
        replayGameAction={replayGameAction}
      />
    </FormProvider>
  );
};

export default GameScreenContainer;
