import React, { useState } from "react";
import "../../../CSS/NewMeetingApproved.css";
import ButtonCard from "../../Template parts/ButtonCard";
import Checked from "../../../Photos/Checked.svg"
import { useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";

const MeetingApproved = () => {

    const [email, setEmail] = useState('')


    const { state } = useLocation();
    useEffect(() => {
        const email = state;
        setEmail(email);
        console.log(email);
    }, []);

    const finished = (event) => {
        event.preventDefault();

        Go2PatHome();

    }



    const navigate = useNavigate();

    const Go2PatHome = () => {
        navigate('/Phome', { state: email })
    }

    const Go2NewMetting = () => {
        navigate("/Patient",{state: email});
    }

    return (
        <div className="MeetingApproved-container">
            <div className="MeetingApproved-div">
                <form onSubmit={finished}>
                    <div className="MeetingApproved-img">
                        <img src={Checked} alt="checked" />
                    </div>
                    <p className="MeetingApproved-title">הפגישה נקבעה!</p>
                    <div className="MeetingApproved-text-div">
                        <p className="MeetingApproved-text">נא לוודא להודיע 48 שעות מראש אם את/ה מעוניין/ת לבטל את הפגישה</p>
                    </div>
                    <ButtonCard type="submit">למסך הבית</ButtonCard>

                    <a className="setNewMeeting" onClick={Go2NewMetting} href="">לקביעת תור נוסף</a>

                </form>
            </div>
        </div>
    )
};

export default MeetingApproved;