// src/components/Clock.js
import React, { useState, useEffect } from "react";
import "./Clock.css";

function Clock() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const formattedDateTime = new Intl.DateTimeFormat(
    navigator.language,
    options
  ).format(currentDateTime);

  return (
    <div className="ClockContainer">
      <div className="Clock">{formattedDateTime}</div>
    </div>
  );
}

export default Clock;
