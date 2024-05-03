import React from 'react';
import { Provider } from 'react-redux';

import Layout from './Layout';
import { store } from './store/store';
import 'react-native-devsettings';

/**
 * Represents whole application
 * Contains the layout wrapped inside redux provider
 * @returns JSX.Element
 */
const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
};

export default App;
