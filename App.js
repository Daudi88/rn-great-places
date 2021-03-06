import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';
import PlacesNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/places-reducer';

init()
  .then(() => {
    console.log('Initialized database.');
  })
  .catch(err => {
    console.log('Initializing database failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
