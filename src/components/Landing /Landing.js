import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Landing.css"; // Import the CSS file

const images = [
  "/images/background1.jpg", // Replace with your image URLs
  "/images/background2.jpg",
  "/images/background3.jpg",
];

const descriptions = [
  "Introducing the new TodoApp for managing tasks, prioritizing them, and regulating your schedule seamlessly. Stay organized and on top of your game.",
  "Get your tasks done efficiently with our TodoApp that keeps track of your priority levels.",
  "Take control of your schedule with the powerful features of the TodoApp.",
  "Organize your life and stay focused with the TodoApp—your productivity partner.",
];

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    const textInterval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 5000); // Change description text every 5 seconds

    return () => {
      clearInterval(imageInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <section
      id="landing"
      className="landing"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
      }}
    >
      <div className="overlay"></div>
      <div className="content">
        <h1 className="heading">Note Important Tasks with Priority Levels</h1>
        <p className={`description description-${currentDescriptionIndex}`}>
          {descriptions[currentDescriptionIndex]}
        </p>
        <div className="buttons">
          <Link to="/todoapp" className="button todo-button">
            Go - TodoApp
          </Link>
          <Link to="/contact" className="button contact-button">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
