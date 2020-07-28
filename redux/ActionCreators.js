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

export const snackbarToggle = (current) => ({
    type : ActionTypes.snackbar,
    payload : {
        current : current
    }
})

export const addMessage = (roomName, name, message) => ({
    type : ActionTypes.addMessage,
    payload : {
        username : name,
        message : message,
        roomName : roomName
    }
})

export const darkMode = (mode) => ({
    type : ActionTypes.darkMode
})