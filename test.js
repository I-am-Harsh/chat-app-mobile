const roomNameInput = 'roomTest'
const userName = 'gg'
const message = 'gg'



let rooms = {
    room1 : [
        {
            userName : 'harsh',
            message : 'lmao'
        },
        {
            userName : 'some',
            message : 'lo'
        },
        {
            userName : 'hereh',
            message : 'lmaqweo'
        }
    ],
    lol : [],
    asd : []
}


// rooms[roomNameInput].push({
//     userName,
//     message
// })


function A(obj) {
    for(var i in obj) return false; 
    return true;
  }

// if(A(rooms)){
//     console.log('empty');

// }
// else{
//     console.log('not empty');
// }


const checkIfRoomJoined = () => {
    let result = Object.keys(rooms).some((current)  => current === 'l213ol')
    return result
}

console.log(checkIfRoomJoined());
