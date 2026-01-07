const mongoose = require('mongoose');

const user = new mongoose.Schema({
    userName: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true }
}, {
    timestamps: true
})


const User = mongoose.model("User", user);
module.exports = User;


