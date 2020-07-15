import * as ActionTypes from './ActionTypes';

var rooms = [1];
export const Rooms = (state = rooms, action) => {
    switch(action.type){
        case ActionTypes.addRoom:
            var roomName = action.payload.name;
            var newRooms = rooms;
            newRooms.unshift(roomName);
            return newRooms;
        default : 
            return state
    }

}