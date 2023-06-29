import React, { useState, useEffect } from "react";
import CalendarF from "../../Calendar/CalendarF";
import "../../../CSS/PatientNewMeeting.css"
import backArrow from "../../../Photos/backArrow.svg";
import ButtonCard from "../../Template parts/ButtonCard";
import { useNavigate } from "react-router-dom";


const PatientNewMeeting = (props) => {
    const [isSliderOpen, setIsSliderOpen] = useState(false);
    const [isSlotClick, setIsSlotClick] = useState(false);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [email, setEmail] = useState("");
    const [isCalendarReady, setIsCalendarReady] = useState(false); // Added state for calendar readiness




    const handleArrowClick = () => {
        setIsSliderOpen(!isSliderOpen);
    }

    const handleSlotClick = (timeId) => {
        const slotElements = document.querySelectorAll('.time-slot');
        slotElements.forEach(slot => {
            if (slot.getAttribute('id') === timeId.toString()) {
                console.log(timeId);
                props.onMeetingTimeChange(slot.innerHTML);
                props.RoomPicked(timeId);
                slot.classList.add('clicked');
            } else {
                slot.classList.remove('clicked');
            }
        });
        setIsSlotClick(true);
    }
    const navigate = useNavigate();

    const Go2Approve = () => {
        console.log({ state: email })
        navigate("/meetingApproved", { state: email });
    }


    const onApproveClick = () => {
        const slotElements = document.querySelectorAll('.time-slot');
        slotElements.forEach(slot => {
            slot.classList.remove('clicked');

        });
    }

    useEffect(() => {
        setIsCalendarReady(
            props.blockedDates && props.blockedDates.length > 0 && props.blockedDates.length
          );
        }, [props.blockedDates]);

    return (
        <div className="patient-container-div">
        <div className={`therapistMeetingCalendar-div ${isSliderOpen ? 'open' : 'closed'}`}>
            <form onSubmit={props.setNewMeeting}>
                <div className={`calendar-slider`}>
                    {isCalendarReady && ( // Conditional rendering based on calendar readiness
                        <CalendarF date={props.onMeetingDateChange} blockedDates={props.blockedDates} />   )}                   
                     <div className="openClose-arrow" onClick={handleArrowClick}>
                        <img src={backArrow} alt="closeOpenDate" />
                    </div>
                </div>
                <div className="therapist-name-title-container">
                    <div className="therapist-name-title">
                        <div className="therapist-name-title-right-div">
                            <div className="therapist-img">
                                <p>{props.therapistName}</p>
                            </div>
                            <div className="therapist-name">
                                <p>{props.therapistName}</p>
                            </div>
                        </div>
                        <div className="therapist-name-title-left-div">
                            <p className="hour-p">בחר שעה</p>
                        </div>
                    </div>
                </div>
                <div className="meeting-time-slots-container">
                    {props.timeSlots.length > 0 && (
                        <div className="meeting-time-slots">
                            {props.timeSlots.map((time, index) => (
                                <div
                                    className="time-slot"
                                    key={index}
                                    id={index}
                                    onClick={() => handleSlotClick(index)}>{time.startTimetemp}</div>
                            ))}
                        </div>
                    )}
                </div>
                {props.clickedATime !== '' && (
                    <div className="set-meeting-button">
                        <ButtonCard type="submit" onClick={onApproveClick} >אישור</ButtonCard>
                    </div>
                )}
            </form>
            
        </div>
        </div>
    );
}
export default PatientNewMeeting;