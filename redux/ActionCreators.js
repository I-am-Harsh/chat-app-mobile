import * as ActionTypes from './ActionTypes';


export const addRoom = (name) => ({
    type : ActionTypes.addRoom,
    payload : {
        name
    }
});

export const deleteAllRooms = () => ({
    type : ActionTypes.deleteAllRooms
})

// define payload
export const deleteSingleRoom = (index) => ({
    type : ActionTypes.deleteSingleRoom,
    payload : {
        index
    }
})

export const snackbarToggle = (current) => ({
    type : ActionTypes.snackbar,
    payload : {
        current
    }
})

export const addMessageToRoom = (roomName, name, message) => ({
    type : ActionTypes.addMessage,
    payload : {
        username : name,
        message,
        roomName
    }
})

export const darkMode = (mode) => ({
    type : ActionTypes.darkMode
})