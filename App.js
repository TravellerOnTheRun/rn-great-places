import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducer from './store/places-reducer';

import PlacesNavigator from './navigation/PlacesNavigator';
import { init } from './helpers/db';

init()
  .then(() => {
    console.log('DB has been initialized');
  }).catch(err => {
    console.log('Initializing DB has failed');
    console.log(err);
  })


const store = createStore(reducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
