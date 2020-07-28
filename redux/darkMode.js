import * as ActionTypes from './ActionTypes';

export const darkMode = (state = false, action) => {
    switch (action.type){
        case ActionTypes.darkMode : 
            return !state
        default :
            return state
    }
}