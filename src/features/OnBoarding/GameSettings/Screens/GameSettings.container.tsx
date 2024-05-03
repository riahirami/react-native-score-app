import React, { useMemo, useState } from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { type OnBoardingStackParamList } from '_navigation/StackNavigation/OnBoardingStackNavigation';

import {
  GAME_START_SECTION_SCREEN,
  type GAME_SETTINGS_SCREEN,
  GAME_SCREEN
} from '../../../../utils/screenNames';

import {
  GAME_TYPE_RADIO_BUTTON_OPTIONS,
  PLAYER_NUMBER_RADIO_BUTTON_OPTIONS
} from '_utils/constants';
import { useForm } from 'react-hook-form';
import { GameAttributes } from 'src/types/models/Game/Games';
import {
  setFinalScore,
  setGameStarted,
  setGameType,
  setPlayers,
  setPlayersNumber,
  toggleGameTeamMode
} from '../../../../store/features/gameSlice/gameSlice';
import { useAppDispatch } from '../../../../store/hooks';
import { GamePlayerNumberEnum, GameTypeEnum } from '../../../../utils/enum';
import GameSettings from './GameSettings';

/**
 * Container used to separate GameSettings logic as a wrapper to GameSettings screen
 * @returns JSX.Element
 */
interface GameSettingsContainerProps
  extends NativeStackScreenProps<
    OnBoardingStackParamList,
    typeof GAME_SETTINGS_SCREEN
  > {}

const GameSettingsContainer: React.FC<GameSettingsContainerProps> = ({
  navigation
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [isTeamModeActivated, setIsTeamModeActivated] = useState(false);

  const playerNumberRadioButtons = useMemo(
    () => PLAYER_NUMBER_RADIO_BUTTON_OPTIONS,
    []
  );
  const gameTypeRadioButtons = useMemo(
    () => GAME_TYPE_RADIO_BUTTON_OPTIONS,
    []
  );
  const [playersNumberObject, setPlayersNumberObject] = useState(
    playerNumberRadioButtons[0]
  );

  const [selectedGameType, setSelectedGameType] = useState(
    GAME_TYPE_RADIO_BUTTON_OPTIONS[0]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control
  } = useForm<GameAttributes>({
    mode: 'onChange',
    defaultValues: {
      playersNumber: GamePlayerNumberEnum.TWO,
      gameType: GameTypeEnum.RAMI,
      finalScore: 501,
      playersName: ['player1', 'player2'],
      team: false
    }
  });

  const formResults = {
    register,
    handleSubmit,
    errors,
    control,
    getValues
  };

  const handleTeamModeChange = (): void => {
    setIsTeamModeActivated(!isTeamModeActivated);
  };

  const handlePlayersNumberChange = (value: string): void => {
    const playerNumber = PLAYER_NUMBER_RADIO_BUTTON_OPTIONS.find(
      (item) => item.id === value
    );
    if (playerNumber) {
      setPlayersNumberObject(playerNumber);
    }
  };

  const handleGameTypeChange = (value: string): void => {
    const gameType = GAME_TYPE_RADIO_BUTTON_OPTIONS.find(
      (item) => item.id === value
    );
    if (gameType) {
      setSelectedGameType(gameType);
    }
  };

  const handleCancelGame = (): void => {
    navigation.navigate(GAME_START_SECTION_SCREEN);
  };

  const navigateToGameScreen = (): void => {
    navigation.navigate(GAME_SCREEN);
  };
  const createGameAction = (data: GameAttributes): void => {
    try {
      dispatch(setGameType(selectedGameType.value as GameTypeEnum));
      data.team && dispatch(toggleGameTeamMode(isTeamModeActivated));
      dispatch(setGameStarted());
      if (data.playersName) {
        dispatch(
          setPlayers(data.playersName.filter((item) => item && item.length > 0))
        );
        isTeamModeActivated
          ? dispatch(setPlayersNumber(data.playersNumber / 2))
          : dispatch(setPlayersNumber(data.playersNumber));
      }
      data.finalScore && dispatch(setFinalScore(data?.finalScore));
      handleCancelGame();
      navigateToGameScreen();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GameSettings
      handleTeamModeChange={handleTeamModeChange}
      onConfirm={createGameAction}
      isTeamModeActivated={isTeamModeActivated}
      playersNumberObject={playersNumberObject}
      formResults={formResults}
      playerNumberRadioButtons={playerNumberRadioButtons}
      handlePlayersNumberChange={handlePlayersNumberChange}
      gameTypeRadioButtons={gameTypeRadioButtons}
      handleGameTypeChange={handleGameTypeChange}
      selectedGameType={selectedGameType}
      handleCancelGame={handleCancelGame}
    />
  );
};

export default GameSettingsContainer;
