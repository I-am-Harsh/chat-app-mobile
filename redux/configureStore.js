import { createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Reducer, initialState } from './Reducer';
import { Rooms } from './Rooms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            rooms : Rooms
        })
    );

    return store;
}
