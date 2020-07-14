import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Main from './Components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';



const store = ConfigureStore();

export default function App() {
  return (
    <Provider store = {store}>
      <NavigationContainer>
        <Main/>
      </NavigationContainer>
    </Provider>
  );
}