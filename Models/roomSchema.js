const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomId: {type: String, required: true, unique: true},
        messageText: {type: String, required: true },
        messagesTime: {type: String},
        userName: {type: String},
        userPic: {type: String}
    },
);

module.exports = mongoose.model("room", roomSchema);
