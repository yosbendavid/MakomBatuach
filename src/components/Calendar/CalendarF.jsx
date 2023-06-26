import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../../CSS/Calendar.css';

const CalendarF = (props) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    props.date(newDate);
  };

  const isDateBlocked = (date) => {
    if (!date || isNaN(date)) return false;
  
    // Extract the date portion from the provided date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
  
    const isBlocked = props.blockedDates.some((blockedDate) => {
      const blockedDateString = blockedDate.substr(0, 10);
      
      console.log("blocked", blockedDateString);
  
      return blockedDateString === dateString;
    });
  
    return isBlocked;
  };
  
  
  
  return (
    <div className='calendar-container'>
      <div className='calendar-div'>
        <Calendar calendarType="US" onClickDay={handleDateChange}
       tileDisabled={({ date }) => isDateBlocked(date)} />
      </div>
    </div>
  );
}

export default CalendarF;
