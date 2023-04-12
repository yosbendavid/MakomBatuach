import React, { useState } from 'react';
import TextBox from "../Template parts/TextBox";
import SelectBox from "../Template parts/SelectBox";
import RegisterTitle from "./RegisterTitle";
import {selectBoxArray} from "./Register-Data/selectBoxArray";
import {textBoxesArray} from "./Register-Data/textBoxesArray";
import backArrow from "../../Photos/backArrow.svg";
import ButtonCard from '../Template parts/ButtonCard';
import '../../CSS/register.css';

const RegisterBoxs = () => {

    const [name, setName] = useState("");
    const [email, seteEMail] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [password, setPassword] = useState("");
    
    const handleNameChange = (value) => {
        setName(value);
    }

    const handleEmailChange = (value) => {
        seteEMail(value);
    }

    const handleGenderChange = (value) => {
        setGender(value);
    }

    const handleBirthDateChange = (value) => {
        setBirthDate(value);
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
    }

    //לוחץ על צור משתמש זה הפונקציה עם הולידציה בנוגע למידע לעדכן לולידציה רלוונטית
    const registerAcount = (event) => {
        event.preventDefault();
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (password.length > 8 && name.length > 3 && emailRegex.test(email)) {
            console.log("Great Success!")
        } else {
            console.log("NO!")
        }
    }

    return(
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} alt="Back arrow"/>
            <form onSubmit={registerAcount}>
                <div className='register-input-div'>
                    <RegisterTitle />
                    <TextBox
                        id={textBoxesArray[0].id}
                        title={textBoxesArray[0].title}
                        placeHolder={textBoxesArray[0].placeHolder}
                        type={textBoxesArray[0].type}
                        autoComplete= {textBoxesArray[0].autoComplete}
                        onChange={handleNameChange}
                    />
                    <TextBox
                        id={textBoxesArray[1].id}
                        title={textBoxesArray[1].title}
                        placeHolder={textBoxesArray[1].placeHolder}
                        type={textBoxesArray[1].type}
                        autoComplete= {textBoxesArray[0].autoComplete}
                        onChange={handleEmailChange}
                    />
                    <SelectBox
                        id={selectBoxArray[0].id}
                        title={selectBoxArray[0].title}
                        placeHolder={selectBoxArray[0].placeHolder}
                        values={selectBoxArray[0].values}
                        onChange={handleGenderChange}
                    />
                    <TextBox
                        id={textBoxesArray[2].id}
                        title={textBoxesArray[2].title}
                        placeHolder={textBoxesArray[2].placeHolder}
                        type={textBoxesArray[2].type}
                        autoComplete= {textBoxesArray[2].autoComplete}
                        onChange={handleBirthDateChange}
                    />
                    <TextBox
                        id={textBoxesArray[3].id}
                        title={textBoxesArray[3].title}
                        placeHolder={textBoxesArray[3].placeHolder}
                        type={textBoxesArray[3].type}
                        autoComplete= {textBoxesArray[3].autoComplete}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className='register-btn-div'>
                    <ButtonCard type="submit" className="register-submit-btn">צור משתמש</ButtonCard>
                    <div className='have-account-div'>
                        <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page">התחבר</span></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegisterBoxs;
