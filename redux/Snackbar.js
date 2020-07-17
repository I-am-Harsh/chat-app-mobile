import * as ActionTypes from './ActionTypes';

export const snackbar = (state = false, action) => {
    switch(action.type){
        case ActionTypes.snackbar:
            var snackbar = !state
            return snackbar
        default :
            return state
    }
}