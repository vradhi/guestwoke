const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const requireTLogin = require('../middleware/requireTLogin')
const Post = mongoose.model('Post')
const Tenant = mongoose.model('Tenant')
 


router.get('/allposts',requireTLogin,(req,res)=>{
    Post.find({})
    .populate('postedBy','_id username') 
    .sort('-createdAt')              
    .then(posts=>{
        res.json({posts}) 
    })
    .catch(err=>{
        console.log(err)
    })

})



router.post('/createpost',requireLogin,(req,res)=>{
    const {title,Address,SpecifiedArea,GenderPref,rent,facilities,pic} = req.body
    console.log(title,Address,SpecifiedArea,facilities,rent,GenderPref,pic)

    if(!title || !Address || !SpecifiedArea || !facilities || !rent || !pic) {
        return res.status(402).json({error: 'Please add all the fields in the post'})
    }
    req.user.password = undefined
    const post = new Post({
        title,
            Address,
            SpecifiedArea,
            GenderPref,
            facilities,
            rent,
            photo:pic,
        postedBy: req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
    
})

router.get('/mypost',requireLogin,(req,res)=>{                           //viewing user specific posts
    Post.find({postedBy: req.user._id})
    .populate('postedBy', '_id username')
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)

    })
})

router.put('/like',requireTLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.tenant._id}}, 
       
            
        
           { new: true
        

        
    
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})

router.put('/unlike',requireTLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.tenant._id}}, 
        
            
        
           { new: true
        

        
    
    }).exec((err,result)=>{
        if(err) {
            return res.status(422).json({error:err})
        }
        else {
            res.json(result)
        }
    })
})
router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})
router.post('/searchposts',(req,res)=>{
    let postPattern = new RegExp("^"+req.body.query)
    Post.find({SpecifiedArea:{$regex:postPattern}})
    .then(post=>{
        res.json({post})
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDAyZjBmMjA5ZTM5NTI1NTAzNDk2MGIiLCJpYXQiOjE2MTA4MDU1NDR9.h3_dEavtBR-Z5yEvhcudlLBvMpBD48ghG0ahBTrQ4oQ