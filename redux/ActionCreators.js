import * as ActionTypes from './ActionTypes';


export const addRoom = (name) => ({
    type : ActionTypes.addRoom,
    payload : {
        name : name
    }
});

export const deleteAllRooms = () => ({
    type : ActionTypes.deleteAllRooms
})

// define payload
export const deleteSingleRoom = (index) => ({
    type : ActionTypes.deleteSingleRoom,
    payload : {
        index : index
    }
})