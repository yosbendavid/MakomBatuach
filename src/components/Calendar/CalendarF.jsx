import React, { useState } from 'react';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import '../../CSS/Calendar.css';

const CalendarF = (props) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    props.date(newDate);
  };

  return (
    <div className='calendar-container'>
      <div className='calendar-div'>
        <Calendar calendarType="US" onClickDay={handleDateChange}/>
      </div>
    </div>
  );
}

export default CalendarF;
