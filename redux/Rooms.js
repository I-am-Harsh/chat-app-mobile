import * as ActionTypes from './ActionTypes';

var rooms = [];
export const Rooms = (state = rooms, action) => {
    switch(action.type){
        case ActionTypes.addRoom:
            var roomName = action.payload.name;
            var newRooms = [...state];
            newRooms.unshift(roomName);
            return newRooms;
        default : 
            return state
    }

}