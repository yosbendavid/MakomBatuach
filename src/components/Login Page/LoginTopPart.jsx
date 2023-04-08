import React from 'react';
import loginImage from "../../Photos/loginImage.png";

const LoginTopPart = () => {

    return(
        <div>
            <div className='image-container'>
                <img className="login-image" src={loginImage} alt="logInImage"/>
            </div>

            <div className='login-title'>
                <p className='login-title-text'>מקום בטוח</p>
            </div>
        </div>
    );
}

export default LoginTopPart;