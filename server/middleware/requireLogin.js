const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = (req,res,next) =>{
    const {authorization} = req.headers
    if(!authorization) {
       return res.status(401).json({error:'You must be logged in'})
    }
    const token = authorization.replace('Bearer ','')
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err) {
            return res.status(401).json({err: 'you must be logged in'})
        }
        const {_id} = payload                                              //tenant token /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAyZjg5ZDM4MzBjMTRlNjBiZjY1ZjAiLCJpYXQiOjE2MTA4MDc3MjZ9.yx-xzpr_5RagpKH1pkNKBKOe3lE8dlPzhihL0eybljw
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })

    })


}


