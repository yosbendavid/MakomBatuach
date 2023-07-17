import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../CSS/Calendar.css";

const CalendarF = (props) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    props.date(newDate);
  };

  const isDateBlocked = (date) => {
    if (!date || isNaN(date)) return false;

    // לחסום תאריכים לפני התאריך של היום
    const currentDate = new Date();
    if (date < currentDate) {
      return true;
    }

    if (!props.blockedDates || props.blockedDates.length === 0) {
      return false;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateString = `${month}/${day}/${year}`;

    const formattedBlockedDates = props.blockedDates.map((blockedDate) => {
      const dateParts = blockedDate.split("/");
      const formattedMonth = dateParts[0]?.padStart(2, "0") || ""; // Check if month is defined
      const formattedDay = dateParts[1]?.padStart(2, "0") || ""; // Check if day is defined
      const formattedYear = dateParts[2] || ""; // Assume year is always defined
      return `${formattedMonth}/${formattedDay}/${formattedYear}`;
    });

    const isBlocked = formattedBlockedDates.includes(dateString);

    return isBlocked;
  };

  const tileClassName = ({ date, view }) => {
    if (isDateBlocked(date)) {
      return "blocked-date";
    }

    if (view === "month" && date < new Date()) {
      return "past-date";
    }

    return null;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-div">
        <Calendar
          calendarType="US"
          onClickDay={handleDateChange}
          tileDisabled={({ date }) => isDateBlocked(date)}
          tileClassName={tileClassName}
        />
      </div>
    </div>
  );
};

export default CalendarF;
