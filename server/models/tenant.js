const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const tenantSchema = new mongoose.Schema({
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
    sentrequests: [{type:ObjectId,ref:"User"}]

})
mongoose.model("Tenant",tenantSchema)