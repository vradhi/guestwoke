import React from 'react'
import '../../../src/App.css'
import {Link} from 'react-router-dom'
const Home = () => {
    return (
        <div class="homepage">
            <div class="bg-img"></div>
            <p>Looking for a PG facility? We got you covered!<br></br>
            Welcome to <b>Guestwoke.com</b> wherein the potential tenants can find PG facilities provided by the registered owners!<br></br>
            The key here is <b>'registered'</b> as it is a requirement of this very system.<br></br>
            I will try to implement a reccommendation system for the tenants so that they can get reccommendations 
            according to the rating of the posts
             and their location.<i>Wish me luck guys!</i> </p>
             <p>
                 <div class="homelink">
                <Link to='/signup'>SIGN UP to know more.</Link> Thank you!
                </div>
             </p>
        </div>
    )
}
export default Home