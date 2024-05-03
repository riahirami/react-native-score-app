import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {navigationRef} from '../navigation/RootNavigation';
import OnBoardingStackNavigation from '../navigation/StackNavigation/OnBoardingStackNavigation';

/**
 * Returns the navigation container that englobe App navigation
 * @returns JSX.Element
 */
function Navigation(): JSX.Element {
  return (
    <NavigationContainer ref={navigationRef}>
      <OnBoardingStackNavigation />
    </NavigationContainer>
  );
}

export default Navigation;
