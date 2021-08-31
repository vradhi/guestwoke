const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactinfo: {
        type: String,
        required: true
        
    },
    followrequests: [{type:ObjectId,ref:"Tenant"}]
})
mongoose.model("User",userSchema)              //has to be the owner as they can create a post