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
    const registerAcount = () => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const today = new Date();
        const minDate = new Date('1920-01-01');
        const selectedDate = new Date(birthDate);
        if (password.length > 8 && name.length > 3 && emailRegex.test(email) && selectedDate <= today && selectedDate >= minDate) {
            console.log("Great Success!")
        } else {
            console.log("NO!")
        }
    }

    return(
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} alt="Back arrow"/>
                <div className='register-input-div'>
                    <RegisterTitle />
                    <TextBox
                        id={textBoxesArray[0].id}
                        title={textBoxesArray[0].title}
                        placeHolder={textBoxesArray[0].placeHolder}
                        type={textBoxesArray[0].type}
                        onChange={handleNameChange}
                    />
                    <TextBox
                        id={textBoxesArray[1].id}
                        title={textBoxesArray[1].title}
                        placeHolder={textBoxesArray[1].placeHolder}
                        type={textBoxesArray[1].type}
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
                        id={textBoxesArray[3].id}
                        title={textBoxesArray[3].title}
                        placeHolder={textBoxesArray[3].placeHolder}
                        type={textBoxesArray[3].type}
                        onChange={handleBirthDateChange}
                    />
                    <TextBox
                        id={textBoxesArray[4].id}
                        title={textBoxesArray[4].title}
                        placeHolder={textBoxesArray[4].placeHolder}
                        type={textBoxesArray[4].type}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className='register-btn-div'>
                    <ButtonCard className="register-submit-btn" onClick={registerAcount}>צור משתמש</ButtonCard>
                    <div className='have-account-div'>
                        <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page">התחבר</span></p>
                    </div>
                </div>
        </div>
    );
}

export default RegisterBoxs;
