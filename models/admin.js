const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    username : String,
    password : String,
    email : String,
    cart : Array
})

let admin = new mongoose.model('admin', adminSchema);

module.exports = admin;