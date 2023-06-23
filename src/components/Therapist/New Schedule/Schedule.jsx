import React, { useEffect, useState } from "react";
import CalendarF from "../../Calendar/CalendarF";
import { format } from "date-fns";
import "../../../CSS/Schedule.css";
import ButtonCard from "../../Template parts/ButtonCard";
import { useNavigate, useLocation } from "react-router-dom";


const Schedule = (props) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('')

  useEffect(() => {
    const email = state;
    setEmail(email)
    console.log(email);

  }, []);


  //מערך שמחזיר את שם היום בשבוע מאנגלית לעיברית
  const englishToHebrewDays = [
    { english: "Sunday", hebrew: "יום ראשון" },
    { english: "Monday", hebrew: "יום שני" },
    { english: "Tuesday", hebrew: "יום שלישי" },
    { english: "Wednesday", hebrew: "יום רביעי" },
    { english: "Thursday", hebrew: "יום חמישי" },
    { english: "Friday", hebrew: "יום שישי" },
    { english: "Saturday", hebrew: "יום שבת" },
  ];

  //פונקציה ללחיצה על תאריך אשר מושכת את התאריך ומשנה אותו לפורמט הרצוי מכניסה למערך במידה והוא לא קיים שם ומוציאה אותו מהמערך אם הוא נלחץ והוא קיים
  const handleDateSelect = (date) => {
    var newFormat = format(date, "yyyy/MM/dd");
    if (!selectedDates.includes(newFormat)) {
      setSelectedDates((prevSelectedDates) => [
        ...prevSelectedDates,
        newFormat,
      ]);
    } else {
      setSelectedDates((prevSelectedDates) =>
        prevSelectedDates.filter((selectedDate) => selectedDate !== newFormat)
      );
    }
  };

  //פונקציה לשינוי הפורמט של היום בשבוע למילה בעיברית
  const handelDateDayName = (val) => {
    var englishDayName = format(new Date(val), "EEEE");
    var dayObject = englishToHebrewDays.find(
      (day) => day.english === englishDayName
    );
    if (dayObject) {
      return dayObject.hebrew;
    }
    return "";
  };

  //פונקציה לאישור ימי החופש המבוקשים שרצה כאשר לוחצים על אישור ימי חופש
  const submitTakeDaysOff = (event) => {
    event.preventDefault();
    console.log(selectedDates);
  };

  return (
    <div className="daysOff-container">
      <form onSubmit={submitTakeDaysOff}>
        <div className="add-days">
          <p className="add-days-title-one">בחר את ימי החופש המבוקשים</p>
          <CalendarF date={handleDateSelect} />
          <p className="add-days-title-two">ימים נבחרים</p>
          <div className="add-days-list">
            {selectedDates.map((date, index) => (
              <p className="add-days-item" key={index}>
                {handelDateDayName(date)} {date}
              </p>
            ))}
          </div>
        </div>
        <div className="btn-div">
          <ButtonCard type="submit" className="register-submit-btn">
            אישור ימי חופש
          </ButtonCard>
        </div>
      </form>
    </div>
  );
};

export default Schedule;
