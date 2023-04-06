import React, { useState } from 'react';
import TextBox from "./TextBox";
import SelectBox from "./SelectBox";
import RegisterTitle from "./RegisterTitle";
import {selectBoxArray} from "./Data/selectBoxArray";
import {textBoxesArray} from "./Data/textBoxesArray";
import backArrow from "../../Photos/backArrow.svg";
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
    return(
        <div className="register-boxs-div">
            <img className="back-from-register" src={backArrow} alt="Back arrow"/>
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
                <br />
                <p className="register-submit-btn">צור משתמש</p>
            <p className="have-account-p">יש לך כבר משתמש? <span className="connect-page">התחבר</span></p>
        </div>
    );
}

export default RegisterBoxs;
