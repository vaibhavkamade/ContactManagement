const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
});

userSchema.set('timestamps',true);

module.exports = mongoose.model("user",userSchema);