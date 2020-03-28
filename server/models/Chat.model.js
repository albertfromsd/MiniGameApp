const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new mongoose.Schema({
    message: {
        type: String,
        require: [
            true,
            "Message cannot be blank"
        ]
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    },
}, {timestamps: true});

module.exports = { Chat };