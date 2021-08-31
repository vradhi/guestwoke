const mongoose = require('mongoose')
const {} = mongoose.Schema()
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title: {

    type: String,
    required: true 
    },

    Address: {
        type: String,
        required: true },
    SpecifiedArea: {
        type: String,
        required: true
    },
    GenderPref: {
       type: String,
       default: '(optional)'
    },
    facilities: {
        type: String,
        default: 'mention the facilities provided'
    },
    rent: {
        type: String,
        required: true
    },
    likes: [{type:ObjectId,ref:"Tenant"}],

        
    
    photo: {
        type: String,
        required: true
                      //we will be storing the URL so the type string is used
    
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
        
    }

},{timestamps:true})
mongoose.model("Post",postSchema)