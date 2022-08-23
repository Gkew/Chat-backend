const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', usersSchema);

module.exports = User;