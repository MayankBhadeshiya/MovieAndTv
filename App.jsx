import React, { useEffect } from 'react';
import AppNav from './src/Navigation/AppNav';
import {Provider} from 'react-redux';
import store from './src/Redux/store';

export default function App() {
  
  return (
    <Provider store={store}>
      <AppNav></AppNav>
    </Provider>
  );
}


