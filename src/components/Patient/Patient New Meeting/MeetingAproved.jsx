import React, { useState } from "react";
import "../../../CSS/NewMeetingApproved.css";
import ButtonCard from "../../Template parts/ButtonCard";
import Checked from "../../../Photos/Checked.svg"

const MeetingApproved = (props) => {
    // const [meetingTitle, setMeetingTitle] = useState("");

    // const handleMeetingTitleChange = (event) => {
    //     setMeetingTitle(event.target.value);
    // }
    const finished = (event) => {
        event.preventDefault();
        
    }
    return(
        <div className="MeetingApproved-container">
            <div className="MeetingApproved-div">
                <form onSubmit={finished}>
                    <div className="MeetingApproved-img">
                        <img src={Checked} alt="checked"/>
                    </div>
                    <p className="MeetingApproved-title">הפגישה נקבעה!</p>
                    <div className="MeetingApproved-text-div">
                        <p className="MeetingApproved-text">נא לוודא להודיע 48 שעות מראש אם את/ה מעוניין/ת לבטל את הפגישה</p>
                    </div>
                    <ButtonCard type="submit">למסך הבית</ButtonCard>
                    <a className="setNewMeeting" href="">לקביעת תור נוסף</a>
                </form>
            </div>
        </div>
    )
};

export default MeetingApproved;