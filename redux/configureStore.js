import { createStore, combineReducers, applyMiddleware } from 'redux';
import {persistCombineReducers, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Rooms } from './Rooms';


const config = {
    key: 'root',
    storage : AsyncStorage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            rooms : Rooms
        }),
        applyMiddleware(thunk)
    );
    const persistor = persistStore(store);
    return { persistor, store };
}
