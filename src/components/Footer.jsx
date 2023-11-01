import React from "react";
import Logo from "../img/footer-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with ♥️ and{" "}
        <Link to="https://ar-ar.facebook.com/haithem.232/">
          <b style={{ cursor: "pointer" }}>Gouder.H</b>
        </Link>
        .
      </span>
    </footer>
  );
};

export default Footer;
