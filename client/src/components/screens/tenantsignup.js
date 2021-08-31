import React,{useState} from 'react'
import {Link,useHistory } from "react-router-dom";
import M from 'materialize-css'

const Signup2 = () => {
    const history = useHistory()
    const [username,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const PostData = () => {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html: "Invalid email",classes:"#c62828 red darken-3"})
        return 
      }
      fetch("/pgsignup", {
        method:"post",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
          username,
          password,
          email,
          confirmPassword

        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){

        
        M.toast({html: data.error,classes:"#c62828 red darken-3"}) 
        }
        else{
          M.toast({html:data.message,classes:"#00796b teal darken-2"})
          history.push('/pgsignin')
        }
      }).catch(err=>{
        console.log(err)
      })
    
  }












return (

        
            
    
    <div class="signin">
    <div class="row">
    <div class="col s12 m4">
      <div class="card #bbdefb #7e57c2 #2e7d32 green darken-3">
        <div class="card-content white-text">
          <b><span class="card-title">Sign Up as Tenant</span></b>
          <p> <input type='text' placeholder='Username' value={username} onChange={(e)=>setName(e.target.value)}/>
              <input type='text' placeholder='E-mail' value={email} onChange={(e)=>setEmail(e.target.value)} />
              <input type='password' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
              <input type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  />
              

              Note: Only registered owners can create, update or delete posts and accept requests from tenants for sharing contact information.
            
          
        </p>
        <br></br>
        
        
        <button class="btn waves-effect waves-light #ff5252 red accent-2" type="submit" name="action" onClick={()=>PostData()}>Register yourself!

</button>
<h5><Link to="/signin">Already have an account? Sign in here.</Link></h5>
<h5><Link to="/signup">To sign up as an owner, click here.</Link></h5>
</div>

</div>
</div>
</div>
</div>


        
    
) 
}
export default Signup2