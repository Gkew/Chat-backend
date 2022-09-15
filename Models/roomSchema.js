const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        roomId: {type: String},
        messageText: {type: String, required: true },
        userName: {type: String}
        
    },{ timestamps: true }
);

module.exports = mongoose.model("room", roomSchema);
