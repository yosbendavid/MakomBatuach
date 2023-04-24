import React, {useState} from "react";
import TherapistCalendar from "./TherapistCalendar";
import TopBar from "../Template parts/TopBar";
import BottomBar from "../Template parts/BottomBar";
import "../../CSS/Therapist.css"

const Therapist = () => {
    return(
        <div className="therapist-container-div">
            <TopBar/>
                <TherapistCalendar />
            <BottomBar/>
        </div>
    );
}
export default Therapist;