import React,{useState,useEffect,useContext} from 'react'
import '../../../src/App.css'
import {Link} from 'react-router-dom'
import {UserContext} from '../../App'

const MyHome = () => {
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/allposts', {
            headers: {
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            
            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                // console.log(result)
                const newData = data.map(item=>{
                    if(item._id==result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
                }).catch(err=>{
                    console.log(err)
                })
          
  }  
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                 //console.log(result)
                 const newData = data.map(item=>{
                    if(item._id==result._id){
                        return result
                    }else{
                        return item
                    }
                })
                setData(newData)
            }).catch(err=>{
                console.log(err)
            })
          
  }  
  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}

    return (
        
    
       <div className="myhome">
           {
               data.map(item=>{
                   return(
<div className="card home-card" key={item._id}>
               <h5><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id : "/profile"}> {item.postedBy.username} </Link>
               {item.postedBy._id==state._id
               && <i className="material-icons" 
               style={{float:"right"}}
               onClick={()=>{deletePost(item._id)}}
              >delete</i>
               
               }</h5>
                
               <div className="card-image">
                   <img src={item.photo}/>
               </div>
               <div className="card-content">
               <i class="material-icons">favorite</i>
               {item.likes.includes(state._id)
               ?
               <i class ="material-icons" onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
               :
               <i class ="material-icons" onClick={()=>{likePost(item._id)}}>thumb_up</i>
               }
               <h6>{item.likes.length} likes</h6>
                   <h6>{item.title}</h6>
                   <p>{item.Address}</p>
                   <p>{item.SpecifiedArea}</p>
                   <p>{item.GenderPref}</p>
                   <p>{item.rent}</p>
                <p>{item.facilities}</p>
                   
               </div>
           </div>
        
           
                   )
               })
           }
           
      </div>       
    )
}

 export default MyHome