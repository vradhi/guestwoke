
import React,{useEffect,useState,useContext} from 'react'
import '../../../src/App.css'
import {UserContext} from '../../App'
import UserProfile from './UserProfile'
const Profile = () => {
    
    const [mypics,setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    console.log(state)
    useEffect(()=>{
        fetch('mypost',{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
    

        })


    },[])
    //   fetch('reqreceived',{
    //       headers: {
    //           "Authorization": "Bearer "+localStorage.getItem("jwt")
    //       }
    //     }).then(res=>res.json())
    //     .then(result=>{
    //         setrequests(result.myrequests)

    //     })
      

 return(
        <body className="profilestructure">
        <div>
            <div style={{
                display: "flex",
                justifyContent: "start",
                margin: "30px 50px",
                overflow: "hidden"
            

                
            }}>
                <div>
                 <div style={{display: "table-header-group", margin: "10px 10px", justifyContent: "space-between"}}>
                 Friend requests received: 
                <br></br>
                <i class="small material-icons">email</i>
                <br></br>
        
                {state?state.email:"loading"}
                </div>

                <br>
                </br>
                
                    <img style={{
                        width: "160px",
                        height: "160px",
                        borderRadius: "80px",
                        marginTop: "20px",
                    
                    }} src='https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'/>
                    <br></br>
                    
                    <h4 style={{
                        marginLeft: "8px",
                        fontSize: "large"
                    }}>{state?state.username:"loading"}</h4>
                    <h4 style={{fontSize: "large"}}>Username: {state?state.username:"loading"}</h4>
                    <div style={{display:"block",
                                 justifyContent: "space-between",
                                 width: "110%"
                                            }}>

                        <h6>Contact information: </h6>
                        

                    </div>
                    <hr style={{borderBottom: "2px solid black",
                            }}></hr>
                            
                            <div className="gallery">
                                {
                                    mypics.map(item=>{
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
    )
}
export default Profile