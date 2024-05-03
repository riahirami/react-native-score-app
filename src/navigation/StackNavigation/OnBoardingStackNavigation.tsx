import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GameScreenContainer from '../../features/OnBoarding/GameScreen/GameScreen.container';
import LoginContainer from '../../features/OnBoarding/Login/screens/Login.container';
import WelcomeContainer from '../../features/OnBoarding/Welcome/screens/Welcome.container';

import {
  GAME_SCREEN,
  GAME_SETTINGS_SCREEN,
  GAME_START_SECTION_SCREEN,
  LOGIN_SCREEN,
  WELCOME_SCREEN
} from '../../utils/screenNames';
import GameSettingsContainer from '../../features/OnBoarding/GameSettings/Screens/GameSettings.container';
import GameStartSectionContainer from '../../features/OnBoarding/GameStartSection/GameStartSection.container';
import { useAppSelector } from '_store/hooks';

// Define Stack param list for each screen
export type OnBoardingStackParamList = {
  [WELCOME_SCREEN]: undefined;
  [LOGIN_SCREEN]: undefined;
  [GAME_SCREEN]: undefined;
  [GAME_SETTINGS_SCREEN]: undefined;
  [GAME_START_SECTION_SCREEN]: undefined;
};

const OnBoardingStack = createNativeStackNavigator<OnBoardingStackParamList>();

/**
 * Returns the stack navigation and all the associated screens
 * @returns JSX.Element
 */
const OnBoardingStackNavigation = (): JSX.Element => {
  const isNoGameYet = useAppSelector((state) => !state.game.isGameStarted);

  return (
    <OnBoardingStack.Navigator initialRouteName={GAME_START_SECTION_SCREEN}>
      <OnBoardingStack.Screen
        name={WELCOME_SCREEN}
        component={WelcomeContainer}
      />
      <OnBoardingStack.Screen name={LOGIN_SCREEN} component={LoginContainer} />
      <OnBoardingStack.Screen
        name={GAME_START_SECTION_SCREEN}
        component={GameStartSectionContainer}
        options={{
          headerShown: false
        }}
      />
      {isNoGameYet ? (
        <OnBoardingStack.Screen
          name={GAME_SETTINGS_SCREEN}
          component={GameSettingsContainer}
          options={{
            presentation: 'modal',
            gestureEnabled: false
          }}
        />
      ) : (
        <OnBoardingStack.Screen
          name={GAME_SCREEN}
          component={GameScreenContainer}
          options={{
            headerBackVisible: false,
            headerShown: false
          }}
        />
      )}
    </OnBoardingStack.Navigator>
  );
};

export default OnBoardingStackNavigation;
