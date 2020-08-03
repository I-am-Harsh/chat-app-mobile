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
    [roomNameInput] : []
}

rooms[roomNameInput].push({
    userName,
    message
})

// rooms[roomNameInput].map(item => console.log(item))
// console.log(rooms);
const vals = Object.keys(rooms).map(key => key);
console.log(vals);
