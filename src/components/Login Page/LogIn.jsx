import React, { useState } from 'react';
import loginImage from "../../Photos/loginImage.png";
import '../../CSS/login.css';

const Login = () => {


    return(
        <div className="login-container-div">
            
            <div className='image-container'>
                <img className="login-image" src={loginImage} alt="logInImage"/>
            </div>

             <div className='login-title'>
                <p className='login-title-text'>
                    מקום בטוח
                </p>
             </div>

        </div>
    );
}
export default Login;