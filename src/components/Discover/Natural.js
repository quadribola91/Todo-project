// src/components/Discover/Artificial.js
import React, { useState, useEffect } from "react";
import "./Natural.css"; // Don't forget to create the CSS file for styling
import pic1 from "./Natural1.jpg";
import pic2 from "./Natural2.jpg";
import pic3 from "./Natural3.jpg";
import pic4 from "./Natural4.jpg";
import pic5 from "./Natural5.jpg";
import pic6 from "./Natural6.jpg";
import pic7 from "./Natural7.jpg";
import pic8 from "./Natural8.jpg";
import pic10 from "./Natural10.jpg";

function Natural() {
  const naturalImages = [
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic10,
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Update the index every 3 seconds for the slideshow effect
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % naturalImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="artificial-container">
      <h3>Natural</h3>
      <img
        src={naturalImages[currentIndex]}
        alt={`Natural Image ${currentIndex + 1}`}
        className="slideshow-image"
        style={{ width: "400px", height: "auto" }}
      />
    </div>
  );
}

export default Natural;
