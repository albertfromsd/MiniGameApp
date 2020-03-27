const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
    message: {
        type: String,
        require: [
            true,
            "Message must be field"
        ]
    }
})

module.exports.Chatroom = mongoose.model("Chatroom", ChatroomSchema);