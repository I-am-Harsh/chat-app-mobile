import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import Main from './Components/MainComponent';
import { Provider, connect } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { darkMode } from './redux/ActionCreators';


const { persistor, store } = ConfigureStore();

const customTheme = {
  ...DefaultTheme,
  dark: true,
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

const mapStateToProps = state => {
  return {
    darkMode : state.darkMode
  }
}

const mapDispatchToProps = (dispatch) => ({
  darkMode : (mode) => dispatch(darkMode(mode))
})

export default function App() {
  return (
    <Provider store = {store}>
      <PersistGate 
        persistor = {persistor}
        loading={null}
      >
        <PaperProvider theme = {customTheme}>
          <NavigationContainer>
            <Main/>
          </NavigationContainer>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

// export default connect(mapDispatchToProps, mapStateToProps)(App);