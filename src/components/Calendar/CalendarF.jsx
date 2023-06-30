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
  
    // Block dates earlier than the current date
    const currentDate = new Date();
    if (date < currentDate) {
      return true;
    }
  
    if (!props.blockedDates || props.blockedDates.length === 0) {
      return false;
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${month}/${day}/${year}`;

    const formattedBlockedDates = props.blockedDates.map((blockedDate) => {
      const [month, day, year] = blockedDate.split('/');
      return `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
    });  
    const isBlocked = formattedBlockedDates.includes(dateString);
  
    return isBlocked;
  };

  const tileClassName = ({ date, view }) => {
    if (isDateBlocked(date)) {
      return 'blocked-date';
    }
  
    if (view === 'month' && date < new Date()) {
      return 'past-date';
    }
  
    return null;
  };
  
  
  return (
    <div className='calendar-container'>
      <div className='calendar-div'>
        <Calendar calendarType="US" 
        onClickDay={handleDateChange}
       tileDisabled={({ date }) => isDateBlocked(date)}
       tileClassName={tileClassName}  />
      </div>
    </div>
  );
}

export default CalendarF;
