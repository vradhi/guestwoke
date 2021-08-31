import React,{useState,useEffect} from 'react'
import '../../../src/App.css'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'
const CreatePost = () => {
    const history = useHistory()
    const [title,setTitle] = useState("")
    const [Address,setAddress] = useState("")
    const [SpecifiedArea,setSpecifiedArea] = useState("")
    const [facilities,setFacilities] = useState("")
    const [rent,setRent] = useState("")
    const [GenderPref,setGenderPref] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    useEffect(()=>{
        if(url){
        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title,
                Address,
                SpecifiedArea,
                GenderPref,
                facilities,
                rent,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    },[url])
    const postDetails = () => {
        const data = new FormData()
        data.append("file",image)
       // for(let i=0; i<photo.files.length;i++) {
        //    data.append('photo',photo.files[i])
       // }
        data.append("upload_preset","guestwokeposts")
        data.append("cloud_name","guestwoke-cloud")
        fetch("https://api.cloudinary.com/v1_1/guestwoke-cloud/image/upload",
        {method:"post",
         body:data})
         .then(res=>res.json())
         .then(data=>{
             setUrl(data.url)
         })
         .catch(err=>{
             console.log(err)
         })
        
        
    }
    
    


    return (
        <div className="card postinput" 
        style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: "center"
        }}>
            <input type="text" placeholder="Title of the post" required="true" value={title} onChange={(e)=>setTitle(e.target.value)} />
            
              <p>
                  <h5>Enter the essential details of your PG facility:</h5>
                  
                  <input type="text" placeholder="Address" required="true" value={Address} onChange={(e)=>setAddress(e.target.value)}/>
                  <input type="text" placeholder="Specified Area" required="true" value={SpecifiedArea} onChange={(e)=>setSpecifiedArea(e.target.value)} />
                  <input type="text" placeholder="Facilities provided for e.g. 24/7 water supply, Wi-fi etc" required="true" value={facilities} onChange={(e)=>setFacilities(e.target.value)}/>
                  <input type="text" placeholder="Desired Rent" required="true" value={rent} onChange={(e)=>setRent(e.target.value)}/>
                  <input type='text' placeholder="Gender Preference (optional)" value={GenderPref} onChange={(e)=>setGenderPref(e.target.value)} />
                  <div className="file-field input-field">
                  <div className="btn">
                  <span>Upload image</span>
                   <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
               <input className="file-path validate" type="text" placeholder="Upload one image" />
              </div>
              </div>
               
              <button class="btn waves-effect waves-light #ff5252 red accent-2" type="submit" name="action" onClick={()=>postDetails()}>Submit your post
    
    </button>
                  

              </p>
            
        </div>
    )
}

export default CreatePost