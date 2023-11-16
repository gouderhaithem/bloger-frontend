import React from "react";
import Logo from "../img/footer-logo.png";
import { Link } from "react-router-dom";

const Footer = ({ darkMode, darkModeHandler }) => {
  return (
    <div className="big-footer">
      <footer id="footer">
        <img src={Logo} alt="" />
        <div>
          <span>
            Made with ♥️ and{" "}
            <Link to="https://ar-ar.facebook.com/haithem.232/">
              <b style={{ cursor: "pointer" }}>Gouder.H</b>
            </Link>
            .
          </span>
        </div>
      </footer>

      <span
        id="darkmode"
        onClick={darkModeHandler}
        style={{ color: darkMode ? "white" : "black" }}
      >
        {darkMode ? "☀" : "✦"}
      </span>
    </div>
  );
};

export default Footer;
