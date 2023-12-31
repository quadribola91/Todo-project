// src/components/Footer/Footer.js
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";
import pic from "./highC.jpeg";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="Footer">
      <div className="Content">
        <img
          src={pic}
          alt="Logo"
          className="Logo"
          style={{ width: "40px", borderRadius: "50px" }}
        />
        <p className="Purpose">We Serve You For Your High Purpose</p>
        <div className="SocialMedia">
          <a
            href="https://www.facebook.com/Quadribola91/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook color="#4267B2" />
          </a>
          <a
            href="https://www.instagram.com/omobolarinwa19/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram color="#E4405F" />
          </a>
          <a
            href="https://www.linkedin.com/in/omobolarinwa-quadri-a207b3216/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin color="#0077B5" />
          </a>
          <a
            href="https://github.com/quadribola91"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub color="#333" />
          </a>
          <a
            href="https://wa.me/+2349058824643"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp color="#25D366" />
          </a>
        </div>
      </div>
      <div className="Copyright" style={{ color: "black" }}>
        &copy; {currentYear} <em>HighCloud Inc</em>
      </div>
    </div>
  );
}

export default Footer;
