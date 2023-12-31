// src/components/Discover/Artificial.js
import React, { useState, useEffect } from "react";
import "./Artificial.css"; // Don't forget to create the CSS file for styling
import pic1 from "./Art1.jpg";
import pic2 from "./Art2.jpg";
import pic3 from "./Art3.jpg";
import pic4 from "./Art4.jpg";
import pic5 from "./Art5.jpg";
import pic6 from "./Art6.jpg";
import pic7 from "./Art7.jpg";
import pic8 from "./Art8.jpg";
import pic9 from "./Art9.jpg";
import pic10 from "./Art10.jpg";

function Artificial() {
  const artificialImages = [
    pic1,
    pic2,
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
    // Add more image URLs as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Update the index every 3 seconds for the slideshow effect
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artificialImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="artificial-container">
      <h3>Artificial</h3>
      <img
        src={artificialImages[currentIndex]}
        alt={`Artificial Image ${currentIndex + 1}`}
        className="slideshow-image"
        style={{ width: "400px", height: "auto" }}
      />
    </div>
  );
}

export default Artificial;
