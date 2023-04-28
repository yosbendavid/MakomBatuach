
// import React, { useState } from "react";
// import CalendarF from "../Calendar/CalendarF";
// import "../../CSS/therapistCalendar.css"
// import backArrow from "../../Photos/backArrow.svg";

// const TherapistCalendar = (props) => {
//     const [isSliderOpen, setIsSliderOpen] = useState(false);

//     const handleArrowClick = () => {
//         setIsSliderOpen(!isSliderOpen);
//     }

//     return(
//         <div className="therapistCalendar-div">
//             <div className={`calendar-slider ${isSliderOpen ? 'open' : 'closed'}`}>
//                 <CalendarF />
//                 <div className="openClose-arrow" onClick={handleArrowClick}>
//                     <img src={backArrow} alt="closeOpenDate"/>
//                 </div>
//             </div>          
//             <div className={`therapist-name-title ${isSliderOpen ? 'open' : 'closed'}`}>
//                 <div className="therapist-name-title-right-div">
//                     <div className="therapist-img">
//                         <p>{props.therapistName}</p>
//                     </div>
//                     <div className="therapist-name">
//                         <p>ירון שוורץ</p>
//                     </div>
//                 </div>
//                 <div className="therapist-name-title-left-div">
//                     <p className="hour-p">בחר שעה</p>
//                 </div>
//             </div>
//             <div>

//             </div>
//         </div>
//     );
// }
// export default TherapistCalendar;
