import { createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Reducer, initialState } from './Reducer';

export const ConfigureStore = () => {
    const store = createStore(Reducer, initialState);

    return store;
}
