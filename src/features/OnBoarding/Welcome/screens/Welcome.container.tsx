import React from 'react';

import Welcome from './Welcome';

/**
 * Container used to seperate welcome logic as a wrapper to Welcome screen
 * @returns JSX.Element
 */
const WelcomeContainer = (): JSX.Element => {
  return <Welcome />;
};

export default WelcomeContainer;
