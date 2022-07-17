import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const SignupFormSuccess=()=>{
return(
    <div className="container">
        <div>
            <div className="app-wrapper">
        <h1 className='form-success'>
            Account Was Created!
             </h1>
             <div>
                <Link to='/login'><button className='submit'>Log in</button></Link>
            </div>

        </div>
        </div>

    </div>
)


}
export default SignupFormSuccess