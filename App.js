import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import Main from './Components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


const { persistor, store } = ConfigureStore();

const customTheme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    primary: '#034748',
    accent: '#11B5E4',
    background: '#F1F7ED',
    surface: '#F1F7ED',
    text: '#001021',
    error: '#B71F0E',
    disabled: '#BEC6C6',
    placeholder: '#1481BA',
    backdrop: '#001021',
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const newDark = {
  ...DarkTheme,
  colors : {
    background : '#034748'
  }
}

console.log(DarkTheme);

export default function App() {
  return (
    <Provider store = {store}>
      <PersistGate 
        persistor = {persistor}
        loading={null}
      >
        <PaperProvider theme = {customTheme}>
        {/* <PaperProvider theme = {customTheme}> */}
          <NavigationContainer theme = {newDark}>
          {/* <NavigationContainer theme = {newDark}> */}
            <Main/>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}