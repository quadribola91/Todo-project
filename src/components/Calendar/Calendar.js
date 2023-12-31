// src/components/Calendar/Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.css";

function CustomCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="CustomCalendar">
      <h2>Professional Calendar</h2>
      <div className="CalendarContainer">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          calendarType="US"
          showNavigation={false}
        />
      </div>
    </div>
  );
}

export default CustomCalendar;
