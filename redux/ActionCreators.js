import * as ActionTypes from './ActionTypes';


export const addRoom = (name) => ({
    type : ActionTypes.addRoom,
    payload : {
        name : name
    }
});