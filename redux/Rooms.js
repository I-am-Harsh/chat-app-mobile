import * as ActionTypes from './ActionTypes';

var rooms = [];
export const Rooms = (state = rooms, action) => {
    switch(action.type){
        case ActionTypes.addRoom:
            var roomName = action.payload.name;
            var newRooms = [...state];
            newRooms.unshift(roomName);
            return newRooms;
        
        case ActionTypes.deleteAllRooms:
            newRooms = []
            return newRooms;

        case ActionTypes.deleteSingleRoom:
            var deletedRoom = action.payload.name
            var newRooms = [...state];
            newRooms.splice(deletedRoom,1)
            return newRooms
        default : 
            return state
    }

}