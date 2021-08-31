const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Tenant = mongoose.model('Tenant')
    //as the model name given is user 
const Post = mongoose.model('Post')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const requireTLogin = require('../middleware/requireTLogin')






router.post('/signup',(req,res)=>{                                      //signup for owners (users that provide pg facilities)
    const {username,email,password,contactinfo} = req.body
    if(!username || !email || !password || !contactinfo) {
        return res.status(422).json({error: 'please add all the fields!'})
    }
    User.findOne({email: email})
    .then((savedUser)=>{
        if(savedUser) {
            return res.status(422).json({error: 'user already exists with that email'}) 
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
        const user = new User({
           email,
           password: hashedpassword,
           username,
           contactinfo
        })
       user.save() 
       .then(user=>{
           res.json({message: 'saved successfully'})
       }) 
       .catch(err=>{
           console.log(err)
       })
    }) 
})
    .catch(err=>{
        console.log(err)
    })
})
router.post('/pgsignup',(req,res)=>{                                    //signup for tenants (users that are looking for facilities)
    const {username,email,password} = req.body
    if(!username || !email || !password) {
        return res.status(422).json({error: 'please add all the fields!'})
    }
    Tenant.findOne({email: email})
    .then((savedTenant)=>{
        if(savedTenant) {
            return res.status(422).json({error: 'user already exists with that email'}) 
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
        const user = new Tenant({
           email,
           password: hashedpassword,
           username
        })
       user.save() 
       .then(user=>{
           res.json({message: 'saved successfully'})
       }) 
       .catch(err=>{
           console.log(err)
       })
    }) 
})
    .catch(err=>{
        console.log(err)
    })
})


router.post('/signin',(req,res)=>{                                      //signin for owners
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: 'Please provide the email or the password'})
    }
    User.findOne({email: email})
    .then(savedUser=>{
        if(!savedUser) {
           return  res.status(422).json({error: 'invalid email or password'})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id: savedUser._id},JWT_SECRET)
               // res.json({token})
               const {_id,email,username,contactinfo,followrequests} = savedUser
                res.json({token,user:{_id,email,username,contactinfo,followrequests}})

                // res.json({message: 'successfully signed in!'})
            }
            else {
                return res.status(422).json({error: 'Invalid credentials! Try again'})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
router.post('/pgsignin',(req,res)=>{                                      //signin for tenants
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: 'Please provide the email or the password'})
    }
    Tenant.findOne({email: email})
    .then(savedTenant=>{
        if(!savedTenant) {
           return  res.status(422).json({error: 'invalid email or password'})
        }
        bcrypt.compare(password,savedTenant.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id: savedTenant._id},JWT_SECRET)
                const {_id,email,username,sentrequests} = savedTenant
                res.json({token,user:{_id,email,username,sentrequests}})

                //res.json({message: 'successfully signed in!'})
            }
            else {
                return res.status(422).json({error: 'Invalid credentials! Try again'})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
}) 


module.exports = router