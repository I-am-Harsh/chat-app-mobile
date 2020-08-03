import * as ActionTypes from './ActionTypes';

var rooms = [];
export const Rooms = (state = rooms, action) => {
    switch(action.type){
        case ActionTypes.addRoom:
            let roomName = action.payload.name;
            let newRooms = [...state];
            newRooms.unshift(roomName);
            return newRooms;
        
        case ActionTypes.deleteAllRooms:
            newRooms = [];
            return newRooms;

        case ActionTypes.deleteSingleRoom:
            let deletedRoom = action.payload.name;
            let newRooms = [...state];
            newRooms.splice(deletedRoom,1)
            return newRooms
        
        case ActionTypes.addMessage :
            let message = action.paylod.message;
            let roomName = action.payload.roomName
            let userName = action.payload.username

            
        default : 
            return state
    }

}