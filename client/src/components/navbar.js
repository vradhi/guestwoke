import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'



const NavBar = () => {
  const SearchModal = useRef(null)
  const [search,setSearch] = useState('')
  const [postDetails,setPostDetails] = useState([])
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  useEffect(()=>{
    M.Modal.init(SearchModal.current)
  },[])
  const renderList = () => {
    if(state){
      return [
        <li key='1'><i data-target="modal1" className="material-icons modal-trigger">search</i></li>,
        <li key='2'><Link to='/profile'><i class='medium material-icons'>person</i></Link></li>,
        <li key='3'><Link to='/myhome'><i class='medium material-icons'>home</i></Link></li>,
        <li key='4'><Link to='/createpost'><i class='material-icons'>insert_comment</i></Link></li>,
        <li key='5'><button class="btn waves-effect waves-light #ff5252 red accent-2" type="submit" name="action" 
        onClick={()=>{
          localStorage.clear()
          dispatch({type:"CLEAR"})
          history.push('/')
        }
        }>
            Logout
  </button>
  </li>
       

      ]

      
    } else {
      return [
        
        <li><Link to='/signin'>Sign In as Owner</Link></li>, 
      <li><Link to='/pgsignin'>Sign In as Tenant</Link></li>,  
      <li><Link to='/signup'>Register as Owner</Link></li>,
       <li><Link to='/pgsignup'>Register as Tenant</Link></li>,
       <li><Link to="#">About</Link></li>
       

      ]
    }
  }
  const fetchPosts = (query) => {
    setSearch(query)
    fetch('/searchposts', {
      method: "post",
      headers: {
        "Content-Type": "application/json",
       // "Authorization": "Bearer " +localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        query
      })

    }).then(res=>res.json())
    .then(results=>{
      setPostDetails(results.post)
    })
  }  
  
  
  return (
    <nav>
    <div class="nav-wrapper">
      <Link to="/" class="brand-logo">Guestwoke.com</Link>
      <ul id="nav-mobile" class="right">
        {renderList()}
      

    
  
      </ul>      
    </div>
    <div id="modal1" className="modal" ref={SearchModal} style={{color:"black"}}>
    <div className="modal-content" style={{color:"black"}}>
      <input type="text" placeholder="search for PG facilities for specific areas or location" value={search}
      onChange={(e)=>fetchPosts(e.target.value)}/>
      
    <ul className="collection">
      {
        postDetails.map(item=>{
          return <Link to={"/myhome/"+item._id} onClick={()=>{
            M.Modal.getInstance(SearchModal.current).close()
          }
                  
          }><li className='collection-item'> {item.SpecifiedArea} </li> </Link> 
          
        })
      }
    </ul>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>CLOSE</button>
    </div>
  </div>
  </nav>
    )
}
export default NavBar