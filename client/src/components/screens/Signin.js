import React,{useState,useContext,} from 'react'
import '../../../src/App.css'
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css'
import {UserContext} from '../../App'




const Signin = () => {
     const {state,dispatch} = useContext(UserContext)
  
      const history = useHistory()
      const [password,setPassword] = useState("")
      const [email,setEmail] = useState("") 
    
      const PostData = () => {
        

       if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
         return 
     }
        fetch("/signin", {
          method:"post",
          headers: {
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            
                   password,
                   email,
                   
            

         })
      }).then(res=>res.json())
        .then(data=>{
         console.log(data)
       if(data.error){

          
      M.toast({html: data.error,classes:"#c62828 red darken-3"}) 
       }
         else{
           localStorage.setItem("jwt",data.token)
           localStorage.setItem("user",JSON.stringify(data.user))
           dispatch({type:"USER",payload:data.user})
           
          M.toast({html:"signed in successfully!",classes:"#00796b teal darken-2"})
           history.push('/myhome')
         }
       }).catch(err=>{
         console.log(err)
      })
      
  }
    return (
        <div class="signin">
        <div class="row">
        <div class="col s12 m4">
          <div class="card blue-grey">
            <div class="card-content white-text">
              <span class="card-title">Sign in as Owner</span>
              <p>
                  <input type='text' placeholder='E-mail' value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  />
                  <input type='password' placeholder='Password'
                  value={password} onChange={(e)=>setPassword(e.target.value)}
                  />
                   Note: Your sign in request will be only be accepted if you are an authorized user of this website.
                
              
            </p>
            <br></br>
            
            
            <button class="btn waves-effect waves-light #ff5252 red accent-2" type="submit" name="action" onClick={()=>PostData()}>
            Submit
  </button>
  <h5><Link to='/signup'>Don't have an account? Sign up here.</Link></h5>

            
            
</div>      
</div>
</div>
</div>
</div>

  
) 
}
    
export default Signin