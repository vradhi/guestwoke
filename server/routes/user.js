const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin')
const requireTLogin =require('../middleware/requireTLogin')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")
const Tenant = mongoose.model("Tenant")


router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put('/sendrequest',requireTLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.frndId,{
    $push:{followrequests:req.tenant._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        Tenant.findByIdAndUpdate(req.tenant._id,{
            $push:{sentrequests:req.body.frndId} 
        },{
             new:true}).select("-password").then(result=>{
                 res.json(result)
             }).catch(err=>{
                 return res.status(422).json({error:err})
             })
          

        


    })
    


})
router.put('/cancelrequest',requireTLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfrndId,{
    $pull:{followrequests:req.tenant._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        Tenant.findByIdAndUpdate(req.tenant._id,{
            $pull:{sentrequests:req.body.unfrndId} 
        },{
             new:true}).select("-password").then(result=>{
                 res.json(result)
             }).catch(err=>{
                 return res.status(422).json({error:err})
             })
          

        


    })
    


})
// router.get('/reqrecieved',requireLogin,(req,res)=>{                           //viewing user specific posts
//     User.find({followrequests: req.user._id})
//     .then(mypost=>{
//         res.json({myrequests})
//     })
//     .catch(err=>{
//         console.log(err)

//     })
// })
router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("_id email")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })

})



module.exports = router