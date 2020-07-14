import AsyncStorage from '@react-native-community/async-storage';

var rooms = [];
getRoomFromStorage = async () => {
    await AsyncStorage.getItem('rooms')
    .then(result => {
        if(result !== null){
            rooms = result
        }
    })
}

export const initialState = {
    rooms : rooms || [],
    snackbar : false,
    firstApp : false
}

export const Reducer = (state = initialState, action) => {
    return state
}