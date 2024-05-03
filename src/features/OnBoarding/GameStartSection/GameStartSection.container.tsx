import React from 'react';
import { useForm } from 'react-hook-form';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import { type OnBoardingStackParamList } from '_navigation/StackNavigation/OnBoardingStackNavigation';

import { type GameAttributes } from '_models/Game/Games';

import {
  GAME_SETTINGS_SCREEN,
  type GAME_START_SECTION_SCREEN
} from '../../../utils/screenNames';

import GameStartSection from './GameStartSection';

/**
 * Container used to separate GameStartSection logic as a wrapper to GameStartSection screen
 * @returns JSX.Element
 */
interface GameStartSectionContainerProps
  extends NativeStackScreenProps<
    OnBoardingStackParamList,
    typeof GAME_START_SECTION_SCREEN
  > {}

const GameStartSectionContainer: React.FC<GameStartSectionContainerProps> = ({
  navigation
}): JSX.Element => {
  const { reset } = useForm<GameAttributes>();

  const navigateToGameSettingScreen = (): void => {
    navigation.navigate(GAME_SETTINGS_SCREEN);
    reset();
  };
  return <GameStartSection onPress={navigateToGameSettingScreen} />;
};

export default GameStartSectionContainer;
