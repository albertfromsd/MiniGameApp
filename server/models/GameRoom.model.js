const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const GameRoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        unique: true,
        minlength: [
            4,
            "Room name must be at least 4 characters"
        ],
    },
    password: {
        type: String,
        minlength: [
            3,
            "Password must be at least 3 characters long"
        ],
    },
    admin: {
        type: String,
    },
    roomMembers: [{
        type: String,
    }],
}, {timestamps: true});

GameRoomSchema.virtual('passwordConfirmation', {
    get: () => this._passwordConfirmation,
    set: val => this._passwordConfirmation = val
})

// GameRoomSchema.pre('validate', function(next) {
//     if (this.password !== this.passwordConfirmation) {
//         this.invalidate('passwordConfirmation', 'Password does not match confirmation');
//     }
//     next();
// });

GameRoomSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hashedPw => {
            this.password = hashedPw;
            next(); //put this line inside of .then so it saves after it has been hashed
        })
        .catch(()=>console.log("Something went wrong during password hashing"));
});

const GameRoom = mongoose.model("GameRoom", GameRoomSchema);

module.exports = { GameRoom };