const mongoose = require('mongoose')

const USerSchema = new mongoose.Schema({
    username: String,
    email: String,
    phoneNo: String,
    password: String,
})

const User = mongoose.model('users', USerSchema)
module.exports = User