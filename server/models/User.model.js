const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        minlength: [
            4,
            "Username must be at least 4 characters"
        ]
    },
    email: {
        type: String,
        unique: true,
        validate: [
            val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            "Please enter a valid email"
        ]
    },
    password: {
        type: String,
        required: [
            true,
            "Password is required"
        ],
        minlength: [
            4,
            "Password must be at least 4 characters long"
        ]
    }
}, {timestamps: true});

UserSchema.virtual('passwordConfirmation', {
    get: () => this._passwordConfirmation,
    set: val => this._passwordConfirmation = val
})

UserSchema.pre('validate', function(next) {
    if (this.password !== this.passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Password does not match confirmation');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hashedPw => {
            this.password = hashedPw;
            next(); //put this line inside of .then so it saves after it has been hashed
        })
        .catch(()=>console.log("Something went wrong during password hashing"));
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };