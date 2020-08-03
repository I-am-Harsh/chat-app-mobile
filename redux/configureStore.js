import { createStore, applyMiddleware } from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Rooms } from './Rooms';
import { snackbar } from './Snackbar';
import { darkMode } from './darkMode';
import { RoomChat } from './RoomChat';


const config = {
    key: 'root',
    storage : AsyncStorage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            rooms : Rooms,
            snackbar : snackbar,
            darkMode : darkMode
        }),
        applyMiddleware(thunk)
    );
    const persistor = persistStore(store);
    return { persistor, store };
}
