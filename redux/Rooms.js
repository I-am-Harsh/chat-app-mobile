import * as ActionTypes from './ActionTypes';
import logger from 'redux-logger';

const rooms = {}
export const Rooms = (state = rooms, action) => {
    
    switch(action.type){
        case ActionTypes.addRoom:
            let roomName = action.payload.name;
            var newState = {...state};
            newState[roomName] = [];
            return newState
            
        case ActionTypes.deleteAllRooms:
            var newstate = {};
            return newstate;

        case ActionTypes.deleteSingleRoom:
            let deletedRoom = action.payload.name;
            var newState = {...state};
            delete newState[deletedRoom]
            return newState
        
        // case ActionTypes.addMessage :
        //     let message = action.paylod.message;
        //     let roomName = action.payload.roomName
        //     let userName = action.payload.username
            
        default : 
            return state
    }

}