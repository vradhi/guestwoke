import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const [showfollow,setShowFollow] = useState(true)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    console.log(userid)
    //const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           
            
            setProfile(result)
       })
    },[])
    
    const requestUser = () => {
        fetch('/sendrequest',{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                frndId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{sentrequests:data.sentrequests,followrequests:data.followrequests}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{...prevState.user,
                    followrequests:[...prevState.user.followrequests,data._id]}
                }
            })
            
           setShowFollow(false)
        })
    }

    const CancelRequest = () => {
        fetch('/cancelrequest',{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfrndId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            dispatch({type:"UPDATE",payload:{sentrequests:data.sentrequests,followrequests:data.followrequests}})
            localStorage.setItem("user",JSON.stringify(data))
            
            setProfile((prevState)=>{
                const newFriendreq = prevState.user.followrequests.filter(item=>item != data._id)
                return {
                    ...prevState,
                    user:{...prevState.user,
                    followrequests: newFriendreq
                }
            }
            
            })
            setShowFollow(true)
        })
    } 








   return(
       <>
        {userProfile ?
         <body className="profilestructure">
         <div>
             <div style={{
                 display: "flex",
                 justifyContent: "start",
                 margin: "30px 50px",
                 overflow: "hidden"
             
 
                 
             }}>
                 <div>
                {/* {showfollow
                ?
                  <div style={{display: "table-header-group", margin: "10px 10px", justifyContent: "space-between"}}>
                      
                 <i class="medium material-icons" onClick={()=>requestUser()}>person_add</i>Send Request to this owner 
                 <br></br>
                 :
                 <i class="medium material-icons" onClick={()=>CancelRequest()}>close</i>Cancel the Request
                 </div>
                 } */}
                 {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>requestUser()}
                    >
                        Request User
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>CancelRequest()}
                    >
                        Cancel Request
                    </button>
                    }
                 <br>
                 </br>
                 
                     <img style={{
                         width: "160px",
                         height: "160px",
                         borderRadius: "80px",
                         marginTop: "20px",
                     
                     }} src='https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80'/>
                     <br></br>
                     
                     <h4 style={{
                         marginLeft: "8px",
                         fontSize: "large"
                     }}>{userProfile.user.username}</h4>
 
                     <h4 style={{fontSize: "large"}}>EMAIL: {userProfile.user.email} </h4>
                     <div style={{display:"block",
                                  justifyContent: "space-between",
                                  width: "110%"
                                             }}>
                          <h6>Number of Posts: {userProfile.posts.length}</h6>
 
                         {/* <h6>Contact information: {state.contactinfo}</h6> */}
                         
 
                     </div>
                      <hr style={{borderBottom: "2px solid black",
                             }}></hr>
                             
                             <div className="gallery">
                                 {
                                     userProfile.posts.map(item=>{
                                         return (
                                             <img key={item._id} className="item" alt="some text" src={item.photo} alt={item.title} />
 
 
                                         )
                                     })
                                 }
            
                         
 
 
 
                             </div> 
                     
                     
 
                 </div>
                 
             </div>
             
         </div>
         </body>
         
        
        
        
        
        
        
        
        :
         <h2>LOADING...</h2>}
      </>
    )
}
export default UserProfile